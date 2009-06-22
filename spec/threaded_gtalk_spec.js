require("spec_helper.js");
require("../public/threaded_gtalk.js");

// basic API for Chat object
var chat = {
  messages: function() { return {}; },
  tags: function() { return []; },
  tagged: function(tag) { return {}; },
  conversation: function(includsTag) { return {}; }
};

Screw.Unit(function(){
  describe("find threads", function(){
    before(function(){
      $('td.kw').remove(); // hide image menu links
    });
    describe("helpers", function(){
      it("find all messages", function(){
        var expected = { 
          ":12a" : { "message": "Nanc, how are the kids?", "direction": "from" }, 
          ":12b" : { "message": "Did the postman come today?", "direction": "from" }, 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" },
          ":12d" : { "message": "#postman did delivery your parcel", "direction": "to" } 
        };
        // expect(chat.messages()).to(equal, expected);
      });
      it("should find tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
    describe("#kids", function(){
      it("should find #postman tagged messages", function(){
        var expected = { 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" }
        };
        // expect(chat.tagged('#kids')).to(equal, expected);
      });
      it("should include previous message with 'postman' in it into conversation", function(){
        var expected = { 
          ":12a" : { "message": "Nanc, how are the kids?", "direction": "from" }, 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" }
        };
        // expect(chat.conversation('#kids')).to(equal, expected);
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

