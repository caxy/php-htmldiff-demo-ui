import fetch from 'isomorphic-fetch';
import ls from 'local-storage';
import traverson from 'traverson';
import Promise from 'bluebird';

class Api {
  static defaultOptions = {
    baseUrl: 'http://php-htmldiff-demo-api.dev:8000/app_dev.php',
    apiPath: 'api/index.jsonld'
  };

  constructor (options) {
    this.options = Object.assign({}, Api.defaultOptions, options);
    this.api = traverson
      .from(`${this.options.baseUrl}/${this.options.apiPath}`)
      .withRequestOptions({ headers: { Accept: 'application/ld+json' } })
      .json();
  }

  authenticate (username, password) {
    const formData = new FormData();
    formData.append('_username', username);
    formData.append('_password', password);

    return this.requestJson('api/login_check', {
      method: 'post',
      body: formData
    })
      .then(json => {
        return json.token;
      });
  }

  getUser (id) {
    return this.requestJson(`users/${id}`);
  }

  putUser (user) {
    return this.requestJson(`users/${user.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }

  getHtmlDiff (htmlOld, htmlNew) {
    return this.requestJson(`diff/caxy_htmldiff`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({htmlOld, htmlNew})
    })
      .then(json => {
        return json.htmlDiff;
      });
  }

  getDemos () {
    const apiRequest = this.api.newRequest().follow('demo');
    const getResource = Promise.promisify(apiRequest.getResource);

    return getResource.call(apiRequest)
      .then(document => {
        return document['hydra:member'];
      });
  }

  storeItem (key, value) {
    return ls(key, value);
  }

  getItemFromStorage (key) {
    return ls(key);
  }

  clearItem (key) {
    return ls.remove(key);
  }

  requestJson (url, options) {
    return this.request(url, options)
      .then(response => {
        if (response.status >= 400) {
          throw new Error(`Bad response from server: ${response.statusText}`);
        }

        return response.json();
      });
  }

  request (url, options) {
    return fetch(`${this.options.baseUrl}/${url}`, options);
  }
}

const api = new Api();

export default api;
