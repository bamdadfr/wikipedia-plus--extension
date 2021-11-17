import {TableOfContents} from '../app/TableOfContents';

const packageJson = require('../../package.json');

window.addEventListener('load', async () => {
  const toc = new TableOfContents();

  // eslint-disable-next-line no-console
  console.log('Wikipedia+ Extension', {
    version: packageJson.version,
    toc,
  });
});
