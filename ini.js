// # FILE YANG DIPAKE UNTUK AMBIL DATA PDDIKTI. Gagal cuy

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const PORT = 3001;

const app = express();

// const url = 'https://pls.fkip.unej.ac.id/daftar-mahasiswa/';
const url = 'https://pddikti.kemdikbud.go.id/search/jember';

const univ_data=[]

async function getDatas() {
	try {
        const res = await axios.get(url)
        const $ = cheerio.load(res.data)

        const data = $('tr');
        data.each(function () {
            const nim = $(this).find("td").text().slice(0,13)
            univ_data.push({
                nim
            })
        })
        console.log(univ_data);
    } catch (error) {
        console.error(error);
    }
}

// getDatas()

async function getTitle() {
	try {
		const res = await axios.get(url);
		const $ = cheerio.load(res.data);
		const judul = $('.col-md-12').text();
		console.log(judul);
        console.log(`ayo`);
	} catch (error) {
		console.error(error);
	}
}

getTitle()



app.listen(PORT, () => {
	console.log(`connected on port 3001`);
});
