import React, { Component } from 'react';
import GAME_INFO from '../data/gameInfo';
import '../index.css';
// import Slider from "react-slick";

const GameObj = props => {
    const { name, description, image } = props.gameobj;

    return (
        <div style={{ display: 'inline-block' }} className='GameObj'>
            <div>
                <img src={image} alt='technology' style={{ height: 200 }} />
            </div>
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}


const GameObjs = props => {
    return (
        <div className="slide three">
            <h3>Our Weapons</h3>
            <div>
                {
                    GAME_INFO.map(GAMEOBJ => (
                        <GameObj key={GAMEOBJ.id} gameobj={GAMEOBJ} />
                    ))
                }
            </div>
        </div>
    )
}

export default GameObjs;
