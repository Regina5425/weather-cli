// import https from "https";
import axios from "axios";
import { getKeyValue, TOKEN_DICT } from "./storage.services.js";

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICT.token);
  if (!token) {
    throw new Error("API_KEY is not found");
  }

  // 1 вариант
  // const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  // url.searchParams.append("q", city);
  // url.searchParams.append("appid", token);
  // url.searchParams.append("lang", "ru");
  // url.searchParams.append("units", "metric");

  // https.get(url, (response) => {
  //   let res = "";
  //   response.on("data", (chunk) => {
  //     res += chunk;
  //   });

  //   response.on("end", () => {
  //     console.log(res);
  //   });
  // });

  // 2 вариант axios
  const {data} = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );
	return data;
};

export { getWeather };
