var dataSet = [
  {Name: 'METTS MARK',
  Info: 
  {
  Salary: 265788,
  Bonus: 100000,
  'Stock Value': 585062
  }},
  {Name: 'BAXTER JOHN C',
  Info: {
  Salary: 267102,
  Bonus: 200000,
  'Stock Value': 10623258}},
  {Name: 'ELLIOTT STEVEN',
  Info: {
  Salary: 400094,
  Bonus: 350000,
  'Stock Value': 6678735}}
  ]

var margin = { top:0, right:0, bottom:0, left:0};
<<<<<<< HEAD
var width = 500 - margin.left - margin.right;
=======
var width = 600 - margin.left - margin.right;
>>>>>>> f33bb9918aef74bfb1345622341aa292f651775b
var height = 250 - margin.top - margin.bottom;

var svg = d3.select('#scatterChart').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' +margin.left + ', ' + margin.top  + ')');

var yScale = d3.scale.linear()
  .domain([0, d3.max(dataSet, function(data) {
           return data.Info.Bonus;
           })]) // domain now with d3.max
  .range([height, 0]); // set yScale linear
var xScale = d3.scale.linear() 
<<<<<<< HEAD
  .domain([0, d3.max(dataSet, function(data){
    return data.Info.Salary;
  })])
=======
  .domain([0,100])
>>>>>>> f33bb9918aef74bfb1345622341aa292f651775b
  .range([0,width]);

svg.selectAll('circle')
  .data(dataSet)
  .enter()
  .append('circle')
  .attr('class', 'bubble')
  .attr('cx', function(data) {
<<<<<<< HEAD
    return xScale(data.Info.Salary); // using xScale on data
  })
  .attr('cy', function(data) {
    return yScale(data.Info.Bonus); // using yScale on data
=======
    return xScale(data.Info.Salary)/100000; // using xScale on data
  })
  .attr('cy', function(data) {
    return yScale(data.Info.Bonus)/100000; // using yScale on data
>>>>>>> f33bb9918aef74bfb1345622341aa292f651775b
  })
  .attr('r', function(data){
    return (data.Info['Stock Value'])/100000
})