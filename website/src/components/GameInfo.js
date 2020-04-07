import React, { useState, Component, useRef, useEffect } from 'react';
// import Thumbnailwindow from './window';
import ThumbnailGrid from './thumbnailgrid'
import GAME_INFO from '../data/gameInfo';
import '../index.css';


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
						off={this.handleOff}
						useHover={this.useHover}
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


	handleOff = () => {
		this.setState({ activeIndex: 0})
	}

	handleClick = (e) => {
		const newActiveIndex = e.target.getAttribute('data-index')
		this.setState({ activeIndex: newActiveIndex})
	}

	render() {
		const {thumbnails} = this.state

		return (
			<div>
			<h1 style={{textAlign: 'center', fontSize: '4vw'}}>The Technologies We Used</h1>
				<div style={gallery} className="three">
					{/* left side */}
					<div style={{ flex: 1, width: '5vw'}}>
						{ this.renderThumbnails() }
						
					</div>

					{/* right side */}
					<div className="desc" style={{ flex: 1, padding: '3vw' }}>
						{ this.renderTextContent() }
					</div>
				</div>
			</div>
		)
	}
}

const gallery = {
	height: '70vh',
	width: '70vw',
	margin: '20vw auto',
	marginTop: '0vw',
	display: 'flex',
	alignItems: 'center'
}

export default GameObj;