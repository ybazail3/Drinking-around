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

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f7c9143b76msh9100697901af54ap1e629fjsne1ce65de9a48',
		'X-RapidAPI-Host': 'brianiswu-open-brewery-db-v1.p.rapidapi.com'
	}
};
fetch('https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries?per_page=5/search?query=seattle', options)
	.then(response => response.json())
	.then(response => console.log(response))

    .catch(err => console.error(err));

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
//loads the favourites list