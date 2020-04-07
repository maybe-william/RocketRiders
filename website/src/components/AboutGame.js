import React, { Component } from 'react';
import GAMEPICS from '../data/aboutGames';
import ImageGallery from 'react-image-gallery';


import '../index.css'

const GamePic = props => {
	const { name, image, description } = props.gamepics;

	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: "2vw", marginRight: "2vw", marginTop: "2vh" }}>
			<div>
				<img src={image} alt={name} style={{width: '65vh'}}/>
			</div>
			<div style={{width: '30vw', flexDirection: 'column', alignItems: 'center', fontSize: "3vh"}} >
				<h3>{ name }</h3>
				<p>{description}</p>
			</div>	
		</div>
	)
}

const GamePics = () => {
	return (
		<div>
			<h1 style={{textAlign: "center", fontSize: '3vw'}}>Features</h1>
			<div style={{ maxWidth: '100vw', textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
			
				{
					GAMEPICS.map( GAMEPIC => (
						<GamePic key={GAMEPIC.id} gamepics={GAMEPIC} />
					))
				}
			</div>
		</div>
	)
}

export default GamePics;