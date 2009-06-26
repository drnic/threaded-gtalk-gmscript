// ==UserScript==
// @name          Threaded Gtalk GMScript
// @namespace     http://drnicwilliams.com/
// @description   Instant autocompletion for any <select> drop downs on any page
// @include       https://mail.google.com/mail/*
// @version       1.0
// ==/UserScript==

// THIS FILE IS FOR LOCAL QA TESTING
// It loads the public/threaded_gtalk_complete.js file which is built by `rake build`
// The project must be mounted as http://threaded-gtalk-gmscript.local
// I do this using Passenger (drop project folder into Passenger PrefPane)
// The threaded-gtalk.user.js file contains the public url for downloading scripts and assets

(function() {
  var head = document.getElementsByTagName("head")[0];
  
  var require = function(src) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    head.appendChild(script);
  };

  require("http://threaded-gtalk-gmscript.local/threaded_gtalk_complete.js");
})();
