import { useEffect, useState, lazy, Suspense } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Loader from "../Components/LoadingComponent";
import AccessTokenFetcher from "../utilities/accessToken.js";
const TopArtists = lazy(() => import("../Components/TopArtists"));
const SavedTracks = lazy(() => import("../Components/SavedTracks"));
const UserDataComponent = lazy(() => import("../Components/UserDataComponent"));
const TopTracks = lazy(() => import("../Components/TopTracks"));

function ErrorMsg() {
  return (
    <div className="text-red-500">
      Seems like you denied permissions or there has been an issue with Spotify
    </div>
  );
}

function Callback(props) {
  const [tokenSet, setTokenSet] = useState(false);
  const spot = new SpotifyWebApi();


  useEffect(() => {
    async function fetchToken() {
      const THE_TOKEN = await AccessTokenFetcher();

      if (THE_TOKEN) {
        try {
          spot.setAccessToken(THE_TOKEN);


          props.setAppSpot(spot);
          props.setAuthToken(THE_TOKEN);

          setTokenSet(true);
        } catch (err) {
          console.log(err);
        }
        console.log(THE_TOKEN);

        console.log("Token set");
      }
    }

    fetchToken();
  }, []);

  return (
    <>
      {tokenSet === false ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <div>
            <UserDataComponent spot={spot} />
            <TopArtists spot={spot} />
            <TopTracks spot={spot} />
            <SavedTracks spot={spot} />
          </div>
        </Suspense>
      )}{" "}
    </>

  );
}

export default Callback;
