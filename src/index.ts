import { config } from "./config";
import Server from "./server";

let server = new Server(config);
server.bootstrap();
