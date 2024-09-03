import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import Loader from "./LoadingComponent";

function UserDataComponent({ spot }) {
  const [randomHello, setRandomHello] = useState("Hi !");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    spot.getMe(null, (err, res) => {
      if (err) console.log(err);
      else {
        console.log(res);
        setUserData(res);
      }
    });
  }, []);

  useEffect(() => {
    const greetings = [
      "Hello",
      "Hola",
      "Bonjour",
      "Hallo",
      "Ciao",
      "こんにちは",
      "Привет",
      "你好",
      "مرحبا",
      "नमस्ते",
    ];

    function getRandomHello() {
      const randomIndex = Math.floor(Math.random() * greetings.length);
      return greetings[randomIndex];
    }

    setRandomHello(getRandomHello() + " !");
  }, []);

  return (
    <>
      {userData === null ? (
        <Loader />
      ) : (
        <div className="flex flex-row justify-around m-[40px] p-[30px] rounded-2xl border-2 border-gray-500">
          <div className="justify-center">
            <img
              src={userData.images.length>0 ? userData.images[1].url : ""}
              alt="profile"
              className="w-[150px] lg:w-[300px]"
            ></img>
          </div>
          <div id="user-details" className="flex flex-col justify-around">
            <div className="flex flex-row name text-4xl font-bold">
              <span className="inline mr-[10px]" id="namespan">
                <TypeAnimation
                  sequence={[
                    "Hello !",
                    1000,
                    "Hola !",
                    1000,
                    "Bonjour !",
                    1000,
                    "Hallo !",
                    1000,
                    "Ciao !",
                    1000,
                    "こんにちは !",
                    1000,
                    "Привет !",
                    1000,
                    "你好 !",
                    1000,
                    "! مرحبا",
                    1000,
                    "नमस्ते !",
                    1000,
                  ]}
                  speed={50}
                  cursor={false}
                  repeat={Infinity}
                />
              </span>
              {userData.display_name}
            </div>
            <dl>
              <span>
                <dt>Email :</dt>
                <dd>{userData.email}</dd>
              </span>
              <span>
                <dt>Spotify URI :</dt>
                <dd>{userData.uri}</dd>
              </span>{" "}
              <span>
                <dt>Link to profile :</dt>
                <dd>
                  {" "}
                  <a
                    className=" text-blue-600"
                    href={userData.external_urls.spotify}
                  >
                    {userData.external_urls.spotify}
                  </a>
                </dd>
              </span>{" "}
              <span>
                <dt>Country code :</dt>
                <dl>{userData.country}</dl>
              </span>{" "}
              <span>
                <dt>User type :</dt>
                <dl>{userData.product}</dl>
              </span>
              <span>
                <dt>Followers count :</dt>
                <dl>{userData.followers.total}</dl>
              </span>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDataComponent;
