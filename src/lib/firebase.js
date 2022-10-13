import { getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  var fireApp = initializeApp(firebaseConfig);
}

const db = getFirestore(fireApp);
const auth = getAuth();
const storage = getStorage(fireApp);
const provider = new GoogleAuthProvider();


export { db, auth, provider, storage };

// if (fireApp) {
//   var messaging = getMessaging(fireApp);
  
//   function requestPermission() {
//     console.log('Requesting permission...');
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');
//         getToken(messaging, {
//           vapidKey: 'BMTbD5UG6pm8NKj9G1kTotUDERKA2-nq4QIXoHfye-Ii0X4p0bBIHlmStOU7Ren_IfZ6Li_-Tw9iBl5EkmxNifA',
//         }).then((currentToken) => {
//           if (currentToken) {
//             console.log(currentToken);
//             localStorage.setItem('fcm-token', JSON.stringify(currentToken));
//           } else {
//             console.log('No registration token available. Request permission to generate one.');
//           }
//         });
//       } else {
//         console.log('no permission');
//       }
//     });
//   }

//   requestPermission();
// }