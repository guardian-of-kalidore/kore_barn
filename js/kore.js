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
    	
    	for(int i = 0; i < koreList.length; i++){
    		var kore = koreList[i];
    		console.log(kore);
    		
    		var koreDiv = $("<div>");
    		koreDiv.attr("class", "card");
    		
    		koreDiv.append($("<img>").attr({
    		"src" : "kore.mainPic",
    		"alt" : "Avatar",
    		"style" : "width:100%"
    		});
    		
    		koreDiv.append($("<div>").attr("class", "container")
    								.append($("<h4>").innerHtml(kore.name)));
    		
    		picsDiv.append(koreDiv);
    		
    	}
    	
    	
	});
}