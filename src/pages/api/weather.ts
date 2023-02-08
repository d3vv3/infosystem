// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.WEATHER_LAT}&lon=${process.env.WEATHER_LON}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;
    try {
        const response = await axios.get(url);
        res.status(200).json(response.data);
        } catch (error) {
        console.error(error);
        res.status(400)
        }
}
