/* eslint-disable no-param-reassign */
import {
  showData, updateName, updatePassword, updatePhoto, updateCover,
} from '../configFirestore.js';

import { filePhotoUser, filePhotoCover } from '../configStorage.js';

export const showDataEdit = (profileName, profileEmail, photoUser, photoCover) => {
  const user = firebase.auth().currentUser.uid;

  showData(user).then((doc) => {
    if (doc.exists) {
      const nameUserProfile = doc.data().name;
      const emailUserProfile = doc.data().email;
      const photoUserProfile = doc.data().photo;
      const coverUserProfile = doc.data().photoCover;
      photoUser.innerHTML = `<img  src='${photoUserProfile}'>`;
      photoCover.innerHTML = `<img  src='${coverUserProfile}'>`;
      profileName.value = nameUserProfile;
      profileEmail.innerHTML = `<input class='edit-form-input'value='${emailUserProfile}' disabled>`;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};

export const updateDataName = (name, updateMessageName) => {
  const user = firebase.auth().currentUser.uid;
  if (name !== '') {
    updateName(user, name).then(() => {
      console.log('Update name');
      updateMessageName.innerHTML = 'Nombre actualizado';
    })
      .catch((error) => {
        console.log('An error happened', error);
        updateMessageName.innerHTML = 'Ingrese un nombre válido';
      });
  }
};

export const updateDataPassword = (editPassword, updateMessagePassword) => {
  if (editPassword !== '') {
    updatePassword(editPassword).then(() => {
      console.log('Update successful password');
      updateMessagePassword.innerHTML = 'Contraseña actualizada';
    }).catch((err) => {
      console.log('Error password', err);
      updateMessagePassword.innerHTML = 'Ingrese una contraseña válida';
    });
  }
};

export const uploadProfileImg = (photoUp, photoUser) => {
  const filePhoto = photoUp.files[0];
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
    const filePhotoRef = filePhotoUser(filePhoto);
    filePhotoRef.on('state_changed', (snapshot) => {
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
      filePhotoRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('Imagen Subida a Firebase', downloadURL);
        const photoURL = downloadURL;
        const user = firebase.auth().currentUser.uid;
        updatePhoto(user, photoURL).then(() => {
          console.log('Update');
        })
          .catch((error) => {
            console.log('An error happened', error);
          });
      });
    });
  }
};

export const uploadProfileCover = (coverUp, coverUser) => {
  const user = firebase.auth().currentUser.uid;
  const fileCover = coverUp.files[0];

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
    const filePhotoCoverRef = filePhotoCover(fileCover);
    filePhotoCoverRef.on('state_changed', (snapshot) => {
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
      filePhotoCoverRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('Imagen Subida a Firebase', downloadURL);
        const photoURL = downloadURL;
        updateCover(user, photoURL).then(() => {
          console.log('Update');
        })
          .catch((error) => {
            console.log('An error happened', error);
          });
      });
    });
  }
};
