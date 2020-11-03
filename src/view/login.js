/* eslint-disable no-unused-vars */

import { loginUser, googleLogin, facebookLogin } from '../configFirebase.js';

export default () => {
  const viewLogin = `
  <section class='title-hide'> 
    <img class="bio-thani" src="imagenes/logo-long-bio.png">
  </section>
  <section class="login-user">
  <section class="login-user-header">
      <img class="mindfulness" src="imagenes/img-login.jpg">
  </section>

  <section class="login-user-container">
    <section class="login-user-title">
      <h1> <img class="bio-thani" src="imagenes/logo-long-bio.png"></h1>
    </section>
    <section class = "login-user-form">
      <p class="welcome">¡Bienvenidx!</p>
      <form id="login-form" class="login-form" >
        <input class="login-form-input" type="email" id="email-login" placeholder="Email">
        <input class="login-form-input" type="password" id="password-login" placeholder="Password">
        <p class = "error-login"></p>

        <button type="submit" class="login-form-btn" id="login-btn">Inicia sesión</button>       
      </form>
    <p class="or">O bien ingresa con...</p>
    <section class="social">  
      <a id="facebookLogin"><img class="social-btn" src="imagenes/facebook-logo.png" alt="Facebook"></img></a>
      <a id="googleLogin"><img class="social-btn" src="imagenes/google-logo.png" alt="Google"></img></a>
    </section> 
    <p>¿No tienes una cuenta?</p> <a href="#/signUp">Regístrate</a>
  </section>

  </section>

  </section>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view');
  divElemt.innerHTML = viewLogin;
  const loginBtn = divElemt.querySelector('#login-form');
  loginBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordLogin = divElemt.querySelector('#password-login');
    const emailLogin = divElemt.querySelector('#email-login');

    loginUser(emailLogin.value, passwordLogin.value)
      .then((userCredential) => {
        window.location.hash = '#/home';
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 'auth/wrong-password') {
          divElemt.querySelector('.error-login').innerHTML = 'La contraseña es inválida';
        } else {
          divElemt.querySelector('.error-login').innerHTML = 'El correo no está registrado';
        }
      });
  });

  function registrarUsuariosGmail(id) {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('user').doc(id);
    const nameGoogle = firebase.auth().currentUser.providerData[0].displayName;
    const photoGoogle = firebase.auth().currentUser.providerData[0].photoURL;
    const emailGoogle = firebase.auth().currentUser.providerData[0].email;
    docRef.set({
      name: nameGoogle,
      email: emailGoogle,
      photo: photoGoogle,
      photoCover: 'imagenes/user-cover.jpg',
    })
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  //  Google Login
  const googleBtn = divElemt.querySelector('#googleLogin');
  googleBtn.addEventListener('click', () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithPopup(provider)
    googleLogin()
      .then((result) => {
        const user = firebase.auth().currentUser.uid;
        const firestore = firebase.firestore();
        const docRef = firestore.collection('user').doc(user);

        docRef.get().then((doc) => {
          if (doc.exists) {
            window.location.hash = '#/home';
          } else {
            registrarUsuariosGmail(user);
          }
        })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function registerUserFacebook(userData, photoData) {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('user').doc(userData.uid);
    const nameFacebook = userData.displayName;
    const emailFacebook = userData.email;
    docRef.set({
      name: nameFacebook,
      email: emailFacebook,
      photo: photoData,
      photoCover: 'imagenes/user-cover.jpg',
    })
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  const facebookBtn = divElemt.querySelector('#facebookLogin');
  facebookBtn.addEventListener('click', () => {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // auth.signInWithPopup(provider)
    facebookLogin()
      .then((result) => {
        const user = result.user;
        const photo = result.additionalUserInfo.profile.picture.data.url;
        const firestore = firebase.firestore();
        const docRef = firestore.collection('user').doc(user.uid);
        docRef.get().then((doc) => {
          if (doc.exists) {
            window.location.hash = '#/home';
          } else {
            registerUserFacebook(user, photo);
            // doc.data() will be undefined in this case
          }
        })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return divElemt;
};
