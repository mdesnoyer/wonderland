// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

var UNKNOWN_STRING = '?',
	UNKNOWN_EMOJI = '👽',
	NEONSCORES = [
	    { modelScore: 0.000, emoji: '❓' },
		{ modelScore: 0.155, emoji: '❓' },
		{ modelScore: 0.194, emoji: '😴' }, // 2 - EH
		{ modelScore: 0.222, emoji: '❓' },
		{ modelScore: 0.247, emoji: '💀' }, // 4 - EH
		{ modelScore: 0.269, emoji: '💩' }, // 5 - NH
		{ modelScore: 0.289, emoji: '👿' }, // 6 - EH
		{ modelScore: 0.310, emoji: '❓' },
		{ modelScore: 0.328, emoji: '😵' }, // 8 - EH
		{ modelScore: 0.347, emoji: '❓' },
		{ modelScore: 0.363, emoji: '❓' },
		{ modelScore: 0.381, emoji: '😫' }, // 11 - EH
		{ modelScore: 0.396, emoji: '❓' },
		{ modelScore: 0.410, emoji: '❓' },
		{ modelScore: 0.424, emoji: '👹' }, // 14 - EH
		{ modelScore: 0.438, emoji: '❓' },
		{ modelScore: 0.452, emoji: '😡' }, // 16 - EH
		{ modelScore: 0.465, emoji: '🐗' }, // 17 - EH
		{ modelScore: 0.479, emoji: '❓' },
		{ modelScore: 0.492, emoji: '❓' },
		{ modelScore: 0.504, emoji: '😔' }, // 20 - JV
		{ modelScore: 0.517, emoji: '❓' },
		{ modelScore: 0.531, emoji: '❓' },
		{ modelScore: 0.543, emoji: '❓' },
		{ modelScore: 0.555, emoji: '❓' },
		{ modelScore: 0.567, emoji: '❓' },
		{ modelScore: 0.579, emoji: '❓' },
		{ modelScore: 0.590, emoji: '👾' }, // 27 - EH
		{ modelScore: 0.602, emoji: '❓' },
		{ modelScore: 0.613, emoji: '❓' },
		{ modelScore: 0.624, emoji: '❓' },
		{ modelScore: 0.635, emoji: '🐌' }, // 31 - EH
		{ modelScore: 0.647, emoji: '❓' },
		{ modelScore: 0.658, emoji: '❓' },
		{ modelScore: 0.670, emoji: '🍌' }, // 34 - EH
		{ modelScore: 0.681, emoji: '❓' },
		{ modelScore: 0.693, emoji: '❓' },
		{ modelScore: 0.704, emoji: '👻' }, // 37 - EH
		{ modelScore: 0.715, emoji: '❓' },
		{ modelScore: 0.727, emoji: '❓' },
		{ modelScore: 0.739, emoji: '🐢' }, // 40 - EH
		{ modelScore: 0.751, emoji: '❓' },
		{ modelScore: 0.763, emoji: '❓' },
		{ modelScore: 0.776, emoji: '❓' },
		{ modelScore: 0.790, emoji: '❓' },
		{ modelScore: 0.801, emoji: '🌞' }, // 45 - NH
		{ modelScore: 0.813, emoji: '❓' },
		{ modelScore: 0.826, emoji: '❓' },
		{ modelScore: 0.837, emoji: '🐙' }, // 48 - EH
		{ modelScore: 0.850, emoji: '❓' },
		{ modelScore: 0.863, emoji: '💃' }, // 50 - EH
		{ modelScore: 0.876, emoji: '❓' },
		{ modelScore: 0.889, emoji: '🍆' }, // 52 - EH
		{ modelScore: 0.901, emoji: '❓' },
		{ modelScore: 0.915, emoji: '💁' }, // 54 - EH
		{ modelScore: 0.928, emoji: '❓' },
		{ modelScore: 0.943, emoji: '❓' },
		{ modelScore: 0.957, emoji: '❓' },
		{ modelScore: 0.972, emoji: '❓' },
		{ modelScore: 0.986, emoji: '❓' },
		{ modelScore: 1.002, emoji: '❓' },
		{ modelScore: 1.017, emoji: '❓' },
		{ modelScore: 1.032, emoji: '😼' }, // 62 - JV
		{ modelScore: 1.047, emoji: '❓' },
		{ modelScore: 1.064, emoji: '❓' },
		{ modelScore: 1.080, emoji: '💋' }, // 65 - EH
		{ modelScore: 1.096, emoji: '❓' },
		{ modelScore: 1.115, emoji: '❓' },
		{ modelScore: 1.132, emoji: '✌️' }, // 68 - EH
		{ modelScore: 1.151, emoji: '❓' },
		{ modelScore: 1.170, emoji: '❓' },
		{ modelScore: 1.191, emoji: '❓' },
		{ modelScore: 1.212, emoji: '🙆' }, // 72 - JV
		{ modelScore: 1.233, emoji: '❓' },
		{ modelScore: 1.255, emoji: '🐶' }, // 74 - EH
		{ modelScore: 1.277, emoji: '💥' }, // 75 - EH
		{ modelScore: 1.301, emoji: '❓' },
		{ modelScore: 1.324, emoji: '💅' }, // 77 - NH
		{ modelScore: 1.350, emoji: '🐸' }, // 78 - EH
		{ modelScore: 1.376, emoji: '❓' },
		{ modelScore: 1.402, emoji: '🐥' }, // 80 - JV
		{ modelScore: 1.432, emoji: '❓' },
		{ modelScore: 1.461, emoji: '❓' },
		{ modelScore: 1.494, emoji: '😎' }, // 83 - EH
		{ modelScore: 1.529, emoji: '❓' },
		{ modelScore: 1.566, emoji: '🎉' }, // 85 - NH
		{ modelScore: 1.604, emoji: '👓' }, // 86 - EH
		{ modelScore: 1.646, emoji: '🍪' }, // 87 - EH
		{ modelScore: 1.690, emoji: '😘' }, // 88 - EH
		{ modelScore: 1.741, emoji: '💖' }, // 89 - EH
		{ modelScore: 1.792, emoji: '😏' }, // 90 - EH
		{ modelScore: 1.847, emoji: '👑' }, // 91 - EH
		{ modelScore: 1.917, emoji: '🎩' }, // 92 - EH
		{ modelScore: 1.991, emoji: '😍' }, // 93 - EH
		{ modelScore: 2.080, emoji: '🍦' }, // 94 - EH
		{ modelScore: 2.187, emoji: '😁' }, // 95 - EH
		{ modelScore: 2.315, emoji: '❓' },
		{ modelScore: 2.474, emoji: '🍕' }, // 97 - EH
		{ modelScore: 2.703, emoji: '❓' },
		{ modelScore: 3.131, emoji: '❓' } // 99
	]
;

let utils =  {
    VIDEO_STATE: {
        'unknown': { mapping: 'dark' },
        'processing': { mapping: 'info' },
        'processed': { mapping: 'warning' },
        'serving': { mapping: 'success' },
        'failed': { mapping: 'danger' },
    },
	rando: function(num) {
		return Math.floor(Math.random() * num + 1);
	},
    getNeonScoreData: function(score) {
        if (score && !isNaN(score) && (score > 0)) {
            var neonScoresLength = NEONSCORES.length;
            for (var i = 0; i < neonScoresLength; i++) {
                if (score < NEONSCORES[i].modelScore) {
                    return {
                        neonScore: i - 1,
                        emoji: NEONSCORES[i].emoji
                    };
                }
            }
            return {
                neonScore: i - 1,
                emoji: NEONSCORES[i].emoji
            };
        }
        else {
            return {
                neonScore: UNKNOWN_STRING,
                emoji: UNKNOWN_EMOJI
            };
        }
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

export default utils;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
