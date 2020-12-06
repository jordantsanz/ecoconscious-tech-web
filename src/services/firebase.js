/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDBgFH0trwdSnwKq30Lj4H2EfDu8xCsGKU',
  authDomain: 'chrome-duke.firebaseapp.com',
  projectId: 'chrome-duke',
  storageBucket: 'chrome-duke.appspot.com',
  messagingSenderId: '919440526614',
  appId: '1:919440526614:web:2d21458b94ff325b951437',
});

const db = firebaseApp.firestore();

// get all websites
export function getAllWebsites() {
  db.collection('website').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  });
}
// get all websites for one user
export function getAllWebsitesByUser(username, cb, cbb, cbbb) {
  console.log(username);
  db.collection('users').doc(username).get().then((doc) => {
    if (doc.exists) {
      const webArray = doc.data().websites.map((webRef) => {
        // console.log(webRef);
        return db.doc(`website/${webRef}`).get().then((res) => {
          return res.data();
        });
      });
      cb(webArray);
    } else {
      return [];
    }
  });
}

export default db;
