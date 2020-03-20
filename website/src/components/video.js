import React, {Component} from 'react';

class Video extends React.Component {
  render() {
    return (
      <video
        autoPlay
        style={{
          width: "100vw",
          height: "100vh"
        }}
        src="../assets/fullgamevid.mp4"
        type="video/mp4"
      />
    );
  }
}

export default Video;