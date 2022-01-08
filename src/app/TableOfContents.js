export class TableOfContents {
  constructor() {
    this.initialize().then(() => this.watch());
  }

  isHidden() {
    return document.cookie.includes('wikihidetoc=1');
  }

  async initialize() {
    try {
      await this.fetchNode();
      this.getElements();
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

  getElements() {
    this.direction = this.node.querySelector('.toctitle').getAttribute('dir');
    this.list = this.node.querySelector('ul');
    this.toggle = this.node.querySelector('label');
    this.header = document.querySelector('.mw-header');
    this.sidebar = document.querySelector('#mw-panel');
  }

  watch() {
    if (!this.node) {
      return;
    }

    this.applyStyles();
    this.attachEvents();
  }

  applyStyles() {
    if (this.header && this.sidebar) {
      // new layout
      this.header.style.zIndex = '0';
      this.sidebar.style.zIndex = '0';
    } else {
      // legacy layout
      this.nav = document.querySelector('#mw-navigation');
      document.body.insertBefore(this.nav, document.body.firstElementChild);
    }

    // set position
    this.node.style.position = 'fixed';
    this.node.style.zIndex = '1000';

    // set direction
    if (this.direction === 'rtl') {
      this.node.style.top = '5px';
      this.node.style.right = '5px';
    } else {
      this.node.style.top = '5px';
      this.node.style.left = '5px';
    }

    // hide button
    this.toggle.parentNode.style.display = 'none';

    // set fixed height and add scrollbar
    this.list.style.overflowY = 'scroll';
    this.list.style.maxHeight = '80vh';
  }

  attachEvents() {
    this.node.onmouseenter = () => this.isHidden() && this.toggle.click();
    this.node.onmouseleave = () => !this.isHidden() && this.toggle.click();
  }
}
