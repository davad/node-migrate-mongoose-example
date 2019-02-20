const Confidence = require("confidence");
const Dotenv = require("dotenv");
const path = require("path");

Dotenv.config({ debug: process.env.DEBUG });

/**
 * NOTE: Only secrets and values affected by the environment (not NODE_ENV) are stored in .env files. All other values
 * are defined here.
 */

// The criteria to filter config values by (NODE_ENV). Typically includes:
//  - local
//  - development
//  - production
//  - $default
const criteria = {
    env: process.env.NODE_ENV,
};

const config = {
    mongoURI: {
        $filter: "env",
        production: process.env.MONGODB_URI,
        $default: process.env.MONGODB_URI,
    },
    otherConfig: {
        $filter: "env",
        production: "some value",
        $default: "a different value"
    }
};

const store = new Confidence.Store(config);
exports.get = key => store.get(key, criteria);
exports.meta = key => store.meta(key, criteria);
