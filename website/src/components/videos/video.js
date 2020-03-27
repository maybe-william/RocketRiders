import React from 'react';
import ReactPlayer from 'react-player'
import "./video.css"
import video from '../../assets/WCN.mp4';


const Video = () => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url={video}
        width='100%'
        height='80%'
        controls={true}
      />
    </div>
  )
};
export default Video;