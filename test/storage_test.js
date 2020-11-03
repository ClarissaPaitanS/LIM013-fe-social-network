/* eslint-disable max-len */
// /* eslint-disable max-len */
// import { filePhotoUser } from '../src/configStorage';

// const firebasemock = require('firebase-mock');

// const mockstorage = new firebasemock.MockStorage();

// global.firebase = firebasemock.MockFirebaseSdk(
//   // use null if your code does not use RTDB
//   () => null,
//   () => mockstorage,
// );


// // const photo = {
// //   filePhoto : '../imagenes/user-profile.jpg',
// // }
// // eslint-disable-next-line jest/no-disabled-tests
// describe('filePhotoUser', () => {
//   it('debería ser una funcion', () => {
//     expect(typeof filePhotoUser).toBe('function');
//   });

//   // it('Debería poder cambiar la imagen', (done) => {
//   //   filePhotoUser('../imagenes/user-profile.jpg')
//   //     .then((photo.file) => {
//   //       console.log(filePhotoUser('../imagenes/user-perfil.jpg'));
//   //       expect(photo.name).toBe('user-profile.jpg');
//   //       done();
//   //     });
//   // });
// });

// // describe('Guardar Imagen', () => {
// //   it('Debería poder Guardar Imagen', () => {
// //     filePhotoUser('../imagenes/user-perfil.jpg').snapshot.ref.getDownloadURL().then((downloadURL) => {
// //       console.log('Imagen Subida a Firebase', downloadURL);
// //       const photoURL = downloadURL;
// //       expect(photoURL).toBe('../imagenes/user-perfil.jpg');
// //     });
// //     // .then((user) => {
// //     //   expect(user.email).toBe('clarissapaitan@mail.com');
// //     // });
// //   });
// // });
