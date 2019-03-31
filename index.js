import wait from 'waait';
import {
  getHTML,
  getMediumArticles,
} from './lib/scraper';

async function go() {
	const mPromise = getHTML('https://medium.com/@Jason_Matthew');
	const [mediumHTML] = await Promise.all([mPromise]);
	const mediumArticles = await getMediumArticles(mediumHTML);
}

go();