import React, { useRef, useState, useEffect } from 'react';
import TEAM_PERSONS from '../data/peopleInTeam';
import '../index.css'

function useHover() {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)

	const enter = () => setHovered(true)
	const leave = () => setHovered(false)

	useEffect(() => {
		ref.current.addEventListener('mouseenter', enter)
		ref.current.addEventListener('mouseleave', leave)
		return () => {
			ref.current.removeEventListener('mouseenter', enter)
			ref.current.removeEventListener('mouseleave', leave)
		}
	}, [ref])

	return [ref, hovered]

}

const Team_Person = props => {
	const [ref, hovered] = useHover()
	const { title, description, image, name, animeName, animeImg, quote, animeTitle } = props.team_person;

	return (
		<div className="teamDesc">
			<div>
				<img ref={ref} src={hovered ? animeImg : image} alt='person' className="teamPic" />
			</div>
			<div className="desc">
				<h3>{hovered ? animeName : name} - {hovered ? animeTitle : title}</h3>
				<p>{hovered ? quote : description}</p>
			</div>
		</div>
	)
}

const Team_Persons = () => {
	return (
		<div className="slide two">
			<div className="team">
				{
					TEAM_PERSONS.map(TEAM_PERSON => (
						<Team_Person key={TEAM_PERSON.id} team_person={TEAM_PERSON} />
					))
				}
			</div>
		</div>
	)
}

export default Team_Persons;
