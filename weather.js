#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.services.js";
import {
  printHelp,
  printError,
  printSuccess,
} from "./services/log.services.js";
import { saveKeyValue, TOKEN_DICT } from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token is not applied");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICT.token, token);
    printSuccess("Token is saved");
  } catch (e) {
    printError(e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
    // сохранить город
  }
  if (args.t) {
    return saveToken(args.t);
  }
  // вывести погоду
	getWeather('moscow');
};

initCLI();
