import MockFirebase from 'mock-cloud-firestore';

import {
  addCommentPost,
  getComments,
  updateComment,
  deleteComment,
} from '../src/configFirestore';


const fixtureComment = {
  __collection__: {
    comment: {
      __doc__: {
        comment001d: {
          contentComment: 'Hola',
          date: '30 de Octubre del 2020 a las 12:00',
          idComment: 'comment001d',
          idUser: ' abc1d',
          postId: 'post001d',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureComment, { isNaiveSnapshotListenerEnabled: true });

describe('addCommentPost', () => {
  it('debería ser una funcion', () => {
    expect(typeof addCommentPost).toBe('function');
  });

  it('Debería poder agregar un post', (done) => {
    addCommentPost('abc1d', 'comment002d', 'post001d', 'Mi nuevo comentario', '31 de Octubre del 2020 a las 12:00')
      .then(() => getComments((data) => {
        console.log(data);
        expect(data[0].contentComment).toBe('Mi nuevo comentario');
        done();
      }));
  });
});

describe('updateComment', () => {
  it('debería ser una funcion', () => {
    expect(typeof updateComment).toBe('function');
  });

  it('Debería poder actualizar el contenido de un post', (done) => {
    updateComment('comment001d', 'nuevo comentario')
      .then(() => getComments((data) => {
        // console.log(data);
        expect(data[1].contentComment).toBe('nuevo comentario');
        done();
      }));
  });
});

describe('deleteComment', () => {
  it('debería ser una funcion', () => {
    expect(typeof deleteComment).toBe('function');
  });

  it('Debería poder eliminar el comentario', (done) => {
    deleteComment('comment002d')
      .then(() => getComments((data) => {
        console.log(data);
        expect(data[0].idComment).toBe('comment001d'); // El siguiente comentario toma su posicion. Poscion de 1 pasa a 0.
        done();
      }));
  });
});

describe('getComments', () => {
  it('debería ser una funcion', () => {
    expect(typeof getComments).toBe('function');
  });
});
