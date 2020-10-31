import MockFirebase from 'mock-cloud-firestore';

import {
  addPost,
  // showData,
  getPost,
  uploadPhotoPost,
  updatePost,
  updateNumberComment,
  updateNumberLike,
  updatePostImg,
  updatePrivacy,
  getEveryPost,
  deletePost,
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
          numberComments: 0,
          numberLikes: [],
          privacyPost: 'public',
          photoPost: 'photopost.jpg',
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

  it('Debería poder agregar un post', (done) => {
    addPost('abc1d', 'post002d', 'Mi nuevo Post', '23 de Octubre del 2020 a las 1:00', 'public')
      .then(() => getPost((data) => {
        // console.log(data);
        expect(data[0].contentPost).toBe('Mi nuevo Post');
        done();
      }));
  });
});

describe('uploadPhotoPost', () => {
  it('debería ser una funcion', () => {
    expect(typeof addPost).toBe('function');
  });

  it('Debería poder agregar un post con imagen', (done) => {
    uploadPhotoPost('abc1d', 'post003d', 'photopost.jpg', 'Mi segundo Post con imagen', '23 de Octubre del 2020 a las 1:00', 'public')
      .then(() => getPost((data) => {
        // console.log(data);
        expect(data[1].contentPost).toBe('Mi segundo Post con imagen');
        done();
      }));
  });
});

describe('updatePost', () => {
  it('debería ser una funcion', () => {
    expect(typeof updatePost).toBe('function');
  });

  it('Debería poder actualizar el contenido de un post', (done) => {
    updatePost('post001d', 'chau')
      .then(() => getPost((data) => {
        // console.log(data);
        expect(data[2].contentPost).toBe('chau');
        done();
      }));
  });
});

describe('updateNumberComment', () => {
  it('debería ser una funcion', () => {
    expect(typeof updateNumberComment).toBe('function');
  });

  it('Debería poder actualizar el número de comentarios', (done) => {
    updateNumberComment('post001d', 5)
      .then(() => getPost((data) => {
        // console.log(data);
        expect(data[2].numberComments).toBe(5);
        done();
      }));
  });
});

describe('updateNumberLike', () => {
  it('debería ser una funcion', () => {
    expect(typeof updateNumberLike).toBe('function');
  });

  it('Debería poder actualizar numero de likes', (done) => {
    updateNumberLike('post001d', 'abc3d')
      .then(() => getPost((data) => {
        // console.log(data);
        expect(data[2].numberLikes).toEqual('abc3d');
        done();
      }));
  });
});

describe('updatePostImg ', () => {
  it('debería ser una funcion', () => {
    expect(typeof updatePostImg).toBe('function');
  });

  it('Debería poder cambiar la imagen', (done) => {
    updatePostImg('post001d', 'UpdateImagen.jpg')
      .then(() => getPost((data) => {
        // console.log(data);
        expect(data[2].imgPost).toBe('UpdateImagen.jpg');
        done();
      }));
  });
});

describe('updatePrivacy', () => {
  it('debería ser una funcion', () => {
    expect(typeof updatePrivacy).toBe('function');
  });

  it('Debería poder cambiar la privacidad', (done) => {
    updatePrivacy('post001d', 'private')
      .then(() => getEveryPost((data) => {
        // console.log(data);
        expect(data[2].privacyPost).toBe('private');
        done();
      }));
  });
});

describe('deletePost', () => {
  it('debería ser una funcion', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('Debería poder eliminar el post', (done) => {
    deletePost('post002d')
      .then(() => getPost((data) => {
        console.log(data);
        expect(data[0].id).toBe('post003d'); // El siguiente post toma la posicion del post eliminado (publicos). Poscion de 1 pasa a 0.
        done();
      }));
  });
});

describe('getEveryPost', () => {
  it('debería ser una funcion', () => {
    expect(typeof getEveryPost).toBe('function');
  });
});

describe('getPost', () => {
  it('debería ser una funcion', () => {
    expect(typeof getPost).toBe('function');
  });
});
