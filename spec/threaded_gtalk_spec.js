require("spec_helper.js");
require("../public/jquery.livequery.js");
require("../public/threaded_gtalk.js");
require("../public/threaded_gtalk_theme.js");

var chat = null;

Screw.Unit(function(){
  before(function(){
    chat = ThreadedGtalk.Chat;
    ThreadedGtalk.disableInterval = true;
    $('.threaded-gtalk').remove();
    chat.discoverTags();
  });
  describe("find threads", function(){
    describe("helpers", function(){
      it("find all messages", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }, 
          ":12b" : { "id": ":12b", "message": "Did the postman come today?", "direction": "f" }, 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" },
          ":12d" : { "id": ":12d", "message": "yes the #postman did delivery your parcel", "direction": "t" } 
        };
        expect(chat.messages()).to(equal, expected);
      });
      it("should find tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
      it("should not have any remaining new messages", function(){
        expect(chat.newMessageElements().size()).to(equal, 0);
      });
    });
    describe("messageObjsTaggedBy messages", function(){
      it("should find #kids messageObjsTaggedBy messages", function(){
        var expected = { 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" }
        };
        expect(chat.messageObjsTaggedBy('#kids')).to(equal, expected);
      });
      it("should find #postman messageObjsTaggedBy messages", function(){
        var expected = { 
          ":12d" : { "id": ":12d", "message": "yes the #postman did delivery your parcel", "direction": "t" } 
        };
        expect(chat.messageObjsTaggedBy('#postman')).to(equal, expected);
      });
    });
    describe("findMessagePrecedingTags", function(){
      it("should find a message containing a tag's text as a word", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }
        };
        expect(chat.findMessagePrecedingTags('#kids')).to(equal, expected);
      });
    });
    describe("conversation for a tag", function(){
      it("should include previous message with 'kids' in it into conversation", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }, 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" }
        };
        expect(chat.conversation('#kids')).to(equal, expected);
      });
      it("should include previous message with 'postman' in it into conversation", function(){
        var expected = { 
          ":12b" : { "id": ":12b", "message": "Did the postman come today?", "direction": "f" }, 
          ":12d" : { "id": ":12d", "message": "yes the #postman did delivery your parcel", "direction": "t" } 
        };
        expect(chat.conversation('#postman')).to(equal, expected);
      });
    });
  });
  describe("initial DOM modifications", function(){
    describe("DOM modification with tagged classes", function(){
      it("should add class 'tag-kids' to messages in #kids conversation (:12a)", function(){
        expect($("[id=:12a]").hasClass('tag-kids')).to(equal, true);
      });
      it("should add class 'tag-kids' to messages in #kids conversation (:12c)", function(){
        expect($("[id=:12c]").hasClass('tag-kids')).to(equal, true);
      });
      it("should not add class 'tag-kids' to messages in #kids conversation (:12b)", function(){
        expect($("[id=:12b]").hasClass('tag-kids')).to(equal, false);
      });
      it("should not add class 'tag-kids' to messages in #kids conversation (:12d)", function(){
        expect($("[id=:12d]").hasClass('tag-kids')).to(equal, false);
      });
    });
    describe("DOM modification with thread-numbered classes", function(){
      it("should add class 'thread-1' to messages in #kids conversation (:12a)", function(){
        expect($("[id=:12a]").hasClass('thread-1')).to(equal, true);
      });
      it("should add class 'thread-1' to messages in #kids conversation (:12c)", function(){
        expect($("[id=:12c]").hasClass('thread-1')).to(equal, true);
      });
      it("should not add class 'thread-1' to messages in #kids conversation (:12b)", function(){
        expect($("[id=:12b]").hasClass('thread-1')).to(equal, false);
      });
      it("should not add class 'thread-1' to messages in #kids conversation (:12d)", function(){
        expect($("[id=:12d]").hasClass('thread-1')).to(equal, false);
      });
      it("should add class 'thread-2' to messages in #postman conversation (:12b)", function(){
        expect($("[id=:12b]").hasClass('thread-2')).to(equal, true);
      });
      it("should add class 'thread-2' to messages in #postman conversation (:12d)", function(){
        expect($("[id=:12d]").hasClass('thread-2')).to(equal, true);
      });
    });
  });
  describe("live updates", function(){
    describe("unrelated message", function(){
      before(function(){
        chat.appendMessage("this is an unrelated message");
        chat.discoverTags();
      });
      it("should discover the new message", function(){
        var expected = { 
          ":12a" : { "id": ":12a", "message": "Nanc, how are the kids?", "direction": "f" }, 
          ":12b" : { "id": ":12b", "message": "Did the postman come today?", "direction": "f" }, 
          ":12c" : { "id": ":12c", "message": "#kids are fine; I think Banjo has the flu again", "direction": "t" },
          ":12d" : { "id": ":12d", "message": "yes the #postman did delivery your parcel", "direction": "t" },
          ":12e" : { "id": ":12e", "message": "this is an unrelated message", "direction": "t" }
        };
        expect(chat.messages()).to(equal, expected);
      });
      it("should not add the message to either conversation theread", function(){
        expect($("[id=:12e]").hasClass('tag-kids')).to(equal, false);
        expect($("[id=:12e]").hasClass('tag-postman')).to(equal, false);
      });
      it("should not add new tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
    describe("extra threaded message", function(){
      before(function(){
        chat.appendMessage("this message is in #kids thread");
        chat.discoverTags();
      });
      it("should add the message to #kids thread", function(){
        expect($("[id=:12e]").hasClass('tag-kids')).to(equal, true);
      });
      it("should not add the message to #postman thread", function(){
        expect($("[id=:12e]").hasClass('tag-postman')).to(equal, false);
      });
      it("should not add new tags", function(){
        expect(chat.tags()).to(equal, ['#kids', '#postman']);
      });
    });
    describe("find messages when new #thread tag used", function(){
      before(function(){
        chat.appendMessage("I want to talk about cookies now");
        chat.appendMessage("ooh I love #cookies");
        chat.discoverTags();
      });
      describe("data structure", function(){
        it("should discover new #cookies tag", function(){
          expect(chat.tags()).to(includes, '#cookies'); // no idea if include is a matcher
        });
        it("should have 2 messages in #cookies tag", function(){
          expect($.keys(chat.conversation('#cookies')).length).to(equal, 2);
        });
      });
      describe("DOM changes", function(){
        it("should mark last 2 message elements with class 'tag-cookies'", function(){
          expect($('.tag-cookies').size()).to(equal, 2);
        });
        it("should mark last 2 message elements with class 'thread-3'", function(){
          expect($('.thread-3').size()).to(equal, 2);
        });
      });
    });
  });
});

