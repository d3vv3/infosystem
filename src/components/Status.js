import { useEffect, useState } from "react";

import axios from 'axios';
import moment from 'moment';

export default function Status() {

    const [time, setTime] = useState("00:00");
    const [date, setDate] = useState("February 28th, 2023");
    const [temperature, setTemperature] = useState("0°C");
    const [sky, setSky] = useState("Clear");

    useEffect(() => {
        update();
        setInterval(() => {
            update();
        }, 60*1000);
    }, []);

    const update = async () => {
        setTime(moment().format("HH:mm"));
        setDate(moment().format("dddd, MMMM Do, YYYY"));
        const weather = await getWeather();
        setTemperature(`${Math.round(weather.main.temp - 273.15)}°C`);
        setSky(weather.weather[0].main);
    };

    const getWeather = async () => {
        try {
            const response = await axios.get("/api/weather");
            return response.data;
          } catch (error) {
            console.error(error);
          }
    };

    return (
        <div className="status-container">
            <div className="status">
                <span className="time">{time}</span><span className="temp">  · {temperature} · {sky}</span>
                <p className="date">{date}</p> <br />
                <span className="emoji">📌</span> {" "} <p className="location">Escuela Técnica Superior de Ingenieros de Telecomunicación</p>
            </div>
        </div>
    );
  }