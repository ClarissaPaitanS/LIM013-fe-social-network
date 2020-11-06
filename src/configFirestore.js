/* eslint-disable max-len */
export const addUser = (uid, nameUser, emailUser) => firebase.firestore().collection('user').doc(uid).set({
  name: nameUser,
  email: emailUser,
  photo: 'imagenes/user-perfil.jpg',
  photoCover: 'imagenes/user-cover.jpg',
});

export const addUserProvider = (uid, nameUser, emailUser, photoUser) => firebase.firestore().collection('user').doc(uid).set({
  name: nameUser,
  email: emailUser,
  photo: photoUser,
  photoCover: 'imagenes/user-cover.jpg',
});


export const showData = uid => firebase.firestore().collection('user').doc(uid).get();

// export const showDataHome = uid => firebase.firestore().collection('user').doc(uid);

export const addPost = (uid, idPost, contentPostText, datePost, privacity) => firebase.firestore().collection('post').doc(idPost).set({
  id: idPost,
  idUser: uid,
  contentPost: contentPostText,
  date: datePost,
  privacyPost: privacity,
  numberComments: '0',
  numberLikes: [],
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

export const uploadPhotoPost = (uid, idPost, photopostURL, contentPostText, datePostUser, privacity) => firebase.firestore().collection('post').doc(idPost).set({
  id: idPost,
  idUser: uid,
  photoPost: photopostURL,
  contentPost: contentPostText,
  date: datePostUser,
  privacyPost: privacity,
  numberComments: '0',
  numberLikes: [],
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

// Cambia cantidad de likes
export const updateNumberComment = (idPost, numberCommentsPost) => firebase.firestore().collection('post').doc(idPost).update({
  numberComments: numberCommentsPost,
});

export const updateNumberLike = (idPost, numberPostLike) => firebase.firestore().collection('post').doc(idPost).update({
  numberLikes: numberPostLike,
});

export const updatePostImg = (idPost, photoURL) => firebase.firestore().collection('post').doc(idPost).update({
  photoPost: photoURL,
});

export const deletePost = idPost => firebase.firestore().collection('post').doc(idPost).delete();

export const updatePrivacy = (idPost, privacy) => firebase.firestore().collection('post').doc(idPost).update({
  privacyPost: privacy,
});

export const addCommentPost = (user, idPostComment, idPost, contentCommentText, dateComment) => firebase.firestore().collection('comment').doc(idPostComment).set({
  idComment: idPostComment,
  postId: idPost,
  idUser: user,
  contentComment: contentCommentText,
  date: dateComment,
});

export const updateComment = (idComment, contentCommentText) => firebase.firestore().collection('comment').doc(idComment).update({
  contentComment: contentCommentText,
});

export const deleteComment = idComment => firebase.firestore().collection('comment').doc(idComment).delete();
// export const deleteLike = idPost => firebase.firestore().collection('like').where('idPost', '==', idPost).delete();

export const getPost = callback => firebase.firestore().collection('post')
  .where('privacyPost', '==', 'public')
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const postData = [];
    querySnapshot.forEach((post) => {
      postData.push({
        date: post.data().date,
        id: post.data().id,
        idUser: post.data().idUser,
        contentPost: post.data().contentPost,
        imgPost: post.data().photoPost,
        numberComments: post.data().numberComments,
        numberLikes: post.data().numberLikes,
        privacyPost: post.data().privacyPost,
      });
    });
    callback(postData);
  });

export const getPostUserAll = callback => firebase.firestore().collection('post')
  .where('idUser', '==', firebase.auth().currentUser.uid)
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const postData = [];
    querySnapshot.forEach((post) => {
      postData.push({
        date: post.data().date,
        id: post.data().id,
        idUser: post.data().idUser,
        contentPost: post.data().contentPost,
        imgPost: post.data().photoPost,
        numberComments: post.data().numberComments,
        numberLikes: post.data().numberLikes,
        privacyPost: post.data().privacyPost,
      });
    });
    callback(postData);
  });

export const getComments = callback => firebase.firestore().collection('comment')
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const postComment = [];
    querySnapshot.forEach((comment) => {
      postComment.push({
        date: comment.data().date,
        idComment: comment.data().idComment,
        idPost: comment.data().postId,
        idUser: comment.data().idUser,
        contentComment: comment.data().contentComment,
      });
    });
    callback(postComment);
  });

// ***************************Solo para el test********************************
export const getEveryPost = callback => firebase.firestore().collection('post')
  .orderBy('date', 'desc')
  .onSnapshot((querySnapshot) => {
    const postData = [];
    querySnapshot.forEach((post) => {
      postData.push({
        date: post.data().date,
        id: post.data().id,
        idUser: post.data().idUser,
        contentPost: post.data().contentPost,
        imgPost: post.data().photoPost,
        numberComments: post.data().numberComments,
        numberLikes: post.data().numberLikes,
        privacyPost: post.data().privacyPost,
      });
    });
    callback(postData);
  });
