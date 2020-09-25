export default () => {
  const viewLogin = `
  <section class="login-user">
    <header>
      <img class="mindfulness" src="imagenes/undraw_mindfulness_scgo.svg" alt="mujer-yoga">
      <h1>NutriFitness</h1>
      <p>¡Bienvenidx!</p>
    </header>
  <section>
      <form class="login-form" >
        <input class="login-form-input" type="email" id="email-login" placeholder="Email">
        <input class="login-form-input" type="password" id="password-login" placeholder="Password">
        <button class="login-form-btn" id="login-btn">Inicia sesión</button>
      </form>
    <p class="">O bien ingresa con...</p>
    <section class="social">  
      <a id="btnFacebook"><img class="social-btn" src="imagenes/fb-logo.jpeg" alt="Facebook"></img></a>
      <a id="btnGoogle"><img class="social-btn" src="imagenes/google-logo.jpg" alt="Google"></img></a>
    </section> 
    <p>¿No tienes una cuenta?</p> <a href="#/signIn">Regístrate</a>
  </section>
  </section>`;

  const divElemt = document.createElement('div');
  divElemt.classList.add('position');
  divElemt.innerHTML = viewLogin;
  return divElemt;
};
