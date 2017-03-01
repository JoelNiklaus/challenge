import React from 'react';
import JassActions from '../jassActions';

export default (props) => {

    return (
        <div id="points"
             className={(props.showPoints) ? 'shown' : ''}
             onClick={() => JassActions.toggleShowPoints()}
        >
            {props.teams.map((team) => {
                return (
                    <div key={team.name} className="points-team">
                        {team.winner && <img className="points-trophy" src="/images/trophy.svg" />}
                        <h3>
                            {team.name}
                            {props.showPoints && <small> ({team.players[0].name} & {team.players[1].name})</small>}
                        </h3>
                        <div className="current-round-points">
                            {(props.showPoints) ? 'Current Round: ' : ''}{team.currentRoundPoints}
                        </div>
                        <div className="total-points">
                            {(props.showPoints) ? 'Total: ' : ''}{team.points}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
