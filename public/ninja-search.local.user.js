// ==UserScript==
// @name          Threaded Gtalk GMScript
// @namespace     http://drnicwilliams.com/
// @description   Instant autocompletion for any <select> drop downs on any page
// @include       https://*
// @include       http://*
// @version       1.0
// ==/UserScript==

// THIS FILE IS FOR LOCAL QA TESTING
// It loads the public/ninja_search_complete.js file which is built by `rake build`
// The project must be mounted as http://threaded-gtalk-gmscript.local
// I do this using Passenger (drop project folder into Passenger PrefPane)
// The threaded-gtalk.user.js file contains the public url for downloading scripts and assets

(function() {
  var head = document.getElementsByTagName("head")[0];
  
  var flexselect_theme = function() {
    var style = document.createElement("link");
    style.setAttribute("type", "text/css");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("media", "screen");
    style.setAttribute("href", "http://threaded-gtalk-gmscript.local/stylesheets/flexselect.css");
    head.appendChild(style);
  };

  var require = function(src) {
    var script = document.createElement("script");
    script.setAttribute("src", src);
    head.appendChild(script);
  };
  var load_latest_ninja_search = function() {
    require("http://threaded-gtalk-gmscript.local/ninja_search_complete.js");
  };
  
  flexselect_theme();
  load_latest_ninja_search();
})();
