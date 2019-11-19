
const { addDecoratorsLegacy, useEslintRc, override } = require("customize-cra");

module.exports = override(addDecoratorsLegacy(), useEslintRc("./.eslintrc"));

module.exports=override({
    resolve: {
        extensions: ['.js', '.json', '.ts','tsx']
    }
})