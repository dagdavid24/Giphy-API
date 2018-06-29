console.log("hi");

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
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    $("#images").prepend(gifDiv);
                }
            }
        });
});

$(".gif").on("click", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});