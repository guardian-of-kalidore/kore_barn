function fillTagList(tagMap){

    var tagNames = Object.keys(tagMap);
    console.log(tagNames);

    for(var t = 0; t < tagNames.length ; t++){
        var tagName = tagNames[t];
        var tag = tagMap[tagName];

        var tagGroup = $("#edit-tags-"+tag.typeId);
        tagGroup.append(
            "<label class='checkbox-inline'><input type='checkbox' class='koretag' " +
            " id='t"+ tag.tagId +
            "' value='" + tag.typeId +"."+tag.tagId +"'>" +
            tag.tagName + "</label>"
        );
    }

}

function populateEditTags() {
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/tag/all",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        'dataType': 'json'

    }).success(function (tagMap) {
        console.log("Got me a lot of things");
        console.log(tagMap);

        fillTagList(tagMap);
    });
}

function clearEditTags(){
    $(".koretag").each(function(){
        if( $(this).is(':checked') ){
            $(this).attr('checked', false);
        }
    });
}
