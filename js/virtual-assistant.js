if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition. Please use Google Chrome or another supported browser.");
}

let assistantButton = document.querySelector(".chatbot-icon-container"); 
let btn2 = document.querySelector(".chatbot-icon-container"); 
let isListening = false; 
let isSpeaking = false;  
let debounceTimer;

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.continuous = false;
recognition.interimResults = false;

// Function to speak and control the assistant's state
function speak(text) {
    return new Promise((resolve) => {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.volume = 1;
        text_speak.lang = "en";

        if (isListening) recognition.stop();
        isSpeaking = true;

        text_speak.onend = () => {
            console.log("Finished speaking.");
            isSpeaking = false;
            resolve(); 
        };

        window.speechSynthesis.speak(text_speak);
    });
}

async function wishMe() {
    let day = new Date();
    let hrs = day.getHours();
    let greetingText;

    if (hrs >= 0 && hrs < 12) {
        greetingText = "Good Morning, How can I help you?";
    } else if (hrs >= 12 && hrs < 16) {
        greetingText = "Good Afternoon, How can I help you?";
    } else {
        greetingText = "Good Evening, How can I help you?";
    }

    await speak(greetingText); 
}

recognition.onresult = async (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.trim();
    console.log(`Heard: ${transcript}`);

    await takeCommand(transcript);

    if (isListening && !isSpeaking) {
        recognition.start();
    }
};

recognition.onend = () => {
    console.log("Recognition ended.");
    if (isListening && !isSpeaking) {
        debounceTimer = setTimeout(() => recognition.start(), 500);
    }
};

// Toggle listening on button click
assistantButton.addEventListener("click", toggleListening);

// Define the toggleListening function
function toggleListening() {
    isListening = !isListening;

    if (isListening) {
        wishMe().then(() => recognition.start());
    } else {
        recognition.stop();
    }
}

async function takeCommand(message) {
    const lowerCaseMessage = message.toLowerCase();
    console.log(`Heard: ${lowerCaseMessage}`);

    if (lowerCaseMessage.includes('hello')) {
        await speak("Hello, how can I help you?");
    } else if (lowerCaseMessage.includes('go to classes page') || lowerCaseMessage.includes('open classes page')) {
        pageSwitcher("classes.html");
    } else if (lowerCaseMessage.includes('go to contact page')) {
        pageSwitcher("contact.html");
    } else if (lowerCaseMessage.includes('go to home page') || lowerCaseMessage.includes('go to homepage')) {
        pageSwitcher("index.html");
    } else if (lowerCaseMessage.includes('go to courses page') || lowerCaseMessage.includes('open courses page')) {
        pageSwitcher("courses.html");
    } else if (lowerCaseMessage.includes('go to blog page') || lowerCaseMessage.includes('open blog page')) {
        pageSwitcher("Blog.html");
    } else if (lowerCaseMessage.includes('what is your name') || lowerCaseMessage.includes('tumhara name kya hai')) {
        await speak("My name is Edith. I am a virtual assistant on this page.");
    } else if (lowerCaseMessage.includes('who made you')) {
        await speak("I am made by SmartCoderRahis for assistance on his website.");
    } else if(lowerCaseMessage.includes("tell me about yourself")||(lowerCaseMessage.includes("introduce yourself"))){
        await speak("I am a Virtual Assistant develped by Smart Coder Rahis. I am still in developing phase. forgave me on my mistake!");
    } else if (lowerCaseMessage.includes('tumko kisne banaya hai')) {
        await speak("Mujhe Smart Coder Rahis dwaraa banaya gaya hai. Mai ek Virtual Assistant hoo!");
    } else if(lowerCaseMessage.includes("who is smart coder")){
        await speak("Smart Coder Rahis is my boss. He is very smart and he is the one who brought me in existance!");       
    } else if (lowerCaseMessage.includes('what can you do') || lowerCaseMessage.includes('tell me your capability')) {
        await speak("I can assist you through this page. I can do lots of things except the things which are in the developing phase.");
    } else if (lowerCaseMessage.includes('tum kya kar sakti ho')) {
        await speak("Mai iss website ko apke voice se control karne me madad kar sakti hoon!");
    } else if (lowerCaseMessage.includes('stop') || lowerCaseMessage.includes('goodbye') || lowerCaseMessage.includes('quit')) {
        await speak("I am gonna sleep now. Goodbye!");
        simulateClick(assistantButton);
        simulateCloseButtonClick();
    } else {
        await speak("I am sorry! I am currently in the developing phase. Sorry for the inconvenience.");
    }
}

function simulateClick(element) {
    const event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
    setTimeout(() => {
        element.dispatchEvent(event);
        console.log("Button clicked programmatically.");
    }, 500);
}

function simulateCloseButtonClick() {
    const closeButton = document.querySelector(".close-btn");
    if (closeButton) {
        const event = new MouseEvent('click', { view: window, bubbles: true, cancelable: true });
        closeButton.dispatchEvent(event);
        console.log("Close button clicked programmatically.");
    }
}

function pageSwitcher(pageUrl) {
    const currentPageUrl = window.location.href.split('/').pop();

    if (currentPageUrl === pageUrl) {
        speak("You are already on this page.").then(() => {
            if (isListening && !isSpeaking) recognition.start();
        });
    } else {
        const pageName = pageUrl.split('.html')[0];
        speak(`Opening ${pageName} page.`).then(() => {
            window.location.href = pageUrl;
        });
    }
}

btn2.addEventListener("touchstart", toggleListening); 
btn2.addEventListener("click", toggleListening);

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && isListening && !isSpeaking) {
        recognition.start();
    }
});
