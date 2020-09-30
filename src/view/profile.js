
import { closeSesion } from '../configFirebase.js';

export default () => {
  const viewProfile = `
  <section class="profile-user">
  <header class="header-profile">
    <nav>
      <li class="menu-item">
        <img class="menu-item-nutrifitness" src="imagenes/nutrifitness-icon.png" alt="">
        <!--<p>Nutrifitness</p>-->
      </li>
      <!-- <li class="menu-item">
        <a href="#/profile">
          <div>
            <img class="icon-user-min"src="https://i.pinimg.com/originals/26/65/36/266536f20fd7cd00af576698d4bf1610.jpg">
            <p>Sheldon Cooper</p>
          </div>
        </a>
      </li> -->
      <li class="menu-item">
      <!-- <div class="hamburguer-menu-container">
          <img class="hamburguer-menu-img" src="imagenes/hamburguer-menu.png">
        </div>
        <div class="hamburguer-menu" style="display:none" >
          <a href="#/profile">
            <div>
              <p>Editar perfil</p>
            </div>
            </a> -->        
          <div id="close-btn" class="close-btn">
            <p>Cerrar sesión</p>
          </div>
        <!--</div>-->
      </li>
    </nav>
  </header>
  <main>
    <section>
      <section class="info-user">
        <div class="front-page">
          <img src="">
        </div>
        <div class="info-user-profile">
          <div class="info-user-profile-img">
            <img src="https://i.pinimg.com/originals/26/65/36/266536f20fd7cd00af576698d4bf1610.jpg">
          </div class="info-user-profile-name">
            <p>Sheldon Cooper</p>
        </div>
      </section>
      <section class="post-user">
        <section class="post-user-publish">        
          <div class="post-text">
            <textarea type="text">
              
          </textarea>       
          </div>
          <div>
            <a href="#/profile">
              <div class="post-user-image">
                <img src="https://img.icons8.com/color/48/000000/image.png">
                <!-- <input type="file" name="post-images" accept=".jpg,.png"> -->
              </div>
            </a>
          </div>
        </section>
        <section class="post-user-wall">
          <div class="post">
            <div class="post-header">
              <p>Publicado por Sheldon</p>
            </div>
            <div class="post-body">
              <p>Bazinga!!!!!!!<br>Harry Potter es el mejor</p>
            </div>
            <div class="post-footer">
            <img src="">
            <img src="">
            </div> 
          </div>
          
        </section>
      </section>
    </section>
  </main>
  </section>
    `;

  const divElemt = document.createElement('div');
  divElemt.classList.add('div-view');
  divElemt.innerHTML = viewProfile;

  // const menu = divElemt.querySelector('.hamburguer-menu');
  // const menuShow = divElemt.querySelector('.hamburguer-menu-show');
  // menu.addEventListener('click', () => {
  //   menuShow.classlist.remove('.hamburguer-menu');
  // });

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
