import React, { useEffect, useState } from 'react';
import axios from "axios";
import YouTube from 'react-youtube';

export default function Videos() {

  const [videoIds, setVideoIds] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoComponent, setVideoComponent] = useState(null);

  const getVideoIds = async () => {
    try {
        const response = await axios.get("/api/videos");
        let youtubeIds = response.data.map(v => v.youtube.id)
        setVideoIds(youtubeIds);
    } catch (error) {
        console.error("Something went wrong", error);
    }
}

  const getNewVideo = () => {
    return <YouTube
      className="youtube-video"
      videoId={videoIds[currentVideo]}
      opts={opts}
      onEnd={(e) => {
        setCurrentVideo(currentVideo === videoIds.length - 1 ? 0 : currentVideo + 1)
      }}
    />;
  }

  useEffect(() => {
    setVideoComponent(getNewVideo());
  }, [currentVideo, videoIds]);

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
        {videoComponent}
      </div>
  );
}