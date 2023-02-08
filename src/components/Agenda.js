import axios from "axios";
import { useEffect, useState } from "react";
import CurrentCard from "./CurrentCard";
import NextCard from "./NextCard";
import Status from "./Status";

import moment from 'moment';

export default function Agenda() {

    const [events, setEvents] = useState([]);
    const now = moment("02-28-2023 11:00", "MM-DD-YYYY HH:mm");

    useEffect(() => {
        getEvents();
        setInterval(() => {
            getEvents()
        }, 60*1000);
    }, []);

    const getEvents = async () => {
        try {
            const response = await axios.get("/api/events");
            setEvents(response.data);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        
        
    }

    return (
        <div className="agenda-container">
            <video className="background-video" autoPlay loop muted>
                <source src="/assets/gradient.mp4" type="video/mp4" />
            </video>
            <div className="agenda">
                <Status />
                { 
                (
                    events.length > 0 &&
                    events.some((e) => now <= moment(e?.endDate, "YYYY-MM-DDTHH:mm:ss.000Z") && now > moment(e?.startDate, "YYYY-MM-DDTHH:mm:ss.000Z"))
                )
                    ? <>
                        <p className="title">Happening now</p>
                        {
                            events.filter(
                                e => now <= moment(e?.endDate, "YYYY-MM-DDTHH:mm:ss.000Z") && now > moment(e?.startDate, "YYYY-MM-DDTHH:mm:ss.000Z")
                                ).map((e, index) => <CurrentCard key={index} event={e}/>)
                        }
                    </>  
                    : null
                }
                
                <br />
                {
                    (
                        events.length > 0 &&
                        events.some((e) => now <= moment(e?.startDate, "YYYY-MM-DDTHH:mm:ss.000Z"))
                    )
                    ? <>
                        <p className="title">Up next</p>
                        {
                            events.filter(
                                e => now <= moment(e?.startDate, "YYYY-MM-DDTHH:mm:ss.000Z")
                                ).map((e, index) => <NextCard key={index} event={e}/>)
                        }  
                    </>
                    : null
                }
            </div>
        </div>
    );
  }