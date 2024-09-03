import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { layoutTextLabel, layoutRemoveOverlaps } from "@d3fc/d3fc-label-layout";
import utils from "../utilities/utilities";
import { layoutAnnealing, layoutGreedy, layoutLabel } from "d3fc";
import Draggable from "react-draggable";
import Loader from "./LoadingComponent";
import Footer from "./Footer";

function DeeThreeNames({ result, spot }) {
  const svgRef = useRef(null);
  const [songData, setSongData] = useState(null);
  const [bgColor, setBgColor] = useState(null);
  const clickedText = useRef(null);

  useEffect(() => {
    function generateRandomColor() {
      let offset = 45;
      const red = offset + Math.floor(Math.random() * 128);
      const green = offset + Math.floor(Math.random() * 128);
      const blue = offset + Math.floor(Math.random() * 128);
      return `rgb(${red}, ${green}, ${blue})`;
    }

    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Get viewport dimensions

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // const viewportWidth = 10000;
      // const viewportHeight = 10000;
      const marginX = 350;
      const marginY = 150;

      const x = d3.scaleLinear(
        [result.xMin, result.xMax],
        [marginX, viewportWidth - marginX]
      );
      const y = d3.scaleLinear(
        [result.yMin, result.yMax],
        [marginY, viewportHeight - marginY]
      );

      // Set the SVG dimensions
      svg.attr("width", viewportWidth).attr("height", viewportHeight);

      const labelPadding = 2;
      const textLabel = layoutTextLabel()
        .padding(labelPadding)
        .value((d) => {
          return d.name;
        });

      const strategy = layoutRemoveOverlaps();

      const labels = layoutLabel(strategy)
        .size((d, i, g) => {
          const tempText = svg
            .append("text")
            .style("font-size", `${Math.sqrt(d.popularity) + 3}px`)
            .text(d.name);

          const textSize = tempText.node().getBBox();
          tempText.remove();

          return [
            textSize.width + labelPadding * 2,
            textSize.height + labelPadding * 2,
          ];
        })
        .position((d) => {
          return [x(d["xy"][0]), y(d["xy"][1])];
        })
        .component(textLabel);

      svg.datum(result.items).call(labels);

      svg
        .selectAll("text")
        .style("fill", () => generateRandomColor())
        .style("font-size", (d) => `${Math.sqrt(d.popularity) + 3}px`)
        .style("background", "transparent")
        .attr("tab-index", (d,i,g)=>i)
        .on("click", (event, d) => {
          setSongData(d);
          const fill = d3.select(event.target).style("fill");
          setBgColor(fill);

          const songCard = document.getElementById("song-card");
          const rect = event.target.getBoundingClientRect();
          event.target.focus();
          console.log(rect);
          songCard.style.position = "fixed";
          songCard.style.bottom = "0";
          songCard.style.left = `${rect.left}px`;

          // Remove underline from the previously underlined element
          if (clickedText.current) {
            d3.select(clickedText.current).attr("text-decoration", "none");
          }

          // Underline the clicked element
          d3.select(event.target).attr("text-decoration", "underline");

          // Update the reference to the current underlined element
          clickedText.current = event.target;

        })
        .on("mouseleave", () => {
          // const songCard = document.getElementById('song-card');
          // songCard.style.display = 'none';
        });
    }
  }, [result]);

  return (
    <div className="overflow-x-scroll">
      {result ? (
        <svg className="bg-white overflow-x-scroll" id="scatterCanvas" ref={svgRef} overflow={"scroll"}>
        </svg>
      ) : (
        <div className="text-red-300">Something is wrong</div>
      )}
      {songData ? (
        <HoverRenderer data={songData} bgColor={bgColor} spot={spot} />
      ) : (
        <div id="song-card"></div>
      )}
      <Footer />
    </div>
  );
}

export default DeeThreeNames;

function HoverRenderer({ data, bgColor, spot }) {
  const [recommendations, setRecommendations] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    const options = {
      seed_tracks: [data.id],
      seed_artists: data.artists.map((artist) => artist.id),
      seed_genres: data.artist_genres.length !== 0 ? [] : data.artist_genres[0],
      limit: 4,
    };

    spot.getRecommendations(options).then(
      function (data) {
        setRecommendations(data.tracks);
      },
      function (err) {
        console.error(err);
      }
    );
  }, [spot, data]);

  // useEffect(() => {
  //   if (showRecommendations) {
  //     const recommendationsDiv = document.getElementById('recommendations-container');
  //     recommendationsDiv.style.position = 'fixed';
  //     recommendationsDiv.style.bottom = '0';
  //     recommendationsDiv.style.left = '450px';
  //   }
  // }, [showRecommendations]);

  return (
    <Draggable>
      <div className="flex flex-row" id="song-card">
        <div className="bottom-0 left-0 w-[400px] h-[250px] z-50 m-[40px] flex flex-col">
          <div className="bg-white h-full rounded-t-3xl p-[20px] flex flex-row border-2 border-gray-400 border-b-0">
            <div className="flex flex-col px-8 h-fit mb-auto">
              <span className="text-xl font-bold">{data.name}</span>
              <span>
                <span className="spotify-bold">Album :</span>
                {" " + data.album.name.length < 50 ? data.album.name : data.album.name.slice(25)+"..."}
              </span>
              <span>
                <span className="spotify-bold">Artists :</span>
                {" " + utils.combineArtists(data.artists)}
              </span>
              <span>
                <span className="spotify-bold">Genres :</span>
                {" " +
                  (data.genres.length === 0
                    ? data.artist_genres.length === 0
                      ? "None"
                      : utils.combineWords(data.artist_genres)
                    : utils.combineWords(data.genres))}
              </span>
            </div>
            <img
              alt="something"
              src={data.album.images[0].url}
              className="w-[75px] h-[75px] aspect-square ml-auto border-4 border-gray-400 rounded-md"
            ></img>
          </div>
          <div
            className="mt-auto h-[60px] border-gray-400 border-2 p-[10px] rounded-b-3xl flex flex-row justify-evenly"
            style={{ background: bgColor }}
          >
            <span className="text-transparent">Bye</span>
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              Show Recommendations
            </button>
          </div>
        </div>
        <div>
          {recommendations ? (
            <div
              className={`${showRecommendations ? "show" : "dont-show"}`}
              id="recommendations-container"
            >
              {recommendations.map((track) => (
                <TrackRecommendation
                  key={track.id}
                  track={track}
                  showRecommendations={showRecommendations}
                />
              ))}
            </div>
          ) : (
            <div>No Recommendations Fetched</div>
          )}
        </div>
      </div>
    </Draggable>
  );
}

function TrackRecommendation({ key, track, showRecommendations }) {

  return (
    <div
      className={
        "h-[250px] w-[180px] bg-white m-[10px] my-0 flex flex-col text-center rounded-[10px] border-gray-400 border-2 " +
        (showRecommendations ? "show-card" : "dont-show-card")
      }
    >
      <div className="my-auto flex flex-col">
        <span className="spotify-bold">
          {track.name.length < 50
            ? track.name
            : track.name.slice(0, 25) + "..."}
        </span>
        <span className="text-gray-600">
          {utils.combineArtists(track.artists.slice(0, 1))}
        </span>
        <img
          alt="album-preview"
          className="aspect-square w-[100px] h-[100px] border-4 border-gray-400 my-auto mx-auto rounded-xl"
          src={track.album.images[0].url}
        ></img>
        <span className="text-emerald-600 mt-[10px]">
          <strong>Popularity :{" " + track.popularity}</strong>
        </span>
        <span className="text-gray-600">
          <strong>Duration :</strong>
          {" " +
            utils.convertMillisecondsToMinutesAndSeconds(track.duration_ms)}
        </span>
      </div>
    </div>
  );
}
