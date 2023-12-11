const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to voice RSS

function tellMe(joke) {
  //   console.log("I got the joke:", joke);
  VoiceRSS.speech({
    key: "dd535c1beb414c9683daf33cbe6a7f07",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from jokeAPI

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}....${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    //catch erros
    console.log("error", error);
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
