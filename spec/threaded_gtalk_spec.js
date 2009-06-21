require("spec_helper.js");
require("../public/threaded_gtalk.js");

// basic API for Chat object
var chat = {
  messages: function() { return {}; },
  tags: function() { return []; }
};

Screw.Unit(function(){
  describe("find threads", function(){
    before(function(){
      $('td.kw').remove(); // hide image menu links
    });
    it("find all messages", function(){
      var expected = { 
        ":12a" : "Nanc, how are the kids?", ":12c" : "#kids are fine; I think Banjo has the flu again",
        ":12b" : "Did the postman come today?", ":12d" : "#postman did delivery your parcel" 
      };
      expect(chat.messages()).to(equal, expected);
    });
    it("should find tags", function(){
      expect(chat.tags()).to(equal, ['#kids', '#postman']);
    });
    describe("#kids", function(){
      it("should find #postman tagged messages", function(){
        var expected = { ":12c" : "#kids are fine; I think Banjo has the flu again" };
        expect(chat.messages()).to(equal, expected);
      });
      it("should include previous message with 'postman' in it into conversation", function(){
        var expected = { ":12a" : "Nanc, how are the kids?", ":12c" : "#kids are fine; I think Banjo has the flu again" };
        expect(chat.messages()).to(equal, expected);
      });
    });
    describe("#postman", function(){
      it("should find #postman tagged messages", function(){
        var expected = { ":12d" : "#postman did delivery your parcel" };
        expect(chat.messages()).to(equal, expected);
      });
      it("should include previous message with 'postman' in it into conversation", function(){
        var expected = { ":12b" : "Did the postman come today?", ":12d" : "#postman did delivery your parcel" };
        expect(chat.messages()).to(equal, expected);
      });
    });
  });
  describe("live updates", function(){
    before(function(){
      // add a new message
    });
    it("should discover #parcel thread", function(){
      
    });
    it("should attach #parcel thread to #postman thread", function(){
      
    });
  });
});

