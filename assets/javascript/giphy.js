console.log("hi");

var heroes = ["Captain America", "Winter Soldier", "Thor", "Superman", "Spiderman", "Batman"];

//To create buttons from list of heroes
function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < heroes.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-outline-dark");
        a.attr("data-person", heroes[i]);
        a.text(heroes[i]);
        $("#buttons").append(a);
    }
}

renderButtons();

//creates buttons from the input of the search bar
$("#Add-Hero").on("click", function(event) {
    event.preventDefault();
    var search = $("#search").val().trim();
    heroes.push(search);
    renderButtons();
  });

//Gets the Gifs of the rendered buttons
$("button").on("click", function () {
    var hero = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        hero + "&api_key=5jb45kTi0xVsoCeW7xopxXayRod0qBfC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img class='gif'>");
                    personImage.attr("src", results[i].images.fixed_height_still.url);
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#images").prepend(gifDiv);
                }
            }
        });
});

//to pause gif  
$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('playing')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('playing');
  } else {
    //play
    $(this).addClass('playing');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});