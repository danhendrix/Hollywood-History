function movieSearch(title, year){
	var url = "http://www.omdbapi.com/?s=" + title + "&page=1&r=JSON&y=" + year;
	return new Promise(function(resolve,reject){
	$.getJSON(url)
	.done(function(data){
		resolve(formatSearch(data));
	})
	.fail(function(err){
		reject(err);
		console.log("Failed",err);
	});
})
}

function formatSearch(data){
	var searchData = data.Search.map(function(item){
		return item.imdbID;
	})
	return searchData;
};
var mySearch = movieSearch("Apollo","")

var promiseTest = mySearch.then(function(data){
	return data;
})



var listOfIds = ["tt0372784", "tt0096895"]
//console.log(getMovieData(listOfIds))

var newSearch = getMovieData(listOfIds);


function getMovieData(idList){
	var resultsList = []
		for(i in idList){
			var url = 'http://www.omdbapi.com/?i='+idList[i]+'&plot=short&r=json';
			var movieResults = new Promise(function(resolve,reject){			
			$.getJSON(url)
			.then(function(data){
				return resolve(resultsList.push(data));
				})
		})}
	return resultsList;
}


function formatMovieData(data){
	debugger;
	var movieData = data.map(function(item){
	return {
		Title: item.Title,
		Released: item.Released,
		Rating: item.imdbRating,
		Poster: item.Poster
	}
	})
	return movieData;
}




var margin = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
}

function initialize(tomHanks){
	svg = select("#content").append('svg')
	.attr('width'), width + margin.left + margin.right
}

function sortByDates(a, b){
	return a.date-b.date;
}

var x = d3.time.scale()
	//.domain(d3.extent(released))


