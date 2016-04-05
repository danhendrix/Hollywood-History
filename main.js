var whichOne = 931;

function changeCandidate(){
	possibleList = [931,14172, 13920];
	var pick = (Math.floor(Math.random() * possibleList.length));
	whichOne = possibleList[pick];
	d3.select("svg").remove();
	plotIt(whichOne)
}

function plotIt(whichOne){
  var margin = {
    top: 20,
    right: 50,
    bottom: 30,
    left: 70
  }

  var width = 800 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var filerId = 931;

  var url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/' + whichOne + '/';

  d3.json(url, function(json) {
    var data = json;
    var parseDate = d3.time.format('%Y-%m-%d').parse;
    var dataSet = data.map(function(item) {
      return {
        date: parseDate(item.tran_date),
        amount: item.amount
      }
    })

    function sortByDates(a,b){
      return a.date - b.date;
    }

   /* var nested = d3.nest()
      .key(function(d) {return d.date})
      .rollup(function(values) {
        return d3.sum(values, function(d){
          return d.amount;
        })
      }
      .entries(dataSet);
)
      var nestedArr = nested.map(function(d){
        return {
          date: parseDate(d.key),
          amount: d.values
        }
      });
  
*/  
    var dates = _.map(dataSet, 'date');
    var amounts = _.map(dataSet, 'amount');

    var x = d3.time.scale()
      .domain(d3.extent(dates))
      .range([0, width]);
    var y = d3.scale.linear()
      .domain(d3.extent(amounts)) 
      .range([height, 0]);

      dataSet.sort(sortByDates);

    
    var xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(6);
    var yAxis = d3.svg.axis().scale(y)
      .orient('left').ticks(10);

    // we attach the svg to the html here
    var svg = d3.select('#content').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // defining path function to draw the line
    var path = d3.svg.line() 
      .x(function(d) {
        return x(d.date) 
      })
      .y(function(d) {
        return y(d.amount)
      })

      .interpolate('basis')

    svg.append('path') 
      // .datum(dataSet) // if you append the path above, you HAVE to do this
      .attr('class', 'line')
      .attr('d', path(dataSet)) // if you append the path above, you only pass in path function like .attr('d', path)

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
  })
}
plotIt(whichOne);