const axios = require("axios");

const defaultOptions = {
  method: 'GET',
  url: 'https://thesaurus-by-api-ninjas.p.rapidapi.com/v1/thesaurus',
  params: { word: 'voice' },
  headers: {
    'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'thesaurus-by-api-ninjas.p.rapidapi.com'
  }
};

const getAssociations = async (keywords) => {

  var synonyms = [];

  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    var options = defaultOptions;
    options.params = { word: keyword }

    var synonymsIndividual = await axios.request(options);
    synonymsIndividual = synonymsIndividual.data.synonyms;
    synonyms[i] = [];
    synonyms[i].push(keyword);

    var length = synonymsIndividual.length > 5 ? 5 : synonymsIndividual.length;

    for (var j = 0; j < length; j++) {
      synonyms[i].push(synonymsIndividual[j]);
    }

  }
  return synonyms;

}

const getTopAssociations = (keywords) => {
  var topKeywords = [];
  for (var i = 0; i < keywords.length; i++) {
    var keyword = keywords[i];
    const mapSort1 = Object.entries(keyword)
    .sort(([,a],[,b]) => b-a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    var associations = [];
    for(var j=0; j<Object.keys(mapSort1).length; j++) {
      associations.push(Object.keys(mapSort1)[j]);
      if(associations.length == 3) {
        break;
      }
    }
    topKeywords.push(associations);
  }
  return topKeywords;
}

module.exports = {
  getAssociations,
  getTopAssociations
}