

const Advisor = {
    dealCards (cards) {
		this.cards = cards;
        return this.clientApi.dealCards(cards);
    },

    rejectCard (card, cardsOnTable) {
        return this.clientApi.rejectCard(card, cardsOnTable);
    },

    requestCard (cardsOnTable) {
        return this.clientApi.requestCard(cardsOnTable);
    },

    requestTrumpf (isGeschoben) {
        return this.clientApi.requestTrumpf(isGeschoben);
    },

    rejectTrumpf (gameType) {
        return this.clientApi.rejectTrumpf(gameType);
    },

	removeCard (cardToRemove) {
		this.cards = this.cards.filter((card) => {
			return !card.equals(cardToRemove);
		});
	}
};

export function create(name, clientApi) {
    let player = Object.create(Advisor);
    player.name = name;
    player.clientApi = clientApi;
    return player;
}
