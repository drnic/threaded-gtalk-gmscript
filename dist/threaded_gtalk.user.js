// ==UserScript==
// @name          Threaded Gmail Chat/Gtalk
// @namespace     http://drnicwilliams.com/
// @description   Annotate Gtalk messages based on #tag threads
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @version       1.0
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName("head")[0];
  
  var require = function(src) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    head.appendChild(script);
  };

  require("http://drnic.github.com/threaded-gtalk-gmscript/dist/threaded_gtalk_complete.js");
})();
