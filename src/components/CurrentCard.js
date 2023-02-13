import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faMapPin } from "@fortawesome/free-solid-svg-icons";
import Marquee from "react-fast-marquee";
import Image from 'next/image';

export default function CurrentCard({event}) {
    return (
        <div className="card-container">
            <div className="header">
                {
                    ((event?.company ?? "").length > 18) ?
                    <Marquee className="company scrollable" gradientColor={"#ffff"}>
                       <span style={{marginRight: 12}}>{event?.company ?? ""}</span></Marquee>
                    : <span className="company">{event?.company ?? ""} {" "}</span>
                }
                <span className="hours">{event?.time ?? ""}</span>
            </div>

            <div className="details">
                <div className="image">
                    <Image
                        src={event?.logo ?? "https://satelec.etsit.upm.es/wp-content/uploads/2020/02/LogoSatelecCortopng.png"}
                        alt={`${event?.company ?? ""} company logo`}
                        style={{"objectFit": "contain"}}
                        width={80}
                        height={80}
                    />
                </div>

                <div className="info">
                    {
                        ((event?.title?.replace(".", "") ?? "").length > 30) ?
                        <Marquee className="talk-title scrollable" gradientColor={"#ffff"}>
                            {event?.title?.replace(".", "") ?? "" + " "}
                        </Marquee>
                        : <div className="talk-title"> {event?.title?.replace(".", "") ?? ""} </div>
                    }
                    <div className="speakers">
                        {console.log(event, event.speakers)}
                        {
                            (typeof event?.speakers === "string" ? [event?.speakers] : event?.speakers ?? ["Más información próximamente"]).map((s, index) => <div key={index} className="speaker">
                                <FontAwesomeIcon className="icon" icon={faPerson}/>
                                {"  "}
                                {s.split(":")[0]}{" "}
                                {
                                    (s.split(":").length > 1)
                                    ? <span className="charge">
                                        :{" "} <Marquee className="scrollable" gradientColor={"#ffff"}>
                                            {" " + s.split(":")[1] + " "} {" "}
                                        </Marquee>
                                    </span>
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