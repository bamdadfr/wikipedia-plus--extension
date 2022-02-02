import {TableOfContents} from './table-of-contents';

const packageJson = require('../../package.json');

type App = {
  version: string;
  toc: TableOfContents;
}

export function app(): App {
  const toc = new TableOfContents();
  const {version} = packageJson;

  return {
    version,
    toc,
  };
}
