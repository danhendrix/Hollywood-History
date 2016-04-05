function changeCandidate(){
	possibleList = [931,13920];
	var pick = (Math.floor(Math.random() * possibleList.length));
	var whichOne = possibleList[pick];
  d3.selectAll("svg").remove()
  firstPlot();
	plotIt(whichOne);
}

function firstPlot(){
	margin = {
    top: 20,
    right: 50,
    bottom: 30,
    left: 70
  }

  width = 800 - margin.left - margin.right;
  height = 500 - margin.top - margin.bottom;
	
	x = d3.time.scale()
      .domain([new Date(2010,01,01), new Date(2015,12,31)])
      .range([0, width]);
	  
    y = d3.scale.linear()
      .domain([0,100000])
      .range([height, 0]);
	  
	svg = d3.select('#content').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
		
	xAxis = d3.svg.axis().scale(x)
      .orient('bottom').ticks(6);
   yAxis = d3.svg.axis().scale(y)
      .orient('left').ticks(10);	
		
	svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);		
}

function plotIt(whichOne){
	url = 'http://54.213.83.132/hackoregon/http/current_candidate_transactions_in/' + whichOne + '/';

	d3.json(url, function(json) {
    data = json;
    parseDate = d3.time.format('%Y-%m-%d').parse;
    dataSet = data.map(function(item) {
      return {
        date: parseDate(item.tran_date),
        amount: item.amount
      }
    })

    function sortByDates(a,b){
      return a.date - b.date;
	}
	dates = _.map(dataSet, 'date');
    amounts = _.map(dataSet, 'amount');
	dataSet.sort(sortByDates);
	
	path = d3.svg.line() 
      .x(function(d) {
        return x(d.date) 
      })
      .y(function(d) {
        return y(d.amount)
      })

      .interpolate('basis')

    svg.append('path') 
      .attr('class', 'line')
      .attr('d', path(dataSet))
	})	  
}	
firstPlot();
plotIt(931);
plotIt(931);