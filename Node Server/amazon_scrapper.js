const amazonScraper = require('amazon-buddy');

const getProducts = async (keywords, max_limit) => {
    const keyword = keywords.flat().join(', ');
    var results = [];   
    try {
        console.log(keyword);
        const products = await amazonScraper.products({ keyword: keyword, number: 1 , country: 'IN' });
        console.log(products);
        for( var i = 0; i<products.result.length; i++) {
            if(i == 20)
                break;
            if(products.result[i].price.current_price == null)
                continue;
            if(products.result[i].price.current_price > max_limit)
                continue;
            
            var product = {
                title: products.result[i].title,
                price: products.result[i].price.current_price,
                url: products.result[i].url,
            }
            
            results.push(product);
        }
        return results;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getProducts
};