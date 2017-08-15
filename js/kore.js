<!-- retrieve owner names to auto populate input -->
var allOwners = {};
var allKore = {};
function loadAllKore() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/random",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (kore) {
        <!--     	console.log(koreList); -->
        <!--     	allKore = koreList; -->
        var picsDiv = $("#kore-pics");

        <!--     	for(var i = 0; i < allKore.length; i++){ -->
        <!--     		var kore = allKore[i]; -->
        console.log(kore);

        var koreDiv = makeKoreCard(kore);

        picsDiv.append(koreDiv);

        <!--     	} -->


    });
}

function setupOwners() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/owner/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (ownerList) {
        console.log(ownerList);
        allOwners = ownerList;
        var ownerSelect = $("#owners");
        var owner;
        for (var i = 0; i < allOwners.length; i++) {
            owner = allOwners[i];
            ownerSelect.append($("<option value=" + owner.id + ">" + owner.name + "</option>"));
        }

    });
}

function makeKoreCard(kore) {
    var koreDiv = $("<div>");
    koreDiv.attr("class", "card col-md-3 col-xs-3 col-lg-3");

    koreDiv.append($("<img>").attr({
        "src": kore.mainPic.url,
        "alt": "Avatar",
        "style": "width:100%"
    }));

    koreDiv.append($("<div>")
           .append("<h4>" + kore.name + "</h4>"));
    if (kore.owner != null && kore.owner.id != null) {
        koreDiv.append($("<div>").append("<button onclick='findOwnerKore(" + kore.owner.id + ")'>" + kore.owner.name + "</button>"));
    }

    return koreDiv;
}

function findOwnerKore(id) {
    if (id == null) return;

    $("#owner-pics").empty();
    var picsDiv = $("#owner-pics");

    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/owner/" + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (koreList) {


        console.log(koreList);
        for (var i = 0; i < koreList.length; i++) {
            var kore = koreList[i];
            var koreDiv = makeKoreCard(kore);
            picsDiv.append(koreDiv);
        }

    });

}