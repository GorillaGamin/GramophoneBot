// index.js
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Define responses based on user input
const responses = {
    'greeting': 'Hi there! How can I assist you today?',
    'how are you': 'I’m just a program, but I’m doing well. How about you?',
    'bye': 'Goodbye! Have a great day!',
    '?discord': 'Here is the link to our Discord server: https://discord.gg/QE67rNwY',
    '?verify': 'Please type either "Roblox" or "Minecraft" to proceed with verification.',
};

// Define a list of greetings
const greetings = ['hello', 'hi', 'hey', 'greetings', 'howdy'];

// State to manage the verification process
let verificationState = null;

// Function to handle user input
function handleUserInput(input) {
    const lowerCaseInput = input.toLowerCase().trim();

    if (verificationState === 'waitingForRoblox') {
        console.log('GramophoneBot: Roblox username accepted. You can join us on Discord here: https://discord.gg/QE67rNwY');
        verificationState = null; // Reset state after confirming username
        startChat(); // Continue the conversation
        return;
    } else if (verificationState === 'waitingForMinecraft') {
        console.log('GramophoneBot: Minecraft username accepted. You can join us on Discord here: https://discord.gg/QE67rNwY');
        verificationState = null; // Reset state after confirming username
        startChat(); // Continue the conversation
        return;
    } else if (greetings.includes(lowerCaseInput)) {
        return 'Hi there! How can I assist you today?';
    } else if (responses[lowerCaseInput]) {
        if (lowerCaseInput === '?verify') {
            verificationState = 'waitingForPlatform';
            return responses['?verify'];
        }
        return responses[lowerCaseInput];
    } else if (lowerCaseInput === 'roblox') {
        verificationState = 'waitingForRoblox';
        return 'You chose Roblox. Please enter your Roblox username:';
    } else if (lowerCaseInput === 'minecraft') {
        verificationState = 'waitingForMinecraft';
        return 'You chose Minecraft. Please enter your Minecraft username:';
    } else {
        return 'Sorry, I don’t understand that.';
    }
}

// Start the chatbot
function startChat() {
    rl.question('You: ', (input) => {
        const response = handleUserInput(input);
        console.log(`GramophoneBot: ${response}`);
        if (input.toLowerCase().trim() !== 'bye' && verificationState === null) {
            startChat(); // Continue the conversation
        } else if (verificationState) {
            // Continue the conversation if waiting for username input
            startChat();
        } else {
            rl.close(); // End the conversation
        }
    });
}

console.log('GramophoneBot is running. Type "bye" to exit.');
startChat();
