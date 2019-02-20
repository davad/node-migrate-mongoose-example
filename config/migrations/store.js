const mongoose = require("mongoose");
const Config = require("../");
const Migrations = require("./migrations.schema");

class Store {
    constructor() {
        this.url = Config.get("/mongoURI");
        this.db = null;
        this.migration = null;
    }

    async connect() {
        this.migration = Migrations;
        await mongoose.connect(
            this.url,
            { useNewUrlParser: true },
        );
        this.db = mongoose.connection;
        return this.migration;
    }

    load(fn) {
        return this.connect()
            .then(db =>
                db
                    .find()
                    .lean()
                    .exec(),
            )
            .then(data => {
                if (!data.length) return fn(null, {});
                const store = data[0];
                // Check if does not have required properties
                if (
                    !Object.prototype.hasOwnProperty.call(store, "lastRun") ||
                    !Object.prototype.hasOwnProperty.call(store, "migrations")
                ) {
                    return fn(new Error("Invalid store file"));
                }
                return fn(null, store);
            })
            .catch(fn);
    }

    save(set, fn) {
        return this.connect()
            .then(db =>
                db.updateOne(
                    {},
                    {
                        $set: {
                            lastRun: set.lastRun,
                        },
                        $push: {
                            migrations: { $each: set.migrations },
                        },
                    },
                    {
                        upsert: true,
                        multi: true,
                    },
                ),
            )
            .then(result => fn(null, result))
            .catch(fn);
    }
}
module.exports = Store;
