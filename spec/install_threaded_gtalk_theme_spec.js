require("spec_helper.js");
require("../public/jquery.livequery.js");
require("../public/threaded_gtalk_theme.js");

var chat = null;

Screw.Unit(function(){
  before(function(){
    chat = ThreadedGtalk.Chat;
  });
  describe("theme installed", function(){
    it("should create theme <style> block", function(){
      expect($('style.threaded_gtalk_theme').size()).to(equal, 1);
    });
    describe("#kids tag is 1st thread", function(){
      it("should colour #kids message green", function(){
        expect($('.thread-1').css('color')).to(equal, 'rgb(0, 104, 53)');
      });
      it("should colour #postman message maroon", function(){
        expect($('.thread-2').css('color')).to(equal, 'rgb(121, 6, 25)');
      });
    });
  });
});