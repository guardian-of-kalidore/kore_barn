var allKore = [];

function populateEditTags() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/tag/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (tagMap) {
        fillTagList(tagMap);
    });
}

function populateKoreTable() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (koreList) {
        populateSiresAndDams(koreList);
        fillKoreTable(koreList);
    });
}

function populateKoreTableWithOwner(ownerid) {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/owner/id/"+ownerid,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (koreList) {
        fillKoreTable(koreList);
    });
}

function fillKoreTable(koreList){
    var koreRows = $("#kore-rows");
    koreRows.empty();

    allKore = koreList;
    var kore;
    for (var i = 0; i < koreList.length; i++) {
        kore = koreList[i];
        koreRows.append(koreToRow(kore));

    }
}

function fillTagList(tagMap){
    var allTags = $("#edit-tags");
    allTags.empty();


    var tagGroups = Object.keys(tagMap);
    for(var g = 0; g < tagGroups.length ; g++){
        var groupName = tagGroups[g];
        var tagGroup = $("div");

        for(var t = 0; t < tagMap[groupName].length; t++){
            var tag = tagMap[groupName][t];
            $("#details-modal-tags").append(
                "<span class='label label-primary'>" + tag.tagName + "</span>"
            );

            tagGroup.append(
                "<label class='checkbox-inline'><input type='checkbox' value='"
                + tag.typeId +"."+tag.tagId +"'>" +
                tag.tagName + "</label>"
            );

        }

        $("#edit-tags").append(tagGroup);

    }

}

function koreToRow(kore) {
    console.log("Trying to turn into row: ");
    console.log(kore);
    var koreRow = $("<tr>");

    var picField = $("<td>").attr("width", "15%");
    if (kore.thumbNail != null) {
        picField.append('<img height="50px" src="' + kore.thumbNail + '">');
    } else if(kore.mainPic != null) {
        picField.append('<img height="50px" src="' + kore.mainPic + '">');
    } else{
            picField.append('n/a');

    }

    var nameField = $("<td>").attr("width", "20%");
    nameField.append('<a onclick="showDetails(' + kore.id + ')">' + kore.name + '</a>');
    var ownerField = $("<td>").attr("width", "20%");
    if (kore.owner != null && kore.owner.name != null) {
        ownerField.append('<a onclick="populateKoreTableWithOwner(' + kore.owner.id + ')">'+kore.owner.name+'</a>');
    }

    var deleteBtn = $("<td>").attr("width", "10%");
    deleteBtn.append('<a onclick="removeKore(' + kore.id + ')"><span class="glyphicon glyphicon-remove" style="color:red;"></span></a>');
    var editBtn = $("<td>").attr("width", "10%");
    editBtn.append('<a onclick="editKore(' + kore.id + ')"><span class="glyphicon glyphicon-pencil" style="color:darkblue;"></span></a>');

    var tagBtn = $("<td>").attr("width", "10%");
    tagBtn.append('<a onclick="editKoreTags(' + kore.id + ')"><span class="glyphicon glyphicon-list" style="color:darkgreen;"></span></a>');

    koreRow.append(picField);
    koreRow.append(nameField);
    koreRow.append(ownerField);
    koreRow.append(deleteBtn);
    koreRow.append(editBtn);
    koreRow.append(tagBtn);
    console.log(koreRow);
    return koreRow;
}

