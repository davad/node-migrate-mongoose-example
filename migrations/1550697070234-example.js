const logger = require("../config/migrations/logger");
const Models = require("../config/migrations/db");

const Log = logger.bind("Example");

const List = Models.list;

module.exports.up = async () => {
    Log.info("Create a list");
    List.create({
        name: "Test List",
        items: [
            { name: "Item 1"},
            { name: "Item 2"},
            { name: "Item 3"},
            { name: "Item 4", description: "This one has a description"},
        ]
    });
};

module.exports.down = async () => {
    Log.info("Drop the list collection");
    List.collection.drop()
};
