// # Scraping dari tutor yang lain

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const json2csv = require('json2csv').Parser;
const fs = require('fs');

const PORT = 3001;

const app = express();

const url = 'https://books.toscrape.com/catalogue/category/books/mystery_3/index.html';
const baseUrl = 'https://books.toscrape.com/catalogue/category/books/mystery_3/';

const book_data = [];

async function getBooks() {
	try {
		const res = await axios.get(url);
		const $ = cheerio.load(res.data);

		const books = $('article');
		books.each(function () {
			const title = $(this).find('h3 a').text();
			const price = $(this).find('.price_color').text();
			const stock = $(this).find('.availability').text().trim();

			book_data.push({
				title,
				price,
				stock,
			});
		});

        if ($('.next a').length > 0) {
            next_page = baseUrl + $('.next a').attr('href')
            getBooks(next_page)
        }else{
            const parser = new json2csv()
            const csv = parser.parse(book_data)
            fs.writeFileSync('./books.csv',csv)
        }
        
        console.log(book_data);
        console.log(book_data.length);
	} catch (error) {
        console.error(error);
    }
}

getBooks()

async function getGenre() {
	try {
		const res = await axios.get(url);
		const $ = cheerio.load(res.data);
		const genre = $('h1').text();
		console.log(genre);
        console.log(`genrenya`);
	} catch (error) {
		console.error(error);
	}
}

getGenre()

app.listen(PORT, () => {
	console.log(`connected on port 3001`);
});
