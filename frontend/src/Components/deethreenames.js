import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { layoutTextLabel, layoutRemoveOverlaps } from "@d3fc/d3fc-label-layout";
import utils from "../utilities/utilities";

function Deethree({ result }) {
  const svgRef = useRef(null);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    function generateRandomColor() {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      return `rgb(${red}, ${green}, ${blue})`;
    }

    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      
      // Get viewport dimensions

      // const viewportWidth = window.innerWidth;
      // const viewportHeight = window.innerHeight;

      const viewportWidth = 2000;
      const viewportHeight = 2000;


      const x = d3.scaleLinear([result.xMin, result.xMax], [200, viewportWidth-200]);
      const y = d3.scaleLinear([result.yMin, result.yMax], [200, viewportHeight-200]);


      // Set the SVG dimensions
      svg.attr("width", viewportWidth)
         .attr("height", viewportHeight);

      svg.selectAll("text")
        .data(result.items)
        .join("text")
        .attr("x", d => x(d.xy[0]))
        .attr("y", d => y(d.xy[1]))
        .text(d => d.name)
        .style("fill", () => generateRandomColor())
        .style("font-size", d => `${Math.sqrt(d.popularity) + 10}px`)
        .on("mouseenter", (event, d) => {
          console.log('Song Data', d);
          setSongData(d);
        })
        .on("mouseleave", () => {
          // handle mouseleave
        });
    }
  }, [result]); // Ensure useEffect runs when 'result' changes

  return (
    <div className="overflow-x-scroll relative">
      {result ? (
        <svg className="bg-gray-800" ref={svgRef}></svg>
      ) : (
        <div className="text-red-300">Something is wrong</div>
      )}
    </div>
  );
}

export default Deethree;

function HoverRenderer({ data }) {
  return <div className="absolute bottom-0 left-0 w-[150px] h-[100px] bg-green-400 z-50 m-4"></div>;
}
