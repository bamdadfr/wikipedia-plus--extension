import { toc } from './toc';
import { container } from './container';

export const main = Object.create (null);

main.toc = toc;
main.container = container;

main.init = async function () {
  container.init ();
  await toc.init ();
};
