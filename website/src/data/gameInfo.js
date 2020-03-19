import phaser from '../assets/technologies/phaser.png';
import react from '../assets/technologies/React-icon.svg';
import parcel from '../assets/technologies/parcel-og.png';
import html from '../assets/technologies/html5.png';
import css from '../assets/technologies/css3.png';
import js from '../assets/technologies/JavaScript.png';
import flask from '../assets/technologies/flask.png';
import python from '../assets/technologies/python.png';
import npm from '../assets/technologies/npm.png';
import node from '../assets/technologies/node.png';
import bable from '../assets/technologies/babel.png';
import loty from '../assets/technologies/Lottie.png';
import ae from '../assets/technologies/aftereffect.png';

const GAME_INFO = [
	{
		id: 1,
		name: 'Phaser 3' ,
		description: 'Phaser 3 is the game framework used to create Rocket Riders.',
		image: phaser
	},
	{
		id: 2,
		name: 'React' ,
		description: 'Used to create our Host page.',
		image: react
	},
	{
		id: 3,
		name: 'Parcel' ,
		description: 'Package bundler for this project.',
		image: parcel
	},
	{
		id: 4,
		name: 'HTML5' ,
		description: 'Used to create our webpage.',
		image: html
	},
	{
		id: 5,
		name: 'CSS3' ,
		description: 'Used for styling the webpage.',
		image: css
	},
	{
		id: 6,
		name: 'JavaScript' ,
		description: 'Main language used in this projects.',
		image: js
	},
	{
		id: 7,
		name: 'Python' ,
		description: 'Used for flask.',
		image: python
	},
	{
		id: 8,
		name: 'Flask' ,
		description: 'Used to run a testing server for our game webpage.',
		image: flask
	},
	{
		id: 9,
		name: 'npm' ,
		description: 'Used to setup the enviroment that our react app can run in.',
		image: npm
	},
	{
		id: 10,
		name: 'Bable' ,
		description: 'Bable was used in this project to Transcompiler - its used to convert JSX to js that the browser can understand.',
		image: bable
	},
	{
		id: 11,
		name: 'lottie',
		description: 'Lottie was used to convert the animation from After Effects to an Svg that we used on the top.',
		image: loty
	},
	{
		id: 12,
		name: 'After Effects',
		description: 'Used to create the logo Animation at the top of the page.',
		image: ae
	}
]

export default GAME_INFO;
