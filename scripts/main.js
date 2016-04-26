//var unirest = require('unirest');

function movieSearch(title, year){
	var url = "http://www.omdbapi.com/?s=" + title + "&page=1&r=JSON&y=" + year;
	var fetchedData = new Promise(function(resolve, reject){
		d3.json(url, function(json){
			resolve(json);
		})
	})
	//return formatSearch(fetchedData);
	return formatSearch([{"Title":"Batman Begins","Year":"2005","imdbID":"tt0372784","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg"},{"Title":"Batman","Year":"1989","imdbID":"tt0096895","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"},{"Title":"Batman v Superman: Dawn of Justice","Year":"2016","imdbID":"tt2975590","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BNTE5NzU3MTYzOF5BMl5BanBnXkFtZTgwNTM5NjQxODE@._V1_SX300.jpg"},{"Title":"Batman Returns","Year":"1992","imdbID":"tt0103776","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BODM2OTc0Njg2OF5BMl5BanBnXkFtZTgwMDA4NjQxMTE@._V1_SX300.jpg"},{"Title":"Batman Forever","Year":"1995","imdbID":"tt0112462","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMjAwOTEyNjg0M15BMl5BanBnXkFtZTYwODQyMTI5._V1_SX300.jpg"},{"Title":"Batman & Robin","Year":"1997","imdbID":"tt0118688","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BNTM1NTIyNjkwM15BMl5BanBnXkFtZTcwODkxOTQxMQ@@._V1_SX300.jpg"},{"Title":"Batman: The Animated Series","Year":"1992–1995","imdbID":"tt0103359","Type":"series","Poster":"http://ia.media-imdb.com/images/M/MV5BMTU3MjcwNzY3NF5BMl5BanBnXkFtZTYwNzA2MTI5._V1_SX300.jpg"},{"Title":"Batman: Under the Red Hood","Year":"2010","imdbID":"tt1569923","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTMwNDEyMjExOF5BMl5BanBnXkFtZTcwMzU4MDU0Mw@@._V1_SX300.jpg"},{"Title":"Batman: The Dark Knight Returns, Part 1","Year":"2012","imdbID":"tt2313197","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg"},{"Title":"Batman: Mask of the Phantasm","Year":"1993","imdbID":"tt0106364","Type":"movie","Poster":"http://ia.media-imdb.com/images/M/MV5BMTMzODU0NTYxN15BMl5BanBnXkFtZTcwNDUxNzUyMQ@@._V1_SX300.jpg"}])
}

function formatSearch(search){
	var searchData = search.map(function(item){
		return {
			imdbID: item.imdbID
			//imageURL: item.Poster
		}
	})
	return searchData
}


var mySearch = movieSearch("Batman", "")
/*function getMovieData(idList){
	for (i in idList){
		unirest.get("https://imdb-api.p.mashape.com/item?imdbid=" + i)
		.header("X-Mashape-Key", "TLOvUIscohmshL0EfaEjVj6EVr8Pp1af63Kjsnd9Ks65q3MB31")
		.header("Accept", "application/json")
		.end(function (result) {
		console.log(result.status, result.headers, result.body);		
		});
	}
}
*/
//var anotherSearch = getMovieData(mySearch)
debugger;
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




