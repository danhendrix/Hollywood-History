var margin = {
	top: 20,
	right: 20,
	bottom: 20,
	left: 20
}

var width = 1200 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var mySearch = movieSearch("Martin")

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

//Defining the date formatting function
var parseDate = d3.time.format('%d_%b_%Y').parse;

var svg = d3.select("#content").append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//defining scales
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height - 1, 0]);

//defining axis
var xAxis = d3.svg.axis().scale(x)
	.orient('bottom').ticks(12);
var yAxis = d3.svg.axis().scale(y)
	.orient('left').ticks(10);


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
	return getMovieData(searchData);
}

function sortByDates(a, b){
	return a.date-b.date;
}

var x = d3.time.scale()
	.range([0,width]);
	
function visualize(movie){
	var results = movieSearch(movie)
	results.then(function(data){
		console.log(data)
	})
	return results;
}

var search = "\"Martin\""


var newTest = movieSearch(search);

function formatData(data){
	var dataSet = data.map((item) => {
		return {
			score: item.Metascore,
			date: parseDate(item.Released),
			poster: item.Poster,
			title: item.Title
			}
		});
		dataSet.sort(sortByDates)
		debugger;
		return dataSet;
}


	
