require("spec_helper.js");
require("../public/threaded_gtalk.js");

var chat = null;

Screw.Unit(function() {
  before(function(){
    chat = ThreadedGtalk.Chat;
    $('.threaded-gtalk').remove();
  });
  describe("appendMessage", function(){
    before(function(){
      chat.appendMessage("this message is in #kid thread");
      this.latestAppendedMessage = $("div.km:last div.kl:last");
    });
    it("creates a message containing the message", function(){
      expect(this.latestAppendedMessage.html()).to(match, /this message is in #kid thread/);
    });
    it("creates a message with next id", function(){
      expect(this.latestAppendedMessage.attr('id')).to(equal, ':12e');
    });
    describe("36 times to bump 2nd digit from :12e -> :13e", function(){
      before(function(){
        for (var i=0; i < 36; i++) {
          chat.appendMessage("message #" + (i + 2));
        };
        this.latestAppendedMessage = $("div.km:last div.kl:last");
      });
      it("creates messages subsequent ids", function(){
        expect(this.latestAppendedMessage.attr('id')).to(equal, ':13e');
      });
    });
  });
});
