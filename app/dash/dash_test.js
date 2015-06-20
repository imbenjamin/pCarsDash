'use strict';

describe('myApp.dash module', function() {

  beforeEach(module('myApp.dash'));

  describe('dash controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('DashCtrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});