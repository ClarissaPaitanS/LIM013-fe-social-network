export default () => {
  const viewSignin = `
<section class="signin-user">
<header>
      <img class="mindfulness" src="imagenes/undraw_relaxing_at_home_9tyc.svg">
      <h1>NutriFitness</h1>
      <p>¡Registrarse es fácil y rápido!</p>
</header>
<form class="signin-form">
    <input class="signin-form-input" type="text" id="name-signin" placeholder="Usuario">
    <input class="signin-form-input" type="email" id="email-signin" placeholder="Email">
    <input class="signin-form-input" type="password" id="password-signin" placeholder="Password">

    <button id="signin-btn" class="signin-form-btn">Regístrate</button>
    </form>

    <p class="">O bien ingresa con...</p>
  <section class="social"> 
    <a id="btnFacebook"><img class="social-btn" src="imagenes/fb-logo.jpeg" alt="Facebook"></img></a>
    <a id="btnGoogle"><img class="social-btn" src="imagenes/google-logo.jpg" alt="Google"></img></a>
  </section>


    <p>¿Ya tienes una cuenta?</p> <a href="#">Iniciar sesión</a>
</section>



`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewSignin;
  return divElemt;
};
