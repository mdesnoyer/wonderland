// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import 'babel-polyfill';
import reqwest from 'reqwest';
import SESSION from './session';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const USERNAME ='wonderland_demo',
			PASSWORD ='ad9f8g4n3ibna9df',
			ACCOUNT_ID = 'uhet29evso83qb7ys70hvj3z',
			AUTH_HOST = 'https://auth.neon-lab.com/api/v2/',
			API_HOST = '//services.neon-lab.com/api/v2/';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var AJAX = {
	Session: null,
	getQueryParam: function(json) {
  	return Object.keys(json).map(function (key) {
      if (json[key] !== null && json[key] !== undefined) {
	      if (Object.prototype.toString.call(json[key]) === '[object Array]') {
	      	return encodeURIComponent(key) + '=' + encodeURIComponent(json[key].join());
	      } else if (Object.prototype.toString.call(json[key]) === '[object Object]') {
	      	return encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(json[key]));
	      } else {
	  	    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
	  	  }
  	 	}
    }).join('&');
  },
	doApiCall: function(url, options) {
		var self = this;
		function fin(resolve, reject) {
			options.data = options.data || {};
			options.data.token = self.Session.state.accessToken;
			if (options.method === 'GET') {
				url = url + (url.indexOf('?') > -1 ? '&' : '?' ) + self.getQueryParam(options.data);
				delete options.data;
			} else {
				options.data = JSON.stringify(options.data);
				options.type = 'json';
				options.contentType = 'application/json';
			}
			options.url = options.host + (options.host === API_HOST ? self.Session.state.accountId + '/' : '') + url;
			reqwest(options)
				.then(function (res) {
					resolve(res);
				})
				.catch(function (err) {
					var retryUrl = '';
					if (options.host !== AUTH_HOST && err.status === 401 && self.Session.state.refreshToken) {
						retryUrl = AUTH_HOST + '?token=' + self.Session.state.refreshToken;
						reqwest({
							url: retryUrl,
							method: 'POST',
							crossDomain: true,
							type: 'json'
						})
							.then(function (res) {
								self.Session.set(res.access_token, res.refresh_token, ACCOUNT_ID || res.account_id);
								fin(resolve, reject);
							})
							.catch(function (err) {
								self.Session.end();
								reject(err);
							});
					} else {
						self.Session.end();
						reject(err);
					}
				});
		}

		self.Session = self.Session || SESSION;

		return new Promise(function (resolve, reject) {
			var authUrl = '';
			if (self.Session.active() === true || options.host === AUTH_HOST) {
				fin(resolve, reject);
			} else {
				if (USERNAME && PASSWORD) {
					authUrl = AUTH_HOST + 'authenticate?username=' + USERNAME + '&password=' + PASSWORD;
					reqwest({
						url: authUrl,
						method: 'POST',
						crossDomain: true,
						type: 'json'
					})
						.then(function (res) {
							self.Session.set(res.access_token, res.refresh_token, ACCOUNT_ID || res.account_id);
							fin(resolve, reject);
						})
						.catch(reject);
				} else {
					reject(new Error('TODO: Trigger Sign In/Register'));
				}
			}
		});
	},
	AUTH_HOST: AUTH_HOST,
	API_HOST: API_HOST,
	doGet: function(url, options) {
		options = options || {};
		options.host = options.host || API_HOST;
		options.method = options.method || 'GET';
		return this.doApiCall(url, options);
	},
	doPost: function(url, options) {
		options = options || {};
		options.host = options.host || API_HOST;
		options.method = options.method || 'POST';
		return this.doApiCall(url, options);
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AJAX;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 