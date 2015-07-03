'use strict';

let WebSocket = require('ws'),
    WebSocketServer = require('ws').Server,
    ClientApi = require('../../../server/communication/clientApi'),
    GameType = require('../../../server/game/game').GameType,
    GameMode = require('../../../server/game/gameMode'),
    Card = require('../../../shared/deck/card'),
    CardColor = Card.CardColor,
    Validation = require('../../../server/game/validation/validation'),
    messages = require('../../../shared/messages/messages');

let SimpleBot = {
    handcards : [],
    name: [],
    gameType: GameType.create(GameMode.TRUMPF, CardColor.SPADES),

    onMessage : function (messageJson) {
        let message = JSON.parse(messageJson);

        if (message.type === messages.MessageType.REQUEST_PLAYER_NAME) {
            this.client.send(JSON.stringify(messages.create(messages.MessageType.CHOOSE_PLAYER_NAME, this.name)));
        }

        if (message.type === messages.MessageType.DEAL_CARDS) {
            this.handcards = this.mapCardsFromJson(message.data);
        }

        if (message.type === messages.MessageType.BROADCAST_WINNER_TEAM) {
            this.doneFunction();
        }

        if (message.type === messages.MessageType.REQUEST_CARD) {
            let handCard = this.giveValidCardFromHand(this.mapCardsFromJson(message.data), this.handcards);
            this.handcards.splice(this.handcards.indexOf(handCard), 1);
            let chooseCardResonse = messages.create(messages.MessageType.CHOOSE_CARD, handCard);
            this.client.send(JSON.stringify(chooseCardResonse));
        }

        if (message.type === messages.MessageType.REQUEST_TRUMPF) {
            let chooseTrumpfResponse = messages.create(messages.MessageType.CHOOSE_TRUMPF, this.gameType);
            this.client.send(JSON.stringify(chooseTrumpfResponse));
        }
    },

    mapCardsFromJson : function(cards) {
        return cards.map((element) => {
            return Card.create(element.number, element.color);
        });
    },

    giveValidCardFromHand : function(tableCards, handCards) {
        let cardToPlay;

        let validation = Validation.create(this.gameType.mode, this.gameType.trumpfColor);
        handCards.forEach((handCard) => {
            if(validation.validate(tableCards, handCards, handCard)) {
                cardToPlay = handCard;
            }
        });

        return cardToPlay;
    },


};

module.exports = {
    create: function create(name, doneFunction) {
        let clientBot = Object.create(SimpleBot);
        clientBot.doneFunction = doneFunction;
        clientBot.client = new WebSocket('ws://localhost:10001');
        clientBot.client.on('message', clientBot.onMessage.bind(clientBot));
        clientBot.name = name;
        return clientBot;
    }
};