// # dari tutor YT pake asyn await

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const PORT = 3001;

const app = express();

const url = 'https://www.imdb.com/chart/top/';

const actionFilm =
	'https://www.imdb.com/search/title/?genres=action&sort=user_rating,desc&title_type=feature&num_votes=25';

async function getHTML() {
	const { data: html } = await axios.get(url);
	return html;
}

async function getActionFilm() {
	const { data: html } = await axios.get(actionFilm);
	return html;
}

getActionFilm().then((res) => {
	const film = [];
	let number = 1;
	const $ = cheerio.load(res);
	$('.lister-item').each((i, movie) => {
		const title = $(movie).find('.lister-item-header a').text();
		const linkFilm = 'https://www.imdb.com/' + $(movie).find('.lister-item-header a').attr('href');
		const rating = $(movie).find('.ratings-imdb-rating strong').text();
		const votes = $(movie).find('.sort-num_votes-visible span').text();

		if (film.length < 10) {
			film.push({
				number,
				title,
				linkFilm,
				rating,
				votes,
			});
			number++;
		}
	});
	console.log(film);
	console.log(film.length);
});

getHTML()
	.then((res) => {
		const film = [];
		const $ = cheerio.load(res);
		$('.lister-list>tr').each((i, movie) => {
			const title = $(movie).find('.titleColumn a').text();
			const year = $(movie).find('.secondaryInfo').text();
			const rating = $(movie).find('.imdbRating strong').text();

			if (film.length < 10) {
				film.push({
					title,
					year,
					rating,
				});
			}
		});
		// console.log(film.length);
		// console.log(film);
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(PORT, () => {
	console.log(`connected on port 3001`);
});
