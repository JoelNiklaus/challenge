'use strict';

import React from 'react';
import ExistingSessions from './existingSessions.jsx';
import GameSetupStore from './gameSetupStore.js';
import JassActions from '../jassActions.js';
import SessionType from '../../../shared/session/sessionType.js';

module.exports = React.createClass({

    createNewSession: function(sessionChoice, event) {
        let inputElement = event.target,
            sessionName = inputElement.value;

        if (event.charCode === 13 && sessionName.trim()) {
            inputElement.disabled = true;
            JassActions.createNewSession(sessionChoice, sessionName);
        }
    },

    render: function () {
        let status = this.props.setupState.status;

        return (
            <div id="chooseSession" className={(status !== GameSetupStore.GameSetupState.CHOOSE_SESSION ? 'hidden' : '')}>
                <h1 className="jumbotron">Choose Session</h1>
                <ExistingSessions sessions={this.props.setupState.sessions}></ExistingSessions>
                <div className="session-choice">
                    <input type="text" name="createNewSession" placeholder="Session Name..." onKeyPress={this.createNewSession.bind(null, SessionType.SINGLE_GAME)}></input>
                </div>
                <div className="session-choice">
                    <input type="text" name="createNewTournament" placeholder="Tournament Name..." onKeyPress={this.createNewSession.bind(null, SessionType.TOURNAMENT)}></input>
                </div>
                <div className="session-choice">
                    <button type="button" name="autoJoin" onClick={JassActions.autojoinSession}>Just Join!</button>
                </div>
            </div>
        )
    }
});