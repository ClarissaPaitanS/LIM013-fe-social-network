/* eslint-disable no-param-reassign */
import {
  showData, addPost, uploadPhotoPost, updatePost, updatePostImg,
} from '../configFirestore.js';
import { filePhotoPost } from '../configStorage.js';

export const showDataProfile = (profileName, photoUser, photoCover) => {
  const user = firebase.auth().currentUser.uid;
  showData(user).then((doc) => {
    if (doc.exists) {
      const nameUserProfile = doc.data().name;
      const photoUserProfile = doc.data().photo;
      console.log(photoUserProfile);
      const coverUserProfile = doc.data().photoCover;
      profileName.innerHTML = `${nameUserProfile}`;
      photoUser.innerHTML = `<img  src='${photoUserProfile}'>`;
      photoCover.innerHTML = `<img  src='${coverUserProfile}'>`;
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};

export const uploadProfilePost = (postImage, preview) => {
  const filePhoto = postImage.files[0];
  console.log(filePhoto);
  console.log(preview);
  const readerPost = new FileReader();
  console.log(readerPost);
  readerPost.onload = () => {
    const image = document.createElement('img');
    image.src = readerPost.result;
    // preview.innerHTML = '';
    preview.appendChild(image);
    console.log(readerPost);
  };
  readerPost.readAsDataURL(filePhoto);
};

// export const uploadProfileVideoPost = (postVideo, preview) => {
//   const fileVideo = postVideo.files[0];
//   console.log(fileVideo);
//   console.log(preview);
//   const readerPost = new FileReader();
//   console.log(readerPost);
//   readerPost.onload = () => {
//     const videoContainer = document.createElement('div');
//     videoContainer.innerHTML = `
//     <video src= '${readerPost.result}' controls autoplay loop>
//     `;
//     preview.appendChild(videoContainer);
//     console.log(readerPost);
//   };
//   readerPost.readAsDataURL(fileVideo);
// };

export const addPostProfile = (contentPost, postImg) => {
  const user = firebase.auth().currentUser.uid;
  // const {uid , name} =  firebase.auth().currentUser; si se desear llamar  solo se coloca uid
  // const firestore = firebase.firestore();
  const idPost = user + Math.floor(Math.random() * 10000);
  // const docRef = firestore.collection('post').doc(idPost);
  const datePost = new Date();
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dateMonth = datePost.getMonth();
  const dateYear = datePost.getFullYear();
  const dateDay = datePost.getDate();
  const dateHours = datePost.getHours();
  const dateMinutes = datePost.getMinutes();
  const datePostUser = `${dateDay} de ${months[dateMonth]} del ${dateYear} a las ${dateHours}:${dateMinutes}`;
  // Aqui
  const contentPostText = contentPost;
  const contentPostImg = postImg;
  // const contentPostVideo = postVideo;
  console.log(contentPostImg);
  const filePhoto = contentPostImg;
  // const fileVideo = contentPostVideo;
  // eslint-disable-next-line no-empty
  if (!filePhoto) {
    addPost(user, idPost, contentPostText, datePostUser).then(() => {
      console.log('Post exitoso');
    }).catch((error) => {
      console.log('Error:', error);
    });
  } else {
    const filePhotoRef = filePhotoPost(filePhoto);
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
        const photopostURL = downloadURL;
        uploadPhotoPost(user, idPost, photopostURL, contentPostText, datePostUser).then(() => {
          console.log('Update');
        })
          .catch((error) => {
            console.log('An error happened', error);
          });
      });
    });
  }
  // else if (fileVideo) {
  //   const fileVideoRef = fileVideoPost(fileVideo);
  //   fileVideoRef.on('state_changed', (snapshot) => {
  //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log(`Upload is ${progress}% done`);
  //     // eslint-disable-next-line default-case
  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED:
  //         console.log('Upload is paused');
  //         break;
  //       case firebase.storage.TaskState.RUNNING:
  //         console.log('Upload is running');
  //         break;
  //     }
  //   }, (error) => {
  //     console.log(error);
  //   }, () => {
  //     fileVideoRef.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //       console.log('Video Subido a Firebase', downloadURL);
  //       const videopostURL = downloadURL;
  //       uploadVideoPost(user, idPost, videopostURL, contentPostText, datePostUser).then(() => {
  //         console.log('Update');
  //       })
  //         .catch((error) => {
  //           console.log('An error happened', error);
  //         });
  //     });
  //   });
  // }
};

export const updatePostText = (idPost, editPostText) => {
  const post = idPost;
  console.log(post);
  updatePost(post, editPostText).then(() => {
    console.log('idPost', post);
    console.log('EditPost', editPostText);
    console.log('Update content');
  })
    .catch((error) => {
      console.log('An error happened', error);
    });
};
// photoUp, photoUser
export const uploadPostImg = (idPost, postImgUp, imgPostEdit) => {
  const filePhoto = postImgUp.files[0];
  const post = idPost;
  console.log(filePhoto);
  const reader = new FileReader();
  // eslint-disable-next-line func-names
  reader.onload = function () {
    const image = document.createElement('img');
    image.src = reader.result;
    imgPostEdit.innerHTML = '';
    imgPostEdit.append(image);
  };
  reader.readAsDataURL(filePhoto);
  // eslint-disable-next-line no-empty
  if (!filePhoto) {
  } else {
    // filePhotoUser
    const filePhotoRef = filePhotoPost(filePhoto);
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
        // const user = firebase.auth().currentUser.uid;
        // updatePhoto
        updatePostImg(post, photoURL).then(() => {
          console.log('Update');
        })
          .catch((error) => {
            console.log('An error happened', error);
          });
      });
    });
  }
};
