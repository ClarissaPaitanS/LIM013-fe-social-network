/* eslint-disable no-unused-vars */

import { closeSesion } from '../configFirebase.js';

import {
  showDataProfile, addPostProfile, uploadProfilePost, updatePostText, uploadPostImg, deleteAllPost,
} from '../view-controller/controllerProfile.js';

import { showData } from '../configFirestore.js';

export default () => {
  const viewProfile = `
  <section class="profile-user">
    <header class="header-profile">
     <nav>
       <li class="menu-item">
          <img class="menu-logo-bio" src="imagenes/logo-bio.png" alt="">
        </li>
        <!-- <li class="menu-item">
          <a href="#/profile">
            <div>
             <img class="icon-user-min"src="imagenes/logo-bio.png">
              <p id="profileName"></p>
            </div>
          </a>
        </li> -->
        <li class="menu-item">
        <!-- <div class="hamburguer-menu-container">
            <img class="hamburguer-menu-img" src="imagenes/hamburguer-menu.png">
          </div>
          <div class="hamburguer-menu" style="display:none" >
            <a href="#/profile">
              <div>
                <p>Editar perfil</p>
              </div>
              </a> -->        
            <div id="close-btn" class="close-btn">
              <p>Cerrar sesión</p>
            </div>
            <div id="edit-btn" class="edit-btn">
            <p>Editar perfil</p>
          </div>
        </li>
      </nav>
    </header>
    <main>
       <section class="info-user">
        <div class="photo-cover">
          <div class="cover-upload">
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
                <img src="https://img.icons8.com/color/48/000000/image.png">
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
                <img src="imagenes/btn-share.png">
              </div>
          </div>

        </section>
        <section class="post-profile-wall">          
        </section>
      </section>
    
  </main>
  </section>
    `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view-profile');
  divElemt.innerHTML = viewProfile;

  // const menu = divElemt.querySelector('.hamburguer-menu');
  // const menuShow = divElemt.querySelector('.hamburguer-menu-show');
  // menu.addEventListener('click', () => {
  //   menuShow.classlist.remove('.hamburguer-menu');
  // });

  const closeBtn = divElemt.querySelector('#close-btn');

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
    window.location.hash = '#/edit';
  });

  const profileName = divElemt.querySelector('#profileName');
  const photoUser = divElemt.querySelector('#photoUser');
  const photoCover = divElemt.querySelector('#photoCover');

  showDataProfile(profileName, photoUser, photoCover);

  // Mostrar post.
  const wall = divElemt.querySelector('.post-profile-wall');
  const previewPostImg = divElemt.querySelector('#preview-post-img');
  firebase.firestore().collection('post')
    // .where('privacyPost', '==', 'public')
    .orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      wall.innerHTML = '';
      previewPostImg.innerHTML = '';
      const postData = [];
      querySnapshot.forEach((post) => {
        postData.push({
          date: post.data().date,
          id: post.data().id,
          idUser: post.data().idUser,
          contentPost: post.data().contentPost,
          imgPost: post.data().photoPost,
        });
      });
      console.log('Posts: ', postData);
      postData.forEach((element) => {
        const idPost = element.id;
        const postImg = element.imgPost;
        const idUserPost = element.idUser;
        console.log('idUserPost - Element: ', idUserPost);
        console.log('Element: ', element);


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
                      <p class="post-date"> El ${element.date} 🌎 </p>
                      <p></p>
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
                <img src="">
                <img src="">
              </div>
                </section>
          `;

            const user = firebase.auth().currentUser;
            console.log('User:', user);
            if (user.uid === element.idUser) {
            // Editar post
              const editPostBtn = post.querySelector('.post-edit-btn');
              editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.5x/edit.png>';
              const editPostText = post.querySelector('.post-content');

              editPostBtn.addEventListener('click', () => {
                console.log('clic en edit');
                editPostText.setAttribute('contenteditable', 'true');
                editPostBtn.innerHTML = '';
                const savetextPostBtn = post.querySelector('.post-btn-savetext');
                savetextPostBtn.innerHTML = '<img src=https://img.icons8.com/dusk/0.5x/save.png>';
                const inputfileBtn = post.querySelector('.img-input-file');
                inputfileBtn.innerHTML = '<input class = "img-post-edit-input" value = "" type="file" id = "img-post-update">';
                const imgPostEditBtn = post.querySelector('#img-post-update');
                // Cambiar texto del post
                savetextPostBtn.addEventListener('click', (e) => {
                  savetextPostBtn.innerHTML = '';
                  editPostText.setAttribute('contenteditable', 'false');
                  editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.5x/edit.png>';
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
              deletePostBtn.innerHTML = '<img src= https://img.icons8.com/dusk/0.5x/delete-forever.png>';
              deletePostBtn.addEventListener('click', () => {
                console.log('delete clic');
                deleteAllPost(idPost, postImg);
              });
            }

            wall.appendChild(post);
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      });
    });

  //       // Mostrar post.
  //   const wall = divElemt.querySelector('.post-profile-wall');
  //   const previewPostImg = divElemt.querySelector('#preview-post-img');
  //   // const previewPostVideo = divElemt.querySelector('#preview-post-video');
  //   firebase.firestore().collection('post').orderBy('date', 'desc')
  //     .onSnapshot((querySnapshot) => {
  //       wall.innerHTML = '';
  //       previewPostImg.innerHTML = '';
  //       // previewPostVideo.innerHTML = '';
  //       // divElemt.querySelector('.content-post-text').value = '';
  //       const postData = [];
  //       querySnapshot.forEach((post) => {
  //         postData.push({
  //           id: post.data().id,
  //           idUser: post.data().idUser,
  //           contentPost: post.data().contentPost,
  //           date: post.data().date,
  //           imgPost: post.data().photoPost,
  //           // videoPost: post.data().videoPost,
  //         });
  //       });
  //       console.log('Posts: ', postData);
  //       postData.forEach((element) => {
  //         const idPost = element.id;
  //         const postImg = element.imgPost;
  //         showData(element.idUser).then((doc) => {
  //           const nameUserPost = doc.data().name;
  //           const photoUserPost = doc.data().photo;
  //           if (doc.exists) {
  //             console.log('doc', doc.data());
  //             // const postVideo = element.videoPost;
  //             const post = document.createElement('div');
  //             post.classList.add('post');
  //             let postShowImg = '';
  //             // let postShowVideo = '';
  //             if (postImg === undefined) {
  //               postShowImg = '';
  //             } else {
  //               postShowImg = postImg;
  //             }
  //             // if (postVideo === undefined) {
  //             //   postShowVideo = '';
  //             //   console.log(postShowVideo);
  //             // } else {
  //             //   postShowVideo = postVideo;
  //             //   console.log(postShowVideo);
  //             // }
  //             const containerPost = `
  //                 <section class="post-user-wall">
  //                   <div class="post-header">
  //                     <div class = "post-header-photo">
  //                       <img class="photo-user-post" src='${photoUserPost}'>
  //                     </div>
  //                     <div class="post-header-info">
  //                       <p class="post-name"> ${nameUserPost}  </p>
  //                       <p class="post-date"> El ${element.date} </p>
  //                     </div>
  //                     <div class="post-option-btn">
  //                       <p class="post-edit-btn">Editar</p>
  //                       <p class="post-delete-btn">Eliminar</p>
  //                     </div>
  //                   </div>
  //               <div class="post-body">
  //               <div class="post-option-save-btn">
  //                 <p class="post-content"> ${element.contentPost}</p>
  //                 <p class="post-btn-savetext"></p>
  //               </div>

  //             <div class = "img-post-upload">
  //             <label for = "img-post-update">
  //               <p id = "img-post-edit">  <img class="photo-post-img" src='${postShowImg}'></p>
  //             </label>
  //             <div class="img-input-file"></div>
  //             </div>
  //                 <p class="post-btn-saveimg."></p>
  //               </div>
  // <!--
  //               <div class = "video-post-upload">
  //             <label for = "video-post-update">
  //             <p id = "video-post-edit">  <video class="photo-post-video" src=  controls autoplay loop></p>
  //             </label>
  //             <div class="video-input-file"></div>
  //             </div>
  //                 <p class="post-btn-savevideo."></p>
  //               </div>
  // -->

  //               <div class="post-footer">
  //                 <img src="">
  //                 <img src="">
  //               </div>
  //                 </section>
  //           `;
  //             post.innerHTML = containerPost;
  //             // Editar post
  //             const editPostBtn = post.querySelector('.post-edit-btn');
  //             editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.5x/edit.png>';
  //             const editPostText = post.querySelector('.post-content');

  //             editPostBtn.addEventListener('click', () => {
  //               console.log('clic en edit');
  //               editPostText.setAttribute('contenteditable', 'true');
  //               editPostBtn.innerHTML = '';
  //               const savetextPostBtn = post.querySelector('.post-btn-savetext');
  //               savetextPostBtn.innerHTML = '<img src=https://img.icons8.com/dusk/0.5x/save.png>';
  //               const inputfileBtn = post.querySelector('.img-input-file');
  //               inputfileBtn.innerHTML = '<input class = "img-post-edit-input" value = "" type="file" id = "img-post-update">';
  //               const imgPostEditBtn = post.querySelector('#img-post-update');
  //               // Cambiar texto del post
  //               savetextPostBtn.addEventListener('click', (e) => {
  //                 savetextPostBtn.innerHTML = '';
  //                 editPostText.setAttribute('contenteditable', 'false');
  //                 editPostBtn.innerHTML = '<img src = https://img.icons8.com/dusk/0.5x/edit.png>';
  //                 updatePostText(idPost, editPostText.textContent);
  //               });
  //               // Cambiar imagen del post
  //               const imgPostEdit = post.querySelector('#img-post-edit');
  //               const postImgUp = post.querySelector('#img-post-update');
  //               imgPostEditBtn.addEventListener('change', () => {
  //                 uploadPostImg(idPost, postImgUp, imgPostEdit);
  //               });
  //             });
  //             // Borrar post
  //             const deletePostBtn = post.querySelector('.post-delete-btn');
  //             deletePostBtn.innerHTML = '<img src= https://img.icons8.com/dusk/0.5x/delete-forever.png>';
  //             deletePostBtn.addEventListener('click', () => {
  //               console.log('delete clic');
  //               deleteAllPost(idPost, postImg);
  //             });
  //             wall.appendChild(post);
  //           }
  //         }).catch((error) => {
  //           console.log('Error getting document:', error);
  //         });
  //       });
  //     });

  const btnAddPost = divElemt.querySelector('.post-user-btn');
  btnAddPost.addEventListener('click', (e) => {
    // wall.innerHTML = '';
    const contentPostText = divElemt.querySelector('.content-post-text').value;
    const contentPostImg = divElemt.querySelector('#post-image-input').files[0];
    const privacityPost = divElemt.querySelector('.privacity-post').value;
    console.log('privacidad:', privacityPost);
    // const contentPostVideo = divElemt.querySelector('#post-video-input').files[0];
    console.log(contentPostImg);
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
