/* eslint-disable no-unused-vars */

import { closeSesion } from '../configFirebase.js';

import { showDataProfile, addPostProfile } from '../view-controller/controllerProfile.js';

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
          </div>
          <div class="post-user-options">
              <div class="post-user-image">
                <label for="file-input">
                <img src="https://img.icons8.com/color/48/000000/image.png">
                </label>
                <input type="file" id="file-input">
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

  // const getPost = () => firebase.firestore().collection('post')
  //   .orderBy('date', 'desc').onSnapshot((querySnapshot) => {
  //     const data = [];
  //     console.log('entra');
  //     querySnapshot.docs.forEach((post) => {
  //       data.push({
  //         id: post.data().id,
  //         idUser: post.data().idUser,
  //         contentPost: post.data().contentPost,
  //         date: post.data().date,
  //       });
  //     });
  //     console.log(data);
  //     return data;
  //   });

  // console.log(getPost());
  const wall = divElemt.querySelector('.post-profile-wall');

  firebase.firestore().collection('post').orderBy('date', 'desc')
    .onSnapshot((querySnapshot) => {
      wall.innerHTML = '';
      divElemt.querySelector('.content-post-text').value = '';
      const postData = [];
      querySnapshot.forEach((post) => {
        postData.push({
          id: post.data().id,
          idUser: post.data().idUser,
          contentPost: post.data().contentPost,
          date: post.data().date,
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

  //   const btnAddPost = divElemt.querySelector('.post-user-btn');
  //   btnAddPost.addEventListener('click', () => {
  //     const {uid , name} =  firebase.auth().currentUser; si se desear llamar  solo se coloca uid
  //     const user = firebase.auth().currentUser.uid;
  //     const firestore = firebase.firestore();
  //     const idPost = user + Math.floor(Math.random() * 10000);
  //     console.log(idPost);
  //     const docRef = firestore.collection('post').doc(idPost);
  //     console.log('DocRef post', docRef);
  //     console.log('Me hiciste clic jijij');
  //     const contentPostText = divElemt.querySelector('.content-post-text').value;
  //     console.log('Post:', contentPostText);
  //     const datePost = new Date();
  //     console.log(datePost);
  //     docRef.set({
  //       id: idPost,
  //       idUser: user,
  //       contentPost: contentPostText,
  //       date: datePost,
  //     }).then(() => {
  //       console.log('Post exitoso');
  //       const wall = divElemt.querySelector('.post-profile-wall');
  //       const post = document.createElement('div');
  //       post.classList.add('post');
  //       post.innerHTML = `
  //       <section class="post-user-wall">
  //       <div class="post-header">
  //       <p>Publicado por </p>
  //     </div>
  //     <div class="post-body">
  //       <p>Bazinga!!!!!!!<br>Harry Potter es el mejor</p>
  //     </div>
  //     <div class="post-footer">
  //       <img src="">
  //       <img src="">
  //     </div>
  //       </section>

  // `;

  //       wall.appendChild(post);
  //     }).catch((error) => {
  //       console.log('Error:', error);
  //     });
  //   });

  const btnAddPost = divElemt.querySelector('.post-user-btn');
  btnAddPost.addEventListener('click', () => {
    // wall.innerHTML = '';
    const contentPostText = divElemt.querySelector('.content-post-text').value;
    addPostProfile(contentPostText);
  });
  return divElemt;
};
