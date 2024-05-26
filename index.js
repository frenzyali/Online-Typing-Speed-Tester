import inquirer from "inquirer";
const users = [];
const signup = async () => {
    const userDetails = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter your name:' },
        { type: 'input', name: 'email', message: 'Enter your email:' },
        { type: 'password', name: 'password', message: 'Enter your password:' },
    ]);
    users.push(userDetails);
    console.log('Signup successful!');
};
const login = async () => {
    const loginDetails = await inquirer.prompt([
        { type: 'input', name: 'email', message: 'Enter your email:' },
        { type: 'password', name: 'password', message: 'Enter your password:' },
    ]);
    const user = users.find(u => u.email === loginDetails.email && u.password === loginDetails.password);
    if (user) {
        console.log('Login successful!');
        return user;
    }
    else {
        console.log('Invalid credentials.');
        return null;
    }
};
const testPassages = [
    'The quick brown fox jumps over the lazy dog.',
    'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
    // By the way, we can add more passages here but this is enough to test the program! 
];
const getRandomPassage = () => {
    return testPassages[Math.floor(Math.random() * testPassages.length)];
};
const startTest = async () => {
    const passage = getRandomPassage();
    console.log('\nTyping Test:');
    console.log(passage);
    const start = new Date().getTime();
    const { typedText } = await inquirer.prompt([
        { type: 'input', name: 'typedText', message: 'Start typing:' },
    ]);
    const end = new Date().getTime();
    const timeTaken = (end - start) / 1000 / 60;
    const wordsTyped = typedText.split(' ').length;
    const wordsPerMinute = wordsTyped / timeTaken;
    console.log(`\nTest complete!`);
    console.log(`Your typing speed is ${wordsPerMinute.toFixed(2)} WPM.`);
};
const main = async () => {
    while (true) {
        console.log('Welcome to the Speed Typing Tester!');
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Signup', 'Login', 'Exit'],
            },
        ]);
        if (action === 'Signup') {
            await signup();
        }
        else if (action === 'Login') {
            const user = await login();
            if (user) {
                await startTest();
            }
        }
        else {
            console.log('Goodbye!');
        }
    }
    ;
};
main();
