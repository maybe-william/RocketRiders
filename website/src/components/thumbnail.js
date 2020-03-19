import React from 'react';

const Thumbnail= ({ thumb, handleClick, index }) => {
    
    return (
        <div style={styles}>
            <img src={thumb.image}
                style={{ 
                    width: '100%',
                    height: '100%'
                }}
                onClick={handleClick}
                data-index={index}
            />
        </div>
    )
}


const styles = {
    display: 'block',
    height: '10.02vw',
    width: '11vw'

}
export default Thumbnail;