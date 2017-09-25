function populateSiresAndDams(koreList){
    var kore;

    var sires = $("#edit-modal-sire");
    var dams = $("#edit-modal-dam");

    for (var i = 0; i < koreList.length; i++) {
        kore = koreList[i];

        sires.append('<option value="'+kore.id+'">'+kore.name+'</option>');
        dams.append('<option value="'+kore.id+'">'+kore.name+'</option>');
    }
}

function removeKore(id) {
    alert("Yeah, sorry - remove isn't working yet.");
}

function showDetails(id) {
    console.log("Gotta show info about this kore " + id);
    fillModalDetails(id, "#kore-modal");
}

function editKore(id) {
    console.log("Gotta edit this kore " + id);
    fillModalDetails(id, "#edit-modal");
}

function editKoreTags(id) {
    console.log("Gotta edit this kore's tags " + id);
    fillModalDetails(id, "#edit-modal-tags");
}

function submitEditForm() {
    console.log("Got an edit request. Working...");

    $.post({
        url: "https://kalidore-microservice.herokuapp.com/kore/update/id/"+$("#edit-modal-id").val(),
        headers: {
            'Accept' : 'application/json', //Whatcha want back
            'Content-Type' : 'application/json' // Whatcha sending
        },
        'dataType' : 'json', // Whatcha sending, data type
        data : JSON.stringify({
            "koreName" : $("#edit-modal-name").val(),
            "ownerId" : $("#edit-modal-owner-dropdown").val(),
//                "newOwner" : $("#edit-modal-owner-chk").is(':checked') ? $("#edit-modal-owner-new").val() : '',
            "picUrl" : $("#edit-modal-pic").val(),
            "sireId" : $("#edit-modal-sire").val(),
            "damId" : $("#edit-modal-dam").val(),
            "color" : $("#edit-modal-color").val()
        })

    }).success(function(){
        console.log("Edit maybe worked?!");

        populateKoreTable();
        populateFormOwners();

    });
}

function submitTagForm(){
    console.log("Got an tag edit request. Working...");

    var tagsToSend = [];
    var tag;

    $(".koretag").each(function(){
        if( $(this).is(':checked') ){
            console.log("Found a checked tag");
            console.log($(this));
            tagsToSend.push($( this).val());
        }
    });

    $.post({
        url: "https://kalidore-microservice.herokuapp.com/kore/update/id/"+$("#edit-modal-id").val(),
        headers: {
            'Accept' : 'application/json', //Whatcha want back
            'Content-Type' : 'application/json' // Whatcha sending
        },
        'dataType' : 'json', // Whatcha sending, data type
        data : JSON.stringify({
            tagsSelected : tagsToSend
        })

    }).success(function(){
        console.log("Edit maybe worked?!");

        populateKoreTable();
        populateFormOwners();

    });
}

function fillModalDetails(id, modal) {

    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/id/" + id,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (koreDetails) {

        console.log("Found kore#" + id);
        console.log(koreDetails);

        var kore = koreDetails.kore;

        $("#details-modal-name").html(kore.name);
        $("#edit-modal-name").val(kore.name);
        $("#edit-modal-id").val(kore.id);
        $("#tag-edit-kore-id").val(kore.id);

        $("#details-modal-edit-btn").html('<a onclick="editKore(' + kore.id + ')" data-dismiss="modal"><span class="glyphicon glyphicon-pencil" style="color:darkblue;"></span></a>');

        $("#details-modal-img").html('<img src="' + kore.mainPic + '">');
        $("#edit-modal-img").html('<img src="' + kore.mainPic + '">');
        $("#edit-tag-img").html('<img src="' + kore.mainPic + '">');

        $("#edit-modal-pic").val(kore.mainPic);


        $("#edit-modal-owner-new").val('');
        $("#edit-modal-owner-chk").attr('checked', false);
        toggleEditOwnerType();

        if (kore.owner != null) {
            $("#details-modal-owner").html(kore.owner.name);
            $("#edit-modal-owner-dropdown").val(kore.owner.id);
        } else {
            $("#details-modal-owner").html("n/a");
            $("#edit-modal-owner-dropdown").val('');
        }

        if (koreDetails.heritage.dam != null) {
            $("#details-modal-dam").html(koreDetails.heritage.dam);
            $("#edit-modal-dam").val(koreDetails.heritage.damId);
        } else {
            $("#details-modal-dam").html("n/a");
            $("#edit-modal-dam").val('');
        }

        if (koreDetails.heritage.sire != null) {
            $("#details-modal-sire").html(koreDetails.heritage.sire);
            $("#edit-modal-sire").val(koreDetails.heritage.sireId);
        } else {
            $("#details-modal-sire").html("n/a");
            $("#edit-modal-dam").val('');
        }

        console.log("Tags...");
        console.log(koreDetails.tags);

        if(koreDetails.tags != null){
            $("#details-modal-tags").empty();
            var tagGroups = Object.keys(koreDetails.tags);
            for(var g = 0; g < tagGroups.length ; g++){
                var groupName = tagGroups[g];

                for(var t = 0; t < koreDetails.tags[groupName].length; t++){
                    var tag = koreDetails.tags[groupName][t];
                    $("#details-modal-tags").append(
                        "<span class='label label-primary'>" + tag.tagName + "</span>"
                    );
                }

            }
        } else{
            $("#details-modal-tags").html("n/a");
        }

        $(modal).modal('show');
    });
}

function submitAddForm() {
    console.log("Got an edit request. Working...");

    $.post({
        url: "https://kalidore-microservice.herokuapp.com/kore/new",
        headers: {
            'Accept' : 'application/json', //Whatcha want back
            'Content-Type' : 'application/json' // Whatcha sending
        },
        'dataType' : 'json', // Whatcha sending, data type
        data : JSON.stringify({
            "koreName" : $("#edit-modal-name").val(),
            "ownerId" : $("#edit-modal-owner-dropdown").val(),
//                "newOwner" : $("#edit-modal-owner-chk").is(':checked') ? $("#edit-modal-owner-new").val() : '',
            "picUrl" : $("#edit-modal-pic").val(),
            "sireId" : $("#edit-modal-sire").val(),
            "damId" : $("#edit-modal-dam").val(),
            "color" : $("#edit-modal-color").val()
        })

    }).success(function(){
        alert("Added.")

        $("#edit-modal-name").val('');
        $("#edit-modal-owner-dropdown").val('');
        $("#edit-modal-pic").val('');
        $("#edit-modal-sire").val('');
        $("#edit-modal-dam").val('');
        $("#edit-modal-color").val('');
    }).error(function(){
        alert("Something went wrong. Page the Bean!!");
    });
}