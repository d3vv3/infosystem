import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faMapPin } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from 'react';

export default function CurrentCard({event}) {
    return (
        <div className="card-container">
            <div className="header">
                <span className="company">{event?.company ?? ""}</span>
                <span className="hours">{event?.time ?? ""}</span>
            </div>

            <div className="details">
                <div className="image">
                    <Image
                        src={event?.logo ?? "https://satelec.etsit.upm.es/wp-content/uploads/2020/02/LogoSatelecCortopng.png"}
                        alt={`${event?.company ?? ""} company logo`}
                        style={{"objectFit": "contain"}}
                        width={120}
                        height={120}
                    />
                </div>

                <div className="info">
                    <div className="talk-title">{event?.title ?? ""}</div>
                    <div className="speakers">
                        {console.log(event, event.speakers)}
                        {
                            (typeof event?.speakers === "string" ? [event?.speakers] : event?.speakers ?? ["Más información próximamente"]).map((s: string, index: number) => <div key={index} className="speaker">
                                <FontAwesomeIcon className="icon" icon={faPerson}/>
                                {"  "}
                                {s.split(":")[0]}{" "}
                                {
                                    (s.split(":").length > 1)
                                    ? <div className="scrollable">
                                        :{" "}
                                        <marquee className="scrollable" hspace={8} behavior="scroll" direction="left">
                                            {s.split(":")[1]}
                                        </marquee>
                                    </div>
                                    : null
                                }
                            </div>)
                        }
                    </div>
                    <div className="location"><FontAwesomeIcon className="icon" icon={faMapPin} />{"  "}{event?.location?.replace(".", "") ?? ""}</div>
                </div>
                
            </div>

        </div>
    );
  }