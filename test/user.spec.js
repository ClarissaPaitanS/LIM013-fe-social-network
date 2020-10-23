import MockFirebase from 'mock-cloud-firestore';
import {
  addUser, showData, updateName, updatePhoto, updateCover,
} from '../src/configFirestore';
// import showDataProfile from '../src/view-controller/controllerProfile.js';

const fixtureUser = {
  __collection__: {
    user: {
      __doc__: {
        abc1d: {
          name: 'Juana',
          email: 'juanita@mail.com',
        //   complete: false,
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureUser, { isNaiveSnapshotListenerEnabled: true });

describe('showData', () => {
  it('debería ser una funcion', () => {
    expect(typeof showData).toBe('function');
  });
});

describe('addUser', () => {
  it('debería ser una funcion', () => {
    expect(typeof addUser).toBe('function');
  });

  it('Debería poder agregar unx usuarix', () => {
    addUser('abc2d', 'Mercedes', 'mechita@mail.com')
      .then(() => {
        console.log('datos guardados');
        showData('abc2d').then((doc) => {
          if (doc.exists) {
            expect(doc.data().name).toBe('Mercedes');
          }
        });
      });
  });
});

describe('updateName', () => {
  it('debería ser una funcion', () => {
    expect(typeof updateName).toBe('function');
  });

  it('Debería poder cambiar el nombre', () => {
    updateName('abc2d', 'Rosa')
      .then(() => {
        console.log('nombre cambiado');
        showData('abc2d').then((doc) => {
          if (doc.exists) {
            expect(doc.data().name).toBe('Rosa');
          }
        });
      });
  });
});

describe('updatePhoto', () => {
  it('debería ser una funcion', () => {
    expect(typeof updatePhoto).toBe('function');
  });

  it('Debería poder cambiar la imagen', () => {
    updatePhoto('abc2d', 'imagenRosa.jpg')
      .then(() => {
        console.log('Foto de perfil cambiada');
        showData('abc2d').then((doc) => {
          if (doc.exists) {
            expect(doc.data().photo).toBe('imagenRosa.jpg');
          }
        });
      });
  });
});

describe('updateCover', () => {
  it('debería ser una funcion', () => {
    expect(typeof updateCover).toBe('function');
  });

  it('Debería poder cambiar la imagen', () => {
    updateCover('abc2d', 'coverRosa.jpg')
      .then(() => {
        console.log('Foto de portada cambiada');
        showData('abc2d').then((doc) => {
          if (doc.exists) {
            expect(doc.data().photoCover).toBe('coverRosa.jpg');
          }
        });
      });
  });
});
