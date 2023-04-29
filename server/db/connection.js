const mongoose = require('mongoose');

async function getDb() {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected!');
        return conn;
    } catch (error) {
        console.log('Error connecting databse', error);
    }
}
const conn = getDb();
module.exports = conn;
