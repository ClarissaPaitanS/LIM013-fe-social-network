/* eslint-disable no-unused-vars */

import { signupUser, googleLogin, facebookLogin } from '../configFirebase.js';
import { addUser } from '../configFirestore.js';

export default () => {
  const viewSignUp = `
  <section class='title-hide'> 
  <img class="bio-thani" src="imagenes/logo-long-bio.png">
  </section>
<section class="signUp-user">
<section class="signUp-user-header">
      <img class="mindfulness" src="imagenes/undraw_register.svg">
      </section>
<section class="signUp-user-container">
<section class="signUp-user-title">
<h1> <img class="bio-thani" src="imagenes/logo-long-bio.png"></h1>
</section>
<section class= "signUp-user-form">
<p class="welcome">¡Registrarse es fácil y rápido!</p>
<form class="signUp-form">
    <input class="signUp-form-input" type="text" id="name-signUp" placeholder="Usuario">
    <input class="signUp-form-input" type="email" id="email-signUp" placeholder="Email">
    <input class="signUp-form-input" type="password" id="password-signUp" placeholder="Password">

    <button type="submit" id="" class="signUp-form-btn">Regístrate</button>
</form>

  <!-- <p class="or">O bien ingresa con...</p>
  <section class="social"> 
    <a id="facebookSignUp"><img class="social-btn" src="imagenes/facebook-logo.png" alt="Facebook"></img></a>
    <a id="googleSignUp"><img class="social-btn" src="imagenes/google-logo.png" alt="Google"></img></a>
  </section>-->


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
      .then(() => {
        const user = firebase.auth().currentUser.uid;
        const nameSignUp = divElemt.querySelector('#name-signUp');
        const emailSignUp = divElemt.querySelector('#email-signUp');
        const nameSave = nameSignUp.value;
        const emailSave = emailSignUp.value;

        return addUser(user, nameSave, emailSave);

      })
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return divElemt;
};
