import path from 'path'
import dotenv from 'dotenv'
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: path.resolve(process.cwd(), 'production.env') });
} else {
  dotenv.config();
}

const config = { ...process.env };


// set nodejs modules
export default config;
