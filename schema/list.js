module.exports = mongoose => {
    const modelName = "list";
    const Types = mongoose.Schema.Types;
    const Schema = new mongoose.Schema({
        name: Types.String,
        items: [{
            name: {
                type: Types.String,
                required: true,
            },
            description: {
                type: Types.String,
            },
        }]
    });

    Schema.statics = {
        collectionName: modelName,
    };

    return Schema;
};
