import Image from 'next/image';

export default function NextCard({event}) {
    return (
        <div className="next-card-container">
            <div className="content">
                <div className="image">
                    <Image
                        src={event?.logo ?? "https://satelec.etsit.upm.es/wp-content/uploads/2020/02/LogoSatelecCortopng.png"}
                        alt="Picture of the company"
                        style={{"objectFit": "contain"}}
                        width={80}
                        height={80}
                    />
                </div>
                <div className="info">
                    <div className="header">
                        <span className="company">{event?.company ?? ""}</span>
                        <span className="hours">{event?.time ?? ""}</span>
                    </div>
                    <div className="next-talk-title">
                        {event?.title?.replace(".", "") ?? ""}
                    </div>
                </div>
            </div>

        </div>
    );
  }