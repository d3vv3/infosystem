import React, { useEffect, useState } from 'react';
import Agenda from "./Agenda";
import Videos from "./Videos";
import Banner from "./Banner";

export default function Layout() {

  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="layout">
      <div className={`left ${isFullscreen ? "fullscreen" : ""}`}>
        <Videos setIsFullscreen={setIsFullscreen} isFullscreen={isFullscreen}/>
        <Banner isFullscreen={isFullscreen}/>
      </div>
      <Agenda isFullscreen={isFullscreen}/>
    </div>
  );
}