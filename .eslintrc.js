module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
    ],
    "rules": {
        "react/require-extension": ["off"],
        "import/extensions": ["warn"],
        "indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-filename-extension": ["off"],
    },
};
