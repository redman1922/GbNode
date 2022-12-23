import colors from "colors";
import readline from "readline";
import path from "path";
import inquirer from "inquirer";
import fsp from "fs/promises";

console.log(colors.red("Hello World!"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const root = process.cwd();

const findFilesInDir = dirName => {
    //читаем список файлов и директорий
    return fsp
        .readdir(dirName)
        .then(choices => {
            return inquirer.prompt([
                { name: "fileName", type: "list", message: "Choose file", choices },
                {
                    name: "findString",
                    type: "input",
                    message: "Enter something for search",
                    //асинхронная функция проверки на файл или директорию
                    async when({ fileName }) {
                        const fullPath = path.join(dirName, fileName);
                        const stat = await fsp.stat(fullPath);

                        return stat.isFile();
                    },
                },
            ]);
        })
        .then(async ({ fileName, findString }) => {
            const fullPath = path.join(dirName, fileName);
            if (findString === undefined) return findFilesInDir(fullPath);

            return Promise.all([
                fsp.readFile(fullPath, "utf-8"),
                Promise.resolve(findString),
            ]);
        })
        .then(result => {
            if (result) {
                const [text, findString] = result;
                const pattern = new RegExp(findString, "g");
                let count = 0; // для подсчета совпадений

                //вывод текста заменяем строки на выделенные красным цветом
                const out = text.replace(pattern, () => {
                    count++;
                    //помечаем красным цветом совпадения
                    return colors.red(findString);
                });

                console.log(out, "\n", colors.green(`Found ${count} values`));
            }
        });
};

//точка входа
rl.question(
    `You are in ${root} \n Please enter the path to the directory: `,
    dirPath => {
        const dirName = path.join(root, dirPath);

        findFilesInDir(dirName);
    }
);

rl.on("close", () => process.exit(0));