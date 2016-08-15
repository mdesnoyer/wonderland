// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import T from './translation';
import moment from 'moment';
import reqwest from 'reqwest';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var shortid = require('shortid'),
    fnv = require('fnv-plus')
;
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~')

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var UNKNOWN_STRING = '?',
    UNKNOWN_EMOJI = '',
    EXAMPLE_EMAIL = 'example@email.com',
    NA_STRING = '?',
    // DO NOT RELY ON THESE MODELSCORES
    NEONSCORES = [
        { modelScore: 0.000, emoji: '❓' },
        { modelScore: 0.155, emoji: '❓' },
        { modelScore: 0.194, emoji: '' }, // 2 - EH
        { modelScore: 0.222, emoji: '❓' },
        { modelScore: 0.247, emoji: '' }, // 4 - EH
        { modelScore: 0.269, emoji: '' }, // 5 - NH
        { modelScore: 0.289, emoji: '' }, // 6 - EH
        { modelScore: 0.310, emoji: '❓' },
        { modelScore: 0.328, emoji: '' }, // 8 - EH
        { modelScore: 0.347, emoji: '❓' },
        { modelScore: 0.363, emoji: '❓' },
        { modelScore: 0.381, emoji: '' }, // 11 - EH
        { modelScore: 0.396, emoji: '❓' },
        { modelScore: 0.410, emoji: '❓' },
        { modelScore: 0.424, emoji: '' }, // 14 - EH
        { modelScore: 0.438, emoji: '❓' },
        { modelScore: 0.452, emoji: '' }, // 16 - EH
        { modelScore: 0.465, emoji: '' }, // 17 - EH
        { modelScore: 0.479, emoji: '❓' },
        { modelScore: 0.492, emoji: '❓' },
        { modelScore: 0.504, emoji: '' }, // 20 - JV
        { modelScore: 0.517, emoji: '❓' },
        { modelScore: 0.531, emoji: '❓' },
        { modelScore: 0.543, emoji: '❓' },
        { modelScore: 0.555, emoji: '❓' },
        { modelScore: 0.567, emoji: '❓' },
        { modelScore: 0.579, emoji: '❓' },
        { modelScore: 0.590, emoji: '' }, // 27 - EH
        { modelScore: 0.602, emoji: '❓' },
        { modelScore: 0.613, emoji: '❓' },
        { modelScore: 0.624, emoji: '❓' },
        { modelScore: 0.635, emoji: '' }, // 31 - EH
        { modelScore: 0.647, emoji: '❓' },
        { modelScore: 0.658, emoji: '❓' },
        { modelScore: 0.670, emoji: '' }, // 34 - EH
        { modelScore: 0.681, emoji: '❓' },
        { modelScore: 0.693, emoji: '❓' },
        { modelScore: 0.704, emoji: '' }, // 37 - EH
        { modelScore: 0.715, emoji: '❓' },
        { modelScore: 0.727, emoji: '❓' },
        { modelScore: 0.739, emoji: '' }, // 40 - EH
        { modelScore: 0.751, emoji: '❓' },
        { modelScore: 0.763, emoji: '❓' },
        { modelScore: 0.776, emoji: '❓' },
        { modelScore: 0.790, emoji: '❓' },
        { modelScore: 0.801, emoji: '' }, // 45 - NH
        { modelScore: 0.813, emoji: '❓' },
        { modelScore: 0.826, emoji: '❓' },
        { modelScore: 0.837, emoji: '' }, // 48 - EH
        { modelScore: 0.850, emoji: '❓' },
        { modelScore: 0.863, emoji: '' }, // 50 - EH
        { modelScore: 0.876, emoji: '❓' },
        { modelScore: 0.889, emoji: '' }, // 52 - EH
        { modelScore: 0.901, emoji: '❓' },
        { modelScore: 0.915, emoji: '' }, // 54 - EH
        { modelScore: 0.928, emoji: '❓' },
        { modelScore: 0.943, emoji: '❓' },
        { modelScore: 0.957, emoji: '❓' },
        { modelScore: 0.972, emoji: '❓' },
        { modelScore: 0.986, emoji: '❓' },
        { modelScore: 1.002, emoji: '❓' },
        { modelScore: 1.017, emoji: '❓' },
        { modelScore: 1.032, emoji: '' }, // 62 - JV
        { modelScore: 1.047, emoji: '❓' },
        { modelScore: 1.064, emoji: '❓' },
        { modelScore: 1.080, emoji: '' }, // 65 - EH
        { modelScore: 1.096, emoji: '❓' },
        { modelScore: 1.115, emoji: '❓' },
        { modelScore: 1.132, emoji: '✌️' }, // 68 - EH
        { modelScore: 1.151, emoji: '❓' },
        { modelScore: 1.170, emoji: '❓' },
        { modelScore: 1.191, emoji: '❓' },
        { modelScore: 1.212, emoji: '' }, // 72 - JV
        { modelScore: 1.233, emoji: '❓' },
        { modelScore: 1.255, emoji: '' }, // 74 - EH
        { modelScore: 1.277, emoji: '' }, // 75 - EH
        { modelScore: 1.301, emoji: '❓' },
        { modelScore: 1.324, emoji: '' }, // 77 - NH
        { modelScore: 1.350, emoji: '' }, // 78 - EH
        { modelScore: 1.376, emoji: '❓' },
        { modelScore: 1.402, emoji: '' }, // 80 - JV
        { modelScore: 1.432, emoji: '❓' },
        { modelScore: 1.461, emoji: '❓' },
        { modelScore: 1.494, emoji: '' }, // 83 - EH
        { modelScore: 1.529, emoji: '❓' },
        { modelScore: 1.566, emoji: '' }, // 85 - NH
        { modelScore: 1.604, emoji: '' }, // 86 - EH
        { modelScore: 1.646, emoji: '' }, // 87 - EH
        { modelScore: 1.690, emoji: '' }, // 88 - EH
        { modelScore: 1.741, emoji: '' }, // 89 - EH
        { modelScore: 1.792, emoji: '' }, // 90 - EH
        { modelScore: 1.847, emoji: '' }, // 91 - EH
        { modelScore: 1.917, emoji: '' }, // 92 - EH
        { modelScore: 1.991, emoji: '' }, // 93 - EH
        { modelScore: 2.080, emoji: '' }, // 94 - EH
        { modelScore: 2.187, emoji: '' }, // 95 - EH
        { modelScore: 2.315, emoji: '❓' },
        { modelScore: 2.474, emoji: '' }, // 97 - EH
        { modelScore: 2.703, emoji: '❓' },
        { modelScore: 3.131, emoji: '❓' } // 99
    ]
;

var UTILS = {
    ACCESS_LEVEL: {
        NONE: 0,
        READ: 1 << 0,
        UPDATE: 1 << 1,
        CREATE: 1 << 2,
        DELETE: 1 << 3,
        ACCOUNT_EDITOR: 1 << 4,
        INTERNAL_ONLY_USER: 1 << 5,
        GLOBAL_ADMIN: 1 << 6,
    },
    VIDEO_STATE: {
        unknown: {
            mapping: 'dark'
        },
        processing: {
            mapping: 'info'
        },
        processed: {
            mapping: 'success'
        },
        serving: {
            mapping: 'success'
        },
        failed: {
            mapping: 'danger'
        }
    },
    VIDEO_STATE_ENUM: {
        unknown: 'unknown',
        processing: 'processing',
        processed: 'processed',
        serving: 'serving',
        failed: 'failed'
    },
    DRY_NAV: {
        HOME: {
            URL: '/'
        },
        DASHBOARD: {
            URL: '/dashboard/'
        },
        PLUGINS: {
            URL: '/plugins/'
        },
        PLUGINS_NEW: {
            URL: '/plugins/new/'
        },
        PLUGINS_BRIGHTCOVE: {
            URL: '/plugins/new/brightcove/'
        },
        PLUGINS_BRIGHTCOVE_WIZARD: {
            URL: '/plugins/new/brightcove/wizard/'
        },
        SIGNIN: {
            URL: '/signin/'
        },
        SIGNOUT: {
            URL: '/signout/'
        },
        SETTINGS_ACCOUNT: {
            URL: '/settings/account/'
        },
        SETTINGS_USER: {
            URL: '/settings/user/'
        },
        SUPPORT: {
            URL: '/support/'
        },
        TERMS: {
            URL: '/terms/'
        },
        ACCOUNT_PENDING: {
            URL: '/account/pending/'
        },
        ACCOUNT_CONFIRMED: {
            URL: '/account/confirmed/'
        },
        ACCOUNT_CONFIRM: {
            URL: '/account/confirm' // needs to have no trailing slash
        },
        BILLING: {
            URL: '/billing/'
        },
        TELEMETRY: {
            URL: '/telemetry/'
        },
        USER_FORGOT: {
            URL: '/user/forgot/'
        },
        USER_RESET: {
            URL: '/user/reset/'
        },
        API: {
            URL: '/support/#api'
        },
        SUPPORT_BRIGHTCOVE_PLUGIN_GUIDE: {
            URL: '/support/#brightcove-plugin-guide'
        },
        SUPPORT_CUSTOM_PLUGIN_GUIDE: {
            URL: '/support/#custom-plugin-guide'
        },
        VIDEO_LIBRARY: {
            URL: '/videos/'
        },
        VIDEO_ANALYZE: {
            URL: '/video/analyze/'
        },
        URL_SHORTENER: {
            URL: '/shorturl/'
        },
        DEMO: {
            URL: '/demo/'
        },
        COOKIES: {
            URL: '/cookies/'
        },
        ONBOARDING_VIDEO_UPLOAD: {
            URL: '/demo/upload/'
        },
    },
    COOKIES_KEY: { // all cookies cleared with session prepended with neonses_
        accessTokenKey: 'neonses_at',
        accountIdKey: 'neonses_actId',
        masqueradeAccountIdKey: 'neonses_msqactId',
        refreshTokenKey: 'neonses_rt',
        rememberMeKey: 'rme',
        rememberedEmailKey: 'ru',
        userKey: 'neonses_user_info',
        viewShareKey: 'footprintCookieViewShare',
        analyzeVideoKey: 'footprintCookieAnalyzeVideo'
    },
    FILTERS_GENDER_AGE: [
        {
            value: 'Female / 35-44',
        },
        {
            value: 'Male / 25 - 34',
        },
        {
            value: 'None',
        }
    ],
    FILTERS_GENDER: [
        {
            value: 'F',
            label: 'Female'
        },
        {
            value: 'M',
            label: 'Male'
        }
    ],
    FILTERS_AGE: [
        {
            value: '18-19',
            label: '18-19'
        },
        {
            value: '20-29',
            label: '20-29'
        },
        {
            value: '30-39',
            label: '30-39'
        },
        {
            value: '40-49',
            label: '40-49'
        },
        {
            value: '50+',
            label: '50+'
        }
    ],
    FILTERS_GENDER_ENUM: {
            M: 'Male',
            F: 'Female'
    },
    TELEMETRY_SNIPPET: 'https://s3.amazonaws.com/neon-cdn-assets/plugins/brightcove-smart-tracker.swf?neonPublisherId=',
    SHARE_LINK_FACEBOOK: 'https://facebook.com/sharer.php',
    SHARE_LINK_TWITTER: 'https://twitter.com/share',
    SHARE_LINK_LINKEDIN: 'https://linkedin.com/shareArticle',
    SUPPORT_EMAIL: 'support@neon-lab.com',
    SUPPORT_EMAIL_SUBJECT: 'Question about Neon',
    SUPPORT_MANDRILL_SLUG: 'support-email-admin',
    CONFIRM_MANDRILL_SLUG: 'support-email',
    RESULTS_EMAIL_SUBJECT: 'Your Neon Images Are Here!',
    RESULTS_MANDRILL_SLUG: 'video-results',
    VERSION: '1.9.1',
    NEON_SCORE_ENABLED: true,
    CONTACT_EXTERNAL_URL: 'https://neon-lab.com/contact-us/',
    CORP_EXTERNAL_URL: 'https://neon-lab.com/',
    PRICING_EXTERNAL_URL: 'https://neon-lab.com/pricing/',
    VIDEO_CHECK_INTERVAL_BASE: 10000, // 10s
    MAX_VIDEO_POLL_INTERVAL_MS: 600000, // 10 minutes 
    RESULTS_PAGE_SIZE: 5,
    MAX_VIDEO_SIZE: 900,
    VIDEO_FIELDS: ['video_id', 'title', 'publish_date', 'created', 'updated', 'duration', 'state', 'url', 'thumbnails', 'demographic_thumbnails', 'bad_thumbnails', 'estimated_time_remaining'],
    THUMBNAIL_FIELDS: ['thumbnail_id'],
    VIDEO_STATS_FIELDS: ['experiment_state', 'winner_thumbnail', 'created', 'updated'],
    BITLY_ACCESS_TOKEN: 'c9f66d34107cef477d4d1eaca40b911f6f39377e',
    BITLY_SHORTEN_URL: 'https://api-ssl.bitly.com/v3/shorten',
    COOKIE_DEFAULT_PATH: '/',
    VALENCE_THRESHOLD: 0.0005,
    VALENCE_IGNORE_INDEXES: [0,1],  
    TOOLTIP_DELAY_MILLIS: 500,

    // Reference https://developers.facebook.com/apps/315978068791558/dashboard/
    // TODO migrate to an official Neon Facebook app.
    FACEBOOK_APP_ID: '315978068791558',

    NEON_TWITTER_HANDLE: 'neonlab',
    rando: function(num) {
        return Math.floor(Math.random() * num + 1);
    },
    _sortThumbnails: function(a, b) {
        var aScore = (a.neon_score ? a.neon_score : 0),
            bScore = (b.neon_score ? b.neon_score : 0)
        ;
        return bScore - aScore;
    },
    findDefaultThumbnail: function(thumbSet) {
        defaultThumbnail = null; 
        if (thumbSet && thumbSet.thumbnails) {
            var defaultThumbnail = thumbSet.thumbnails.find(
                x => x.type === 'default');
            var interestingThumbnails = thumbSet.thumbnails.filter(
                x => x.type === 'neon' || x.type === 'customupload');
            if (!defaultThumbnail) {
                // Pick the customupload thumb it may not have a score
                defaultThumbnail = interestingThumbnails.filter(
                    x => x.type === 'customupload')[0];
            }
            if (!defaultThumbnail) {
                // Otherwise pick the interesting thumb with the lowest score
                defaultThumbnail = interestingThumbnails.filter(
                    x => x.neon_score > 0).sort(
                        (a,b) => a.neon_score - b.neon_score)[0];
                if (!defaultThumbnail) {
                    return;
                }
            }
        } 
        return defaultThumbnail; 
    }, 
    fixThumbnails: function(rawThumbnails, ignoreBad) {

        if (!(Array.isArray(rawThumbnails) && rawThumbnails.length > 0)) {
            return [];
        }

        var defaults = [],
            customs = [],
            neons = [],
            nonNeons = []
        ;

        // Pass 1 - sort into `default`, `custom` and `neon`
        rawThumbnails.map(function(rawThumbnail, i) {
            switch (rawThumbnail.type) {
                case 'neon':
                    neons.push(rawThumbnail);
                    break;                    
                case 'bad_neon':
                    if (!ignoreBad) {
                        neons.push(rawThumbnail);
                    }
                    break;
                case 'custom':
                    customs.push(rawThumbnail);
                    break;
                case 'customupload':
                    customs.push(rawThumbnail);
                    break;
                case 'default':
                    defaults.push(rawThumbnail);
                    break;
                default:
                    // WE DON'T CARE. OK WE DO. BUT NOT ENOUGH TO DO ANYTHING.
                    break;
            }
        });

        // Pass 2 - sort `custom` by neon_score DESC
        customs.sort(this._sortThumbnails);

        // Pass 3 - sort `neon` by neon_score DESC
        neons.sort(this._sortThumbnails);

        // Pass 4 - assemble the output
        nonNeons = customs.concat(defaults);
        if (nonNeons.length > 0) {
            return neons.concat(nonNeons[0]);
        }
        else {
            return neons;
        }
    },
    // HT - https://gist.github.com/mathewbyrne/1280286
    slugify: function(text) {
        return text.toString().toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove undesired characters
            .replace(/[\s_-]+/g, '-'); // Replace spaces, underscores, and hyphens with "-"
    },
    leadingZero: function(x) {
        return (x < 10) ? ('0' + x) : x;
    },
    hasAccessLevel: function(userAccessLevel, accessLevelToCheck) {
        return userAccessLevel & accessLevelToCheck;
    },
    formatDuration: function(durationSeconds) {
        var tempTime = moment.duration(durationSeconds * 1000); // expecting milliseconds
            return this.leadingZero(tempTime.hours()) + ':' + this.leadingZero(tempTime.minutes()) + ':' + this.leadingZero(tempTime.seconds());
    },

    formatTime: (minutes, seconds) => {
        const formattedMinutes = minutes > 9 ? minutes : `0${minutes}`;
        const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`;

        return `${formattedMinutes}:${formattedSeconds}`;
    },

    makePercentage: function(rawNumber, decimalPlaces, showSymbol) {
        var hundreds = rawNumber * 100;
        // Make sure we don't get -0%
        const minDiff = 5/Math.pow(10, decimalPlaces+1);
        if (hundreds < 0 && hundreds > -minDiff) {
            hundreds += minDiff;
        }
        return hundreds.toFixed(decimalPlaces) + (showSymbol ? '%' : '');
    },
    generateId: function() {
        var id = shortid.generate(),
            hash64 = fnv.hash(id + Date.now(), 128)
        ;
        return hash64.str();
    },
    isValidDate: function(d) {
        var niceDate = d.split(' ').join('T'); // hackety hack hack ugh spit
        return !isNaN(Date.parse(niceDate));
    },
    dropboxUrlFilter: function(s) {
        var returnValue = s;
        returnValue = returnValue.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
        returnValue = returnValue.replace('dl=0', 'dl=1&raw=1');
        return returnValue;
    },
    properEncodeURI: function(url) {
        return encodeURI(url).replace(/'/g,"%27").replace(/"/g,"%22");
    },
    getNeonScoreData: function(score) {
        // Back End now does math - #1253
        if (score && !isNaN(score) && (score >= 0)) {
            return {
                neonScore: score,
                emoji: NEONSCORES[score].emoji
            };
        }
        else {
            return {
                neonScore: UNKNOWN_STRING,
                emoji: UNKNOWN_EMOJI
            };
        }
    },
    buildPageTitle: function(title) {
        return title + T.get('app.separator') + T.get('app.credit', {
            '@appName': T.get('app.appName'),
            '@companyShortName': T.get('app.companyShortName')
        });
    },
    makeTitle: function() {
        return T.get('app.companyShortName') + ' ' + T.get('video') + ' ' + moment(Date.now()).format('D MMM YYYY');
    },
    isValidPassword: function(password) {
        // .{,8} === length is at least 8
        var re = /.{8,}/
        return re.test(password);
    },
    isPasswordConfirm: function(state) {
        return state.password === state.verifyPassword;
    },
    //the following function strips a url of its protocol
    stripProtocol: function(url) {
        return url.replace(/^(https?):/, '');
    },
    shortenUrl: function(url, callback) {
        var self = this;
        reqwest({
            url: self.BITLY_SHORTEN_URL,
            method: 'GET',
            type: 'jsonp',
            data: {
                longUrl: url,
                access_token: self.BITLY_ACCESS_TOKEN
            }
        })
        .then(function(response) {
            callback(response);
        })
        .catch(function(error) {
            console.log(error);
            callback(error);
        })
    },
    validateUrl: function(value) {
          return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default UTILS;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
