import { elements } from '../view/all.js';

export const changeView = (hash) => {
  let homePage = '';
  let profilePage = '';
  //  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(elements.login()); }
    case '#/signUp':
    { return sectionMain.appendChild(elements.signUp()); }

    case '#/home':

    {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('Hola', user);
        if (user) {
          homePage = sectionMain.appendChild(elements.home());
        } else {
          // profilePage = sectionMain.appendChild(elements.login());
          window.location.hash = '#/';
        }
      });

      return homePage;
    }
    case '#/profile':
    {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('Hola Profile', user);
        if (user) {
          profilePage = sectionMain.appendChild(elements.profile());
        } else {
          window.location.hash = '#/';
        }
      });

      return profilePage;
      // return sectionMain.appendChild(elements.edit());
    }

    default:
      return sectionMain.appendChild(elements.different());
  }
};
