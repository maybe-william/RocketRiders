import React, { Component } from 'react';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import GameObjs from '../components/GameInfo';
import Team_Persons from '../components/PeopleInTeam';
import GamePics from '../components/AboutGame';
import '../index.css';

class App extends Component {
    render() {
        return (
            <div className="outer-wrapper">
                <div className="wrapper">
                    <div className="intro">
                        TEAM SYNERGY
                        PRESENTS
                    </div>
                    <div className="slide one">
                        <h1 className="GameName">ROCKET RIDERS</h1>
                    </div>
                    <div className="tri-right"></div>

                    <div className="mtt">Meet The Crew</div>
                    <Team_Persons />
                    <GameObjs />
                    
                    <GamePics />
                    <div>Play The Game!!</div>
                </div>
            </div>
        )
    }
}

export default App;