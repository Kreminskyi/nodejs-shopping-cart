Setup the environment variables replacing with your mongodb port, usually is 27017.

    export MONGO_DB_URI=mongodb://localhost:<MONGODB-PORT>/shopping
Install dependencies

    npm install
With your mongod service running, this will populate shopping database

    node seed/product-seeder.js 
This will start dev server at http://localhost:3000 with .

    npm run dev
Tests
    npm test
Technologies
Back-end
NodeJS, Express, MongoDB, Mongoose.Three js