// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';
import 'babel-polyfill';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const USERNAME ='wonderland_demo',
			PASSWORD ='ad9f8g4n3ibna9df',
			ACCOUNT_ID = 'uhet29evso83qb7ys70hvj3z',
			AUTH_HOST = 'https://auth.neon-lab.com/api/v2/',
			API_HOST = 'http://services.neon-lab.com/api/v2/';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
			refreshTokenKey = 'rt',
			accountIdKey ='actId';

let AJAX = {
	state: {
    accessToken: cookie.load(accessTokenKey),
    refreshToken: cookie.load(refreshTokenKey),
    accountId: cookie.load(accountIdKey)
  },
  setSession: function(accessToken, refreshToken, accountId) {
    this.state = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accountId: accountId
    };
    cookie.save(accessTokenKey, accessToken, { path: '/' });
    cookie.save(refreshTokenKey, refreshToken, { path: '/' });
    cookie.save(accountIdKey, accountId, { path: '/' });
  },
  clearSession: function() {
    cookie.remove(accessTokenKey, { path: '/' });
    cookie.remove(refreshTokenKey, { path: '/' });
    cookie.remove(accountIdKey, { path: '/' });
    this.state = {
      accessToken: undefined,
      refreshToken: undefined,
      accountId: undefined
    };
  },
	doApiCall: function(url, options) {
		var self = this;
		function fin(resolve, reject) {
			url = url + (url.indexOf('?') > -1 ? '&' : '?' ) + 'token=' + self.state.accessToken;
			fetch(API_HOST + self.state.accountId + '/' + url, options)
				.then(function (res) {
					return res.json();
				})
				.catch(function (err) {
					// TODO: Attempt Retry
					self.clearSession();
					reject(err);
				})
				.then(function (json) {
					resolve(json);
				})
				.catch(reject);
		}

		return new Promise((resolve, reject) => {
			let authUrl = '';
			if (self.state.accessToken) {
				fin(resolve, reject);
			} else {
				if (USERNAME && PASSWORD) {
					authUrl = AUTH_HOST + 'authenticate?username=' + USERNAME + '&password=' + PASSWORD;
					fetch(authUrl, {method: 'POST', mode: 'cors'})
						.then(function (res) {
							return res.json();
						})
						.then(function (json) {
							self.setSession(json.access_token, json.refresh_token, ACCOUNT_ID || json.account_id);
							fin(resolve, reject);
						})
						.catch(reject);
				} else {
					reject(new Error('TODO: Trigger Sign In/Register'));
				}
			}
		});
	},
	doGet: function(url, options) {
		options = options || {};
		options.method = options.method || 'GET';
		options.mode = options.mode || 'cors';
		options.cache = options.cache || 'reload';
		return this.doApiCall(url, options);
	},
	doPost: function(url, options) {
		options = options || {};
		options.method = options.method || 'POST';
		options.mode = options.mode || 'cors';
		return this.doApiCall(url, options);
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AJAX;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 