import React from 'react'

const Thumbnailwindow = ({activeThumb}) => {
	return (
		<div style={styles}>
			<img src={activeThumb.image} style={{width: '15vw', height: '15vw'}}/>
		</div>
	)
}


const styles = {
	height: '65%',
	width: '100%',
	background: '#333'

}
export default Thumbnailwindow;