import MockFirebase from 'mock-cloud-firestore';

import {
  addPost, showData,
} from '../src/configFirestore';


const fixturePost = {
  __collection__: {
    post: {
      __doc__: {
        post001d: {
          contentPost: 'Hola',
          date: '22 de Octubre del 2020 a las 12:00',
          id: 'post001d',
          idUser: ' abc1d',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixturePost, { isNaiveSnapshotListenerEnabled: true });

describe('addPost', () => {
  it('debería ser una funcion', () => {
    expect(typeof addPost).toBe('function');
  });

  it('Debería poder agregar unx usuarix', () => {
    addPost('abc1d', 'post002d', 'Mi nuevo Post', '23 de Octubre del 2020 a las 1:00')
      .then(() => {
        console.log('Post Guardado');
        showData('abc1d').then((doc) => {
          if (doc.exists) {
            expect(doc.data().name).toBe('Juana');
          }
        });
      });
  });
});
