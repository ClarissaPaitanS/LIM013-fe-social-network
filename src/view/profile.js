/* eslint-disable no-unused-vars */

import { closeSesion } from '../configFirebase.js';

import {
  showDataProfile, addPostProfile, uploadProfilePost,
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
              <div class="post-user-video">
                <label for="post-video-input">
                  <img src="https://img.icons8.com/fluent/344/video.png"> 
                </label>
                <input type="file" id="post-video-input">
              </div>
              <div class="post-user-btn">
                <img src="https://img.icons8.com/color/2x/plus--v1.png">
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

  const wall = divElemt.querySelector('.post-profile-wall');
  const previewPostImg = divElemt.querySelector('#preview-post-img');
  const previewPostVideo = divElemt.querySelector('#preview-post-video');

  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      wall.innerHTML = '';
      previewPostImg.innerHTML = '';
      previewPostVideo.innerHTML = '';
      divElemt.querySelector('.content-post-text').value = '';
      const postData = [];
      querySnapshot.forEach((post) => {
        postData.push({
          id: post.data().id,
          idUser: post.data().idUser,
          contentPost: post.data().contentPost,
          date: post.data().date,
          imgPost: post.data().photoPost,
        });
      });
      console.log('Posts: ', postData);

      postData.forEach((element) => {
        showData(element.idUser).then((doc) => {
          if (doc.exists) {
            const nameUserPost = doc.data().name;
            const photoUserPost = doc.data().photo;
            const post = document.createElement('div');
            post.classList.add('post');
            let postShowImg = '';
            if (element.imgPost === undefined) {
              postShowImg = '';
            } else {
              postShowImg = element.imgPost;
            }
            post.innerHTML = `
                <section class="post-user-wall">
                  <div class="post-header">
                    <div class = "post-header-photo">
                    <img class="photo-user-post" src='${photoUserPost}'> 
                    </div>
                    <div class="post-header-info">
                      <p class="post-name"> ${nameUserPost}  </p>
                      <p class="post-date"> El ${element.date} </p>
                    </div>
                  </div>
              <div class="post-body">
                <p class="post-content"> ${element.contentPost}</p>
                <img class="photo-post-img" src='${postShowImg}'>
              </div>
              <div class="post-footer">
                <img src="">
                <img src="">
              </div>
                </section>
          `;

            wall.appendChild(post);
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
      });
    });


  const btnAddPost = divElemt.querySelector('.post-user-btn');
  btnAddPost.addEventListener('click', () => {
    // wall.innerHTML = '';
    const contentPostText = divElemt.querySelector('.content-post-text').value;
    const contentPostImg = divElemt.querySelector('#post-image-input').files[0];
    const contentPostVideo = divElemt.querySelector('#post-video-input').files[0];
    console.log(contentPostImg);
    addPostProfile(contentPostText, contentPostImg, contentPostVideo);
  });


  const postImageInput = divElemt.querySelector('#post-image-input');
  postImageInput.addEventListener('change', (e) => {
    uploadProfilePost(postImageInput, previewPostImg);
  });

  const postVideoInput = divElemt.querySelector('#post-video-input');
  postVideoInput.addEventListener('change', (e) => {
    uploadProfileVideoPost(postVideoInput, previewPostVideo);
  });


  return divElemt;
};
