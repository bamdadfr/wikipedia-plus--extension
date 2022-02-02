import {app} from './app';

const packageJson = require('../../package.json');

describe('app', () => {
  const instance = app();

  it('should be defined', () => {
    expect(instance).toBeDefined();
  });

  it('should contain a version number matching to package.json', () => {
    expect(instance.version).toEqual(packageJson.version);
  });
});
