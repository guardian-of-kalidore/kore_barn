<!-- retrieve owner names to auto populate input -->
var allOwners = {};
var allKore = {};
function loadAllKore(){
    $.get({
        url: "https://kalidore-microservice.herokuapp.com/kore/all",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'dataType': 'json'
        
    }).success(function (koreList) {
    	console.log(koreList);
    	allKore = koreList;
    	var picsDiv = $("#kore-pics");
    	
    	for(var i = 0; i < allKore.length; i++){
    		var kore = allKore[i];
    		console.log(kore);
    		
    		var koreDiv = $("<div>");
    		koreDiv.attr("class", "card col-md-3 col-xs-3 col-lg-3");
    		
    		koreDiv.append($("<img>").attr({
    		"src" : kore.mainPic.url,
    		"alt" : "Avatar",
    		"style" : "width:100%"
    		}));
    		
    		koreDiv.append($("<div>").append("<h4>"+kore.name+"</h4>"));
    		
    		picsDiv.append(koreDiv);
    		
    	}
    	
    	
	});
}