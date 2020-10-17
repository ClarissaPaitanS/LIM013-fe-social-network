/* eslint-disable no-param-reassign */
import { showData, addPost } from '../configFirestore.js';


export const showDataProfile = (profileName, photoUser, photoCover) => {
  const user = firebase.auth().currentUser.uid;
  showData(user).then((doc) => {
    if (doc.exists) {
      const nameUserProfile = doc.data().name;
      const photoUserProfile = doc.data().photo;
      console.log(photoUserProfile);
      const coverUserProfile = doc.data().photoCover;
      profileName.innerHTML = `${nameUserProfile}`;
      photoUser.innerHTML = `<img  src='${photoUserProfile}'>`;
      photoCover.innerHTML = `<img  src='${coverUserProfile}'>`;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};

export const addPostProfile = (contentPost) => {
  const user = firebase.auth().currentUser.uid;
  // const {uid , name} =  firebase.auth().currentUser; si se desear llamar  solo se coloca uid
  // const firestore = firebase.firestore();
  const idPost = user + Math.floor(Math.random() * 10000);
  // const docRef = firestore.collection('post').doc(idPost);
  const datePost = new Date();
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dateMonth = datePost.getMonth();
  const dateYear = datePost.getFullYear();
  const dateDay = datePost.getDate();
  const dateHours = datePost.getHours();
  const dateMinutes = datePost.getMinutes();

  const datePostUser = `${dateDay} de ${months[dateMonth]} del ${dateYear} a las ${dateHours}:${dateMinutes}`;

  const contentPostText = contentPost;
  addPost(user, idPost, contentPostText, datePostUser).then(() => {
    console.log('Post exitoso');
  }).catch((error) => {
    console.log('Error:', error);
  });
};
