/* eslint-disable no-unused-vars */

import { auth } from '../configFirebase.js';

export default () => {
  const viewLogin = `
  <section class="login-user">
    <header>
      <img class="mindfulness" src="imagenes/undraw_mindfulness_scgo.svg" alt="mujer-yoga">
      <h1>NutriFitness</h1>
      <p>¡Bienvenidx!</p>
    </header>
  <section>
      <form id="login-form" >
        <input class="login-form-input" type="email" id="email-login" placeholder="Email">
        <input class="login-form-input" type="password" id="password-login" placeholder="Password">
        <button type="submit" class="login-form-btn" id="login-btn">Inicia sesión</button>
      </form>
    <p class="">O bien ingresa con...</p>
    <section class="social">  
      <a id="facebookLogin"><img class="social-btn" src="imagenes/fb-logo.jpeg" alt="Facebook"></img></a>
      <a id="googleLogin"><img class="social-btn" src="imagenes/google-logo.jpg" alt="Google"></img></a>
    </section> 
    <p>¿No tienes una cuenta?</p> <a href="#/signUp">Regístrate</a>
  </section>
  </section>`;

  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewLogin;

  const loginBtn = divElemt.querySelector('#login-form');
  loginBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    const passwordLogin = divElemt.querySelector('#password-login');
    const emailLogin = divElemt.querySelector('#email-login');
    auth
      .signInWithEmailAndPassword(emailLogin.value, passwordLogin.value)
      .then((userCredential) => {
        console.log('singIn');
      });
  });

  //  Google Login
  const googleBtn = divElemt.querySelector('#googleLogin');
  googleBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
        console.log('google sign in');
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const facebookBtn = divElemt.querySelector('#facebookLogin');
  facebookBtn.addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
        console.log('facebook sign in');
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return divElemt;
};
