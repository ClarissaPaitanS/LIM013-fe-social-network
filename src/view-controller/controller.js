import { elements } from '../view/all.js';

export const changeView = (hash) => {
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

    case '#/profile':

    {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          profilePage = sectionMain.appendChild(elements.profile());
        } else {
          profilePage = sectionMain.appendChild(elements.login());
          window.location.hash = '#/';
        }
      });

      return profilePage;
    }

    default:
      return sectionMain.appendChild(elements.different());
  }
};
