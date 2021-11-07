export const container = Object.create (null);

container.node = null;

container.init = function () {
  this.create ();
};

container.create = function () {
  this.node = document.createElement ('div');
  document.body.insertBefore (this.node, document.body.firstChild);
};
