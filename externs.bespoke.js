BABYLON.Engine = function () {
  this.runRenderLoop = function () {};
};

BABYLON.Scene = function () {
  this.createDefaultEnvironment = function () {
    this.ground = {};
    this.setMainColor = function () {};
  };
};

BABYLON.Mesh = function () {
  this.createInstance = function () {};
  this.getBoundingInfo = function () {
    this.boundingBox = {
      minimum: {},
      maximum: {},
    };
  };
  this.setBoundingInfo = function () {};
  this.bakeCurrentTransformIntoVertices = function () {};
};

BABYLON.DynamicTexture = function () {
  this.drawText = function () {};
};

BABYLON.ShadowGenerator = function () {
  this.addShadowCaster = function () {};
};

BABYLON.ActionManager = function () {
  this.registerAction = function () {};
};

BABYLON.EventState = function () {
  this.delta = {};
};