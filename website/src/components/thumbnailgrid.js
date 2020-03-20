import React from 'react'
import Thumbnail from './thumbnail'

const ThumbnailGrid = ({thumbnails, handleClick, off}) => {

	return (
		<div style={styles}>
			{
				thumbnails.map((i, index) => (
					<Thumbnail key={i.id} thumb={i} handleClick={handleClick} off={off} index={index}/>
				))
			}
		</div>
	)
}


const styles = {
	paddingUp: '100%',
	display: 'flex',
	flexWrap: 'wrap',
	height: '70vh',
	maxWidth: '15vw',

}
export default ThumbnailGrid;