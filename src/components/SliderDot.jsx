import React from 'react';
import cn from 'classnames';

const SliderDot = ({id, currentSlide, setCurrentSlide}) => {
	return <div
		className={
			cn({['slider-dots__item-active'] : currentSlide === id}, 'slider-dots__item')
		}
		onClick={() => setCurrentSlide(id)}
	></div>;
}

export default SliderDot;