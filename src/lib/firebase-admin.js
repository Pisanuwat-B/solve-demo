// import * as admin from 'firebase-admin';

// console.log(admin)

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     }),
//   });
// }

// import { getTutorToken } from '../utils/db';
// // import { messaging } from './firebase';
// import { getMessaging } from "firebase/messaging";

// export const testMessage = async () => {
//   console.log('test messaging');

//   var tokens = await getTutorToken()
//   console.log(tokens.sets);

//   getMessaging().subscribeToTopic(tokens.sets, 'tutor')
//   .then((response) => {
//     console.log('Successfully subscribed to topic:', response);
//   })
//   .catch((error) => {
//     console.log('Error subscribing to topic:', error);
//   });
// };
