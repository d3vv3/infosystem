import React, { useEffect, useState } from 'react';
import axios from "axios";
import YouTube from 'react-youtube';

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
        youtubeIds = [...youtubeIds,
          {type: "image", href:"/assets/external/miercoles.jpg"},
          {type: "image", href:"/assets/external/cartel_linux.jpg"},
        ];
        youtubeIds = interleave(youtubeIds, {type: "youtube", id: "URx3Jabq77Y"})
        setVideoIds(youtubeIds);
    } catch (error) {
        console.error("Something went wrong", error);
    }
}

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
          setCurrentObject(currentObject === videoIds.length - 1 ? 0 : currentObject + 1)
        }}
      />;
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
      },
    };

  return (
      <div className="videos-container">
        {objectComponent}
      </div>
  );
}