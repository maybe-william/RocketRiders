import React, { useRef, useState, useEffect } from 'react';
import TEAM_PERSONS from '../data/peopleInTeam';
import git from '../assets/social-media/github.svg'
import twit from '../assets/social-media/twit.svg'
import linked from '../assets/social-media/linked.svg'
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
	const { title, description, image, name, animeName, animeImg, quote, animeTitle, github, linkedin, twitter } = props.team_person;

	return (
		<div className="teamDesc">
			<div>
				<img ref={ref} src={hovered ? animeImg : image} alt='person' className="teamPic" />
			</div>
			<div className="desc">
				<h3>{hovered ? animeName : name} - {hovered ? animeTitle : title}</h3>
				<p>{hovered ? quote : description}</p>
				<a href={github}><img src={git} style={styleimg}/></a>
				<a href={linkedin}><img src={linked} style={styleimg}/></a>
				<a href={twitter}><img src={twit} style={styleimg}/></a>
			</div>
		</div>
	)
}
const styleimg = {
	height: '4vh',
	marginRight: '4vw'
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
