// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { type } from "@testing-library/user-event/dist/type";

// function CurrentTrack(props) {

//     const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

//     useEffect(() => {
//         axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
//             headers: {
//                 Authorization : `Bearer ${props.token}`
//             }
//         })
//             .then(res => {
//                 setCurrentlyPlaying(res.data);
//             })
//             .catch(err => {
//                 console.log('Error at CurrentTrack :', err);
//         })
//     } , [props.token])


//     return (
//       <div>
//         {currentlyPlaying === null || currentlyPlaying === undefined || currentlyPlaying === "" || typeof currentlyPlaying === typeof "" ? (
//           <></>
//         ) : (
//           <div className=" bg-purple-800 text-white m-[40px]">
//             {/* <h2 className="text-3xl p-[40px] rounded-2xl">
//               Seems like you are currently playing {currentlyPlaying.item.name}{" "}
//               from {currentlyPlaying.item.album.name}
//             </h2> */}
//           </div>
//         )}
//       </div>
//     );
// }

// export default CurrentTrack;