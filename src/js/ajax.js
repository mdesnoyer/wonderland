// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';
import 'babel-polyfill';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const USERNAME ='wonderland_demo',
			PASSWORD ='ad9f8g4n3ibna9df',
			ACCOUNT_ID = 'uhet29evso83qb7ys70hvj3z',
			HOST = 'https://auth.neon-lab.com/api/v2/';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
			refreshTokenKey = 'rt',
			accountIdKey ='actId';

const AJAX = React.createClass({
	getInitialState: function() {
    return {
      accessToken: cookie.load(accessTokenKey),
      refreshToken: cookie.load(refreshTokenKey),
      accountId: cookie.load(accountIdKey),
    };
  },
  setSession: function(accessToken, refreshToken, accountId) {
    this.setState({
      accessToken: accessToken,
      refreshToken: refreshToken,
      accountId: accountId
    });
    cookie.save(accessTokenKey, accessToken, { path: '/' });
    cookie.save(refreshTokenKey, refreshToken, { path: '/' });
    cookie.save(accountIdKey, refreshToken, { path: '/' });
  },
  clearSession: function() {
    cookie.remove(accessTokenKey, { path: '/' });
    cookie.remove(refreshTokenKey, { path: '/' });
    cookie.remove(accountIdKey, { path: '/' });
    this.setState({
      accessToken: null,
      refreshToken: null,
      accountId: null
    });
  },
	doApiCall: function(url, options) {
		var self = this;
		function fin(resolve, reject) {
			url = url + (url.indexOf('?') ? '&' : '?' ) + 'token=' + self.state.accessToken;
			fetch(HOST + this.state.accountId + '/' + url, options)
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
					authUrl = HOST + 'authenticate?username=' + USERNAME + '&password=' + PASSWORD;
					fetch(authUrl, self.POST_OPTIONS)
						.then(function (res) {
							return res.json();
						})
						.then(function (json) {
							self.setSession(json.access_token, json.refresh_token, json.account_id);
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
	},
	render: function () {}
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default AJAX;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 