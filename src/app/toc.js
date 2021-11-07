import { container } from './container';

export const toc = Object.create (null);

toc.selector = '#toc';
toc.node = null;
toc.list = null;
toc.button = null;
toc.isFolded = false;

toc.init = async function () {
  await this.selectNode ();
  this.moveNode ();
  this.applyStyles ();
  this.attachEvents ();
  this.toggle ();
};

toc.selectNode = async function () {
  return new Promise ((resolve) => {
    this.node = document.querySelector (this.selector);
    this.list = this.node.querySelector ('ul');
    this.button = this.node.querySelector ('label');

    if (!this.node || !this.list) {
      setTimeout (this.init.bind (this), 100);
    } else {
      resolve ();
    }
  });
};

toc.applyStyles = function () {
  this.node.style.position = 'fixed';
  this.node.style.top = '5px';
  this.node.style.left = '5px';
  this.node.style.zIndex = '1000';
  this.node.style.transition = 'all 1s ease-out';

  this.button.parentNode.style.display = 'none';

  this.list.style.overflowY = 'scroll';
  this.list.style.height = '80vh';
};

toc.moveNode = function () {
  container.node.appendChild (toc.node);
};

toc.attachEvents = function () {
  this.node.addEventListener ('mouseenter', () => this.toggle ());
  this.node.addEventListener ('mouseleave', () => this.toggle ());
};

toc.toggle = function () {
  this.isFolded = !this.isFolded;
  this.button.click ();
};
