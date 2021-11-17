export class TableOfContents {
  constructor() {
    this.createContainer();
    this.initializeNode();
  }

  createContainer() {
    this.container = document.createElement('div');
    document.body.insertBefore(this.container, document.body.firstChild);
  }

  async initializeNode() {
    try {
      await this.fetchNode();
      this.getNodeElements();
      this.moveNode();
      this.applyStyles();
      this.attachEvents();
      this.hide();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  async fetchNode() {
    return new Promise((resolve, reject) => {
      this.node = document.querySelector('#toc');
      if (!this.node) {
        reject(new Error('Could not select the table of contents'));
      } else {
        resolve();
      }
    });
  }

  getNodeElements() {
    this.direction = this.node.querySelector('.toctitle').getAttribute('dir');
    this.list = this.node.querySelector('ul');
    this.button = this.node.querySelector('label');
  }

  applyStyles() {
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
    this.list.style.maxHeight = '80vh';
  }

  moveNode() {
    this.container.appendChild(this.node);
  }

  attachEvents() {
    this.node.onmouseenter = () => this.show();
    this.node.onmouseleave = () => this.hide();
  }

  show() {
    this.button.click();
  }

  hide() {
    this.button.click();
  }
}
