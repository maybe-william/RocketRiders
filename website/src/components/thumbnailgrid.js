import React from 'react'
import Thumbnail from './thumbnail'
const ThumbnailGrid = ({thumbnails, handleClick }) => {
	return (
		<div style={styles}>
			{
				thumbnails.map((i, index) => (
					<Thumbnail key={i.id} thumb={i} handleClick={handleClick} index={index}/>
				))
			}
		</div>
	)
}


const styles = {
	display: 'flex',
	flexWrap: 'wrap',
	height: '40vw',
	width: '33vw',
	background: 'Black',
	aspectRatio: 4/4

}
export default ThumbnailGrid;