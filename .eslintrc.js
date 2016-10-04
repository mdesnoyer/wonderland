module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
    },
    "installedESLint": true,
    "plugins": [
        "react",
        "jsx-a11y",
        "import",
    ],
    "rules": {
        // This emits a deprecation warning and airbnb has not yet fixed.
        "react/require-extension": ["off"],

        // We use 4-space indent.
        "indent": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],

        // The tracking code uses arguments and is tricky to redo.
        "prefer-rest-params": ["off"],

        // Without static on function, makes harder to read class.
        "class-methods-use-this": ["off"],

        // Semantic use of tag is not urgent. Re-enable later.
        "jsx-a11y/no-static-element-interactions": ["off"],

        // Our jsx files are just named .js.
        "react/jsx-filename-extension": ["off"],
    },
};
