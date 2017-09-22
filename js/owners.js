var allOwners = [];

function toggleEditOwnerType(){
    if( $("#edit-modal-owner-chk").is(':checked') ){
        $("#edit-modal-owner-new").show();
        $("#edit-modal-owner-dropdown").hide();
        $("#edit-modal-owner-dropdown-label").hide();

    }else{
        $("#edit-modal-owner-new").hide();
        $("#edit-modal-owner-dropdown").show();
        $("#edit-modal-owner-dropdown-label").show();
    }
}

function populateFormOwners() {
    var dropdown = $("#edit-modal-owner-dropdown");
    dropdown.empty();

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

        for (var i = 0; i < ownersList.length; i++) {
            owner = ownersList[i];
            dropdown.append('<option value="'+owner.id+'">'+owner.name+'</option>');
        }
    });
}

function submitAddOwnerForm() {
    console.log("Got an add request. Working...");

    $.post({
        url: "https://kalidore-microservice.herokuapp.com/owner/new" + $("#edit-modal-name").val(),
        //headers: {
        //    'Accept' : 'application/json', //Whatcha want back
        //    'Content-Type' : 'application/json' // Whatcha sending
        //},
        //'dataType' : 'json', // Whatcha sending, data type
        //data : JSON.stringify({
        //    "ownerName" : $("#edit-modal-name").val(),
        //})

    }).success(function(){
        alert("Added.")

        $("#edit-modal-name").val('');
    }).error(function(){
        alert("Something went wrong. Page the Bean!!");
    });
}