import axios from "axios";
import { useEffect, useState } from "react";
import CurrentCard from "./CurrentCard";
import NextCard from "./NextCard";
import Status from "./Status";

import moment from 'moment';

export default function Agenda() {

    const [events, setEvents] = useState([]);
    const [tomorrow, setTomorrow] = useState([]);
    const [now, setNow] = useState(moment());

    useEffect(() => {
        getEvents();
        getNext();
        setInterval(() => {
            getEvents();
            setNow(moment());
            getNext();
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

    const getNext = async () => {
        try {
            const response = await axios.get("/api/next");
            setTomorrow(response.data);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        
    }

    return (
        <div className="agenda-container">
            <video className="background-video" autoPlay loop muted>
                <source src="/assets/gradient.webm" type="video/webm" />
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

                {
                    (
                        tomorrow.length > 0
                    )
                    ? <>
                        <p className="title">{
                        moment().add(1, "days").day() === moment(tomorrow[0].startDate, "YYYY-MM-DDTHH:mm:ss.000Z").day()
                        ? "Tomorrow"
                        : moment(tomorrow[0].startDate, "YYYY-MM-DDTHH:mm:ss.000Z").format("dddd, MMMM Do")
                        }</p>
                        {
                            tomorrow.filter(
                                a => moment(tomorrow[0].startDate, "YYYY-MM-DDTHH:mm:ss.000Z").day() === moment(a.startDate, "YYYY-MM-DDTHH:mm:ss.000Z").day() &&
                                moment(tomorrow[0].startDate, "YYYY-MM-DDTHH:mm:ss.000Z").month() === moment(a.startDate, "YYYY-MM-DDTHH:mm:ss.000Z").month()
                                ).map((e, index) => <NextCard key={index} event={e}/>)
                        }  
                    </>
                    : null
                }
            </div>
        </div>
    );
  }