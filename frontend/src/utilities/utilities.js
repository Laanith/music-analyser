function convertMillisecondsToMinutesAndSeconds(milliseconds) {
  let totalSeconds = milliseconds / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);
  let timeString = `${minutes} min ${seconds} sec`;
  return timeString;
}

function formatDateString(inputDateString) {
  const date = new Date(inputDateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function combineArtists(artistsArray) {
  let x = "";
  for (let int in artistsArray) {
    x += artistsArray[int].name + ", ";
  }

  return x.slice(0, x.length - 2);
}

function combineWords(array) {
  let x = "";
  for (let int in array) {
    if(int<3){
        x += array[int] + ", ";
    }
  }
  return x.slice(0, x.length - 2);
}

const utils = {
  combineArtists,
  convertMillisecondsToMinutesAndSeconds,
  formatDateString,
  combineWords,
};

export default utils;
