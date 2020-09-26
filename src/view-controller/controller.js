import { elements } from '../view/all.js';

export const changeView = (hash) => {
  const id = hash.split('/')[1];
  const sectionMain = document.getElementById('container');
  sectionMain.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    { return sectionMain.appendChild(elements.login()); }
    case '#/signUp':
    { return sectionMain.appendChild(elements[id]()); }
    default:
      return sectionMain.appendChild(elements.different());
  }
};
