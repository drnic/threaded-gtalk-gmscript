require("spec_helper.js");
require("../public/threaded_gtalk.js");

Screw.Unit(function(){
  before(function(){
    $('.threaded-gtalk').remove();
  });
  describe("find threads", function(){
    describe("helpers", function(){
      it("find all messages", function(){
        var expected = { 
          ":12a" : { "message": "Nanc, how are the kids?", "direction": "from" }, 
          ":12b" : { "message": "Did the postman come today?", "direction": "from" }, 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" },
          ":12d" : { "message": "#postman did delivery your parcel", "direction": "to" } 
        };
        expect(chat.messages()).to(equal, expected);
      });
      it("should find tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
    describe("tagged messages", function(){
      it("should find #postman tagged messages", function(){
        var expected = { 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" }
        };
        expect(chat.tagged('#kids')).to(equal, expected);
      });
      it("should include previous message with 'postman' in it into conversation", function(){
        var expected = { 
          ":12a" : { "message": "Nanc, how are the kids?", "direction": "from" }, 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" }
        };
        expect(chat.conversation('#kids')).to(equal, expected);
      });
      it("should add class 'tag-kids' to messages in #kids conversation", function(){
        expect($(":12a").hasClass('tag-kids')).to(equal, true);
      });
      it("should add class 'tag-kids' to messages in #kids conversation", function(){
        expect($(":12b").hasClass('tag-kids')).to(equal, false);
      });
      it("should add class 'tag-kids' to messages in #kids conversation", function(){
        expect($(":12c").hasClass('tag-kids')).to(equal, true);
      });
      it("should add class 'tag-kids' to messages in #kids conversation", function(){
        expect($(":12d").hasClass('tag-kids')).to(equal, false);
      });
    });
  });
  describe("live updates", function(){
    describe("unrelated message", function(){
      before(function(){
        chat.appendMessage("this is an unrelated message");
      });
      it("should discover the new message", function(){
        var expected = { 
          ":12a" : { "message": "Nanc, how are the kids?", "direction": "from" }, 
          ":12b" : { "message": "Did the postman come today?", "direction": "from" }, 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "to" },
          ":12d" : { "message": "#postman did delivery your parcel", "direction": "to" },
          ":12e" : { "message": "this is an unrelated message", "direction": "to" }
        };
        expect(chat.messages()).to(equal, expected);
      });
      it("should not add the message to either conversation theread", function(){
        expect($(":12e").hasClass('tag-kids')).to(equal, false);
        expect($(":12e").hasClass('tag-postman')).to(equal, false);
      });
      it("should not add new tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
    describe("extra threaded message", function(){
      before(function(){
        chat.appendMessage("this message is in #kid thread");
      });
      it("should add the message to #kid theread", function(){
        expect($(":12e").hasClass('tag-kids')).to(equal, true);
      });
      it("should not add the message to #postman theread", function(){
        expect($(":12e").hasClass('tag-postman')).to(equal, false);
      });
      it("should not add new tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
  });
});

