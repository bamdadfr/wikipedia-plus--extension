export class TableOfContents {
  private node: HTMLDivElement;

  private direction: string;

  private list: HTMLUListElement;

  private toggle: HTMLLabelElement;

  private header: HTMLHeadElement;

  private sidebar: HTMLDivElement;

  private nav: HTMLDivElement;

  constructor() {
    this.initialize().then(() => this.watch());
  }

  private static isHidden() {
    return document.cookie.includes('wikihidetoc=1');
  }

  private async initialize() {
    try {
      await this.getNode();
      this.getElements();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  private async getNode(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.node = document.querySelector('#toc');
      if (!this.node) {
        reject(new Error('Could not select the table of contents'));
      } else {
        resolve();
      }
    });
  }

  private getElements() {
    this.direction = this.node.querySelector('.toctitle').getAttribute('dir');
    this.list = this.node.querySelector('ul');
    this.toggle = this.node.querySelector('label');
    this.header = document.querySelector('.mw-header');
    this.sidebar = document.querySelector('#mw-panel');
  }

  private watch() {
    if (!this.node) {
      return;
    }

    this.applyStyles();
    this.attachEvents();
  }

  private applyStyles() {
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
    this.toggle.parentElement.style.display = 'none';

    // set fixed height and add scrollbar
    this.list.style.overflowY = 'scroll';
    this.list.style.maxHeight = '80vh';
  }

  private attachEvents() {
    this.node.onmouseenter = () => TableOfContents.isHidden() && this.toggle.click();
    this.node.onmouseleave = () => !TableOfContents.isHidden() && this.toggle.click();
  }
}
