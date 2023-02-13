// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import moment from 'moment';
import { parse } from 'node-html-parser';

const ponentes = /Ponentes*:\s*<\/strong>\s*(.*?)<\/p>/
const url = "https://foro.satelec.etsit.upm.es/api/activity/future"

export default async function handler(req, res) {
   try {
        const response = await axios.get(url);
        let activities = response.data.activities;
        const today = moment();
        // const today = moment("02-28-2023", "MM-DD-YYYY");
        const filtered = activities.filter((a) => {
            const activityDate = moment(a.date, "YYYY-MM-DDTHH:mm:ss.000Z");
            let result = activityDate.date() == today.date() &&
            activityDate.month() == today.month() &&
            activityDate.year() == today.year()
            return result;
        });
        res.status(200).json(filtered.map(a => (a?.institution?.media ?? [])).flat());
   } catch (error) {
        console.error(error);
        res.status(400);
   }
}
