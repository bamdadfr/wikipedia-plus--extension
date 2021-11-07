import { container } from './container';
import { toc } from './toc';

export const main = Object.create (null);

main.container = container;
main.toc = toc;

main.init = async function () {
  container.init ();
  await toc.init ();
};
