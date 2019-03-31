import express from 'express';
import {
  getHTML,
  getMediumArticles,
} from './lib/scraper';

const app = express();

app.get('/scrape', async (req, res, next) => {
	console.log('Scraping!');
	const mPromise = getHTML('https://medium.com/@Jason_Matthew');
	const [mediumHTML] = await Promise.all([mPromise]);
	const mediumArticles = await getMediumArticles(mediumHTML);
	res.json(mediumArticles);
});

app.listen();