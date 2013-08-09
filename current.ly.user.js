// ==UserScript==
// @name     current.ly: an alternate view of the 89.3 The Current's web streamer
// @namespace  https://github.com/bollwyvl/current.ly
// @version  0.1
// @description  enter something useful
// @match    http://www.thecurrent.org/listen
// @copyright  2012+, Nicholas Bollweg
// ==/UserScript==

// UI bits
var player = $("#apm_player_container"),
  art = player.find(".album-art"),
  title = player.find(".title"),
  artist = player.find(".artist"),
  controls = player.find("#apm_player_controls");

// basic html
$("body, html").css({
  overflow: "hidden",
  margin: 0,
  padding: 0
});

player.css({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  padding: 0,
  "background-color": "grey",
  "background-size": "contain",
  "background-position": "center",
  "background-repeat": "no-repeat"
})

// no offense, but these don't update correctly
player.find("h4, .full-playlist, .dj")
  .hide();

// we have another plan
art.hide();

title.css({
  "position": "absolute",
  "bottom": "20px",
  "left": "20px",
  "font-size": "45px",
  "text-shadow": "4px 4px 5px rgba(255, 255, 255, 0.53);"
});

artist.css({
  "position": "absolute",
  "right": "20px",
  "bottom": "20px",
  "font-size": "32px",
  "text-shadow": "4px 4px 5px rgba(255, 255, 255, 0.53);"
});

var other_frame = $("<div/>", {id: "other-frame"}).css({
  position: "fixed",
  "background-color": "rgb(255, 255, 255)",
  height: "100px",
  width: "100%",
  opacity: .5,
  bottom: 0
});

player.prepend(other_frame);

player.append($("<img/>")
  .attr({
    src: "http://www.thecurrent.org/assets/images/logo_desktop.svg",
    width: "15%",
    height: "15%"
  })
  .css({
    position: "fixed",
    opacity: .5,
    top: "10%",
    right: "10px",
		transform: "rotate(45deg)",
		"-ms-transform": "rotate(45deg)", /* IE 9 */
		"-webkit-transform": "rotate(45deg)" /* Safari and Chrome */
  }));

controls.css({
  position: "fixed",
  left: "50%",
  opacity: .5,
  display: "none"
});

function embiggen_album(){
  $('img[src*="400x400"]').each(function(idx, img){
    var url = $(img).attr("src").replace('400x400', '1200x1200')
    
    // set the background
    player.css({
      "background-image": "url(" +  url + ")"
    });
    
    
    $(img).attr("src", "");
  });
  setTimeout(embiggen_album, 5000);
}

function handle_keypress(event){
  for(var ext in external){
    if(external[ext].keys && external[ext].keys.indexOf(event.which)){
    	external[ext](artist.text(), title.text());
    }
  }
}

// namespace for external sites with key bindings!
var external = {}

// search grooveshark!
external.grooveshark = function(artist, title){
  window.open(
    "http://html5.grooveshark.com/#!/search/" + encodeURI(artist + " " + title),
    "grooveshark");
};
// listen to `G` and `g`
external.grooveshark.keys = [121, 89];

// search youtube!
external.youtube = function(artist, title){
  window.open(
    "http://www.youtube.com/results?search_query=" + encodeURI(artist + " " + title),
    "youtube");
};
// listen to `Y` and `y`
external.youtube.keys = [103, 71];


// start up events, etc.
$("body").keypress(handle_keypress);
embiggen_album();
