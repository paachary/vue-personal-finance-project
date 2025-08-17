// vue.config.js
const path = require("path");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src/frontend"),
                "@server": path.resolve(__dirname, "src/backend"), // New alias for server folder
                "@components": path.resolve(
                    __dirname,
                    "src/frontend/components"
                ), // Alias for components folder
            },
        },
    },
};
