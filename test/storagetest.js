// /* eslint-disable max-len */
// // /* eslint-disable max-len */
// import { filePhotoUser } from '../src/configStorage';

// const firebasemock = require('firebase-mock');

// const mockstorage = new firebasemock.MockStorage();

// global.firebase = firebasemock.MockFirebaseSdk(
//   // use null if your code does not use RTDB
//   () => null,
//   () => mockstorage,
// );


// Betsy
// describe('Guardar Imagen', () => {
//   it('Debería poder Guardar Imagen', () => {
//     const otherObj = {
//       ref: jest.fn(filePhoto => ({ put: jest.fn(() => filePhoto) })),
//     };

//     // firebase.storage().ref(`/userProfileImgs/${filePhoto.name}`).put(filePhoto)
//     const mockFunc = jest.fn(() => otherObj);
//     global.firebase.storage = mockFunc;

//     filePhotoUser('../imagenes/user-perfil.jpg');
//     expect(mockFunc).toHaveBeenCalled();
//   });
// });
