<!-- retrieve owner names to auto populate input -->
var allOwners = {};
var allKore = {};
function chomp(){
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/all",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
        
    }).success(function (data) {
    	console.log(data);
	});
}