import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const startApp = async () => {
  try {
    
    await initMongoConnection();

  
    setupServer();
  } catch (error) {
    console.error('Error starting application:', error.message);
    process.exit(1); 
  }
};

startApp();
