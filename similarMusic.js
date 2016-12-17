//pulls from the TasteKid API
//read about it: https://www.tastekid.com/read/api

    var favs = new Array();

$(function() {   // when document is ready
    $("#f1").submit(getMusic);
    $("#favorites").html( "This is where your favorites will eventually be stored :)" );
    } );



function getMusic() {
    var artist = $("#artistInput").val();
    var kind = $("#kindInput").val();
    var query = kind.concat(":").concat(artist);
    $("#response").html("<h1>"+"Searching for similarities to"+artist+".</h1>");
    $("#artistInput").val("");
    try {
        //calls the api with ajax and queries for artists similar to the input
    $.ajax({
        url:"https://www.tastekid.com/api/similar",
        data: {
            k : "241109-APIPract-SNR2JRLW",
            callback : "displayMusic",
            q : query, 
            info: 1,
            },
    jsonp: false,                       // don't have jQuery choose callback name
    dataType: "jsonp",          // treat the request as JSONP
        crossDomain: true
        } );
    return false;
    } catch (e) {console.log(e.description);}
} 



function displayMusic(response) {
    var resultsInfo = new Array();
    var similarMusic = response.Similar.Results;
    $("#similarArtistResults").html("");
    //displays a list of names of 20 similar artists
    for (var i = 0; i < similarMusic.length; i ++){
        var info = [similarMusic[i].Name, similarMusic[i].wTeaser, similarMusic[i].yUrl];
        resultsInfo[i] = info;
        $('<div/>', {id: "heart".concat(i.toString()), class: "faEmptyHeart"}).appendTo('#similarArtistResults');
        $('<div/>', {id: i, class: "highlightHover", text: resultsInfo[i][0]}).appendTo('#similarArtistResults');
        $('<div/>', {id: "toggle".concat(i.toString()), class: "hide applebox", text: resultsInfo[i][1]}).appendTo('#similarArtistResults');
        $('#'.concat(i)).after( '<br />' );
        // $("<div id="i"></div>").appendTo("#similarArtistResults");
        // $("#similarArtistResults").append(resultsInfo[i][0]);
        //$("#similarArtistResults").append("<br>");

    }

    // var div = document.getElementById(0);
    // div.onclick = function() {
    //     $("#toggle0").toggleClass("hide");
    //         // var myval = $(this).attr('id');
    //         // showstuff(myval);
    //         //alert(resultsInfo[i]);
    //     }

    // unless there aren't any and then it gives an error message
    if (similarMusic.length == 0) {
        $("#similarArtistResults").append("I'm sorry that artist isn't in our system. Perhaps fix your spelling or try someone else.");
    }

    

    for (let j= 0; j < similarMusic.length; j ++) {
        var tag = document.getElementById(j);
            tag.onclick = function(){
                extraInfo = "#".concat("toggle".concat(j.toString()));
                $(extraInfo).toggleClass("hide");
            }
        

    }

    for (let k= 0; k < similarMusic.length; k ++) {
        var resultsInfo = new Array();
        var fav = document.getElementById("heart".concat(k.toString()));
            fav.onclick = function(){
                isFav = "#".concat("heart".concat(k.toString()));
                f = document.getElementById("heart".concat(k.toString()));
                if (f.className == "faEmptyHeart"){
                    $(isFav).removeClass("faEmptyHeart");
                    $(isFav).addClass("faFullHeart");
                }
                else {
                    $(isFav).addClass("faEmptyHeart");
                    $(isFav).removeClass("faFullHeart");
                }
            }
        
    }

    

}




