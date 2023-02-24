import React from 'react';

import Countdown from 'react-countdown';


export default function Timer() {

  return (
    <div className="timer">
      <Countdown
        date={new Date("2023-02-28T10:00:00.000Z")}
        renderer={props => <div>{props.days}d {props.hours}h {props.minutes}m {props.seconds}s</div>}
      >
          <p className="text">Feliz foro!</p>
      </Countdown>
    </div>
  );
}