import firebase from 'firebase';

export function getAllUser(callback) {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("users").orderBy('timestamp').get().then((snapshot) => {
      console.log(snapshot.docs[0].data());
      console.log(snapshot.docs);
      let email_list = [];
      snapshot.forEach(doc => {
          email_list.push({
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            complains: doc.data().complains,
            address: doc.data().address, 
            userid: doc.data().userid,
          });
      })
      callback(email_list);
    })
      .catch((err) => {
        console.log('Error getting documents', err);
    })
};

export function getUserQueue(username) {
	return new Promise((resolve, reject) => {
    console.log(username);
		const db = firebase.firestore();
		let userData = db.collection("users").where("email", "==", username);
		userData.get().then((snapshot) => {
      console.log(snapshot);
			if(snapshot) {
        let userid = snapshot.docs[0].data().userid;
        console.log(userid);
        let queueNumber = db.collection("queue").where("user", "==",db.collection("users").doc(userid)).get().then((snapshot) => {
          resolve(snapshot.docs[0].data());
        });
			}
			else reject('empty');
		}).catch((err) => {
			reject(err);
		})
	})
}

export function getUser(username) {
  return new Promise((resolve, reject) => {
		const db = firebase.firestore();
		console.log(username);
		let userData = db.collection("users").where("email", "==", username);
		userData.get().then((snapshot) => {
			if(snapshot) {
        resolve(snapshot.docs[0].data());
			}
			else reject('empty');
		}).catch((err) => {
			reject(err);
		})
	})
}

// return new Promise((resolve,reject) => {
//   const db = firebase.firestore();
//   console.log(username);
//   let userData = db.collection("users").where("email", "==", username);
//   console.log(userData + 'hello');
//   userData.get().then((snapshot) => {
//     if(snapshot.empty)
//       resolve(null);
//     resolve({number: snapshot.docs[0].number,
//       name: snapshot.docs[0].firstname+snapshot.docs[0].lastname,
//   });
// })
// .catch((error) => {
//   reject(error);
// })  
// })