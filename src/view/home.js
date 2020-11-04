/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import { closeSesion } from '../configFirebase.js';

import {
  showDataProfile, addPostProfile, uploadProfilePost, updatePostText, uploadPostImg, deleteAllPost,
  updatePrivacyPost, showPhotoComment, addComment, updateCommentText, deleteAllComment,
} from '../view-controller/controllerHome.js';

import {
  getPost, showData, updateNumberLike, getComments,
} from '../configFirestore.js';

export default () => {
  const viewProfile = `
  <section class="profile-user">
    <header class="header-profile">
     <nav>
       <li class="menu-item">
          <img class="menu-logo-bio" src="imagenes/logo-bio.png" alt="">
        </li>
        <li>
          <img class= "title-bio" src="imagenes/title-bio.png">
        </li>
        <li class="menu-options">      
            <div id="close-btn" class="close-btn">
              <i class="fas fa-sign-out-alt fa-2x"></i>
            </div>
            <div id="edit-btn" class="edit-btn">
              <i class="fas fa-user fa-2x"></i>
            </div>
        </li>
      </nav>
    </header>
    <main>
      <div class = "view-home">
       <section class="info-user">
        <div class="photo-cover">
          <div class="cover-show">
              <p id="photoCover"><img src="imagenes/user-cover.jpg"></p>
          </div>
          <div class="photo-icon-profile"> 
            <p id="photoUser"><img src="imagenes/user-perfil.jpg"></p>
          </div>
       </div>
       <p id="profileName" class="profileName"></p>
      </section>
      <section class="post-user">
        <section class="post-user-publish">        
          <div class="post-text">
            <textarea class="content-post-text" placeholder="¿Qué estás pensando?" type="text"></textarea>  
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
               <!-- <img src="imagenes/btn-share.png"> -->
                <i class="fas fa-paper-plane"></i>
              </div>
          </div>

        </section>
        <section class="post-profile-wall">          
        </section>
      </section>
    </div>
  </main>
  </section>
    `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view-profile');
  divElemt.innerHTML = viewProfile;

  const user = firebase.auth().currentUser;
  const closeBtn = divElemt.querySelector('#close-btn');

  // **************************** Cerrar sesión  ******************
  closeBtn.addEventListener('click', () => {
    closeSesion()
      .then(() => {
        window.location.hash = '#/';
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const editBtn = divElemt.querySelector('#edit-btn');

  editBtn.addEventListener('click', () => {
    window.location.hash = '#/profile';
  });

  const profileName = divElemt.querySelector('#profileName');
  const photoUser = divElemt.querySelector('#photoUser');
  const photoCover = divElemt.querySelector('#photoCover');

  showDataProfile(profileName, photoUser, photoCover);

  // **************************** Mostrar post ******************
  const wall = divElemt.querySelector('.post-profile-wall');
  const previewPostImg = divElemt.querySelector('#preview-post-img');
  getPost((postData) => {
    wall.innerHTML = '';
    previewPostImg.innerHTML = '';
    // *************Recorre cada post **************
    postData.forEach((element) => {
      const idPost = element.id;
      const postImg = element.imgPost;
      const idUserPost = element.idUser;
      let countComments = parseInt(element.numberComments, 0);
      const countLikes = element.numberLikes.length;
      const postDate = element.date;
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
                    <p class="post-date"> ${postDate}</p>
                    <div class= "post-edit-privacy">
                      <p>🌎</p>
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
            <div id = "img-post-edit"> ${postShowImg}</div>
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
             <div class= "like-container">
              <p class = "show-quantity-likes"> ${countLikes} </p>
              <i  id="like" class = "${(element.numberLikes.indexOf(user.uid) === -1) ? 'far fa-thumbs-up' : 'fas fa-thumbs-up'}"></i>
             </div>
            </div>
            <div class= "comment-container">
              <p class = "show-quantity-comments"> ${countComments}  </p>
              <i class="far fa-comment-dots btn-add-comment"></i>
            </div>
          </div>
          <div class = "all-comment">
          </div>
            </div>
          </section>
        `;

      if (user.uid === element.idUser) {
        // *********************************Editar post*******************************
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
          // **********Cambiar texto del post*********
          savetextPostBtn.addEventListener('click', (e) => {
            savetextPostBtn.innerHTML = '';
            editPostText.setAttribute('contenteditable', 'false');
            editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.3x/edit.png>';
            updatePostText(idPost, editPostText.textContent);
          });
          // **********Cambiar imagen del post**************
          const imgPostEdit = post.querySelector('#img-post-edit');
          const postImgUp = post.querySelector('#img-post-update');
          imgPostEditBtn.addEventListener('change', () => {
            uploadPostImg(idPost, postImgUp, imgPostEdit);
          });
        });
        // ***************Borrar post******************************
        const deletePostBtn = post.querySelector('.post-delete-btn');
        deletePostBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
        deletePostBtn.addEventListener('click', () => {
          deleteAllPost(idPost, postImg);
        });
        // ********************** Cambiar privacidad del post ******************
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

      // ****************** Dar y quitar like ******************
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
        // ************************ Mostrar Comentarios**************
        getComments((postComment) => {
          commentContainer.innerHTML = '';
          postComment.forEach((elementComment) => {
            const idComment = elementComment.idComment;
            const idUserComment = elementComment.idUser;
            const idPostComment = elementComment.idPost;
            if (idPost === idPostComment) {
              const comment = document.createElement('div');
              comment.classList.add('comment');
              comment.innerHTML = `
                      <section class="comment-user-wall">
                        <div class="comment-header">
                          <div class= "comment-header-content">
                            <div class = "comment-header-photo">
                              
                            </div>
                            <div class="comment-header-info">
                              <p class="comment-name">  </p>
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
                // *********************************Editar Comment***************
                const editCommentBtn = comment.querySelector('.comment-edit-btn');
                editCommentBtn.innerHTML = '<i class="fas fa-edit"></i>';
                const editCommentText = comment.querySelector('.comment-content');

                editCommentBtn.addEventListener('click', () => {
                  editCommentText.setAttribute('contenteditable', 'true');
                  editCommentBtn.innerHTML = '';

                  const savetextCommentBtn = post.querySelector('.comment-btn-savetext');
                  savetextCommentBtn.innerHTML = '<i class="far fa-save"></i>';
                  // *******************Cambiar texto del comment*******************
                  savetextCommentBtn.addEventListener('click', (e) => {
                    savetextCommentBtn.innerHTML = '';
                    editCommentText.setAttribute('contenteditable', 'false');
                    editCommentBtn.innerHTML = '<i class="fas fa-edit"></i>';
                    updateCommentText(idComment, editCommentText.textContent);
                  });
                });
                // ***********************************Borrar comment**************************
                const deleteCommentBtn = comment.querySelector('.comment-delete-btn');
                deleteCommentBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
                deleteCommentBtn.addEventListener('click', () => {
                  countComments -= 1;
                  deleteAllComment(idPost, idComment, countComments);
                });
              }
              // ***********************************Muestra usuario que publicó post**************************
              showData(idUserComment).then((docComment) => {
                const nameUserComment = docComment.data().name;
                const photoUserComment = docComment.data().photo;
                if (docComment.exists) {
                  const commentHeaderPhoto = comment.querySelector('.comment-header-photo');
                  const commentName = comment.querySelector('.comment-name');
                  commentHeaderPhoto.innerHTML = `<img class="photo-user-comment" src='${photoUserComment}'>`;
                  commentName.innerHTML = nameUserComment;
                }
              }).catch((error) => {
                console.log('Error agregando comentario:', error);
              });
              //
              commentContainer.appendChild(comment);
            }
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

  // const postVideoInput = divElemt.querySelector('#post-video-input');
  // postVideoInput.addEventListener('change', (e) => {
  //   uploadProfileVideoPost(postVideoInput, previewPostVideo);
  // });

  return divElemt;
};
