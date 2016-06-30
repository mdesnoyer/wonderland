// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default (minutes, seconds) => (
    `${minutes > 9 ? minutes : (`0${minutes}`)}:${seconds > 9 ? seconds : (`0${seconds}`)}`
);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
