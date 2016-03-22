// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var USERNAME ='wonderland_demo',
    PASSWORD ='ad9f8g4n3ibna9df'
;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

let ajax =  {
    ACCOUNT_ID: 'uhet29evso83qb7ys70hvj3z',
    AUTH_URL: 'https://auth.neon-lab.com/api/v2/authenticate?username=' + USERNAME + '&password=' + PASSWORD,
    POST_OPTIONS: {
        method: 'POST',
        mode: 'cors'
    },
    GET_OPTIONS: {
        method: 'GET',
        mode: 'cors',
        cache: 'reload'
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default ajax;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 