/*
function changeCandidate(){
	possibleList = [931,13920];
	var pick = (Math.floor(Math.random() * possibleList.length));
	var whichOne = possibleList[pick];
	//d3.selectAll("svg").remove()
	fetchData(whichOne)
	.then(function(value){
		return formatData(value)
	})
	.then(function(value){
		return visualize(value)
	})
};
*/

var margin = {
top: 20,
right: 50,
bottom: 30,
left: 70
}

var width = 800 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format('%Y-%m-%d').parse;

var line = d3.svg.line()
	.x(function(d){
		return x(d.date);
	})
	.y(function(d) {
		return y(d.amount);
	})
	.interpolate('linear');
  
var svg = d3.select('#content').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr("transform",
	"translate(" + margin.left + "," + margin.top + ")");
	
var y = d3.scale.linear()
  .range([height-2, 0]);

var x = d3.time.scale()
	.range([0,width]);
	
var xAxis = d3.svg.axis().scale(x)
  .orient('bottom').ticks(12);
var yAxis = d3.svg.axis().scale(y)
  .orient('left').ticks(10);	
	
/*svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);		
*/

function fetchData(id){
	var url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/' + id + '/';

	var fetchedData = new Promise(function(resolve, reject){
		d3.json(url, function(json){
			resolve(json);
		})
	})
	return fetchedData;
}

 function sortByDates(a,b){
      return a.date - b.date;
	}
	
function formatData(data){
	var dataSet = data.map(function(item){
		return {
			data: parseDate(item.tran_date),
			amount: item.amount
		}
	});
	dataSet.sort(sortByDates);
	return dataSet;
	console.log(dataSet[0]);
	debugger;
}

function visualize(data) {
	var dates = _.map(data, 'date');
	
	var amounts = _.map(data, 'amount');
	
	y.domain(d3.extent(amounts))
	x.domain(d3.extent(dates))
	
	var updateSvg = d3.select("#content").transition();
	
	updateSvg.select(".line")
		.duration(500)
		.attr("d", line(data))
	updateSvg.select(".x.axis")
		.duration(500)
		.call(xAxis);
	updateSvg.select(".y.axis")
		.duration(500)
		.call(yAxis);
}
	
/*d3.json(url, function(json) {
data = json;
parseDate = d3.time.format('%Y-%m-%d').parse;
dataSet = data.map(function(item) {
  return {
	date: parseDate(item.tran_date),
	amount: item.amount
  }
})
*/



/*path = d3.svg.line() 
  .x(function(d) {
	return x(d.date) 
  })
  .y(function(d) {
	return y(d.amount)
  })

  .interpolate('basis');
*/



function initialize(id){
	let url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/' + id + '/';
	d3.json(url, (json) => {
    let dataSet = formatData(json);
	//dataSet.sort(sortByDates);
	
    svg.append('path')
      .attr('class', 'line')
      .attr('d', line(dataSet));
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    visualize(dataSet);
  })
}  	
initialize(931);