import React, { useEffect, useState } from 'react';
import axios from "axios";
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';

const interleave = (arr, thing) => [].concat(...arr.map(n => [n, thing])).slice(0, -1)

export default function Videos() {

  const [videoIds, setVideoIds] = useState([]);
  const [currentObject, setCurrentObject] = useState(0);
  const [objectComponent, setObjectComponent] = useState(null);

  const getVideoIds = async () => {
    try {
        const response = await axios.get("/api/videos");
        let youtubeIds = response.data.map(v => {
          return {type: "youtube", id: v.youtube.id}
        });
        youtubeIds = [
          ...youtubeIds,
          {type: "image", href: "/assets/external/cartel_linux.jpg"},
          // {type: "image", href: "/assets/external/miercoles.jpg"}
        ];
        youtubeIds = interleave(youtubeIds, {type: "video", url: "assets/videos/VIDEOWALL.mp4"});
        // youtubeIds = interleave(youtubeIds, {type: "youtube", id: "URx3Jabq77Y"})
        setVideoIds(youtubeIds);
    } catch (error) {
        console.error("Something went wrong", error);
    }
}

useEffect(() => {
  if (objectComponent === null || objectComponent === undefined) {
    setCurrentObject(0);
    setObjectComponent(getNewObject());
  }
}, [objectComponent])

  const getNewObject = () => {
    if (videoIds[currentObject]?.type === "image") {
      setTimeout(() => setCurrentObject(currentObject === videoIds.length - 1 ? 0 : currentObject + 1), 15*1000);
      return <img className="cartel" src={videoIds[currentObject].href}/>;
    }
    if (videoIds[currentObject]?.type === "youtube") {
      return <YouTube
        className="youtube-video"
        videoId={videoIds[currentObject].id}
        opts={opts}
        onEnd={(e) => {
          setCurrentObject(currentObject === videoIds.length - 1 ? 0 : currentObject + 1);
        }}
        onError={(e) => {
          console.log(e);
          console.log("Should skip");
          setCurrentObject(currentObject === videoIds.length - 1 ? 0 : currentObject + 1);
        }}
      />;
    }
    if (videoIds[currentObject]?.type === "video") {
      return <ReactPlayer
        playing
        muted
        // controls
        className="custom-video"
        url={videoIds[currentObject]?.url}
        onEnded={(e) => {
          setCurrentObject(currentObject === videoIds.length - 1 ? 0 : currentObject + 1)
        }
      } />
    }
    return null;
  }

  useEffect(() => {
    setObjectComponent(getNewObject());
  }, [currentObject, videoIds]);

  useEffect(() => {
    getVideoIds();
    setInterval(() => {
        getVideoIds()
    }, 60*1000);
  }, []);

  const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        mute: 1,
        quality: "high",
        rel: "0",
        vq: "hd720"
      },
    };

  return (
      <div className="videos-container">
        {objectComponent}
      </div>
  );
}