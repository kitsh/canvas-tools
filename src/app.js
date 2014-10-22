define(function (require) {
  'use strict';
  var cKit = require('core');
  require('constants');
  require('Vector');
  require('CPoint');
  require('PedalFlower');

  var _globalInit = function() {
    window.cKit = new cKit();
  };

  if (document.readyState === 'complete') {
    _globalInit();
  } else {
    window.addEventListener('load', _globalInit , false);
  }
  return window.cKit;
});