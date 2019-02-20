/* eslint-disable import/no-unresolved, no-unused-vars */
const logger = require("../config/migrations/logger");
const Models = require("../config/migrations/db");

const Log = logger.bind("YourMigration");

/*
 * Load a Mongoose model like this:
 */
// const List = Models.list;

/*
 * Access the bare Mongo driver like this:
 */
// List.collection

/*
 * You might need to do this to save data that doesn't match the current
 * mongoose schema.
 *
 * Example query to update a document:
 */
// List.collection.findOneAndUpdate(
//     { _id: modifiedDoc._id },
//     { $set: modifiedDoc },
// );

module.exports.up = async done => {
    return Promise.resolve();
    // or call done() if not an async function
};

module.exports.down = async done => {
    return Promise.resolve();
    // or call done() if not an async function
};
