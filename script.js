const apiKey = "1c28ff1ef17c40aeb443c016d042152a";
const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const text = document.getElementById("text");
const loader = document.getElementById("loader");
// Toggle button disable - enable
function toggleButton() {
	button.disabled = !button.disabled;
}

// passing Joke to VoiceRSS API
function tellMe(joke) {
	VoiceRSS.speech({
		key: apiKey,
		src: joke,
		hl: "en-us",
		v: "Linda",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

// Get joke from joke API
async function getJokes() {
	loader.hidden = false;

	try {
		const apiUrl =
			"https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Pun?blacklistFlags=nsfw,religious,political,racist,sexist";
		let joke = "";
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		// text-to-speech
		tellMe(joke);
		// show text
		text.hidden = false;
		text.innerText = joke;
		// disable button
		toggleButton();
		loader.hidden = true;
	} catch (error) {
		console.log("Error here: ", error);
	}
}
// Event Listeners for button
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
