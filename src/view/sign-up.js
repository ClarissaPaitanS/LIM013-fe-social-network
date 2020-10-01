/* eslint-disable no-unused-vars */

import { signupUser, googleLogin, facebookLogin } from '../configFirebase.js';

export default () => {
  const viewSignUp = `
  <section class='title-hide'> 
    <h1 > Bio Thani</h1> 
  </section>
<section class="signUp-user">
<section class="signUp-user-header">
      <img class="mindfulness" src="imagenes/undraw_register.svg">
      </section>
<section class="signUp-user-container">
<section class="signUp-user-title">
<h1>Bio Thani</h1>
</section>
<section class= "signUp-user-form">
<p class="welcome">¡Registrarse es fácil y rápido!</p>
<form class="signUp-form">
    <input class="signUp-form-input" type="text" id="name-signUp" placeholder="Usuario">
    <input class="signUp-form-input" type="email" id="email-signUp" placeholder="Email">
    <input class="signUp-form-input" type="password" id="password-signUp" placeholder="Password">

    <button type="submit" id="signUp-btn" class="signUp-form-btn">Regístrate</button>
    </form>

    <p class="or">O bien ingresa con...</p>
  <section class="social"> 
    <a id="facebookSignUp"><img class="social-btn" src="imagenes/facebook-logo.png" alt="Facebook"></img></a>
    <a id="googleSignUp"><img class="social-btn" src="imagenes/google-logo.png" alt="Google"></img></a>
  </section>


    <p>¿Ya tienes una cuenta?</p> <a href="#">Iniciar sesión</a>
</section>

</section>

</section>


`;
  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view');
  divElemt.innerHTML = viewSignUp;

  const signUpBtn = divElemt.querySelector('.signUp-form');
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
