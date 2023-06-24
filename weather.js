#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.services.js";
import {
  printHelp,
  printError,
  printSuccess,
  printWeather,
} from "./services/log.services.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICT,
} from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Токен не задан");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICT.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Город не задан");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICT.city, city);
    printSuccess("Город сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICT.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно указан город");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан токен");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCity(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }

  return getForecast();
};

initCLI();
