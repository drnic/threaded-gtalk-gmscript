require("spec_helper.js");
require("../public/threaded_gtalk.js");

var chat = null;

Screw.Unit(function(){
  before(function(){
    chat = ThreadedGtalk.Chat;
    $('.threaded-gtalk').remove();
  });
  describe("find threads", function(){
    describe("helpers", function(){
      it("find all messages", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }, 
          ":12b" : { "id": ":12b", "message": "Did the postman come today?", "direction": "f" }, 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" },
          ":12d" : { "id": ":12d", "message": "#postman did delivery your parcel", "direction": "t" } 
        };
        expect(chat.messages()).to(equal, expected);
      });
      it("should find tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
    describe("messageObjsTaggedBy messages", function(){
      it("should find #postman messageObjsTaggedBy messages", function(){
        var expected = { 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" }
        };
        expect(chat.messageObjsTaggedBy('#kids')).to(equal, expected);
      });
    });
    describe("findMessagePrecedingTag", function(){
      it("should find a message containing a tag's text as a word", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }
        };
        expect(chat.findMessagePrecedingTag('#kids')).to(equal, expected);
      });
    });
    describe("conversation for a tag", function(){
      it("should include previous message with 'postman' in it into conversation", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }, 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" }
        };
        expect(chat.conversation('#kids')).to(equal, expected);
      });
    });
  });
  describe("initial DOM modifications", function(){
    describe("DOM modification", function(){
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
          ":12a" : { "message": "Nanc, how are the kids?", "direction": "f" }, 
          ":12b" : { "message": "Did the postman come today?", "direction": "f" }, 
          ":12c" : { "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" },
          ":12d" : { "message": "#postman did delivery your parcel", "direction": "t" },
          ":12e" : { "message": "this is an unrelated message", "direction": "t" }
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

