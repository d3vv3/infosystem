import React from 'react';

export default function Banner(props) {

  return (
      <div className={`sponsors ${props.isFullscreen ? "fullscreen" : ""}`}>
        <div className="row">
          <img className="logo-airbus" src="/assets/LOGO_AIRBUS.png" />
          {/* <img className="logo-apple" src="/assets/LOGO_APPLE.png" /> */}
          <img className="logo-axa" src="/assets/LOGO_AXA.png" />
          <img className="logo-cognizant" src="/assets/LOGO_COGNIZANT.png" />
          <img className="logo-deloitte" src="/assets/LOGO_DELOITTE.png" />
          <img className="logo-ey" src="/assets/LOGO_EY.jpg" />
          <img className="logo-mtma" src="/assets/LOGO_MTMA.jpg" />
        </div>
        <div className="row">
          <img className="logo-satelec" src="/assets/LOGO_SATELEC.png" />
          <img className="logo-escuela" src="/assets/LOGO_ESCUELA.png" />
          <img className="logo-upm" src="/assets/LOGO_UPM.png" />
        </div>
        
      </div>
  );
}