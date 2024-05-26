import inquirer from 'inquirer';
import chalk from 'chalk';

interface User {
    name: string;
    email: string;
    password: string;
}

const users: User[] = [];
let currentUser: User | null = null;

const signup = async () => {
    const userDetails = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter your name:' },
        { type: 'input', name: 'email', message: 'Enter your email:' },
        { type: 'password', name: 'password', message: 'Enter your password:' },
    ]);

    users.push(userDetails);
    console.log(chalk.green('Signup successful!'));
};

const login = async () => {
    const loginDetails = await inquirer.prompt([
        { type: 'input', name: 'email', message: 'Enter your email:' },
        { type: 'password', name: 'password', message: 'Enter your password:' },
    ]);

    const user = users.find(u => u.email === loginDetails.email && u.password === loginDetails.password);
    if (user) {
        console.log(chalk.green('Login successful!'));
        currentUser = user;
    } else {
        console.log(chalk.red('Invalid credentials.'));
    }
};

const testPassages = [
    'The quick brown fox jumps over the lazy dog.',
    'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
    'A journey of a thousand miles begins with a single step.',
    'To be or not to be, that is the question.',
];

const getRandomPassage = (): string => {
    return testPassages[Math.floor(Math.random() * testPassages.length)];
};

const startTest = async () => {
    const passage = getRandomPassage();
    console.log('\nTyping Test:');
    console.log(chalk.yellow(passage));

    const start = new Date().getTime();

    const { typedText } = await inquirer.prompt([
        { type: 'input', name: 'typedText', message: 'Start typing:' },
    ]);

    const end = new Date().getTime();
    const timeTaken = (end - start) / 1000 / 60; 

    const wordsTyped = typedText.split(' ').length;
    const wordsPerMinute = wordsTyped / timeTaken;

    console.log(chalk.green(`\nTest complete!`));
    console.log(chalk.blue(`Your typing speed is ${wordsPerMinute.toFixed(2)} WPM.`));
};

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: currentUser ? ['Start Test', 'Logout', 'Exit'] : ['Signup', 'Login', 'Exit'],
        },
    ]);

    if (action === 'Signup') {
        await signup();
    } else if (action === 'Login') {
        await login();
    } else if (action === 'Start Test') {
        await startTest();
    } else if (action === 'Logout') {
        currentUser = null;
        console.log(chalk.green('Logged out successfully!'));
    } else {
        console.log(chalk.blue('Goodbye!'));
        process.exit(0);
    }
};

const main = async () => {
    console.log('Welcome to the Speed Typing Tester!');
    while (true) {
        await mainMenu();
    }
};

main();