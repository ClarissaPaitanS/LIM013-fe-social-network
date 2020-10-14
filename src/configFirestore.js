export const addUser = (uid, nameUser, emailUser) => firebase.firestore().collection('user').doc(uid).set({
  name: nameUser,
  email: emailUser,
  photo: 'imagenes/user-perfil.jpg',
  photoCover: 'imagenes/user-cover.jpg',
});
