export const addUser = (uid, nameUser, emailUser) => firebase.firestore().collection('user').doc(uid).set({
  name: nameUser,
  email: emailUser,
  photo: 'imagenes/user-perfil.jpg',
  photoCover: 'imagenes/user-cover.jpg',
});

export const showData = uid => firebase.firestore().collection('user').doc(uid).get();

export const addPost = (uid, idPost, contentPostText, datePost) => firebase.firestore().collection('post').doc(idPost).set({
  id: idPost,
  idUser: uid,
  contentPost: contentPostText,
  date: datePost,
});

export const updateName = (uid, nameUser) => firebase.firestore().collection('user').doc(uid).update({
  name: nameUser,
});

export const updatePassword = password => firebase.auth().currentUser.updatePassword(password);

export const updatePhoto = (uid, photoURL) => firebase.firestore().collection('user').doc(uid).update({
  photo: photoURL,
});

export const updateCover = (user, photoURL) => firebase.firestore().collection('user').doc(user).update({
  photoCover: photoURL,
});

export const uploadPhotoPost = (uid, idPost, photopostURL, contentPostText, datePostUser) => firebase.firestore().collection('post').doc(idPost).set({
  id: idPost,
  idUser: uid,
  photoPost: photopostURL,
  contentPost: contentPostText,
  date: datePostUser,
});

// eslint-disable-next-line max-len
// export const uploadVideoPost = (uid, idPost, videopostURL, contentPostText, datePostUser) => firebase.firestore().collection('post').doc(idPost).set({
//   id: idPost,
//   idUser: uid,
//   videoPost: videopostURL,
//   contentPost: contentPostText,
//   date: datePostUser,
// });

export const updatePost = (idPost, contentPostText) => firebase.firestore().collection('post').doc(idPost).update({
  contentPost: contentPostText,
});

export const updatePostImg = (idPost, photoURL) => firebase.firestore().collection('post').doc(idPost).update({
  photoPost: photoURL,
});
