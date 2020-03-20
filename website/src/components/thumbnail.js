import React, { useRef, useState, useEffect } from 'react';
import AspectRatio from 'react-aspect-ratio';


const Thumbnail= ({ thumb, handleClick, index, off}) => {
    if ( index ) {
        return (
            <div style={styles}>
                    <img src={ thumb.image } style={{ width: '100%', height: '100%' }} onMouseEnter={ handleClick } onMouseLeave={off} data-index={index} />
            </div>
        )
    }
    return null
}


const styles = {
    width: '33.3%',
    height: '16%'
}
export default Thumbnail;