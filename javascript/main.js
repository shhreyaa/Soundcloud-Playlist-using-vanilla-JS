// 1.search
var UI ={};

UI.handleEnterPress = function() {
	document.querySelector(".js-search").addEventListener('keypress', function( e ) {
		if ( e.which === 13 ) {
			var inputValue = e.target.value;
			// onValueRead( inputValue );
			//console.log(inputValue);
      SoundCloudAPI.getTrack(inputValue);
      console.log("pressing")
			
		}
	});
}

UI. pressSubmit = function(){
  document.querySelector('.js-submit').addEventListener('click', function(){
    var inputValue = document.querySelector(".js-search").value;
    SoundCloudAPI.getTrack(inputValue);
    console.log("clicked")
  })
}
UI.handleEnterPress();
UI.pressSubmit()

// var search = document.querySelector(".input-search");
// var searchIcon = document.querySelector('.js-submit');

// searchIcon.addEventListener('click',submitSearch)

// SoundCloudAPI.submitSearch = function(){
//   console.log('serching/')
// }


// 2. Sound Cloud API
var SoundCloudAPI = {};

SoundCloudAPI.init = function () {
  SC.initialize({
    client_id: "cd9be64eeb32d1741c17cb39e41d254d",
  });
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack = function (inputValue) {
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get("/tracks", {
    q: inputValue,
  }).then(function (tracks) {
    console.log(tracks);
    SoundCloudAPI.renderTracks(tracks);
  });
};

// SoundCloudAPI.getTrack("pink");

//3. display songs
SoundCloudAPI.renderTracks = function (tracks) {
  var searchResults = document.querySelector(".js-search-results");
  searchResults.innerHTML= "";

  tracks.forEach(function (track) {
    //card
    var card = document.createElement("div");
    card.classList.add("card");

    //image
    var imageDiv = document.createElement("div");
    imageDiv.classList.add("image");
    var image_img = document.createElement("img");

    image_img.classList.add("image_img");
    image_img.src =
      track.artwork_url || "http://lorempixel.com/100/100/abstract/";

    imageDiv.appendChild(image_img);
    //content
    var content = document.createElement("div");
    content.classList.add("content");
    var header = document.createElement("div");
    header.innerHTML =
      '<a href="' +
      track.permalink_url +
      '" target="_blank">' +
      track.title +
      "</a>";

    content.appendChild(header);

    //button
    var button = document.createElement("div");
    button.classList.add("ui", "bottom", "attched", "button", "js-button");

    var icon = document.createElement("i");
    icon.classList.add("add", "icon");

    var buttonText = document.createElement("span");
    buttonText.innerHTML = "add to playlist";

    button.addEventListener("click", function () {
      SoundCloudAPI.getEmbed(track.permalink_url);
    });

    //appendChild
    content.appendChild(header);

    button.appendChild(icon);

    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);
    var searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
  });

};
//embedding
SoundCloudAPI.getEmbed = function (trackURL) {
  console.log("click");
  SC.oEmbed(trackURL, {
    auto_play: true,
  }).then(function (oEmbed) {
    console.log("oEmbed response: ", oEmbed);
    var sideBar = document.querySelector(".js-playlist");
    var box = document.createElement("div");
    box.innerHTML = oEmbed.html;
    sideBar.insertBefore(box, sideBar.firstChild);
 
    localStorage.setItem("key", sideBar.innerHTML);
    console.log(sideBar.innerHTML)
 

	
    
  });
};
var sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML= localStorage.getItem("key");




//Reseting playlist
Reset = {}
Reset.handleReset = function(){
  document.querySelector('.reset').addEventListener('click',function(){
    localStorage.clear();
console.log("reset");
window.location.reload();
  })
}
Reset.handleReset();