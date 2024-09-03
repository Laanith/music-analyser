import { useEffect, useState } from "react";
import axios, { all } from "axios";
import DeethreeNames from "../Components/deethree";
import Deethree from "../Components/deethreenames";
import Loader from "../Components/LoadingComponent";

export default function Visualizer({ spot, authToken }) {
  const [SavedTracks, setSavedTracks] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchAllSavedTracks = async () => {
      let allTracks = [];
      let index = 0;
      let fetchMore = true;

      while (fetchMore) {
        try {
          const res = await spot.getMySavedTracks({
            offset: index * 50,
            limit: 50,
          });

          if (res.items && res.items.length > 0) {
            allTracks = allTracks.concat(res.items);
            index++;
            fetchMore = res.next !== null;
          } else {
            fetchMore = false;
          }
        } catch (err) {
          console.log(err);
          fetchMore = false;
        }
      }

      return allTracks;
    };

    const sendDataToServer = (songs, token) => {
      const tracks = songs.map((item) => item.track);

      const data = {
        songs: tracks,
        endRequest: true,
        token: token,
      };

      axios
        .post("http://localhost:8000", data)
        .then((res) => {
          console.log("response from server", res.data);
          setResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleFetchAndSend = async () => {
      const allTracks = await fetchAllSavedTracks();
      setSavedTracks(allTracks); 
      console.log(allTracks);
      sendDataToServer(allTracks, authToken);
    };

    handleFetchAndSend();
  }, [authToken, spot]);

  return (
    <div>
      <div className="">
        {result ? <DeethreeNames result={result} spot={spot} /> : <Loader />}
      </div>
    </div>
  );
}
