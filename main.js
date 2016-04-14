function fetchData(whichActor){
	var url = "RT URL with key" + whichActor + "other stuff";
	var fetchedData = new Promise(function(resolve, reject){
		d3.json(url, function(json){
			resolve(json);
		})
	})
	return fetchedData;
}

var margin = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20;
}

function initialize(tomHanks){
	svg = select("#content").append('svg')
	.attr('width'), width + margin.left + margin.right
}