import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyCOS2E5iBuFflAhfEfJ3cxruKeyOEmEmZA',
  projectId: 'shopaholic-ecommerece',
  appId: '1:240171520477:android:2efbd1d1dc1a244857e634',
  storageBucket: 'shopaholic-ecommerece.appspot.com',
  client_id:
    '240171520477-287fhv7ib00vodni436kqvg9budvs1ig.apps.googleusercontent.com',
  databaseURL: 'com.google.firebase:firebase-bom:31.3.0',
  messagingSenderId: '240171520477',
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
