import { closeSesion } from '../configFirebase.js';

export default () => {
  const viewProfile = `
        <div class = container>
        <button id="close-btn">Cerrar Sesion</button>
        <p>Perfil</p>
        </div>
    `;

  const divElemt = document.createElement('div');
  divElemt.innerHTML = viewProfile;

  const closeBtn = divElemt.querySelector('#close-btn');

  closeBtn.addEventListener('click', () => {
    closeSesion()
      .then(() => {
        window.location.hash = '#/';
      })
      .catch((error) => {
        console.log(error);
      });
  });


  return divElemt;
};
