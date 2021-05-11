import React from 'react';
import {throttle} from './throttle';

export function useSlidesAmount(slidesAmount) {

	const [visibleSlides, setVisibleSlides] = React.useState(slidesAmount);

	React.useEffect(() => {
		function handleResize() {
			let width = window.innerWidth;

			if (width <= 576) {
				setVisibleSlides(1);
			} else {
				setVisibleSlides(slidesAmount);
			}
		}

		window.addEventListener('resize', throttle(handleResize, 200));
		window.addEventListener('load', handleResize);
		
		// clearing the event queue
		return () => {
			window.removeAddEventListener('resize', handleResize);
			window.removeAddEventListener('load', handleResize);
		}
	}, [])

	return visibleSlides;
}
