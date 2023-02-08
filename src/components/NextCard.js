import Image from 'next/image';
import Marquee from "react-fast-marquee";

export default function NextCard({event}) {
    return (
        <div className="next-card-container">
            <div className="content">
                <div className="image">
                    <Image
                        src={event?.logo ?? "https://satelec.etsit.upm.es/wp-content/uploads/2020/02/LogoSatelecCortopng.png"}
                        alt="Picture of the company"
                        style={{"objectFit": "contain"}}
                        width={50}
                        height={50}
                    />
                </div>
                <div className="info">
                    <div className="header">
                        {
                            ((event?.company ?? "").length > 18) ?
                            <Marquee className="company scrollable" gradientColor={"#ffff"}>
                                <span style={{marginRight: 12}}>{event?.company ?? ""}</span></Marquee>
                            : <span className="company">{event?.company ?? ""} {" "}</span>
                        }
                        
                        <span className="hours">{event?.time ?? ""}</span>
                    </div>
                        {
                            ((event?.title?.replace(".", "") ?? "").length > 30) ?
                            <Marquee className="next-talk-title scrollable" gradientColor={"#ffff"}>
                                <span style={{marginRight: 12}}>{(event?.title?.replace(".", "") ?? "")}</span>
                            </Marquee>
                            : <div className="next-talk-title"> {event?.title?.replace(".", "") ?? ""} </div>
                        }
                </div>
            </div>

        </div>
    );
  }