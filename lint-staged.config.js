// .lintstagedrc.js
// https://github.com/okonet/lint-staged

module.exports = {
    'src/**/*.{js,jsx}': ['prettier --write', 'eslint --format table --fix'],
    'src/**/*.{ts,tsx}': ['prettier --parser typescript --write', 'eslint --format table --fix'],
    'src/**/*.{css}': ['prettier --write', 'stylelint --fix'],
    'src/**/*.{less}': ['prettier --write', 'stylelint --syntax less --fix'],
    'src/**/*.{sass,scss}': ['prettier --write', 'stylelint --syntax scss --fix'],
    'src/**/*.{json}': ['prettier'],
    'src/**/*.{md,markdown}': ['lint-md --fix'],
};
