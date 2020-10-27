/* eslint-disable no-unused-vars */

import {
  showDataEdit, updateDataName, updateDataPassword, uploadProfileImg, uploadProfileCover,
} from '../view-controller/controllerProfile.js';

import {
  updatePostText, uploadPostImg, deleteAllPost,
  updatePrivacyPost, showPhotoComment, addComment, updateCommentText, deleteAllComment,
} from '../view-controller/controllerHome.js';

import { showData } from '../configFirestore.js';

export default () => {
  const viewEdit = `
  <section class="profile-user-edit">
    <header class="header-profile-edit">
      <nav>
        <li class="menu-item">
          <img class="menu-logo-bio" src="imagenes/logo-bio.png" alt="">
        </li>
        <li class="menu-item">
          <!--<div id="close-btn" class="close-btn">
            <p>Cerrar sesión</p>
          </div> -->
          <div id="profile-btn" class="profile-btn">
            <p>Inicio</p>
          </div>
       </li>
      </nav>
    </header>
   <main>
     <section class="form-edit">
       <div class = "photo-cover">
          <div class = "cover-upload">

            <label for = "cover-up">
              <p id = "cover-edit"> <img  src="imagenes/user-cover.jpg"  alt ="Click aquí para cambiar tu foto de portada" title ="Click aquí para cambiar tu foto de portada"></p>
            </label>
            <input class = "edit-form-input" value = "" type="file" id = "cover-up">

          </div>
          <div class = "photo-upload"> 
          <label for = "photo-up">
            <p id = "photo-edit"> <img  src="imagenes/user-perfil.jpg"  alt ="Click aquí para subir tu foto" title ="Click aquí para subir tu foto"></p>
          </label>
          <input class = "edit-form-input" value = "" type="file" id = "photo-up">
          </div>
       </div>

        <form class="edit-form">
          <input class="edit-form-input" value= "" type="text" id="name-edit"  >
          <p id = "update-message-name"></p>
          <!--<input id="email-edit" disabled> -->
          <div id="email-edit"> </div> 
          <input class="edit-form-input" placeholder= "Contraseña" value= "" type="password" id="password-edit">
          <p id = "update-message-password"></p>
          <button type="submit" id="" class="edit-form-btn">Actualizar</button>
        </form>
     </section>
     <section class="post-profile-wall">          
     </section>
    </main>
  </section>

`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view-edit');
  divElemt.innerHTML = viewEdit;

  // Volver al profile
  const homeBtn = divElemt.querySelector('#profile-btn');
  homeBtn.addEventListener('click', () => { window.location.hash = '#/home'; });

  // Muestra los datos del user
  const profileName = divElemt.querySelector('#name-edit');
  const profileEmail = divElemt.querySelector('#email-edit');
  const photoUser = divElemt.querySelector('#photo-edit');
  const photoCover = divElemt.querySelector('#cover-edit');


  showDataEdit(profileName, profileEmail, photoUser, photoCover);

  // MOdifica los datos del user
  const nameEdit = divElemt.querySelector('#name-edit');
  const editFormBtn = divElemt.querySelector('.edit-form-btn');


  editFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = nameEdit.value;
    const editPassword = divElemt.querySelector('#password-edit').value;
    const updateMessageName = divElemt.querySelector('#update-message-name');
    const updateMessagePassword = divElemt.querySelector('#update-message-password');
    updateDataName(name, updateMessageName);
    updateDataPassword(editPassword, updateMessagePassword);
  });

  // Subir foto del user
  const photoUp = divElemt.querySelector('#photo-up');
  console.log(photoUp);
  photoUp.addEventListener('change', (e) => {
    console.log(photoUp.files[0]);
    uploadProfileImg(photoUp, photoUser);
  });

  // Subir cover del user
  const coverUp = divElemt.querySelector('#cover-up');
  const coverUser = divElemt.querySelector('#cover-edit');
  coverUp.addEventListener('change', (e) => {
    uploadProfileCover(coverUp, coverUser);
  });

  // **************************** Mostrar post ******************
  const wall = divElemt.querySelector('.post-profile-wall');
  // const previewPostImg = divElemt.querySelector('#preview-post-img');
  firebase.firestore().collection('post')
    .where('privacyPost', '==', 'public')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      wall.innerHTML = '';
      // previewPostImg.innerHTML = '';
      const postData = [];
      querySnapshot.forEach((post) => {
        postData.push({
          date: post.data().date,
          id: post.data().id,
          idUser: post.data().idUser,
          contentPost: post.data().contentPost,
          imgPost: post.data().photoPost,
          numberComments: post.data().numberComments,
        });
      });
      console.log('Posts: ', postData);
      postData.forEach((element) => {
        const idPost = element.id;
        const postImg = element.imgPost;
        const idUserPost = element.idUser;
        let countComments = parseInt(element.numberComments, 0);
        console.log('idUserPost - Element: ', idUserPost);
        console.log('Element: ', element);
        console.log('countComments: ', countComments);
        // showDataHome(idUserPost)
        //   .onSnapshot((doc) => {
        //     console.log('Current data: ', doc.data());
        //   });

        showData(idUserPost).then((doc) => {
          console.log('idUserPost - ShowdataElement: ', idUserPost);
          console.log('ShowdataElement: ', element);
          const nameUserPost = doc.data().name;
          const photoUserPost = doc.data().photo;
          if (doc.exists) {
            const post = document.createElement('div');
            post.classList.add('post');

            // showDataPost(idPost, postImg);

            let postShowImg = '';
            if (postImg === undefined) {
              postShowImg = '';
            } else {
              postShowImg = postImg;
            }
            post.innerHTML = `
                  <section class="post-user-wall">
                    <div class="post-header">
                      <div class = "post-header-photo">
                        <img class="photo-user-post" src='${photoUserPost}'> 
                      </div>
                      <div class="post-header-info">
                        <p class="post-name"> ${nameUserPost}  </p>
                        <p class="post-date"> ${element.date}</p>
                        <div class= "post-edit-privacy">
                          <p>🌎</p>
                        </div>
                      </div>
                      <div class="post-option-btn">
                        <p class="post-edit-btn"></p>
                        <p class="post-delete-btn"></p>
                      </div>
                    </div>
                <div class="post-body">
                <div class="post-option-save-btn">
                  <p class="post-content"> ${element.contentPost}</p>
                  <p class="post-btn-savetext"></p>
                </div>
  
              <div class = "img-post-upload">
              <label for = "img-post-update">
                <p id = "img-post-edit">  <img class="photo-post-img" src='${postShowImg}'></p>
              </label>
              <div class="img-input-file"></div>
              </div>
                  <p class="post-btn-saveimg."></p>
              </div>
  <!--
                <div class = "video-post-upload">
              <label for = "video-post-update">
                // <p id = "video-post-edit">  <video class="photo-post-video" src=  controls autoplay loop></p>
              </label>
              <div class="video-input-file"></div>
              </div>
                  <p class="post-btn-savevideo."></p>
                </div>
  -->
  
                <div class="post-footer">
                <div class = "post-footer-options">
                <div>
                  <img src="https://img.icons8.com/wired/0.4x/facebook-like.png">
                  <!-- <img src="https://img.icons8.com/dusk/0.4x/facebook-like.png">-->
                  <p class = "show-quantity-likes"> 0 </p>
                </div>
                <div>
                  <img class = "btn-add-comment" src="https://img.icons8.com/ultraviolet/0.5x/comments.png">
                  <p class = "show-quantity-comments"> ${countComments}  </p>
                </div>
              </div>
              <div class = "all-comment">
  
              </div>
                </div>
              </section>
            `;
            const user = firebase.auth().currentUser;
            console.log('User:', user);
            if (user.uid === element.idUser) {
              // Editar post
              const editPostBtn = post.querySelector('.post-edit-btn');
              editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.3x/edit.png>';
              const editPostText = post.querySelector('.post-content');

              editPostBtn.addEventListener('click', () => {
                console.log('clic en edit');
                editPostText.setAttribute('contenteditable', 'true');
                editPostBtn.innerHTML = '';

                const savetextPostBtn = post.querySelector('.post-btn-savetext');
                savetextPostBtn.innerHTML = '<img src=https://img.icons8.com/dusk/0.3x/save.png>';
                const inputfileBtn = post.querySelector('.img-input-file');
                inputfileBtn.innerHTML = '<input class = "img-post-edit-input" value = "" type="file" id = "img-post-update">';
                const imgPostEditBtn = post.querySelector('#img-post-update');
                // Cambiar texto del post
                savetextPostBtn.addEventListener('click', (e) => {
                  savetextPostBtn.innerHTML = '';
                  editPostText.setAttribute('contenteditable', 'false');
                  editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.3x/edit.png>';
                  updatePostText(idPost, editPostText.textContent);
                });
                // Cambiar imagen del post
                const imgPostEdit = post.querySelector('#img-post-edit');
                const postImgUp = post.querySelector('#img-post-update');
                imgPostEditBtn.addEventListener('change', () => {
                  uploadPostImg(idPost, postImgUp, imgPostEdit);
                });
              });
              // Borrar post
              const deletePostBtn = post.querySelector('.post-delete-btn');
              deletePostBtn.innerHTML = '<img src= https://img.icons8.com/dusk/0.3x/delete-forever.png>';
              deletePostBtn.addEventListener('click', () => {
                console.log('delete clic');
                deleteAllPost(idPost, postImg);
              });
              // Cambiar privacidad del post
              const editPostPrivacy = post.querySelector('.post-edit-privacy');
              editPostPrivacy.innerHTML = `<select class="select-privacy-post" name="select">
                <option value="public">Público 🌎</option> 
                <option value="private">Privado 🔒</option>
                </select>`;
              const selectPrivacyPost = post.querySelector('.select-privacy-post');
              selectPrivacyPost.addEventListener('change', () => {
                updatePrivacyPost(idPost, selectPrivacyPost.value);
              });
            }
            const postfooter = post.querySelector('.post-footer');
            // Añadir comentario
            const addCommentBtn = post.querySelector('.btn-add-comment');
            const allComment = post.querySelector('.all-comment');

            addCommentBtn.addEventListener('click', () => {
              console.log('Aqui escribe  Comentario');
              console.log('tu lista deComentarios');
              allComment.classList.toggle('show');
              allComment.innerHTML = `
                <div class = "add-comment-container">
                  <div class="photoComment"> </div>
                  <input class = "input-comment"type = "text">
                  <img class= "btn-share-comment" src="imagenes/btn-share.png">
                </div>
                <div class = "${idPost}">
                  <p>La lista de Comentarios</p>
                </div>`;
              const photoComment = post.querySelector('.photoComment');
              showPhotoComment(photoComment);
              const btnShareComment = post.querySelector('.btn-share-comment');
              btnShareComment.addEventListener('click', () => {
                const inputComment = post.querySelector('.input-comment').value;
                countComments += 1;
                addComment(inputComment, idPost, countComments);
              });
              const commentContainer = post.querySelector(`.${idPost}`);
              // ******* Comentarios
              firebase.firestore().collection('comment')
                .orderBy('date', 'desc')
                .onSnapshot((querySnapshotComment) => {
                  commentContainer.innerHTML = '';
                  const postComment = [];
                  querySnapshotComment.forEach((comment) => {
                    postComment.push({
                      date: comment.data().date,
                      idComment: comment.data().idComment,
                      idPost: comment.data().postId,
                      idUser: comment.data().idUser,
                      contentComment: comment.data().contentComment,
                    });
                  });
                  console.log('Posts Comment: ', postComment);
                  postComment.forEach((elementComment) => {
                    const idComment = elementComment.idComment;
                    const idUserComment = elementComment.idUser;
                    const idPostComment = elementComment.idPost;
                    console.log('idUserComment - Element: ', idUserComment);
                    console.log('ElementComment: ', elementComment);

                    showData(idUserComment).then((docComment) => {
                      console.log('idUserComment - ShowdataElement: ', idUserComment);
                      console.log('ShowdataElement: ', elementComment);
                      const nameUserComment = docComment.data().name;
                      const photoUserComment = docComment.data().photo;
                      // Cantidad de comentarios
                      const commentsQuantity = postComment.filter(commentIdPost => commentIdPost.idPost === idPostComment).length;
                      // const showQuantityComments = post.querySelector('.show-quantity-comments');
                      // showQuantityComments.innerHTML = commentsQuantity;
                      // console.log(commentsQuantity);
                      if (docComment.exists) {
                        if (idPost === idPostComment) {
                          // console.log(postComment.filter(commentIdPost => commentIdPost.idPost === idPostComment));
                          const comment = document.createElement('div');
                          comment.classList.add('comment');
                          comment.innerHTML = `
                            <section class="comment-user-wall">
                              <div class="comment-header">
                                <div class= "comment-header-content">
                                  <div class = "comment-header-photo">
                                    <img class="photo-user-comment" src='${photoUserComment}'> 
                                  </div>
                                  <div class="comment-header-info">
                                    <p class="comment-name"> ${nameUserComment}  </p>
                                    <p class="comment-date"> El ${elementComment.date}</p>
                                  </div>
                                </div>
                                <div class="comment-option-btn">
                                  <p class="comment-edit-btn"></p>
                                  <p class="comment-delete-btn"></p>
                                </div>
                              </div>
                              <div class="comment-body">
                              <div class="comment-option-save-btn">
                                <p class="comment-content"> ${elementComment.contentComment}</p>
                                <p class="comment-btn-savetext"></p>
                              </div>
                            </section>
                          `;
                          // Aqui edit commmet
                          if (user.uid === idUserComment) {
                            // Editar Comment
                            const editCommentBtn = comment.querySelector('.comment-edit-btn');
                            editCommentBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.3x/edit.png>';
                            const editCommentText = comment.querySelector('.comment-content');

                            editCommentBtn.addEventListener('click', () => {
                              console.log('clic en edit');
                              editCommentText.setAttribute('contenteditable', 'true');
                              editCommentBtn.innerHTML = '';

                              const savetextCommentBtn = post.querySelector('.comment-btn-savetext');
                              savetextCommentBtn.innerHTML = '<img src=https://img.icons8.com/dusk/0.3x/save.png>';
                              // Cambiar texto del post
                              savetextCommentBtn.addEventListener('click', (e) => {
                                savetextCommentBtn.innerHTML = '';
                                editCommentText.setAttribute('contenteditable', 'false');
                                editCommentBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.3x/edit.png>';
                                updateCommentText(idComment, editCommentText.textContent);
                              });
                            });
                            // Borrar comment
                            const deleteCommentBtn = comment.querySelector('.comment-delete-btn');
                            deleteCommentBtn.innerHTML = '<img src= https://img.icons8.com/dusk/0.3x/delete-forever.png>';
                            deleteCommentBtn.addEventListener('click', () => {
                              console.log('delete clic');
                              deleteAllComment(idComment);
                            });
                          }
                          //
                          commentContainer.appendChild(comment);
                        }
                      }
                    }).catch((error) => {
                      console.log('Error agregando comentario:', error);
                    });
                  });
                });
              // ********
            });

            wall.appendChild(post);
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      });
    });
  return divElemt;
};
