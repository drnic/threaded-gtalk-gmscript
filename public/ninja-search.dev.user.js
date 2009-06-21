// ==UserScript==
// @name          Threaded Gtalk GMScript
// @namespace     http://drnicwilliams.com/
// @description   Instant autocompletion for any <select> drop downs on any page
// @include       https://*
// @include       http://*
// @version       1.0
// ==/UserScript==

// THIS FILE IS FOR LOCAL DEV TESTING
// It loads the public/*.js files individual so no `rake build` is required
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
    if (typeof jQuery === "undefined" || jQuery === null) {
      require("http://threaded-gtalk-gmscript.local/jquery.js");
      var script = document.createElement("script");
      script.innerHTML = "jQuery.noConflict();";
      head.appendChild(script);
    }
    require("http://threaded-gtalk-gmscript.local/liquidmetal.js");
    require("http://threaded-gtalk-gmscript.local/jquery.flexselect.js");
    require("http://threaded-gtalk-gmscript.local/ninja_search.js");
  };
  
  flexselect_theme();
  load_latest_ninja_search();
})();
