function inter(arg) {
    for (let k of arg) {
        let z = +k;
        if (Number.isInteger(z)) {
        } else {
            return false;
        }
    }
    return true;
}

const colors = require('colors');
const args = process.argv.slice(2);
let flag = true;

if (inter(args) === true) {
    if (+args[0] <= +args[1]) {

        let n = +args[1];
        let u = 0;
        nextPrime:
            for (let i = +args[0]; i <= n; i++) { // Для всех i...

                for (let j = 2; j < i; j++) { // проверить, делится ли число..
                    if (i % j === 0) continue nextPrime; // не подходит, берём следующее
                }
                // светофор
                if (u === 0) {
                    console.log(colors.green(i));
                    flag = false;
                    u++;
                } else if (u === 1) {
                    console.log(colors.yellow(i));
                    flag = false;
                    u++;
                } else if (u === 2) {
                    console.log(colors.red(i))
                    flag = false;
                    u = 0;
                }

            }
    } else {
        console.log('Первое больше второго');
        flag = false;
    }

} else {
    console.log('Не число');
    flag = false;
}

if (flag == true) {
    console.log('Простых чисел в диапазоне нет'.red);
}