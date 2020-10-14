/* eslint-disable no-unused-vars */

// import {editUser} from '../configFirebase.js';


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
          <input class="edit-form-input" value= "" type="password" id="password-edit">
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

  function mostrarDatosProvider() {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser.uid;
    const docRef = firestore.collection('user').doc(user);

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        console.log(doc.data().name);
        const nameUserProfile = doc.data().name;
        const emailUserProfile = doc.data().email;
        const photoUserProfile = doc.data().photo;
        const coverUserProfile = doc.data().photoCover;
        const profileName = divElemt.querySelector('#name-edit');
        const profileEmail = divElemt.querySelector('#email-edit');
        const photoUser = divElemt.querySelector('#photo-edit');
        const photoCover = divElemt.querySelector('#cover-edit');
        photoUser.innerHTML = `<img  src='${photoUserProfile}'>`;
        photoCover.innerHTML = `<img  src='${coverUserProfile}'>`;
        profileName.value = nameUserProfile;
        // profileEmail.innerHTML = `${emailUserProfile}`;
        profileEmail.innerHTML = `<input class='edit-form-input'value='${emailUserProfile}' disabled>`;
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
    const editPasword = divElemt.querySelector('#password-edit').value;
    const updateMessageName = divElemt.querySelector('#update-message-name');
    console.log(user);
    console.log(docRef);
    if (nameEdit.value !== '') {
      docRef.update({
        name: nameEdit.value,
      // email: emailEdit.value,
      }).then(() => {
        console.log('Update name');
        updateMessageName.innerHTML = 'Nombre actualizado';
      })
        .catch((error) => {
          console.log('An error happened', error);
          updateMessageName.innerHTML = 'Ingrese un nombre válido';
        });
    }
    // firebase.auth().currentUser.updateEmail(emailEdit.value).then(() => {
    //   console.log('Update correo successful');
    // }).catch((error) => {
    //   console.log('Error email');
    // });

    if (editPasword !== '') {
      const updateMessagePassword = divElemt.querySelector('#update-message-password');
      firebase.auth().currentUser.updatePassword(editPasword).then(() => {
        console.log('Update successful password');
        updateMessagePassword.innerHTML = 'Contraseña actualizada';
      }).catch((err) => {
        console.log('Error password', err);
        updateMessagePassword.innerHTML = 'Ingrese una contraseña válida';
      });
    }
  });

  const photoUp = divElemt.querySelector('#photo-up');
  const photoUser = divElemt.querySelector('#photo-edit');
  console.log(photoUp);
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser.uid;
  const docRef = firestore.collection('user').doc(user);
  photoUp.addEventListener('change', (e) => {
    const storage = firebase.storage();
    console.log(photoUp.files[0]);

    const uploadProfileImg = () => {
      const filePhoto = photoUp.files[0];
      // const storageRef = storage.ref(`/userProfileImgs/${filePhoto.name}`);

      const reader = new FileReader();
      // eslint-disable-next-line func-names
      reader.onload = function () {
        const image = document.createElement('img');
        image.src = reader.result;
        photoUser.innerHTML = '';
        photoUser.append(image);
      };
      reader.readAsDataURL(filePhoto);
      // eslint-disable-next-line no-empty
      if (!filePhoto) {
      } else {
        const storageRef = storage.ref(`/userProfileImgs/${filePhoto.name}`);
        const uploadTask = storageRef.put(filePhoto);
        console.log(storageRef);
        console.log(uploadTask);
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          console.log(error);
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('Imagen Subida a Firebase', downloadURL);
            const photoURL = downloadURL;
            docRef.update({
              photo: photoURL,
            }).then(() => {
              console.log('Update');
            })
              .catch((error) => {
                console.log('An error happened', error);
              });
          });
        });
      }
    };
    uploadProfileImg();
  });

  // Cover Photo
  const coverUp = divElemt.querySelector('#cover-up');
  const coverUser = divElemt.querySelector('#cover-edit');
  console.log(photoUp);
  coverUp.addEventListener('change', (e) => {
    const storage = firebase.storage();
    console.log(coverUp.files[0]);

    const uploadProfileCover = () => {
      const fileCover = coverUp.files[0];
      // const storageRef = storage.ref(`/userProfileImgs/${filePhoto.name}`);

      const reader = new FileReader();
      // eslint-disable-next-line func-names
      reader.onload = function () {
        const image = document.createElement('img');
        image.src = reader.result;
        coverUser.innerHTML = '';
        coverUser.append(image);
      };
      reader.readAsDataURL(fileCover);
      // eslint-disable-next-line no-empty
      if (!fileCover) {
      } else {
        const storageRef = storage.ref(`/userProfileCoverImgs/${fileCover.name}`);
        const uploadTask = storageRef.put(fileCover);
        console.log(storageRef);
        console.log(uploadTask);
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
        }, (error) => {
          console.log(error);
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('Imagen Subida a Firebase', downloadURL);
            const photoURL = downloadURL;
            docRef.update({
              photoCover: photoURL,
            }).then(() => {
              console.log('Update');
            })
              .catch((error) => {
                console.log('An error happened', error);
              });
          });
        });
      }
    };
    uploadProfileCover();
  });

  return divElemt;
};
