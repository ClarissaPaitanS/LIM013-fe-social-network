// importamos la funcion que vamos a testear
// import { myFunction } from "../src/lib/index";

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

import {
  loginUser, googleLogin, signupUser, facebookLogin, closeSesion,
} from '../src/configFirebase.js';

import {
  addUser,
} from '../src/configFirestore';

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
describe('Registro de usuario', () => {
  it('debería ser una funcion', () => {
    expect(typeof signupUser).toBe('function');
  });
  it('Debería poder registrarse el usuario', () => {
    signupUser('clarissapaitan@mail.com', '1234567890')
      .then((user) => {
        expect(user.email).toBe('clarissapaitan@mail.com');
      });
  });
});

describe('login de usuario', () => {
  it('Debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
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
  it('Deberia poder iniciar sesión con Google', () => googleLogin()
    .then((data) => {
      // console.log(data);
      const provider = data.providerData[0];
      console.log(provider);
      expect(provider.providerId).toBe('google.com');
    }));
});

describe('facebookLogin', () => {
  it('debería ser una funcion', () => {
    expect(typeof facebookLogin).toBe('function');
  });

  it('Debería poder iniciar sesion con facebook', () => facebookLogin()
    .then((user) => {
      // console.log(user);
      const provider = user.providerData[0];
      expect(provider.providerId).toBe('facebook.com');
    }));
});

describe('closeSesion', () => {
  it('debería ser una funcion', () => {
    expect(typeof closeSesion).toBe('function');
  });
});

describe('addUser', () => {
  it('debería ser una funcion', () => {
    expect(typeof addUser).toBe('function');
  });
});
