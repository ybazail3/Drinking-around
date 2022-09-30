const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f7c9143b76msh9100697901af54ap1e629fjsne1ce65de9a48',
		'X-RapidAPI-Host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
	}
};

//make API request
function getBreweries (city) {
	fetch('https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=' + city , options)
	.then(function (response){
		//if bad response end funciton
		if(!response.ok) {
            return
        }
		return response.json();
	})
	.then(function (data) {
		//call function to populate results
		generateResults(data);
	})
}

//select elements from HTML
var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var searchResults = document.querySelector("#search-results")

//store URLs for filled and empty star icons
var filledStar = "https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg"
var emptyStar = "https://upload.wikimedia.org/wikipedia/commons/4/45/Star_icon-72a7cf.svg"

//delcare empty array for faves
var favsArray = [];

//add event listener to search button to call the api and pass the input as a parameter
searchButton.addEventListener("click", function() {
	var selectedCity = searchInput.value;
	//call api function
	getBreweries(selectedCity)

})

//function to populate search results
function generateResults (breweryData) {

	searchResults.innerHTML = "";
	searchResults.classList.remove("invisible")
	//pull stored fav breweries from local storage and store in array if not empty
	var storedFavBreweries = JSON.parse(localStorage.getItem("favBreweries"));
	if (storedFavBreweries !== null) {
		favsArray = storedFavBreweries
	}
	var brewHeading = document.createElement("h2");
	brewHeading.textContent = "Breweries"
	brewHeading.classList.add("text-xl", "font-bold", "inline")
	searchResults.append(brewHeading);

	var favsHeading = document.createElement("h2");
	favsHeading.textContent = "Favs";
	favsHeading.classList.add("float-right", "text-xl", "font-bold", "inline")
	searchResults.append(favsHeading);

	//for loop to create new element for first 5 search results
	for (var i= 0; i<5; i++){

		//create a new div element to store brewery info
		var resultDiv = document.createElement("div");
		resultDiv.classList.add("mt-2")
		searchResults.append(resultDiv);

		//create img element
		var resultFav = document.createElement ("img");
		resultFav.classList.add("float-right");

		//if result name is in storage add a filled star, if not empty star
		if (favsArray.includes(breweryData[i].name)){
			resultFav.src = filledStar;
		}else {
			resultFav.src = emptyStar;
		}
		resultDiv.append(resultFav);

		//new element to add name of brewery
		var resultName = document.createElement("h3");
		resultName.textContent = breweryData[i].name;
		resultDiv.append(resultName);

		//new element to add address of brewery
		var resultAdd = document.createElement("p");
		resultAdd.textContent = breweryData[i].street +' '+ breweryData[i].city + ', ' + breweryData[i].state;
		resultDiv.append(resultAdd);

		//add line break to seperate elements
		resultDiv.append(document.createElement("hr"));

	}

	//add event listener to search results area
	var favButton = document.querySelector("#search-results");	
	//call function to change stars and manipulate local storage
	favButton.addEventListener("click", addFavs)
}
//change stars and manipulate local storage
function addFavs (event) {
	event.preventDefault
		var star = event.target;
		//only run function if clicked target is img element
		if (star.matches("img")) {
			//get brewery name from sibling element
			var favBrew = star.nextElementSibling.textContent;
			//if star is empty, fill and add to storage
			if (star.src == emptyStar){
				star.src = filledStar

				favsArray.push(favBrew);
				localStorage.setItem("favBreweries", JSON.stringify(favsArray));

			//if star is full, change to empty and remove from storage
			} else if (star.src == filledStar){
				star.src = emptyStar
				//checks if corresponding brewery is in the fav array and removes it by index
				removeElement = favsArray.indexOf(favBrew);
				favsArray.splice(removeElement, 1);

				localStorage.setItem("favBreweries", JSON.stringify(favsArray))

			};
		}
}

// empty star attribution -   Offnfopt, Public domain, via Wikimedia Commons
// filled star attribution -   Yakiv Gluck, Public domain, via Wikimedia Commons
var ratherBox = document.getElementById('rather');
var ratherSave = document.getElementById('ratherSave')
var ratherNew = document.getElementById('ratherNew')
var ratherOld = document.getElementById('ratherOld')
var ratherLikes = [];
var wyr;
//defining variablesgti

var parsed = JSON.parse(window.localStorage.getItem("ratherLikes"))
if ( parsed !== null){
    ratherLikes = ratherLikes.concat(parsed)
}   
// makes sure that if loacal storage is empty that it doesn't add null to the array

function newwyr() {
	fetch('https://would-you-rather-api.abaanshanid.repl.co')
		.then(response => response.json())
		.then(response => {
			wyr = response
			ratherBox.innerText = wyr.data
		})
		return wyr
//fetches api and parses the json then puts the resuting object into a variable and returns it to bring it to global scope also gets a new prompt
}

function oldwyr(){
	for (var i=0;i < ratherLikes.length;i++ ){
         fetch('https://would-you-rather-api.abaanshanid.repl.co?id='+ ratherLikes[i])
			.then(response => response.json())
			//parses json
			.then(response => {
			ratherOld.appendChild(document.createElement('li'));
			ratherOld.lastChild.innerText = response.data
			//creates a li and inserts the prompt into the li
		})
	}
}
// gets the old favourite would you rathers and indivisually callls them and creates a list item for them

ratherNew.addEventListener("click",newwyr);
//calls the newwyr function and generates a new would you rather prompt

ratherSave.addEventListener("click",()=>{
var strue = ratherLikes.length;
	ratherLikes = ratherLikes.concat(wyr.id);
	//adds the would you rather id into a array
	ratherLikes = ratherLikes.filter((item,index) => ratherLikes.indexOf(item) === index);
	//filters the array so there are no doubles by checking if the index of a number matches the index of search effectively removing any repeat additons
	window.localStorage.setItem("ratherLikes", JSON.stringify(ratherLikes));
	//saves the resulting array into local storage

    if (strue !== ratherLikes.length) {
        ratherOld.appendChild(document.createElement('li'));
        ratherOld.lastChild.innerText = ratherBox.innerText
    }
// seaperated adding the current item to save list to save some hassle

} )


newwyr();
// runs the first would you rather

oldwyr();

