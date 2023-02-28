// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import moment from 'moment';

import videos from "../../assets/videos.json";

// No filters for each day, so workaround
// const stands = {
//      "28/02/2023": [
//          "63d8ff2993bd9312849ce23d", // accenture
//          "63cfce7393bd9312849c9395", // acciona
//          "63d01b5493bd9312849ca085", // coit
//          "63d904ec93bd9312849ce6ed", // airbus
//          "63cfcebf93bd9312849c93e6", // alten
//          "63d9056193bd9312849ce729", // amazon
//          "63d8ffa593bd9312849ce297", // axa
//          "63d913f393bd9312849cf3e1", // santander
//          "63be7d1693bd9312849c114b", // bosch
//          "63bd5b3693bd9312849c070b", // cognizant
//          "63d9015c93bd9312849ce453", // rtve
//          "63d11d0e93bd9312849cb04b", // CTAG
//          "63d9135f93bd9312849cf2d7", // deloitte
//          "63d15fe893bd9312849cc0f6", // DXC
//          "63d907ac93bd9312849ce8c1", // EY
//          "63ce835693bd9312849c7b6d", // Fever
//          "63bc4d4f93bd9312849bfb50", // GMV
//          "63d907ea93bd9312849ce8f9", // Gransolar
//          "63d9089493bd9312849ce9cb", // Huawei
//          "63d9094593bd9312849cea23", // Indra
//          "638df2fc93bd9312849ad59f", // IQVIA
//          "63bc0fa993bd9312849bf5ad", // Logista
//          "63d90ace93bd9312849ceaf1", // MS
//          "63d90be393bd9312849ceba1", // Mercedes
//          "63d90c1a93bd9312849cebfb", // MITMA
//          "63d90ce693bd9312849cecec", // NTT Data
//          "63d15d8d93bd9312849cbd86", // PUE
//          "63d90e2193bd9312849cede0", // PwC
//          "63a3570393bd9312849bc5bd", // Redsys
//          "638b6fa293bd9312849ad2df", // SDG Consulting
//          "63d9102e93bd9312849cef9a", // Sener
//          "63d0252a93bd9312849ca885", // Serval
//          "63d9044f93bd9312849ce651", // Techedge
//          "63d9113c93bd9312849cf0aa", // Telefonica
//          "63d9118b93bd9312849cf0f6", // Thales
//          "63bc55d093bd9312849bfeb0", // TMC
//          "63ed372b71e3f4e4bbe7d8b2", // Vantage
//      ],
//      "01/03/2023": [
//          "63d8ff2993bd9312849ce23d", // accenture
//          "63cfce7393bd9312849c9395", // acciona
//          "63d904c093bd9312849ce6b1", // aena
//          "63d904ec93bd9312849ce6ed", // airbus
//          "63c1720a93bd9312849c3a41", // akkodis
//          "63d8ffa593bd9312849ce297", // axa
//          "63be7d1693bd9312849c114b", // bosch
//          "63d9072f93bd9312849ce841", // cbre
//          "63d9011593bd9312849ce41b", // cni
//          "63bd5b3693bd9312849c070b", // cognizant
//          "63d11d0e93bd9312849cb04b", // ctag
//          "63d9135f93bd9312849cf2d7", // deloitte
//          "63bea17093bd9312849c1813", // duagon
//          "63d9023093bd9312849ce4ff", // esic
//          "63d907ac93bd9312849ce8c1", // ey
//          "63cfd56893bd9312849c946c", // future
//          "63bc4d4f93bd9312849bfb50", // gmv
//          "63d9086693bd9312849ce987", // guidewire
//          "63d9089493bd9312849ce9cb", // huawei
//          "63cec2ae93bd9312849c8501", // isdefe
//          "63d9030993bd9312849ce573", // kpmg
//          "63d90ace93bd9312849ceaf1", // ms
//          "63d912f993bd9312849cf2ad", // mazars
//          "63d90be393bd9312849ceba1", // mercedes
//          "63d90c1a93bd9312849cebfb", // mitma
//          "63d90c4793bd9312849cec58", // minsait
//          "63d90d1f93bd9312849ced34", // ntt ltd
//          "63be9b5a93bd9312849c1473", // philips
//          "63d90dd793bd9312849ced7c", // powernet
//          "63d90e2193bd9312849cede0", // pwc
//          "63d90f2c93bd9312849ceea8", // repsol
//          "63d90f8293bd9312849ceef0", // s2 grupo
//          "63be798693bd9312849c1075", // talento ephos
//          "63d9113c93bd9312849cf0aa", // telefonica
//          "63bc55d093bd9312849bfeb0", // tmc
//          "63d911bb93bd9312849cf144", // vector renewables
//          "63f8ca94887dd31f9ad217d5", // walters people
//      ],
//      "02/03/2023": [
//          "63d904c093bd9312849ce6b1", // aena
//          "63d9059393bd9312849ce765", // analysys mason
//          "63cfd4be93bd9312849c942c", // axon
//          "63d8ffe793bd9312849ce321", // bankinter
//          "63d912bd93bd9312849cf265", // bbva
//          "63d905cc93bd9312849ce79d", // bertrandt
//          "63c99c6793bd9312849c5c7e", // bnp
//          "63d9002f93bd9312849ce359", // bsci
//          "63e2182f93bd9312849ea70e", // cabify
//          "63d906d193bd9312849ce7f3", // capgemini
//          "63c1397793bd9312849c32e3", // cellnex
//          "63d9075993bd9312849ce881", // cepsa
//          "63d9011593bd9312849ce41b", // cni
//          "63c18f8593bd9312849c42eb", // dedalus
//          "63d9020393bd9312849ce4c7", // elecnor
//          "63d01c8093bd9312849ca2ff", // expleo
//          "63d9082193bd9312849ce93d", // grant thornton
//          "63d9029793bd9312849ce53b", // hensoldt
//          "63c9a01893bd9312849c5f23", // hitachi
//          "63d14a4093bd9312849cb649", // ie
//          "63c0572893bd9312849c2bd0", // ineco
//          "63cec2ae93bd9312849c8501", // isdefe
//          "63d90b0793bd9312849ceb55", // mecalux
//          "63d90c4793bd9312849cec58", // minsait
//          "63d90c8393bd9312849ceca4", // nfq
//          "63d90d1f93bd9312849ced34", // ntt ltd
//          "63d90dd793bd9312849ced7c", // powernet
//          "63d96b1193bd9312849d0fe1", // redeia
//          "63d160f393bd9312849cc131", // rwe
//          "63d90f8293bd9312849ceef0", // s2 grupo
//          "63d0075193bd9312849c99fc", // sacyr
//          "63d913b793bd9312849cf367", // simon kutcher
//          "63d910eb93bd9312849cf054", // talentoteca
//          "63d9107593bd9312849cf00c", // vass
//          "63d911bb93bd9312849cf144", // vector renewables
//          "63d9127a93bd9312849cf22d", // viewnext
//          "63d9138693bd9312849cf31f", // vodafone
//          "63d911fa93bd9312849cf17c", // vdab (work in flanders)
//      ]
//  }

// For conference days, not stand days
// export default async function handler(req, res) {
//    try {
//         const response = await axios.get(activities_url);
//         let activities = response.data.activities;
//         const today = moment();
//         // const today_string = today.format("DD/MM/YYYY");
//         // const today = moment("02-28-2023", "MM-DD-YYYY");
//         const filtered = activities.filter((a) => {
//             const activityDate = moment(a.date, "YYYY-MM-DDTHH:mm:ss.000Z");
//             let result = activityDate.date() == today.date() &&
//             activityDate.month() == today.month() &&
//             activityDate.year() == today.year() ||
//             (a?.institution?.isSponsor)
//             return result;
//         });
//         res.status(200).json(filtered.map(a => (a?.institution?.media.filter(m => m.type === "youtube") ?? [])).flat());
//    } catch (error) {
//         console.error(error);
//         res.status(400);
//    }
// }

// Get token (unused)
// const get_token = async () => {
//      // console.log(process.env.FORO_MAIL, process.env.FORO_HASH)
//      let res = await axios.post(
//           "https://foro.satelec.etsit.upm.es/api/auth/login",
//           {
//                "email": process.env.FORO_MAIL,
//                "password": process.env.FORO_HASH
//           });
//      // console.log("TOKEN", res.data.token);
//      return res.data.token; 
// }

// For stand days
export default async function handler(req, res) {
     try {
          const today = moment();
          const today_string = today.format("DD/MM/YYYY");
          const today_videos = videos[today_string];
          res.status(200).json(today_videos.flat());
     } catch (error) {
          console.error(error);
          res.status(400);
     }
  }
