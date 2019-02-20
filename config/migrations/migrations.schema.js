const mongoose = require("mongoose");

const MigrationSchema = new mongoose.Schema({
    lastRun: mongoose.Schema.Types.String,
    migrations: [
        {
            title: mongoose.Schema.Types.String,
            timestamp: mongoose.Schema.Types.Number,
        },
    ],
});

module.exports = mongoose.model("Migrations", MigrationSchema);
