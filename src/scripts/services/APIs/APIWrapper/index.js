import Cookies from 'js-cookie';

class APIWrapper {
  constructor(config) {
    const defaults = {
      url: false,
      requestBody: false,
    };

    this.options = {
      ...defaults,
      ...config,
    };
  }

  /**
   * Convert a JSON to a query string (that can be used in URLs).
   *
   * @param {object} json
   * @returns {String}
   */
  static convertToUrl(json) {
    if (typeof json !== 'object') {
      return false;
    }

    const queryArgs = [];
    Object.keys(json).forEach((param) => {
      const value = json[param];
      if (Array.isArray(value)) {
        queryArgs.push(`${param}=${value}`);
      }
    });

    if (!queryArgs.length) {
      return false;
    }

    return `?${queryArgs.join('&')}`;
  }

  /*
  | HTTP verb aliases
  \--------------------------------------------------------------------------------------------*/

  /**
   * Perform a GET call.
   *
   * @param {string}  endpoint -  API endpoint without domain/IP
   *                              and initial slash (e.g. "api/users").
   * @param {object}  body     -  Body to send with request, as a plain object.
   * @param {Object}  headers  -  Additional headers.
   * @returns {Promise}
   */
  get(endpoint, body = false, headers = null) {
    const { requestBody } = this.options;
    let targetBody = body;
    if (typeof requestBody === 'object') {
      targetBody = { ...targetBody, ...requestBody };
    }

    // We cannot send body with a GET request.
    // Therefore if body is passed we convert it to a query string.
    const bodyUrl = APIWrapper.convertToUrl(targetBody);
    const url = endpoint + (bodyUrl || '');

    const request = this.createRequest('GET', url, headers);
    return this.call(request);
  }

  /**
   * Perform a POST call.
   *
   * @param {string}  endpoint   - API endpoint without domain/IP
   *                             and initial slash (e.g. "api/users").
   * @param {object}  body       - Body to send with request, as a plain object.
   * @param {boolean} incReqBody - Set to true if requestBody params
   *                               should be included in endpoint
   * @returns {Promise}
   */
  post(endpoint, body, incReqBody = false) {
    let url = endpoint;
    if (incReqBody) {
      url += (APIWrapper.convertToUrl(body) || '');
    }

    const request = this.createRequest('POST', url);
    return this.call(request, body);
  }

  /**
   * Perform a PUT call.
   *
   * @param {string}  endpoint - API endpoint without domain/IP
   *                             and initial slash (e.g. "api/users").
   * @param {object}  body     - Body to send with request, as a plain object.
   * @param {boolean} auth     - Set to false if the request doesn't require authorization.
   * @returns {Promise}
   */
  put(endpoint, body, auth = true) {
    const request = this.createRequest('PUT', endpoint, auth);
    return this.call(request, body);
  }

  /**
   * Perform a DELETE call.
   *
   * @param {string}  endpoint - API endpoint without domain/IP
   *                             and initial slash (e.g. "api/users").
   * @param {boolean} auth     - Set to false if the request doesn't require authorization.
   * @returns {Promise}
   */
  delete(endpoint, auth = true) {
    const request = this.createRequest('DELETE', endpoint, auth);
    return this.call(request, false);
  }

  /*
  | Building and sending the request
  \--------------------------------------------------------------------------------------------*/

  /**
   * Create a Request object that can be used in the fetch.
   *
   * @param {string}  method     - HTTP method to use.
   * @param {string}  endpoint   - API endpoint without domain/IP
   *                               and initial slash (e.g. "api/users").
   * @param {Object}  addHeaders - Additional headers.
   * @returns {Request}
   */
  createRequest(method, endpoint, addHeaders = null) {
    const { url } = this.options;
    const params = {
      method,
    };

    // Headers
    const headers = {};

    headers['Content-Type'] = 'application/json';

    if (addHeaders) {
      Object.assign(headers, addHeaders);
    }

    if (Object.keys(headers).length) {
      params.headers = new Headers(headers);
    }

    return new Request(url + endpoint, params);
  }

  /**
   * Call the this.
   * Probably should not be used directly.
   * Use HTTP verb aliases (this.get, this.post, etc.) instead.
   *
   * @param {Request} request
   * @param {object}  body
   * @returns {Promise}
   */
  call(request, body) {
    const data = {};

    if (body && typeof body === 'object') {
      data.body = JSON.stringify(body);
    }

    let error = false;

    const fetchRequest = fetch(request, data)
      .then((response) => {
        if (!response.ok) {
          error = true;
        }

        return response.json();
      })
      .then((response) => {
        if (!response) {
          return null;
        }

        if (error) {
          response.error = true;
        }

        return response;
      });

    return fetchRequest;
  }
}

export default APIWrapper;
