import duel1 from "../assets/gamePhotos/duelship1.png";
import duel2 from "../assets/gamePhotos/duelship2.png";
import shiplosion1 from "../assets/gamePhotos/shiplosion.png";
import shiplosion2 from "../assets/gamePhotos/shiplosion2.png";
import title from "../assets/gamePhotos/titlescreen.png";

const GAMEPICS = [
	{
		id: 1,
		name: 'Enemy AI',
		image: title,
		description: "The enemies have a degree of intelligence"
	},
	{
		id: 2,
		name: 'Multiplayer',
		image: duel1,
		description: " You Can Play With A Friend"
	},
	{
		id: 3,
		name: 'Respawn invincibility',
		image: duel2,
		description: "When you die and come back you have a chance to save yourself"
	},
]


export default GAMEPICS;
