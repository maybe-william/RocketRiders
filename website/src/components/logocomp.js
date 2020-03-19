import React from 'react';
import Lottie from 'react-lottie';
import * as svgfile from '../assets/logo.json';
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
			<Lottie options={defaultOptions} height={620} width={620} className="lottie" /> 
		</div>
	)
}

export default Intropage;