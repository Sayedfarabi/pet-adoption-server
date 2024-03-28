/* eslint-disable no-undef */

import app from "./app";
import { Server } from "http";
import config from "./config";

let server: Server;

const main = async () => {
  try {
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

process.on("unhandledRejection", () => {
  console.log("UnhandledRejection is detected, shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log("UncaughtException is detected, shutting down...");

  process.exit(1);
});
