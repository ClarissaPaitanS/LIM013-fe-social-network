/* eslint-disable no-unused-vars */

// import {editUser} from '../configFirebase.js';

export default () => {
  const viewEdit = `
  <section class="profile-user">
  <header class="header-profile">
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
      <div class = "photo-upload"> 
          <label for = "photo-up">
            <p id = "photo-edit"> <img  src="imagenes/user-perfil.jpg"  alt ="Click aquí para subir tu foto" title ="Click aquí para subir tu foto"></p>
          </label>
          <input class = "edit-form-input" value = "" type="file" id = "photo-up">
      </div>
      <form class="edit-form">
        <input class="edit-form-input" value= "" type="text" id="name-edit"  >
        <!-- <input class="edit-form-input" value= "" type="email" id="email-edit" > -->
        <input class="edit-form-input" value= "" type="password" id="password-edit">
        <button type="submit" id="" class="edit-form-btn">Actualizar</button>
      </form>
    </section>
  </main>
  </section>

`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view');
  divElemt.innerHTML = viewEdit;

  function mostrarDatosProvider() {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser.uid;
    const docRef = firestore.collection('user').doc(user);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        console.log(doc.data().name);
        const nameUserProfile = doc.data().name;
        // const emailUserProfile = doc.data().email;
        const photoUserProfile = doc.data().photo;
        const profileName = divElemt.querySelector('#name-edit');
        // const profileEmail = divElemt.querySelector('#email-edit');
        const photoUser = divElemt.querySelector('#photo-edit');
        photoUser.innerHTML = `<img  src='${photoUserProfile}'>`;
        profileName.value = nameUserProfile;
        // profileEmail.value = emailUserProfile;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
  }

  mostrarDatosProvider();

  const nameEdit = divElemt.querySelector('#name-edit');
  // const emailEdit = divElemt.querySelector('#email-edit');
  const editFormBtn = divElemt.querySelector('.edit-form-btn');
  const homeBtn = divElemt.querySelector('#profile-btn');
  homeBtn.addEventListener('click', () => { window.location.hash = '#/profile'; });

  // Cambio de datos
  editFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('hola');
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser.uid;
    const docRef = firestore.collection('user').doc(user);
    // const editPasword = divElemt.querySelector('#password-edit').value;

    console.log(user);
    console.log(docRef);

    docRef.update({
      name: nameEdit.value,
      // email: emailEdit.value,
      // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(() => {
      console.log('Update');
    })
      .catch((error) => {
        console.log('An error happened', error);
      });

    // console.log(editPasword);


    // firebase.auth().currentUser.updateEmail(emailEdit.value).then(() => {
    //   console.log('Update correo successful');
    // }).catch((error) => {
    //   console.log('Error email');
    // });

    firebase.auth().currentUser.updatePassword('12345678').then(() => {
      console.log('Update successful');
    }).catch((err) => {
      console.log('Error password');
    });
  });

  const photoUp = divElemt.querySelector('#photo-up');
  // const photoUser = divElemt.querySelector('#photo-edit');
  console.log(photoUp);
  const photoUser = divElemt.querySelector('#photo-edit');
  photoUp.addEventListener('change', (e) => {
    console.log(photoUp.files[0]);

    const reader = new FileReader();

    reader.onload = function () {
      // const preview = document.getElementById('preview');
      const image = document.createElement('img');

      image.src = reader.result;

      photoUser.innerHTML = '';
      photoUser.append(image);
    };

    reader.readAsDataURL(photoUp.files[0]);
  });
  return divElemt;
};
