import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

console.log(chalk.yellowBright(figlet.textSync("Ali's Typing Test", {horizontalLayout: 'full'})))
interface User {
    name: string;
    email: string;                                                  // Here i define types for the elements in the User Array
    password: string;
}

const users: User[] = [];                                           // Here I actually create the array of users and they will continue to fill as the users start registering.
let currentUser: User | null = null;                                // Before logging in, the current user will be set to null and after logging in, it will be set to that respective user.

const signup = async () => {
    const userDetails = await inquirer.prompt([
        { 
            type: 'input', 
            name: 'name', 
            message: 'Enter your name:', 
            validate: input => {
                if (input.length < 3 || input.length > 15) {
                    return 'Name must be between 3 and 15 characters.';
                }
                return true;
            }
        },
        { 
            type: 'input', 
            name: 'email', 
            message: 'Enter your email:',
            validate: input => {
                if (!input.includes('@')) {
                    return 'Email must contain an @ symbol.';
                }
                return true;
            }
        },                                                          // Signup Authentication
        { 
            type: 'input', 
            name: 'password', 
            message: 'Enter your password:',
            validate: input => {
                if (input.length < 6 || input.length > 10) {
                    return 'Password must be between 6 and 10 characters.';
                }
                return true;
            }
        },
        
    ]);

    users.push(userDetails);
    console.log(chalk.green('Signup successful!'));
};

const login = async () => {
    const loginDetails = await inquirer.prompt([
        { type: 'input', name: 'email', message: 'Enter your email:' },                 // Login Authentication
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
    'A journey of a thousand miles begins with a single step.',                                     // Random test passages, we can add more!
    'To be or not to be, that is the question.',
];

const getRandomPassage = (): string => {                                                            // Function to get a random package from the test packages.
    return testPassages[Math.floor(Math.random() * testPassages.length)];                           // It generates a random number and multiplies it to the length of test passages array and then rounds it.
};

const startTest = async () => {
    const passage = getRandomPassage();
    console.log('\nTyping Test:');
    console.log(chalk.yellow(passage));

    const start = new Date().getTime();                                                         // Here the time starts recording

    const { typedText } = await inquirer.prompt([
        { type: 'input', name: 'typedText', message: 'Start typing:' },
    ]);

    const end = new Date().getTime();                                                           // Here the time stops recording
    const timeTaken = (end - start) / 1000 / 60;                                                /* The actual time is in miliseconds so we first deduct the start from end then convert it to seconds 
                                                                                                    then convert it to minutes */
    const wordsTyped = typedText.split(' ').length;
    const wordsPerMinute = wordsTyped / timeTaken;

    console.log(chalk.green(`\nTest complete!`));
    console.log(chalk.blue(`Your typing speed is ${wordsPerMinute.toFixed(2)} WPM.`));              // Here I used the toFixed method to round of the speed to 2 decimals.
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
        await signup();                                                             // This is the actual main menu!
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