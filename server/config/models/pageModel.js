const rp = require('request-promise');
const config = require('../config.js');

const URL = 'http://1b4f84fecd657bad91626e9aa8f74e59.us-west-1.aws.found.io:9200';

module.exports = {
  create: (title, text) => {
    const options = {
      method: 'POST',
      uri: `${URL}/1/archive`,
      auth: {
        user: config.user,
        pass: config.password,
      },
      body: {
        title,
        text,
      },
      json: true,
    };

    rp(options)
      .catch((err) => {
        console.error(err);
      });
  },
  search: (qs, callback) => {
    const options = {
      method: 'GET',
      uri: `${URL}/1/archive/_search`,
      auth: {
        user: config.user,
        pass: config.password,
      },
      body: {
        query: {
          match: {
            text: qs,
          },
        },
      },
      json: true,
    };

    rp(options)
      .then((data) => {
        callback(data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
