const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongoServer; // In-memory MongoDB server instance
// Create a new in-memory MongoDB server before all tests
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
})
// Create a new in-memory MongoDB server before all testscls

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})
// Clear the database after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
})