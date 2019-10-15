import { config } from "dotenv";
config();

const envVars: NodeJS.ProcessEnv = process.env;
const configuration = Object.freeze({
  port: envVars.PORT,
  mongo_uri: envVars.MONGO_URL,
  response_limit: envVars.RESPONSE_LIMIT,
  secret_key: envVars.SECRET_KEY
});

export default configuration;
