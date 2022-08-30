const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const { MONGODB_URI } = process.env;
    const connect = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MONGODB is connected to host:${connect.connection.host} - port:${connect.connection.port}`
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDatabase;
