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
import git from '../assets/technologies/github.svg';
import nginx from '../assets/technologies/nginx.svg';
import aws from '../assets/technologies/aws.png';
import linux from '../assets/technologies/Tux.svg';
import trello from '../assets/technologies/trello.png';
import slack from '../assets/technologies/slack.svg';


const GAME_INFO = [
	{
		id: 0,
		name: 'null' ,
		description: 'Hover over an image to see how we used it in our project!',
	},
	{
		id: 1,
		name: 'Phaser 3' ,
		description: 'Phaser 3 is the game framework used to create Rocket Riders.',
		image: phaser
	},
	{
		id: 2,
		name: 'React' ,
		description: 'React is used to create our Host page.',
		image: react
	},
	{
		id: 3,
		name: 'Parcel' ,
		description: 'Parcel Package bundler for this project.',
		image: parcel
	},
	{
		id: 4,
		name: 'HTML5' ,
		description: 'HTML5 is used to create our webpage.',
		image: html
	},
	{
		id: 5,
		name: 'CSS3' ,
		description: 'CSS3 was used for styling the webpage.',
		image: css
	},
	{
		id: 6,
		name: 'JavaScript' ,
		description: 'Javascript was the main language used in this project.',
		image: js
	},
	{
		id: 7,
		name: 'Python' ,
		description: 'To create and configure the flask server.',
		image: python
	},
	{
		id: 8,
		name: 'Flask' ,
		description: 'Flask was used to run a testing server for our game webpage.',
		image: flask
	},
	{
		id: 9,
		name: 'npm' ,
		description: 'NPM was used to setup the enviroment that our react app can run in.',
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
	},
	{
		id: 13,
		name: 'Github',
		description: 'Github was used to store our code online and version control. See the bottom of the page for our github info.',
		image: git
	},
	{
		id: 14,
		name: 'AWS',
		description: 'AWS was used as the server for out website and game.',
		image: aws
	},
	{
		id: 15,
		name: 'linux',
		description: 'Linux is the operating system and work enviroment for the website, game, and our servers.',
		image: linux
	},
	{
		id: 16,
		name: 'Nginx',
		description: 'Nginx is the webserver we used.',
		image: nginx
	},
	{
		id: 17,
		name: 'Trello',
		description: 'Trello allowed us to set and define goals that we were each to complete in the project.',
		image: trello
	},
	{
		id: 18,
		name: 'Slack',
		description: 'Slack was used for our team to collaborate.',
		image: slack
	}
]

export default GAME_INFO;
