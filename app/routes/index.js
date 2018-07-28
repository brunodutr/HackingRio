const router = require('express').Router();
const scraper = require('google-search-scraper');
const request = require('request');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const SITE_BUSCA = 'https://pro.consultaremedios.com.br';

module.exports = app => {
  router.get('/', async (req, res) => {
    let url = await buscaURL(req.query.q);

    let informacoes = await buscaInformacoes(url);

    res.send(informacoes);
  });

  app.use('/rest', router);
};

buscaInformacoes = async url => {
  return new Promise((resolve, reject) => {
    const options = {
      uri: url
    };
    request.get(options, (err, res) => {
      let document = new JSDOM(res.body).window.document;
      let chaves = document.querySelectorAll('.list-info-prod');
      let valores = document.querySelectorAll('.list-info-prod-right');

      let resposta = {};

      resposta['Titulo'] = document.querySelector('.title-black').textContent;

      for (let key in chaves) {
        if (chaves[key].textContent != undefined) {
          resposta[chaves[key].textContent] = valores[key].textContent;
        }
      }

      resolve(resposta);
    });
  });
};

buscaURL = async id => {
  return new Promise((resolve, reject) => {
    const options = {
      query: `site:${SITE_BUSCA} ${id}`,
      limit: 1
    };
    scraper.search(options, function(err, url, meta) {
      if (err) reject(err);
      resolve(url);
    });
  });
};
