import React, { Component } from 'react';
import TEAM_PERSONS from '../data/peopleInTeam';
import '../index.css'
const Team_Person = props => {
    const { title, description, image, name } = props.team_person;

    return (
        <div className="teamDesc">
            <div>
                <img src={image} alt='person' className="teamPic"/>
            </div>
            <div className="desc">
                <h3>{name} - {title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

const Team_Persons = () => {
    return (
        <div className="slide two">
            <div className="team">
                {
                    TEAM_PERSONS.map( TEAM_PERSON => (
                        <Team_Person key={TEAM_PERSON.id} team_person={TEAM_PERSON} />
                    ))
                }
            </div>
        </div>
    )
}

export default Team_Persons;
