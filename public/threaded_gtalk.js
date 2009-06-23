var ThreadedGtalk = ThreadedGtalk || {};
ThreadedGtalk.Chat = {
  messages: function() { return {}; },
  tags: function() { return []; },
  tagged: function(tag) { return {}; },
  conversation: function(includsTag) { return {}; },
  appendMessage: function(message) {
    var lastMessages = [$('div.kf div.kl:last').attr('id'), $('div.kf div.kk:last span:last').attr('id')];
    var lastMessageId = lastMessages.sort()[1].match(/[0-9a-z]+/)[0];
    lastMessageId = parseInt(this.baseConverter(lastMessageId, 36, 10), 10);
    var nextId = this.baseConverter((lastMessageId + 1) + "", 10, 36);
    $('div.kf div.km:last').
      append($('<div id=":' + nextId + '" dir="ltr" class="kl threaded-gtalk">' + message + '</div>'));
  },
  baseConverter: function(number,ob,nb) {
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
  }
  
};
