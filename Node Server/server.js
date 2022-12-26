require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { default: axios } = require("axios")
const { getAssociations, getTopAssociations } = require("./query_generation")
const { getProducts } = require("./amazon_scrapper")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.post("/query", async (req, res) => {
    const { price, keywords } = req.body;
    console.log(price, keywords);
    const associations = await getAssociations(keywords);
    const similarityScoreAssociations = await axios.post(process.env.PYTHON_SERVER_BASE_URL, { "keywords": associations });
    const topKeywords = getTopAssociations(similarityScoreAssociations.data.data);
    const products = await getProducts(topKeywords, price);
    res.status(200).json({
        products: products
    });
})

// Running the server at port PORT or default 8000
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
    console.log(`Backend Server is Live!\nListening on port: ${port}`);
});


module.exports = app;