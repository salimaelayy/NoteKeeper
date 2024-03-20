const mongoose = require('mongoose');

class DB {
    constructor(mongo_uri) {
        this.mongo_uri = mongo_uri
    }

    async connect() {
        try {
            await mongoose.connect(this.mongo_uri, {
                dbName: "noteKeeper"
            })
            console.log("DB connected");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DB