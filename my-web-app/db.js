const mongoose = require('mongoose');
const uri = "mongodb+srv://jumper:jumper@my-web-app-contacts-mes.uiakv4r.mongodb.net/?retryWrites=true&w=majority&appName=my-web-app-contacts-messages";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Tiempo de espera extendido
  });
  
  const db = mongoose.connection;
  
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });
  
  module.exports = mongoose;