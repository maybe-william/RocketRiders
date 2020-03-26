import React from 'react';
import Lottie from 'react-lottie';
import * as svgfile from '../assets/goodmaskcropped.json';
import '../index.css';


const defaultOptions = {
	loop: true,
	autoplay: true, 
	animationData: svgfile.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
};

const Intropage = () => {
	return (
		<div className="intro">
			<Lottie options={defaultOptions} height={'70vh'} width={'70vh'} className="lottie" /> 
		</div>
	)
}

export default Intropage;