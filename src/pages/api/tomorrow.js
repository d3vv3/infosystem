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
        const tomorrow = moment().add(1,'days');
        // const tomorrow = moment("02-28-2023", "MM-DD-YYYY");
        const filtered = activities.filter((a) => {
            const activityDate = moment(a.date, "YYYY-MM-DDTHH:mm:ss.000Z");
            let result = activityDate.date() == tomorrow.date() &&
            activityDate.month() == tomorrow.month() &&
            activityDate.year() == tomorrow.year()
            return result;
        });
        res.status(200).json(filtered.map(a => {
          return {
               company: a.institution.name,
               title: a.title,
               time: `${moment(a.date).format("HH:mm")}-${moment(a.endDate).format("HH:mm")}`,
               startDate: a.date,
               endDate: a.endDate,
               location: a.location,
               speakers: parse(a.description?.long)?.querySelector('ul')?.childNodes?.map(i => i.text) ?? "Más información próximamente",
               logo: `https://foro.satelec.etsit.upm.es/api/file/${a.institution.logo.main}`
          }
        }));
   } catch (error) {
        console.error(error);
        res.status(400);
   }
}
