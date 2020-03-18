import React, { Component } from 'react';
import GAMEPICS from '../data/aboutGames';
import '../index.css'

const GamePic = props => {
    const { name, image } = props.gamepics;

    return (
        <div>
            <img src={image} alt={name} />
        </div>
    )
}

const GamePics = () => {
    return (
        <div className="slide four">
            <div className="aboutGame">
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