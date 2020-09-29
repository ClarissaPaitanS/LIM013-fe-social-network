// importamos la funcion que vamos a testear
// import { myFunction } from "../src/lib/index";

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
import { loginUser, googleLogin } from '../src/configFirebase.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

// iniciando tests
describe('login de usuario', () => {
  it('Debería poder iniciar sesion', () => {
    loginUser('clarissapaitan@mail.com', '1234567890')
      .then((user) => {
        expect(user.email).toBe('clarissapaitan@mail.com');
      });
  });
});

describe('googleLogin', () => {
  it('debería ser una funcion', () => {
    expect(typeof googleLogin).toBe('function');
  });
});
