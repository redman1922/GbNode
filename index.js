
import fs from "fs";
import readline from "readline";

console.log("Hello World!");

//создание потока для чтения файла
const readStream = fs.createReadStream("./access.log", "utf-8");
const ip1 = "89.123.1.41";
const ip2 = "34.48.240.111";

//создание стримов для записи по нужному ip
const writeStream1 = fs.createWriteStream(`${ip1}`);
const writeStream2 = fs.createWriteStream(`${ip2}`);

//создание переменной для подсчета строк
let numStr = 0;

const rl = readline.createInterface({
    input: readStream,
});

rl.on("line", line => {
    //проверка каждой строки файла
    if (line.includes(ip1)) {
        //запись в файл
        writeStream1.write(line + "\n");
    }

    if (line.includes(ip2)) {
        writeStream2.write(line + "\n");
    }
    //вывод количества считанных строк в лог
    console.log(++numStr);
});