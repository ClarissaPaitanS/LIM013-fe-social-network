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
        window.location.hash = '#/profile';
        console.log('signIn');
      })
      // .then((data) => {
      //   console.log(data.message);
      // })
      .catch((err) => {
        console.log(err);
        if (err.code === 'auth/wrong-password') {
          divElemt.querySelector('.error-login').innerHTML = 'La contraseña es inválida';
        } else {
          divElemt.querySelector('.error-login').innerHTML = 'El correo no esta registrado';
        }
      });
  });

  function registrarUsuariosGmail(id) {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('user').doc(id);
    const nameGoogle = firebase.auth().currentUser.providerData[0].displayName;
    const photoGoogle = firebase.auth().currentUser.providerData[0].photoURL;
    const emailGoogle = firebase.auth().currentUser.providerData[0].email;
    console.log(docRef);
    console.log(nameGoogle);
    console.log(emailGoogle);
    console.log(photoGoogle);
    docRef.set({
      name: nameGoogle,
      email: emailGoogle,
      photo: photoGoogle,
    })
      .then(() => {
        console.log('datos guardados');
        window.location.hash = '#/profile';
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
        // console.log(result);
        // window.location.hash = '#/profile';
        console.log('google sign in');
        const user = firebase.auth().currentUser.uid;
        console.log(user);
        console.log(firebase.auth());
        console.log('Google ID:', user);

        registrarUsuariosGmail(user);
        // if (user !== '') {
        //   window.location.hash = '#/profile';
        // } else {
        //   registrarUsuariosGmail(user);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function registerUserFacebook(userData, photoData) {
    const firestore = firebase.firestore();
    const docRef = firestore.collection('user').doc(userData.uid);
    const nameFacebook = userData.displayName;
    // const photoFacebook = userData.photoURL;
    const emailFacebook = userData.email;
    console.log(docRef);
    console.log(nameFacebook);
    // console.log(photoFacebook);
    console.log(emailFacebook);
    docRef.set({
      name: nameFacebook,
      email: emailFacebook,
      photo: photoData,
    })
      .then(() => {
        console.log('datos guardados');
        window.location.hash = '#/profile';
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
        console.log(result);
        const user = result.user;
        console.log(result.additionalUserInfo.profile.picture.data.url);
        const photo = result.additionalUserInfo.profile.picture.data.url;
        // const user = firebase.auth().currentUser.uid;
        // console.log(firebase.auth());
        // console.log('Facebook ID:', user);
        registerUserFacebook(user, photo);
        // window.location.hash = '#/profile';
        console.log('facebook sign in');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return divElemt;
};
