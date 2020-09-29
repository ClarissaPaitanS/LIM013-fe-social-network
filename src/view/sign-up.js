/* eslint-disable no-unused-vars */

import { signupUser, googleLogin, facebookLogin } from '../configFirebase.js';

export default () => {
  const viewSignUp = `
<section class="signUp-user">
<header>
      <img class="mindfulness" src="imagenes/undraw_relaxing_at_home_9tyc.svg">
      <h1>NutriFitness</h1>
      <p>¡Registrarse es fácil y rápido!</p>
</header>
<form id="signUp-form">
    <input class="signUp-form-input" type="text" id="name-signUp" placeholder="Usuario">
    <input class="signUp-form-input" type="email" id="email-signUp" placeholder="Email">
    <input class="signUp-form-input" type="password" id="password-signUp" placeholder="Password">

    <button type="submit" id="signUp-btn" class="signUp-form-btn">Regístrate</button>
    </form>

    <p class="">O bien ingresa con...</p>
  <section class="social"> 
    <a id="facebookSignUp"><img class="social-btn" src="imagenes/fb-logo.jpeg" alt="Facebook"></img></a>
    <a id="googleSignUp"><img class="social-btn" src="imagenes/google-logo.jpg" alt="Google"></img></a>
  </section>


    <p>¿Ya tienes una cuenta?</p> <a href="#">Iniciar sesión</a>
</section>


`;
  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewSignUp;

  const signUpBtn = divElemt.querySelector('#signUp-form');
  signUpBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = divElemt.querySelector('#password-signUp');
    const email = divElemt.querySelector('#email-signUp');

    signupUser(email.value, password.value)
      .then((userCredential) => {
        window.location.hash = '#/profile';
        console.log('singUp');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //  Google SignUp
  const googleBtn = divElemt.querySelector('#googleSignUp');
  googleBtn.addEventListener('click', () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // auth.signInWithPopup(provider)
    googleLogin()
      .then((result) => {
        // console.log(result);
        window.location.hash = '#/profile';
        console.log('google sign in');
      })
      .catch((err) => {
        console.log(err);
      });
  });


  const facebookBtn = divElemt.querySelector('#facebookSignUp');
  facebookBtn.addEventListener('click', () => {
    // const provider = new firebase.auth.FacebookAuthProvider();
    // auth.signInWithPopup(provider)
    facebookLogin()
      .then((result) => {
        // console.log(result);
        window.location.hash = '#/profile';
        console.log('facebook sign in');
      })
      .catch((err) => {
        console.log(err);
      });
  });


  return divElemt;
};
