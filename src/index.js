import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/tokens.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

const startApp = async () => {
  try {
    
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);

  
    setupServer();
  } catch (error) {
    console.error('Error starting application:', error.message);
    process.exit(1); 
  }
};

startApp();
