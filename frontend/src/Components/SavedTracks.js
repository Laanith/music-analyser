import { useEffect, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

function SavedTrack(props) {
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

  return (
    <li className="flex flex-row w-full p-[5px] border">
      <p className="w-[10%] mr-[5px] text-center flex flex-col">
        <span className="my-auto">{props.index + 1}</span>
      </p>
      <img
        className="w-[40px] h-[40px] aspect-square object-cover mr-[5px] align-middle self-center"
        alt="song-profile"
        src={props.data.track.album.images.length > 0 ?   props.data.track.album.images[0].url : ""}
      ></img>

      <p className="text-left align-middle w-[60%] flex flex-col">
        <span>{props.data.track.name}</span>
        <span className="text-[14px] text-[#626264]">
          {combineArtists(props.data.track.artists)}
        </span>
      </p>
      <p className="text-left align-middle flex flex-col w-full">
        <span className="my-auto">{props.data.track.album.name}</span>
      </p>
      <p className="w-[25%]  text-center flex flex-col">
        <span className="my-auto">{formatDateString(props.data.added_at)}</span>
      </p>
      <p className="w-[25%] text-center flex flex-col">
        <span className="my-auto">
          {convertMillisecondsToMinutesAndSeconds(props.data.track.duration_ms)}
        </span>
      </p>
    </li>
  );
}



function SavedTracks({spot}) {
  const [savedTracks, setSavedTracks] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {

    
    spot.getMySavedTracks({
      market : 'IN',
      limit : 50
    },
    
    (err,res)=>{
      if(err) console.log(err);
      else {
        setSavedTracks(res.items);
      }
    }


    )
    

  }, []);

  return (
    <>
    {savedTracks===null?'Fetching saved tracks' : (
      <>
      <div>
      <h1 className="p-[20px] font-semibold text-2xl">
        Your top 50 recently saved tracks
      </h1>
      <div>
        <ul className="flex flex-col w-[100vw]">
          {savedTracks === null ? (
            <></>
          ) : (
            savedTracks.map((item, index) => {
              return <SavedTrack data={item} index={index} key={index} />;
            })
          )}
        </ul>
      </div>
    </div>
    <div
          className="m-[30px] text-white bg-emerald-600 p-[40px] text-4xl spotify-bold rounded-3xl flex flex-row justify-around cursor-pointer"
          onClick={() => {
            navigate("/visualization");
          }}
        >
          <p>Time for some data visualization, isn't it ?</p>
          <span className="my-auto">
            <KeyboardDoubleArrowRightIcon
              fontSize="large"
              sx={{
                scale: "3 3",
              }}
            />
          </span>
        </div>
      </>
    )}

    </>
  );
}

export default SavedTracks;
