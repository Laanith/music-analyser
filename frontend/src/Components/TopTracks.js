import {lazy, useEffect, useState } from 'react';
const SongCard = lazy(() => import("../Components/SongCard"));

function TopTracks({spot}) {

    const [topTracks,setTopTracks] = useState(null);


    useEffect(()=>{
        spot.getMyTopTracks(null, (err, res)=>{
            if(err) console.log(err);
            else {
                setTopTracks(res.items);
            }
        })

    })
    return (<>{
        topTracks===null?
        (<p>Top artists</p>):
        (<div className='flex flex-row flex-wrap justify-evenly'>{
            
            topTracks.map((item,index)=>{return <SongCard data={item} key={index} />})

            }</div>)
    }</> );
}

export default TopTracks;