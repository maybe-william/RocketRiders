import React, { Component } from 'react';
import heart from "../assets/miscellaneous/heart.svg";
import Intropage from './logocomp';
import GameObjs from './GameInfo';
import Team_Persons from './PeopleInTeam';
import GamePics from './AboutGame';
import Video from './video'
import '../index.css';

class App extends Component {
	render() {
		return (
			<div className="wrapper">
				<div className="intro">
					<Intropage />
				</div>
				<div className="slide one">
					<h1 className="GameName">ROCKET RIDERS</h1>
				</div>
				<div className="tri-right"></div>

				<div className="mtt">Meet The Crew</div>
				<Team_Persons />
				<GameObjs className="slide three"/>
				<GamePics />

				<div style={{ marginTop: '20vh' , textAlign: 'center' }}>
					<h1>Now You Can Try!</h1>
					<a href="./game/index.html"><button style={{backgroundColor: 'white', marginBottom: '5vh', width: '10vw', height: '10vh', fontFamily: 'Uni' }}>Play Now!</button></a>
				</div>
				<hr />

				<div style={{height: '50hv', paddingLeft: '3vw'}}>
					<h2>Credit</h2>
					<Intropage />

					<h2 style={end}> Thanks to an amazing team!</h2>
					<h2 style={end}> Thanks To This Amazing School!</h2>
					<h2 style={end}>Thanks For All The Support!</h2>
					Thank You For checking Out Our Project Page!
				</div>
				<hr />

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<img src={heart} alt="heart" style={{ height: '2vh' }} />
					<p style={{ margin: 0, marginLeft: '12px'}}>Made With Love, Hardwork, And Care By Cohort 9 HolbertonNHV</p>
				</div>
			</div>
		)
	}
}


const end = {
	textAlign: 'center'
}
export default App;
