
var noOwners = [];

function populateNoOwnerKore() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (koreList) {
        populateSiresAndDams(koreList);

        var kore;
        for(var i = 0; i < koreList.length; i++){
            kore = koreList[i];
            if(kore.owner.id < 1){
                noOwners.push(kore);
            }
        }

        fillKoreTable(noOwners);
    });
}

function loadOwnerMenu(){

    $("#a-e-owner").empty();

    $.get({
        url: "https://kalidore-microservice.herokuapp.com/owner/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (ownersList) {
        allOwners = ownersList;
        var owner;
        var menu;

        for(var i = 0; i < allOwners.length; i++){
            owner = allOwners[i];

            if(owner.name.toLowerCase() < "d"){
                menu = $("#a-c-owner");
            } else if(owner.name.toLowerCase() < "e"){
                menu = $("#d-owner");
            } else if(owner.name.toLowerCase() < "h"){
                menu = $("#e-g-owner");
            } else if(owner.name.toLowerCase() < "l"){
                menu = $("#h-k-owner");
            } else if(owner.name.toLowerCase() < "n"){
                menu = $("#l-m-owner");
            } else if(owner.name.toLowerCase() < "s"){
                menu = $("#n-r-owner");
            } else if(owner.name.toLowerCase() < "t"){
                menu = $("#s-owner");
            } else if(owner.name.toLowerCase() < "u"){
                menu = $("#t-owner");
            } else{
                menu = $("#u-z-owner");
            }

            menu.append('<li><a onclick="populateKoreTableWithOwner(' + owner.id + ')">'+ owner.name +'</a></li>');

        }
    });



}