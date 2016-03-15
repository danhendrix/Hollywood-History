var enronData = [
  {Name: 'METTS MARK',
  Info: 
  {
  Salary: 365788,
  Bonus: 600000,
  'Stock Value': 585062
  }},
  {Name: 'BAXTER JOHN C',
  Info: {
  Salary: 267102,
  Bonus: 1200000,
  'Stock Value': 10623258}},
  {Name: 'ELLIOTT STEVEN',
  Info: {
  Salary: 170941,
  Bonus: 350000,
  'Stock Value': 6678735}}
  ]



var dataSet = [];

for(var i=0; i<enronData.length;i++){
  dataSet.push(enronData[i].Info.Salary)
}
var h = 250;
var w = 600;

var yScale = d3.scale.linear()
  .domain([0,d3.max(dataSet) *1.1])
  .range([0, h])

var xScale = d3.scale.ordinal()
  .domain(dataSet)
  .rangeBands([0,w], 0.5, 0.25)
              
var colorScale = d3.scale.quantize()
  .domain([0,1, dataSet.length-1,
          dataSet.length])
  .range(['tomato', 'gold', 'cornflowerBlue'])

var svg = d3.select('#barChart').append('svg')
  .attr('width', w)
  .attr('height', h);



svg.selectAll('rect') // using svg variable reference
  .data(dataSet)
  .enter() // starting d3
  .append('rect') // creating a rect this time
  .attr('class', 'bar') // assigning class
  .attr('x', function(data, index) {
    return xScale(data)
  })
  .attr('y', function(data) {
    return h - yScale(data)
  })
  .attr('width', xScale.rangeBand)
  .style('height', function(data) {
    return yScale(data) // returning data for height value; Note no px is needed with svg
  })
  .attr('fill', function(data, index){
    return colorScale(index)
})