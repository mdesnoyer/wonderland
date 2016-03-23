// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
      refreshTokenKey = 'rt',
      accountIdKey ='actId',
      userKey = 'user';

var Session = {
  state: {
    accessToken: cookie.load(accessTokenKey),
    refreshToken: cookie.load(refreshTokenKey),
    accountId: cookie.load(accountIdKey),
    user: null
  },
  set: function(accessToken, refreshToken, accountId) {
    this.state = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accountId: accountId
    };
    cookie.save(accessTokenKey, accessToken, { path: '/' });
    cookie.save(refreshTokenKey, refreshToken, { path: '/' });
    cookie.save(accountIdKey, accountId, { path: '/' });
  },
  end: function() {
    cookie.remove(accessTokenKey, { path: '/' });
    cookie.remove(refreshTokenKey, { path: '/' });
    cookie.remove(accountIdKey, { path: '/' });
    this.state = {
      accessToken: undefined,
      refreshToken: undefined,
      accountId: undefined,
      user: undefined
    };
  },
  // Returns current state of the session
  active: function() {
    return !!this.state.accessToken;
  },
  // Getter/Setter for user data for the session (NOT for updating the user object in the DB)
  user: function (userData) {
    return new Promise(function (resolve, reject) {
      if (userData) {
        localStorage.setItem(userKey, JSON.stringify(userData));
      } else {
        try {
          userData = JSON.parse(localStorage.getItem(userKey));
        } catch (e) {
          // TODO: Get user from API based on session?
          return reject(e);
        }
      }
      resolve(userData);
    });
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Session;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 