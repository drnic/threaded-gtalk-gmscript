// ==UserScript==
// @name          Threaded Gtalk GMScript
// @namespace     http://drnicwilliams.com/
// @description   Instant autocompletion for any <select> drop downs on any page
// @include       https://*
// @include       http://*
// @version       1.0
// ==/UserScript==

(function() {
  var head = document.getElementsByTagName("head")[0];
  
  var require = function(src) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    head.appendChild(script);
  };
  var load_latest_threaded_gtalk = function() {
    require("http://drnic.github.com/threaded-gtalk-gmscript/dist/threaded_gtalk_complete.js");
  };
  
  load_latest_threaded_gtalk();
})();
