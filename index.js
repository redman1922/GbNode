// import colors from "colors";
import EventEmitter from "events";

//Задание № 1

// console.log(colors.red("Hello World!"));
//
// console.log("Record 1");
// setTimeout(() => {
//     console.log("Record 2");
//     Promise.resolve().then(() => {
//         setTimeout(() => {
//             console.log("Record 3");
//             Promise.resolve().then(() => {
//                 console.log("Record 4");
//             });
//         });
//     });
// });
// console.log("Record 5");
// Promise.resolve().then(() =>
//     Promise.resolve().then(() => console.log("Record 6"))
// );

//Задание № 2

class TimerEmitter extends EventEmitter {}
const emitter = new TimerEmitter(); //создание emitter

//регистрация события отсчета времени
emitter.on("timerTick", ([dateInFuture, timer]) => {
    const dateNow = new Date(); //создание даты на момент старта для сравнения с dateInFuture
    if (dateNow >= dateInFuture) {
        emitter.emit("timerEnd", timer); //генерация события timerEnd
    } else {
        console.log(getPrettyTime((dateInFuture - dateNow) / 1000), " left"); //вызов функции для вычисления оставшегося времени
    }
});

//регистрация события окончания времени
emitter.on("timerEnd", timer => {
    console.log("Time is Up!");
    clearInterval(timer);
});

//функция вычисления дней, часов, минут, секунд
const getPrettyTime = seconds => {
    const arr = [
        Math.floor(seconds % 60),
        Math.floor((seconds / 60) % 60),
        Math.floor(seconds / (60 * 60)) % 24,
        Math.floor(seconds / (60 * 60 * 24)),
    ];
    return `${arr.pop()} days ${arr.pop()} hours ${arr.pop()} minutes ${arr.pop()} seconds`;
};

//создание кнопки старт
const start = dateInFuture => {
    setInterval(function () {
        //генерация события timerTick, передача данных dateInFuture
        emitter.emit("timerTick", [dateInFuture, this]); //this = timer
    }, 1000);
};

//цикл для ввода нескольких аргументов при запуске программы
for (const arg of process.argv.slice(2)) {
    const [hour, day, month, year] = arg.split("-");
    const dateInFuture = new Date(Date.UTC(year, month - 1, day, hour));

    if (isNaN(dateInFuture)) {
        emitter.emit("error", new Error("Что-то пошло не так!"));
    }
    start(dateInFuture);
}

// //передача аргументов при вызове
// const [hour, day, month, year] = process.argv[2].split("-");

// //создание времени отсчета
// const dateInFuture = new Date(Date.UTC(year, month - 1, day, hour));

// if (isNaN(dateInFuture)) {
//   //обработка ошибки ОБЯЗАТЕЛЬНА!!!
//   emitter.emit("error", new Error("Что-то пошло не так!"));
// }
// // запуск программы
// start(dateInFuture);