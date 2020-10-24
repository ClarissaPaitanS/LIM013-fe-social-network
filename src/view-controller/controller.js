import { elements } from '../view/all.js';

export const changeView = (hash) => {
  let profilePage = '';
  let editPage = '';
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
          profilePage = sectionMain.appendChild(elements.home());
        } else {
          // profilePage = sectionMain.appendChild(elements.login());
          window.location.hash = '#/';
        }
      });

      return profilePage;
    }
    case '#/edit':
    {
      firebase.auth().onAuthStateChanged((user) => {
        console.log('Hola Edit', user);
        if (user) {
          editPage = sectionMain.appendChild(elements.edit());
        } else {
          window.location.hash = '#/';
        }
      });

      return editPage;
      // return sectionMain.appendChild(elements.edit());
    }

    default:
      return sectionMain.appendChild(elements.different());
  }
};
