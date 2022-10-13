// import { getTutorToken } from '../utils/db';
// // import { messaging } from './firebase';
// import axios from 'axios';

// export const testMessage = async () => {
//   var notification_title = {
//     title: 'Student need your help',
//     text: 'A student has question, maybe you can help',
//   };

//   var tokens = await getTutorToken();
//   console.log(tokens.sets);

//   var notification_body = {
//     notification: notification_title,
//     registration_ids: tokens,
//   };

//   var headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'key=BMTbD5UG6pm8NKj9G1kTotUDERKA2-nq4QIXoHfye-Ii0X4p0bBIHlmStOU7Ren_IfZ6Li_-Tw9iBl5EkmxNifA'
//   }

//   axios.post('https://fcm.googleapis.com/fcm/send', notification_body, headers ).then((res) => {
//     console.log(res)
//   }).catch((err) => {
//     console.log(err)
//   })

// };
