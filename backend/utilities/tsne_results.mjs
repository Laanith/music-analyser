import * as sklearn from "sklearn";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import {UMAP} from 'umap-js';

async function getSeveralTracksAudioFeatures(trackIds, token) {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features/?ids=${trackIds.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data.audio_features;
    } else {
      console.error(`Failed to fetch audio features: ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching audio features:", error);
    return null;
  }
}

async function fetchSongs(song_ids, spot) {
  const chunkSize = 50;
  let songData = [];

  for (let i = 0; i < song_ids.length; i += chunkSize) {
    const chunk = song_ids.slice(i, i + chunkSize);
    const chunkData = await spot.getAudioFeaturesForTracks(chunk);
    console.log(`Fetched songs from ${i} to ${i+50}`);
    if(chunkData.statusCode==200)
      songData = songData.concat(chunkData.body.audio_features);
  }

  let X = [];

  for (let i in songData) {
    let temp = [];
    temp.push(songData[i].danceability);
    temp.push(songData[i].energy);
    temp.push(songData[i].key);
    temp.push(songData[i].loudness);
    temp.push(songData[i].mode);
    temp.push(songData[i].speechiness);
    temp.push(songData[i].acousticness);
    temp.push(songData[i].instrumentalness);
    temp.push(songData[i].liveness);
    temp.push(songData[i].valence);
    temp.push(songData[i].tempo);
    temp.push(songData[i].loudness);
    X.push(temp);
  }

  return X;
}


async function fetchArtists(artist_ids, spot){
  const chunkSize = 50;
  let artistData = [];

  for (let i = 0; i < artist_ids.length; i += chunkSize) {
    const chunk = artist_ids.slice(i, i + chunkSize);
    const chunkData = await spot.getArtists(chunk);
    console.log(`Fetched artists from ${i} to ${i+50}`);
    if(chunkData.statusCode==200)
      artistData = artistData.concat(chunkData.body.artists);
  }

  return artistData;
}

async function analyseSongs(data_body) {

  const spot = new SpotifyWebApi();
  spot.setAccessToken(data_body["token"]);

  const songs = data_body['songs'].slice(0,50);
  const song_ids = data_body["songs"].slice(0,50).map(track=>track.id);
  const artist_ids = data_body["songs"].slice(0,50).map(track=>track.artists[0].id)
  const song_data = await fetchSongs(song_ids, spot);
  const artist_data = await fetchArtists(artist_ids, spot);
  console.log('Total song IDs : ', song_data.length);
  console.log('----------------------------------');
  console.log('Total Artists : ', artist_data.length);
  console.log('----------------------------------');
  console.log('Total Songs : ', songs.length);


  const umap = new UMAP({
    nNeighbors : songs.length-1,
    nEpochs : 20
  });
  console.log('----------------------------------');
  console.log('Starting fitting');
  const x = umap.fit(song_data);
  console.log('----------------------------------');

  console.log('Ending fitting');
  console.log('----------------------------------');



  let post_processed = [];
  var xMin = Number.MAX_VALUE,
    xMax = Number.MIN_VALUE,
    yMin = Number.MAX_VALUE,
    yMax = Number.MIN_VALUE;

  for (let i in x) {
    let temp = {};

    // console.log(songs[i]);
    // console.log(artist_data[i]);
    // console.log('----------------------------------');
    temp = {...songs[i]};
    temp['genres'] = [];

    if(artist_data[i].genres.length){
      temp['artist_genres'] = artist_data[i]['genres'];
    }
    else temp['artist_genres'] = [];

    temp['xy'] = x[i];
    if (x[i][0] > xMax) xMax = x[i][0];
    if (x[i][0] < xMin) xMin = x[i][0];
    if (x[i][1] > yMax) yMax = x[i][1];
    if (x[i][1] < yMin) yMin = x[i][1];

    // console.log(temp);
    post_processed.push(temp);

  }

  console.log("xMax : ", xMax);
  console.log("xMin : ", xMin);
  console.log("yMax : ", yMax);
  console.log("yMin : ", yMin);

  let temp_json = {};
  temp_json["xMax"] = xMax;
  temp_json["xMin"] = xMin;
  temp_json["yMax"] = yMax;
  temp_json["yMin"] = yMin;
  temp_json["items"] = post_processed;
  return temp_json;
}

export default {
  analyseSongs,
};
