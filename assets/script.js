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

fetch('https://would-you-rather-api.abaanshanid.repl.co')
	.then(response => response.json())
	.then(response => console.log(response))