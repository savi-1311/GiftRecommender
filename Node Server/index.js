const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://amazon-data-scraper6.p.rapidapi.com/search/Mac%20Book%20Air',
  params: {api_key: '9eabdc7648052e4a9d19552920b60a7f'},
  headers: {
    'X-RapidAPI-Key': 'db7d4cf8b9msh568bdb5906cba3bp18c5a7jsnc6d234e61cde"',
    'X-RapidAPI-Host': 'amazon-data-scrapper15.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});