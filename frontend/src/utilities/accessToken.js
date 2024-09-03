import axios from "axios";

const client_id = "cb3029b18fde456c9874684adf6af7e8";
const redirect_uri = "http://localhost:3000/callback";
const client_secret = "1d5e846ddbde4f84bba863d56e9469e2";

async function AccessTokenFetcher() {
  let TOKEN;

  const queryparams = new URLSearchParams(window.location.search);
  if (queryparams.has("code")) {
    const receivedCode = queryparams.get("code");
    const tokenBody = new URLSearchParams();
    tokenBody.append("grant_type", "authorization_code");
    tokenBody.append("code", receivedCode);
    tokenBody.append("redirect_uri", redirect_uri);

    try {
      const tokenResponse = await axios.post(
        "https://accounts.spotify.com/api/token",
        tokenBody.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
          },
        }
      );

      if (tokenResponse.status === 200) {
        TOKEN = tokenResponse.data["access_token"];
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      } else {
        TOKEN = null;
      }
    } catch (err) {
      console.log("error in accessToken.js", err);
    }
  }

  return TOKEN;
}

export default AccessTokenFetcher;
