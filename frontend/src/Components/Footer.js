function Footer() {
  return (
    <div className="bg-black text-white w-full block h-[200px] flex flex-col justify-around">
      <div className="flex flex-row ">
    <div className="spotify-bold text-4xl m-10 border-white border-r-2 w-fit pr-[30px]">Spotviz</div>
      <div className="align-center my-auto"> Data by <strong>Spotify API</strong></div> 
      <div className="m-auto">Scatterplot determined through <strong>TSNE </strong>(a machine learning algorithm)</div>
      </div>
    <div className="text-md text-center">Everything &copy; Laanith Dhruvarjun Chouhan</div>
  </div>
  );
}

export default Footer;
