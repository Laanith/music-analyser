import { useEffect, useState } from "react";
import spotifylogo from "../assets/images/pngegg.png";
import { TypeAnimation } from "react-type-animation";

function Loader(props) {

    const [height,setHeight] = useState("h-[100vh]");
    const [width,setWidth] = useState("w-[100vw]");

    useEffect(()=>{
        if(props.height){
            setHeight(props.height);
        }
        if(props.width){
            setWidth(props.width);
        }
    }, [props])


  return (
    <div className={`${height} ${width} flex flex-col  justify-center`}>
      <div className="flex mx-auto my-auto flex-col">
        <div
          id="spinner"
          className="mx-auto border-4 border-gray-300 w-[70px] h-[70px] rounded-full border-t-teal-700 flex bg-black"
        >
          <img
            src={spotifylogo}
            alt="spotify"
            className="w-[50px] h-[50px] mx-auto my-auto block "
          ></img>
        </div>
        <p className="mt-8">
          <span className="invisible">S</span>
        <TypeAnimation
                  sequence={[
                    "Fetching your tunes...",
                    500,
                    "Cooking up your playlist...",
                    500,
                    "Sprinkling musical magic...",
                    500,
                    "Tuning into your vibes...",
                    500,
                    "Grooving to the beat...",
                    500,
                    "Syncing your favorites...",
                    500,
                    "Composing your soundtrack...",
                    500,
                    "Harmonizing your playlists...",
                    500,
                    "Mixing your tracks...",
                    500,
                    "Unleashing the melody...",
                    500,
                    "Setting the tempo...",
                    500,
                    "Warming up the speakers...",
                    500,
                  ]}
                  speed={75}
                  deletionSpeed={75}
                  cursor={false}
                  repeat={Infinity}
                />
        </p>
      </div>
    </div>
  );
}

export default Loader;
