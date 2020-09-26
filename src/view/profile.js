// import { store } from '../configFirebase.js';

export default () => {
  const hello = `
        <div class = container>
        </div>
    `;

  const divElemt = document.createElement('div');
  divElemt.innerHTML = hello;
  return divElemt;
};
