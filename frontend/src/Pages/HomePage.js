import { useEffect } from "react";


const client_id = "cb3029b18fde456c9874684adf6af7e8";
const redirect_uri = "http://localhost:3000/callback";

function HomePage() {

  const handleClick = () => {
        const params = new URLSearchParams({
          client_id: client_id,
          scope:
            "user-read-private user-read-email user-top-read user-read-currently-playing user-library-read",
          redirect_uri: redirect_uri,
          response_type: "code",
        });

        const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

        window.location.href = authUrl;
  }

  return <div>Home
    <br></br>
    <button className="m-[60px]"
      onClick={handleClick}
    >Click me</button>
  </div>;
}

export default HomePage;
