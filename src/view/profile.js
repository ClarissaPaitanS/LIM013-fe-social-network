/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import {
  showDataEdit, updateDataName, updateDataPassword, uploadProfileImg, uploadProfileCover,
} from '../view-controller/controllerProfile.js';

import {
  updatePostText, uploadPostImg, deleteAllPost,
  updatePrivacyPost, showPhotoComment, addComment, updateCommentText, deleteAllComment,
  addPostProfile, uploadProfilePost,
} from '../view-controller/controllerHome.js';

import { showData, updateNumberLike, getPostUserAll } from '../configFirestore.js';

export default () => {
  const viewEdit = `
  <section class="profile-user-edit">
    <header class="header-profile-edit">
      <nav>
        <li class="menu-item">
          <img class="menu-logo-bio" src="imagenes/logo-bio.png" alt="">
        </li>
        <li class="menu-item">
          <div id="profile-btn" class="profile-btn">
            <i class="fas fa-house-user fa-2x"></i>
          </div>
       </li>
      </nav>
    </header>
   <main>
   <div class= "view-profile">
   <section >
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
    </section>
    <section class="post-user">
        <section class="post-user-publish">        
          <div class="post-text">
            <textarea class="content-post-text" type="text">              
            </textarea>  
            <div id="preview-post-img">
            </div>
            <div id="preview-post-video">
            </div>     
          </div>
    
          <div class="post-user-options">
              <div class="post-user-image">
                <label for="post-image-input">
                  <i class="fas fa-camera"></i>
                </label>
                <input type="file" id="post-image-input">
              </div>
              <div class="post-privacity">
                <select class="privacity-post" name="select">
                  <option value="public">Público 🌎</option> 
                  <option value="private">Privado 🔒</option>
                </select>
              </div>
            <!--
              <div class="post-user-video">
                <label for="post-video-input">
                  <img src="https://img.icons8.com/fluent/344/video.png"> 
                </label>
                <input type="file" id="post-video-input">
              </div>
              -->
              <div class="post-user-btn">
                <i class="fas fa-paper-plane"></i>
              </div>
          </div>
    
        </section>
        <section class="post-profile-wall">          
        </section>
      </div>
    </main>

    

  </section>

`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view-edit');
  divElemt.innerHTML = viewEdit;
  const user = firebase.auth().currentUser;
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
  const previewPostImg = divElemt.querySelector('#preview-post-img');
  getPostUserAll((postData) => {
    wall.innerHTML = '';
    previewPostImg.innerHTML = '';
    // *************Recorre cada post **************
    postData.forEach((element) => {
      const idPost = element.id;
      const postImg = element.imgPost;
      const idUserPost = element.idUser;
      let countComments = parseInt(element.numberComments, 0);
      const countLikes = element.numberLikes.length;
      const privacyPost = element.privacyPost;
      // console.log(countLikes);
      console.log('idPost:', idPost);
      // *************Crea template vacío de post **************
      const post = document.createElement('div');
      post.classList.add('post');
      let postShowImg = '';
      if (postImg === undefined) {
        postShowImg = '';
      } else {
        // postShowImg = postImg;
        postShowImg = `<img class="photo-post-img" src='${postImg}'></img>`;
      }
      post.innerHTML = `
              <section class="post-user-wall">
                <div class="post-header">
                <div class="post-header-content">
                  <div class = "post-header-photo">
                  </div>
                  <div class="post-header-info">
                    <p class="post-name">   </p>
                    <p class="post-date"> ${element.date}</p>
                    <div class= "post-edit-privacy">
                      <p></p>
                    </div>
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
            <div id = "img-post-edit">  ${postShowImg}</div>
          </label>
          <div class="img-input-file"></div>
          </div>
              <p class="post-btn-saveimg"></p>
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
             <div class= "like-container">
             <i  id="like" class = "${(element.numberLikes.indexOf(user.uid) === -1) ? 'far fa-thumbs-up' : 'fas fa-thumbs-up'}"></i>
             <p class = "show-quantity-likes"> ${countLikes} </p>

             </div>

            </div>
            <div>
            <i class="far fa-comment-dots btn-add-comment"></i>
              <p class = "show-quantity-comments"> ${countComments}  </p>
            </div>
          </div>
          <div class = "all-comment">
          </div>
            </div>
          </section>
        `;

      if (user.uid === element.idUser) {
        // Editar post
        const editPostBtn = post.querySelector('.post-edit-btn');
        editPostBtn.innerHTML = '<i class="fas fa-edit"></i>';
        const editPostText = post.querySelector('.post-content');

        editPostBtn.addEventListener('click', () => {
          editPostText.setAttribute('contenteditable', 'true');
          editPostBtn.innerHTML = '';
          const savetextPostBtn = post.querySelector('.post-btn-savetext');
          savetextPostBtn.innerHTML = '<i class="far fa-save"></i>';
          const inputfileBtn = post.querySelector('.img-input-file');
          inputfileBtn.innerHTML = '<input class = "img-post-edit-input" value = "" type="file" id = "img-post-update">';
          const imgPostEditBtn = post.querySelector('#img-post-update');
          // Cambiar texto del post
          savetextPostBtn.addEventListener('click', (e) => {
            savetextPostBtn.innerHTML = '';
            editPostText.setAttribute('contenteditable', 'false');
            editPostBtn.innerHTML = '<i class="fas fa-edit"></i>';
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
        deletePostBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        deletePostBtn.addEventListener('click', () => {
          deleteAllPost(idPost, postImg);
        });
        // ********************** Cambiar privacidad del post ******************
        const editPostPrivacy = post.querySelector('.post-edit-privacy');
        if (privacyPost === 'public') {
          console.log('privacidad: ', privacyPost);
          editPostPrivacy.innerHTML = `<select class="select-privacy-post" name="select">
            <option value="public">Público 🌎</option> 
            <option value="private">Privado 🔒</option>
            </select>`;
          const selectPrivacyPost = post.querySelector('.select-privacy-post');
          selectPrivacyPost.addEventListener('change', () => {
            updatePrivacyPost(idPost, selectPrivacyPost.value);
          });
        } else if (privacyPost === 'private') {
          console.log('privacidad: ', privacyPost);
          editPostPrivacy.innerHTML = `<select class="select-privacy-post" name="select">
          <option value="private">Privado 🔒</option>
          <option value="public">Público 🌎</option> 
            </select>`;
          const selectPrivacyPost = post.querySelector('.select-privacy-post');
          selectPrivacyPost.addEventListener('change', () => {
            updatePrivacyPost(idPost, selectPrivacyPost.value);
          });
        }
        // const selectPrivacyPost = post.querySelector('.select-privacy-post');
        // selectPrivacyPost.addEventListener('change', () => {
        //   updatePrivacyPost(idPost, selectPrivacyPost.value);
        // });
      }
      const postfooter = post.querySelector('.post-footer');

      const likebtn = post.querySelector('#like');

      likebtn.addEventListener('click', () => {
        // countLikes += 1;
        const indexLike = element.numberLikes.indexOf(user.uid);
        if (indexLike === -1) {
          element.numberLikes.push(user.uid);
          updateNumberLike(idPost, element.numberLikes);
        } else {
          element.numberLikes.splice(indexLike, 1);
          updateNumberLike(idPost, element.numberLikes);
        }
        // console.log('Cantidad Like  +1:', countLikes);
        // console.log('Id Post Like:', idPost);
        // alert (`Creando Nuevo Like para el ID Post:' '${idPost}`);
        // addLike(idPost, countLikes);
      });

      // ********************* Añadir comentario *************************
      const addCommentBtn = post.querySelector('.btn-add-comment');
      const allComment = post.querySelector('.all-comment');

      addCommentBtn.addEventListener('click', () => {
        allComment.classList.toggle('show');
        allComment.innerHTML = `
            <div class = "add-comment-container">
              <div class="photoComment"> </div>
              <input class = "input-comment"type = "text">
              <img class= "btn-share-comment" src="imagenes/btn-share.png">
            </div>
            <div class = "${idPost}">
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
        // ******* Mostrar Comentarios
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
            postComment.forEach((elementComment) => {
              const idComment = elementComment.idComment;
              const idUserComment = elementComment.idUser;
              const idPostComment = elementComment.idPost;


              showData(idUserComment).then((docComment) => {
                const nameUserComment = docComment.data().name;
                const photoUserComment = docComment.data().photo;
                // Cantidad de comentarios
                const commentsQuantity = postComment.filter(commentIdPost => commentIdPost.idPost === idPostComment).length;
                if (docComment.exists) {
                  if (idPost === idPostComment) {
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
                      editCommentBtn.innerHTML = '<i class="fas fa-edit"></i>';
                      const editCommentText = comment.querySelector('.comment-content');

                      editCommentBtn.addEventListener('click', () => {
                        editCommentText.setAttribute('contenteditable', 'true');
                        editCommentBtn.innerHTML = '';

                        const savetextCommentBtn = post.querySelector('.comment-btn-savetext');
                        savetextCommentBtn.innerHTML = '<i class="far fa-save"></i>';
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
                      deleteCommentBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
                      deleteCommentBtn.addEventListener('click', () => {
                        countComments -= 1;
                        deleteAllComment(idPost, idComment, countComments);
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
      });

      wall.appendChild(post);

      showData(idUserPost).then((doc) => {
        const nameUserPost = doc.data().name;
        const photoUserPost = doc.data().photo;
        if (doc.exists) {
          const userphotoPost = post.querySelector('.post-header-photo');
          const namePost = post.querySelector('.post-name');
          userphotoPost.innerHTML = `<img class="photo-user-post" src='${photoUserPost}'>`;
          namePost.innerHTML = nameUserPost;
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    });
    console.log(postData);
  });

  const btnAddPost = divElemt.querySelector('.post-user-btn');
  btnAddPost.addEventListener('click', (e) => {
    // wall.innerHTML = '';
    const contentPostText = divElemt.querySelector('.content-post-text').value;
    const contentPostImg = divElemt.querySelector('#post-image-input').files[0];
    const privacityPost = divElemt.querySelector('.privacity-post').value;


    // const contentPostVideo = divElemt.querySelector('#post-video-input').files[0];
    addPostProfile(contentPostText, contentPostImg, privacityPost);
    divElemt.querySelector('.content-post-text').value = '';
    e.preventDefault();
  });


  const postImageInput = divElemt.querySelector('#post-image-input');
  postImageInput.addEventListener('change', (e) => {
    uploadProfilePost(postImageInput, previewPostImg);
  });

  return divElemt;
};
