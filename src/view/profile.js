/* eslint-disable no-unused-vars */

import {
  showDataEdit, updateDataName, updateDataPassword, uploadProfileImg, uploadProfileCover,
} from '../view-controller/controllerProfile.js';

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

  return divElemt;
};
