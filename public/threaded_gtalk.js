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

    // TODO memoize/cache result until new message DOM elements detected
    this.messages = function() {
      var messageElements = $('div.kf div.kl[id], div.kf div.kk span[id]');
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
          $.merge(tags, messageTags);
        }
      });
      return tags;
    };
    
    this.messageObjsTaggedBy = function(tag) {
      tag = tag.match(/^#/) ? tag : '#' + tag; // ensure tag prefixed by #
      if (this.tags().indexOf(tag) === null) { return null; }
      var messageObjs = {};
      this.eachOrderedMessage(function(messageObj) {
        console.debug(messageObj);
        var taggedMessage = messageObj.message.match(new RegExp(tag));
        if (taggedMessage) {
          messageObjs[messageObj.id] = messageObj;
        }
      });
      return messageObjs;
    };
    
    this.findMessagePrecedingTag = function(tag) {
      tag = tag.match(/^#/) ? tag : '#' + tag; // ensure tag prefixed by #
      if (this.tags().indexOf(tag) === null) { return null; }
      var untag = tag.replace(/^#/,'');
      var messages = this.messages();
      var messageIds = this.orderedMessageIds();
      var untaggedMessage = null;
      for (var i=0; i < messageIds.length; i++) {
        var messageId = messageIds[i];
        if (messages[messageId].message.match(new RegExp("\\b" + untag + "\\b", "i"))) {
          untaggedMessage = messages[messageId];
          break;
        }
      };
      return untaggedMessage;
    };
    
    this.conversation = function(includsTag) { return {}; };

    this.appendMessage = function(message) {
      var lastMessages = [$('div.kf div.kl:last').attr('id'), $('div.kf div.kk:last span:last').attr('id')];
      var lastMessageId = lastMessages.sort()[1].match(/[0-9a-z]+/)[0];
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
      return $.unique($.keys(this.messages())).sort();
    };
    
    // TODO remove variable assignments after memoizing helpers
    this.eachOrderedMessage = function(callback) {
      var messages = this.messages();
      var messageIds = this.orderedMessageIds();
      for (var i=0; i < messageIds.length; i++) {
        var messageId = messageIds[i];
        callback(messages[messageId]);
      };
    };
    
  });
})(jQuery); 

