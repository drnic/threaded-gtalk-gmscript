var ThreadedGtalk = ThreadedGtalk || {};

(function($){
  // TODO move extensions to helper file
  $.extend({
      keys: function(obj){
          var a = [];
          $.each(obj, function(k){ a.push(k); });
          return a;
      }
  });
  
  ThreadedGtalk.Chat = (new function(){
    this.messageElements = function() {
      return $('div.kf div.kl[id], div.kf div.kk span[id]');
    };
    
    // TODO memoize/cache result until new message DOM elements detected
    this.messages = function() {
      var messageElements = this.messageElements();
      var messages = {};
      $.each(messageElements, function(index) {
        var element = $(this);
        messages[element.attr('id')] = {
          id: element.attr('id'),
          message: $.trim(element.text()),
          direction: element.closest("div[chat-dir]").attr('chat-dir')
        };
      });
      return messages;
    };
    
    // Discovers all #tag tokens in all messages and returns chronological list
    // TODO memoize/cache result until new message DOM elements detected
    this.tags = function() {
      var tags = [];
      this.eachOrderedMessage(function(messageObj) {
        var messageTags = messageObj.message.match(/#[^ ]*/g);
        if (messageTags) {
          for (var i=0; i < messageTags.length; i++) {
            if ($.inArray(messageTags[i], tags) == -1) {
              tags.push(messageTags[i]);
            }
          };
        }
      });
      return tags;
    };
    
    this.messageObjsTaggedBy = function(tag) {
      tag = tag.match(/^#/) ? tag : '#' + tag; // ensure tag prefixed by #
      if (this.tags().indexOf(tag) === null) { return null; }
      var messageObjs = {};
      var self = this;
      this.eachOrderedMessage(function(messageObj) {
        if (ThreadedGtalk.Chat.messageContainsTag(messageObj, tag)) {
          messageObjs[messageObj.id] = messageObj;
        }
      });
      return messageObjs;
    };
    
    this.messageContainsTag = function(messageObj, tag) {
      tag = tag.match(/^#/) ? tag : '#' + tag; // ensure tag prefixed by #
      return messageObj.message.match(new RegExp("(?:^| )" + tag + "(?:$| )", "i"));
    };
    
    this.findMessagePrecedingTag = function(tag) {
      tag = tag.match(/^#/) ? tag : '#' + tag; // ensure tag prefixed by #
      if (this.tags().indexOf(tag) === null) { return null; }
      var messages = this.messages();
      var messageIds = this.orderedMessageIds();
      var untaggedMessage = null;
      for (var i=0; i < messageIds.length; i++) {
        var messageId = messageIds[i];
        if (messages[messageId].message.match(new RegExp("(?:^|\\b)" + this.untag(tag) + "(?:^|\\b)", "i"))) {
          untaggedMessage = {};
          untaggedMessage[messageId] = messages[messageId];
          break;
        }
      };
      return untaggedMessage;
    };
    
    // All messages containing #tag and the most recent message containing 'tag' (without #)
    this.conversation = function(tag) {
      tag = tag.match(/^#/) ? tag : '#' + tag; // ensure tag prefixed by #
      if (this.tags().indexOf(tag) === null) { return null; }
      var messageObjs = this.messageObjsTaggedBy(tag);
      var preceding   = this.findMessagePrecedingTag(tag);
      if (preceding) {
        $.extend(true, messageObjs, preceding);
      }
      return messageObjs;
    };
    

    // test helper to simulate addition of message to last person's set of messages
    this.appendMessage = function(message) {
      var lastMessages = this.messageElements();
      var lastMessageId = $(lastMessages.get(lastMessages.length - 1)).attr('id').match(/[0-9a-z]+/)[0];
      lastMessageId = parseInt(baseConverter(lastMessageId, 36, 10), 10);
      var nextId = baseConverter((lastMessageId + 1) + "", 10, 36);
      $('div.kf div.km:last').
        append($('<div id=":' + nextId + '" dir="ltr" class="kl threaded-gtalk">' + message + '</div>'));
    };

    function baseConverter(number,ob,nb) {
      // Found at http://www.geneffects.com/briarskin/programming/newJSMathFuncs.html
    	// Created 1997 by Brian Risk.  http://brianrisk.com
    	// Modified 2009 by Dr Nic Williams - return downcased result
    	number = number.toUpperCase();
    	var list = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	var dec = 0;
    	for (var i = 0; i <=  number.length; i++) {
    		dec += (list.indexOf(number.charAt(i))) * (Math.pow(ob , (number.length - i - 1)));
    	}
    	number = "";
    	var magnitude = Math.floor((Math.log(dec))/(Math.log(nb)));
    	for (i = magnitude; i >= 0; i--) {
    		var amount = Math.floor(dec/Math.pow(nb,i));
    		number = number + list.charAt(amount); 
    		dec -= amount*(Math.pow(nb,i));
    	}
    	return number.toLowerCase();
    };
    
    // TODO memoize/cache result until new message DOM elements detected
    this.orderedMessageIds = function() {
      return $.keys(this.messages()).sort();
    };
    
    // Loop through each messageObj in order of the message ids
    // callback function is passed a messageObj { id, message, direction }
    // TODO remove variable assignments after memoizing helpers
    this.eachOrderedMessage = function(callback) {
      var messages = this.messages();
      var messageIds = this.orderedMessageIds();
      for (var i=0; i < messageIds.length; i++) {
        var messageId = messageIds[i];
        callback(messages[messageId]);
      };
    };
    
    this.untag = function(tag) {
      return tag.replace(/^#/,'');
    };
    
    this.threadClassByTag = function(tag) {
      return 'thread-' + (this.tags().indexOf(tag) + 1);
    };
    
  });
  
  $.fn.updateForTag = function(tag) {
    if (!this.length) {
        log('updateForTag: skipping tagging process - no element selected');
        return this;
    }
    this.addClass("tag-" + ThreadedGtalk.Chat.untag(tag));
    this.addClass(ThreadedGtalk.Chat.threadClassByTag(tag));
    return this;
  };
  
  $(function() {
    var chat = ThreadedGtalk.Chat;
    var tags = chat.tags();
    for (var i=0; i < tags.length; i++) {
      var tag = tags[i];
      var messages = chat.conversation(tag);
      for (var messageId in messages) {
        var messageObj = messages[messageId];
        $("[id=" + messageObj.id + "]").updateForTag(tag);
      };
    };
    // new elements only need to match against existing tags
    // TODO might need setInterval/setTimeout look as livequery not triggering inside gmail
    // OR piggy back on XHR chat calls
    chat.messageElements().livequery(discoverTags, function() {});
  });
})(jQuery);

function discoverTags() {
  // TODO reset all memoizations
  var chat = ThreadedGtalk.Chat;
  var tags = chat.tags();
  for (var i=0; i < tags.length; i++) {
    var tag = tags[i];
    var messageObj = chat.messages()[$(this).attr('id')];
    if (chat.messageContainsTag(messageObj, tag)) {
      $(this).updateForTag(tag);
    }
  }
}

