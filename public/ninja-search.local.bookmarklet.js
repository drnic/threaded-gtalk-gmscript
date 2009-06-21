// This file is embedded into <a id="bookmarklet" href="javascript:contents"> tags
// within test and public website files, by the +rake update_bookmarklet+ task

// Comments and whitespace will be stripped

// This is a modified version of ninja-search.local.user.js

(function() {
  var head = document.getElementsByTagName("head")[0];

  var style = document.createElement("link");
  style.setAttribute("type", "text/css");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("href", "http://threaded-gtalk-gmscript.local/stylesheets/flexselect.css");
  head.appendChild(style);

  var script = document.createElement("script");
  script.setAttribute("src", "http://threaded-gtalk-gmscript.local/liquidmetal.js");
  head.appendChild(script);
  var script = document.createElement("script");
  script.setAttribute("src", "http://threaded-gtalk-gmscript.local/jquery.flexselect.js");
  head.appendChild(script);
  var script = document.createElement("script");
  script.setAttribute("src", "http://threaded-gtalk-gmscript.local/ninja_search.js");
  head.appendChild(script);
}());