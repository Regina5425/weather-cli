import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (msg) => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + msg);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
  );
};

const printWeather = (res, icon) => {
	console.log(
    dedent`${chalk.bgMagenta(" WEATHER ")} Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура: ${res.main.temp}
		Влажность: ${res.main.humidity}%
		Атм. давление: ${res.main.pressure}atm
		`
  );
}

export { printError, printSuccess, printHelp, printWeather };
