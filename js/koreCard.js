function loadRandomKore() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/random",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (kore) {

        var picsDiv = $("#kore-pics");
        console.log(kore);

        var koreDiv = makeKoreCard(kore);

        picsDiv.html(koreDiv);


    });
}

function makeKoreCard(kore) {
    var koreDiv = $("<div>");
    koreDiv.attr("class", "card col-md-6 col-xs-6 col-lg-6");

    koreDiv.append($("<img>").attr({
        "src": kore.mainPic,
        "alt": "Avatar",
        "style": "width:100%"
    }));

    koreDiv.append($("<div>")
        .append("<h4>" + kore.name + "</h4>"));
    if (kore.owner != null && kore.owner.id != null) {
        koreDiv.append($("<div>").append(kore.owner.name));
    }

    return koreDiv;
}