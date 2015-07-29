'use strict';

let JassAppConstants = require('./jassAppConstants'),
    JassAppDispatcher = require('./jassAppDispatcher');

module.exports = {
    requestPlayerName: () => {
        JassAppDispatcher.handleServerAction({
            actionType: JassAppConstants.REQUEST_PLAYER_NAME
        });
    },

    choosePlayerName: (playerName) => {
        JassAppDispatcher.handleViewAction({
            actionType: JassAppConstants.CHOOSE_PLAYER_NAME,
            data: playerName
        });
    },

    requestSessionChoice: (availableSessions) => {
        JassAppDispatcher.handleServerAction({
            actionType: JassAppConstants.REQUEST_SESSION_CHOICE,
            data: availableSessions
        });
    },

    joinExistingSession: (sessionChoice) => {
        JassAppDispatcher.handleViewAction({
            actionType: JassAppConstants.CHOOSE_EXISTING_SESSION,
            data: sessionChoice
        });
    },

    createNewSession: (sessionName) => {
        JassAppDispatcher.handleViewAction({
            actionType: JassAppConstants.CREATE_NEW_SESSION,
            data: sessionName
        });
    },

    autojoinSession: () => {
        JassAppDispatcher.handleViewAction({
            actionType: JassAppConstants.AUTOJOIN_SESSION
        });
    },

    sessionJoined: (playerInfo) => {
        JassAppDispatcher.handleServerAction({
            actionType: JassAppConstants.SESSION_JOINED,
            data: playerInfo
        });
    }
};