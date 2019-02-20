const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Config = require("../index");
const Log = require("./logger.js");

const schemaFolder = path.join(__dirname, "..", "..", "schema")
/*
 * Register mongoose models and export them for use with migration scripts
 */
function registerSchema() {
    let Models = {};
    try {
        mongoose.connect(
            Config.get("/mongoURI"),
            { useNewUrlParser: true },
        );

        // Load files in the `models` directory and register them with Mongoose
        const files = fs.readdirSync( schemaFolder);
        Models = files.reduce((acc, file) => {
            const ext = path.extname(file);
            if (ext === ".js") {
                const filename = path.basename(file, ".js");
                // eslint-disable-next-line import/no-dynamic-require, global-require
                const schema = require(path.join(schemaFolder, filename))(mongoose);

                schema.set("strict", false);
                schema.set("strictQuery", false);

                const schemaName = schema.statics.collectionName;
                acc[schemaName] = mongoose.model(schemaName, schema);
            }
            return acc;
        }, {});
    } catch (e) {
        Log.error(e);
    }
    return Models;
}
module.exports = registerSchema();
