var margin = {
	top: 30,
	right: 30,
	bottom: 30,
	left: 30
}

var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

//Defining the date formatting function

var parseDate = d3.time.format('%d %b %Y').parse;

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
	.orient('bottom').ticks(10);
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

function getMovieData(idList){
	var resultsList = [];
		for(i in idList){
			var url = 'http://www.omdbapi.com/?i='+idList[i]+'&plot=short&r=json';
			var results = new Promise(function(resolve,reject){	
			$.getJSON(url,function(json){
			resolve(resultsList.push(json));
			})
		})}
	return Promise.all([resultsList,results]).then(data =>{
		return formatData(data[0]);
	})
}

function sortByDates(a, b){
	return a.date-b.date;
}
	
function initialize(){
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);
	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis);
		
	visualize();
}

function visualize(){
	console.log(document.getElementById("title").value);
	title = document.getElementById("title").value;
	year = document.getElementById("year").value;
	let dataSet = movieSearch(title,year);
	
	dataSet.then(data=>{
	console.log(data)
	var dates = _.map(data,'date');
	var scores = _.map(data,'score');
	var posters = _.map(data,'poster');
	var titles = _.map(data,'title');

	y.domain([1,100])
	x.domain(d3.extent(dates))
	
	var updateSvg = d3.select('#content').transition()
	/*updateSvg.select(".bubble")
		.duration(500)
		.attr('d')*/
	updateSvg.select('.x.axis')
		.duration(100)
		.call(xAxis);
	updateSvg.select('.y.axis')
		.duration(100)
		.call(yAxis);
	
	/*var circle = svg.selectAll('circle')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'bubble')
		.attr('cx', function(d){return x(d.date)})
		.attr('cy', function(d){return y(d.score)})
		.attr('r', '20')
		/*.style('background-image', function(data){
			return posters;
		})*/
		
	var imgs = svg.selectAll("image").data(data)
		.enter()
		.append("svg:image")
		.attr("xlink:href", function(d){return d.poster})
		.attr('x', function(d){return x(d.date)})
		.attr('y', function(d){return y(d.score)})
		.attr("width", "50")
		.attr("height", "50");
})
}
initialize();

function formatData(data){
	var dataSet = data.map((item) => {
		item.Metascore = parseInt(item.Metascore);
		item.Metascore = item.Metascore || 0;
		return {
			score: item.Metascore,
			date: parseDate(item.Released),
			poster: item.Poster,
			title: item.Title
			}
	});
		dataSet.sort(sortByDates)
		return dataSet;
}


function updatePlot(){
	var imgs = svg.selectAll('image')
	.transition()
	.attr("r",0)
	.remove();

	
	visualize();
}
