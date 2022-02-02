import {app} from '../app/app';

window.addEventListener('load', () => {
  const instance = app();
  // eslint-disable-next-line no-console
  console.log('Wikipedia+ Extension', instance);
});
