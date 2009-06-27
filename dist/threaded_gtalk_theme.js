var ThreadedGtalk = ThreadedGtalk || {};

(function($){ 
  ThreadedGtalk.View = (new function(){
    // Thread colours come from the colour sequence for participants in Gmail conversations
    this.threadColours = ['#006835', '#790619', '#5B1094', '#C88900', '#CC0060', '#00839F'];
    this.repeatCount   = 5;
    
    this.installTheme = function() {
      var colourClasses = "";
      var colourLength  = this.threadColours.length;
      var seq = 1;
      for (var repeat = 0; repeat < this.repeatCount; repeat++) {
        $.each(this.threadColours, function(index) {
          colourClasses += ".thread-" + seq + " { color: " + this + " }\n";
          seq++;
        });
      };
      $('head').append($('<style class="threaded_gtalk_theme">' + colourClasses + '</style>'));
    };
  });
  
  $(function() {
    // install colour theme of classes thread-1, thread-2 etc
    ThreadedGtalk.View.installTheme();
  });
})(jQuery); 


