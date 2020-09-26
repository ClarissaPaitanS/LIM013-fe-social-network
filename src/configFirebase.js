const firebaseConfig = {
  apiKey: 'AIzaSyBjYDLI01FdoVMRqOpCyMXoSn1k0FdthKM',
  authDomain: 'red-social-c4cc8.firebaseapp.com',
  databaseURL: 'https://red-social-c4cc8.firebaseio.com',
  projectId: 'red-social-c4cc8',
  storageBucket: 'red-social-c4cc8.appspot.com',
  messagingSenderId: '1098463923360',
  appId: '1:1098463923360:web:166c9409f028efa686cdc5',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const storage = firebase.storage();
// export const store = firebase.store();
export const auth = firebase.auth();
//export const store = firebase.store();
