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
        "react/require-extension": ["off"],
        "import/extensions": ["warn"],
        // We use 4-space indent.
        "indent": ["error", 4],
        // The tracking code uses this and is annoyingly tricky to redo.
        "prefer-rest-params": ["off"],
        // Without static on function, makes harder to read class.
        "class-methods-use-this": ["off"],
        // Semantic use of tag is not urgent. Re-enable later.
        "jsx-a11y/no-static-element-interactions": ["off"],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-indent": ["error", 4],
        "react/jsx-filename-extension": ["off"],
        // Temp disable for dev.
        "no-console": ["off"],
        "no-debugger": ["off"],
        "react/sort-comp": ["off"],
    },
};
