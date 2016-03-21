// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

import React from 'react';
import cookie from 'react-cookie';
import 'babel-polyfill';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

const accessTokenKey = 'at',
      refreshTokenKey = 'rt',
      accountIdKey ='actId';

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
  active: function() {
    return !!this.state.accessToken;
  }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default Session;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 