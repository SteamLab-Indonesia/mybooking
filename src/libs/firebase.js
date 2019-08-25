import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDNyuBKDAAPZEf_jxdoaIp3Zt0CogkwwGU",
    authDomain: "queuesystem-643e1.firebaseapp.com",
    databaseURL: "https://queuesystem-643e1.firebaseio.com",
    projectId: "queuesystem-643e1",
    storageBucket: "queuesystem-643e1.appspot.com",
    messagingSenderId: "369847357287"
  };

  if(firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }

export default firebase;