import { useEffect,useState } from "react";
import axios from 'axios';
import Loader from "./LoadingComponent";



function ArtistCard(props) {
  const [topTrack, setTopTrack] = useState(null);
  const [hover, setHover] = useState(true);

  useEffect(() => {

    function fetchData(){
      axios.get(`https://api.spotify.com/v1/artists/${props.data.id}/top-tracks?market=IN`, {
        headers: {
          Authorization : `Bearer ${props.token}`
        }
      })
        .then(res => {
          setTopTrack(res.data);
        })
        .catch(err => { console.error("Error in fetching data for artist top tracks", err) })
      
    }

    // fetchData();



  }, [props]);


  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
  

      function combineGenres(genreArray) {
        let x = "";
        if (genreArray.length === 0) {
          return x;
        }
        else if (genreArray.length === 1) {
          return capitalizeWords(genreArray[0]);
        }
        return capitalizeWords(genreArray[0] + ", " + genreArray[1]);
      }



    return (
      <div
        className={`flex flex-col justify-center align-middle m-[10px] ${hover ? 'scale-[1.1]' : ''} transition-all duration-150`}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseOut={() => {
          setHover(false);
        }}
      >
        {/* {hover && ( */}
        {/* <div
            className={`mb-[-10px] flex flex-row -z-50 border-2 border-gray-400 shadow-xl hover:shadow-slate-500 transition-all duration-500 w-max`}
          >
            {topTrack === null ? (
              <></>
            ) : (
              <>
                <img
                  alt="top-track-img"
                  src={topTrack.tracks[0].album.images[0].url}
                  className="w-[64px] aspect-square h-[64px] border-2 border-gray-400"
                ></img>
                <p className="text-center p-[20px]">
                  {topTrack.tracks[0].name}
                </p>
              </>
            )}
          </div> */}
        {/* )} */}
        <div
          className={`w-[15vw] m-[20px] mx-[20px] p-[10px] rounded-[5px] border-2 border-gray-400 shadow-xl hover:shadow-slate-500 transition-all duration-500 z-50`}
        >
          <img
            alt="artist-profile"
            className="aspect-square object-cover rounded-full p-[20px]"
            src={props.data.images[0].url}
          ></img>
          <p className="spotify-bold mt-[10px] text-center">
            {props.data.name}
          </p>
          <p className="text-center text-wrap text-[#626264]">
            {combineGenres(props.data.genres)}
          </p>
        </div>
      </div>
    );
}

function TopArtists({spot}) {
    const [topArtists, setTopArtists] = useState(null);
    
    useEffect(() => {

      spot.getMyTopArtists(null, (err,res)=>{
        if(err) console.log(err);
        else {
          // setTopArtists(res);
          setTopArtists(res.items);
        }
      })

    }, [])

    
    
    return (<div id="top-artist-container" className="grid grid-flow-col overflow-y-hidden overflow-x-auto">
        {topArtists === null ? <></> : 
            (
                topArtists.map((item,index)=> {return <ArtistCard data={item} spot={spot} key={index} />})
            )
        }
    </div> );
}

export default TopArtists
;