
import crypto from 'crypto';

export const generateToken = () => crypto.randomBytes(32).toString('hex');



export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc',
  };
  export const FIFTEEN_MINUTES = 15*60*1000;
  export const ONE_MONTH = 30*24*60*60*1000;
  
  