import React, { useState, Component } from 'react';
import Thumbnailwindow from './window';
import ThumbnailGrid from './thumbnailgrid'
import GAME_INFO from '../data/gameInfo';
// import ThumbnailGallery from 'react-image-gallery';
import '../index.css';
// import Slider from "react-slick";

// const GameObj = props => {
//     const { name, description, image } = props.gameobj;

//     return (
//         <div style={{ display: 'inline-block' }} className='GameObj'>
//             <div>
//                 <img src={image} alt='technology' style={{ height: 200 }} />
//             </div>
//             <div>
//                 <h3>{name}</h3>
//                 <p>{description}</p>
//             </div>
//         </div>
//     )
// }


// const GameObjs = props => {
//     return (
//         <div className="slide three">
//             <h3>Our Weapons</h3>
//             <div>
//                 {
//                     GAME_INFO.map(GAMEOBJ => (
//                         <GameObj key={GAMEOBJ.id} gameobj={GAMEOBJ} />
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }




// const GameObj = props => {
//     const { name, description, image } = props.gameobj;

//     return (
//         <div style={{ display: 'inline-block' }} className='GameObj'>
//             <div>
//                 <img src={image} alt='technology' style={{ height: 200 }} />
//             </div>
//             <div>
//                 <h3>{name}</h3>
//                 <p>{description}</p>
//             </div>
//         </div>
//     )
// }


// const GameObjs = props => {
//     return (
//         <div className="slide three">
//             <h3>Our Weapons</h3>
//             <div>
//                 {
//                     GAME_INFO.map(GAMEOBJ => (
//                         <GameObj key={GAMEOBJ.id} gameobj={GAMEOBJ} />
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// class GameObjs extends React.Component {
//     render() {
//         const settings = {
//             sizes: 1
//         }
//         return (
//             <div className="slide three">
//                 <ImageGallery {...settings} items={GAME_INFO} />;
//             </div>
//         ) 
//     }
// }


// function GameObjs(){
//     let sliderArr = [1,2,3,4,5,6,7,8,9,10];
//     const [x,setX] = useState(0)
//     const goLeft = () => {
//         console.log("goleft");
//         setX(x + 100);
//     };
//     const goRight = () => {
//         setX(x - 100);
//     };


//     return (
//         <div className="slide three" >
//             <button id="goleft" onClick={goLeft}>left</button>
//             <button id="goright" onClick={goRight}>right</button>
//             {
//                 sliderArr.map((item, index) => {
//                     return (
//                         <div key={index} className="slidie" style={{transform: `translateX($(x))%`}}>
//                             {item}
//                         </div>
//                     );
//                 })
		
//             }
//         </div>
//     )
// }

var images = GAME_INFO.map(i => i.image);

class GameObj extends Component {
	state = {
		thumbnails: [],
		activeIndex: 0
	}

	componentDidMount() {
		this.setState({ thumbnails: GAME_INFO })
	}


	renderThumbnails = () => {
		const { thumbnails, activeIndex } = this.state


		if ( thumbnails.length ) {
			return (
				<>
					<ThumbnailGrid 
						thumbnails={thumbnails}
						handleClick={this.handleClick}
					/>
				</>
			)
		}
		return null
	}

	renderTextContent = () => {
		const { thumbnails, activeIndex } = this.state


		if ( thumbnails.length ) {
			return (
				<>
					<h2>{ thumbnails[activeIndex].description }</h2>
				</>
			)
		}
		return null
	}

	
	handleClick = (e) => {
		const newActiveIndex = e.target.getAttribute('data-index')
		this.setState({ activeIndex: newActiveIndex})
	}

	render() {
		const {thumbnails} = this.state

		return (
			<div>
			<h1>The Technologies We Used</h1>
				<div style={gallery} className="three">
					{/* left side */}
					<div style={{ flex: 1 }}>
						{ this.renderThumbnails() }
						
					</div>

					{/* right side */}
					<div style={{ flex: 1, padding: '3vw' }}>
						{ this.renderTextContent() }
					</div>
				</div>
			</div>
		)
	}
}

const gallery = {
	background: 'black',
	height: '40vw',
	width: '75vw',
	margin: '20vw auto',
	marginTop: '5vw',
	display: 'flex',
	alignItems: 'center'
}

export default GameObj;