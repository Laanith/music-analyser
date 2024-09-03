import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { useEffect, useRef, useState } from "react";


function SongCard(props) {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);

  const handleIconClick = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      if (audio.paused) {
        audio.play();
        setPlay(true);
      } else {
        audio.pause();
      }
    }
  };

  function convertMillisecondsToMinutesAndSeconds(milliseconds) {
    let totalSeconds = milliseconds / 1000;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let timeString = `${minutes} min ${seconds} sec`;
    return timeString;
  }

  function joinAllArtistNames(artists) {
    let x = "";
    for (let artist in artists) {
      x = x + (artists[artist].name + ", ");
    }
    return x.slice(0, x.length - 2);
  }

  useEffect(() => {}, [props]);

  return (
    <div className="flex flex-row h-fit m-[20px] p-[10px] rounded-[15px] border-2 border-gray-400 shadow-xl hover:shadow-slate-500 transition-all">
      <div className="flex flex-col justify-center p-[10px]">
        <img
          alt="song-profile"
          src={props.data.album.images[1].url}
          className="w-[170px] aspect-square m-[10px] mx-auto border-4 border-gray-400 rounded-md"
        ></img>
        <span className="flex flex-row justify-center p-[20px]">
          {props.data.preview_url === null ? (
            <div className="text-red-600">No preview available</div>
          ) : (
            <span
              className="flex justify-center w-fit h-fit"
              onClick={handleIconClick}
            >
              <audio
                className="audio"
                controls="controls"
                ref={audioRef}
                src={props.data.preview_url}
              />
              {play ? (
                <PauseCircleOutlineIcon
                  htmlColor="black"
                  sx={{
                    fontSize: 50,
                  }}
                  onClick={() => {
                    setPlay(false);
                  }}
                />
              ) : (
                <PlayCircleOutlineIcon
                  htmlColor="black"
                  sx={{
                    fontSize: 50,
                  }}
                />
              )}
            </span>
          )}
        </span>
      </div>
      <div className="flex flex-col justify-around text-center">
        <p className="text-center">{props.data.name}</p>
        <p className="text-center dotted-underline">{props.data.album.name}</p>
        {/* <p>{props.data.album.genres[0]}</p> */}
        <p>{joinAllArtistNames(props.data.artists)}</p>
        <p className="text-center">Song id : {" " + props.data.id}</p>
        <div className="flex flex-row justify-around">
          <span className="border-2 border-blue-500 text-center text-blue-500 rounded-xl p-[10px] mr-[5px] spotify-bold">
            {props.data.popularity}
            <br />
            <span className="font-bold">Popularity</span>
          </span>
          <span className="border-2 border-emerald-600 text-center text-emerald-600 rounded-xl p-[10px] spotify-bold">
            {convertMillisecondsToMinutesAndSeconds(props.data.duration_ms)}
            <br />
            <span className="font-bold">Duration</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SongCard;
