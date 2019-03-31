import axios from 'axios';
import cheerio from 'cheerio';

export async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getMediumArticles(html) {
	// load up cheerio
	const $ = cheerio.load(html);
	const articles = $('.c.dy.dz.ea.eb.ec');
	let articlesData = [];
	articles.each((i, article) => {
		const title = $(article).find('.eh.ei').find('h1').html();
		const imageUrl = $(article).find('.eh.ei').find('figure img').attr('src');
		const excerpt = $(article).find('.eh.ei').find('p').html();
		const articleData = {
			title: title,
			imageUrl: imageUrl,
			excerpt: excerpt
		}
		articlesData.push(articleData);
	});
	console.log(articlesData);
	// const span = $('[data-nav="followers"] .ProfileNav-value');
	// return span.data('count');
  }

export async function getTwitterFollowers(html) {
  // load up cheerio
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data('count');
}

export async function getInstagramFollowers(html) {
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );

  // console.log($.html());
  // const span = $('[data-nav="followers"] .ProfileNav-value');
  // return span.data('count');
  //            <script type="application/ld+json">
}