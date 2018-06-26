var ratings = [];
var stillGifs = [];
var animatedGifs = [];
var buttons = ["Manchester United, Chelsea, Liverpool, Manchester City, Tottenham"];


function createButtons() {
    $("#addedButtons").empty();
    for (var i = 0; i < buttons.length; i++) {
        var buttonValue = buttons[i];
        var newButton = $("<button class='btn btn-outline-primary' id='" + buttonValue + "'>" + buttonValue + "</button>");

        $("#addedButtons").append(newButton);
    }
};
createButtons();


$("#addChoice").click(function() {
    var newChoice = $("#addChoice").val();
    buttons.push(addChoice);
    
    createButtons();
});

$(document).on("click", "button", function() {
    var currentId = $(this).attr("id");
    console.log(currentId);

    if (currentId !== "addChoice") {

     //   var queryURL = GIPHY API KEY URL GOES HERE

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            $("#gifDisplay").empty();
            ratings = [];
            stillGifs = [];
            animatedGifs = [];

            for (var i = 0; i < 10; i++) {
                ratings.push(response.data[i].rating);
                stillGifs.push(response.data[i].images.fixed_height_still.url);
                animatedGifs.push(response.data[i].images.fixed_height.url);

                var gifDiv = $("<div>").addClass("gifDiv");
                var gifLink = $("<img src='" + stillGifs[i] + "' id='img-" + i + "'>")
                gifDiv.append(ratings[i], gifLink);
                
                $("#gifDisplay").append(gifDiv);
            };
        });
    };

});

$(document).on("click", "img", function() {
    var currentSrc = $(this).attr("src");
    var imgID = $(this).attr("id");
    var imgIndex = imgID.slice(4);

    console.log(currentSrc, imgID, imgIndex);

    if (currentSrc.includes("_s")) {
        $(this).attr("src", animatedGifs[imgIndex]);
    }
    else {
        $(this).attr("src", stillGifs[imgIndex]);
    }
});