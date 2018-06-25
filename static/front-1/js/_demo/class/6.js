function* displayResponse() {
	const response = yield;
	console.log(`Your response is "${response}"!`);
}

const iterator = displayResponse();

// iterator.next(); // starts running the generator function
// iterator.next('Hello Udacity Student'); // send data into the generator
