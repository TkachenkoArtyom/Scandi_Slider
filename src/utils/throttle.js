export function throttle(func, ms) {

	let isThrottled = false; // process state
	let savedArgs;	// parameters
	let savedThis; // context

	function wrapper() {

		// save event info 
		if (isThrottled) {
			savedArgs = arguments;
			savedThis = this;
			return;
		}
		// call event 
		func.apply(this, arguments);
		
		// update process state
		isThrottled = true;

		// block extra events
		setTimeout(function () {
			isThrottled = false;

			// call the last event
			if (savedArgs) {
				wrapper.apply(savedThis, savedArgs);
				savedThis = null;
				savedArgs = null;
			}
		}, ms);
	}

	return wrapper;
}