import { container } from './container';

export const toc = Object.create (null);

toc.selector = '#toc';
toc.node = null;
toc.list = null;
toc.button = null;
toc.isFolded = false;
toc.direction = null;

toc.init = async function () {
  try {
    await this.selectNode ();
    this.parseNode ();
    this.moveNode ();
    this.applyStyles ();
    this.attachEvents ();
    this.toggle ();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log (err);
  }
};

toc.selectNode = async function () {
  return new Promise ((resolve, reject) => {
    this.node = document.querySelector (this.selector);
    if (!this.node) {
      reject (new Error ('Could not select the Table of Contents'));
    } else {
      resolve ();
    }
  });
};

toc.parseNode = function () {
  this.direction = this.node.querySelector ('.toctitle').getAttribute ('dir');
  this.list = this.node.querySelector ('ul');
  this.button = this.node.querySelector ('label');
};

toc.applyStyles = function () {
  // set toc node position
  this.node.style.position = 'fixed';
  this.node.style.zIndex = '1000';

  if (this.direction === 'rtl') {
    this.node.style.top = '5px';
    this.node.style.right = '5px';
  } else {
    this.node.style.top = '5px';
    this.node.style.left = '5px';
  }

  // hide toc button
  this.button.parentNode.style.display = 'none';

  // make the list scrollable
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
