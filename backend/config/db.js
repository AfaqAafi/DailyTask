const mongoose = require('mongoose');

const db = process.env.MONGO_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB is Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;