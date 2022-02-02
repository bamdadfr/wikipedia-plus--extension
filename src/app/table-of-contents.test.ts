import {TableOfContents} from './table-of-contents';

describe('TableOfContents', () => {
  let toc: TableOfContents;

  beforeEach(() => {
    toc = new TableOfContents();
  });

  it('should be defined', () => {
    expect(toc).toBeDefined();
  });
});
