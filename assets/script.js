const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f7c9143b76msh9100697901af54ap1e629fjsne1ce65de9a48',
		'X-RapidAPI-Host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
	}
};

function getBreweries (city) {
	fetch('https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=' + city , options)
	.then(function (response){
		if(!response.ok) {
            return
        }
		console.log(response)
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		generateResults(data);
	})
	// .catch(err => console.error(err));
}

// getBreweries("olympia");

// fetch('https://would-you-rather-api.abaanshanid.repl.co')
// 	.then(response => response.json())
// 	.then(response => console.log(response))



var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var searchResults = document.querySelector("#search-results")

var filledStar = "https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg"
var emptyStar = "https://upload.wikimedia.org/wikipedia/commons/4/45/Star_icon-72a7cf.svg"

var favsArray = [];

searchButton.addEventListener("click", function() {
	console.log("yep")
	var selectedCity = searchInput.value;
	getBreweries(selectedCity)

})

function generateResults (breweryData) {
	for(var i= 0; i<5; i++){

		var resultDiv = document.createElement("div");
		searchResults.append(resultDiv);

		var resultFav = document.createElement ("img");
		resultFav.classList.add("float-right", "result-fav");
		resultFav.src = emptyStar
		resultDiv.append(resultFav);

		var resultName = document.createElement("h3");
		resultName.textContent = breweryData[i].name;
		resultDiv.append(resultName);

		var resultAdd = document.createElement("p");
		resultAdd.textContent = breweryData[i].street +' '+ breweryData[i].city + ', ' + breweryData[i].state;
		resultDiv.append(resultAdd);
		console.log(resultDiv)

	}

	var favButton = document.querySelector("#search-results");	
	console.log(favButton)
	favButton.addEventListener("click", function(event){
		event.preventDefault
		var star = event.target;
		if (star.matches("img")) {
			console.log("click")
			if (star.src == emptyStar){
				star.src = filledStar

				favsArray.push(star)
	
			} else if (star.src == filledStar){
				star.src = emptyStar
			};
		}


	})


}


// empty star attribution -   Offnfopt, Public domain, via Wikimedia Commons
// filled star attribution -   Yakiv Gluck, Public domain, via Wikimedia Commons