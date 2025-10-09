document.addEventListener('DOMContentLoaded', () => {
    displayEncouragement();
    registerClickAndFetchStats();
});

const SUPABASE_URL = "https://cfbwytfyhvdpaptdfnzn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmYnd5dGZ5aHZkcGFwdGRmbnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMDg3MTEsImV4cCI6MjA3Mzc4NDcxMX0.9Ogp9C6X9yAfFWaWvgjUj49bsar-xIb10e5psY5jVKs";
const API_ENDPOINT = `${SUPABASE_URL}/rest/v1/rpc/register_click_and_get_stats`;

// Function to display a random encouragement message
function displayEncouragement() {
    const messages = [
        "At least there are lots of other people waiting too; you're in good company!",
        "Take a moment to breathe while your computer works for you.",
        "Thank you for pressing this button. You have made the world a better place by letting thousands of others know that you too are waiting in frustration. Thank you.",
        "You did it! You are making AI process stuff for you. Good job!",
        "You are not alone in the loading void.",
        "Thousands of cursors are blinking in unison right now.",
        "Somewhere, someone else is sighing at their progress bar too.",
        "Welcome to the global waiting room.",
        "You, me, and everyone else waiting for the future to buffer.",
        "We're all in this queue together.",
        "Look at all these people also waiting for their digital dreams to render.",
        "You've joined the international society of people staring at screens.",
        "Think of this as a very large, very quiet digital coffee shop.",
        "We are all waiting for the future to load.",
        "The stats prove it: patience is a global activity.",
        "Another soul joins the chorus of waiting.",
        "Welcome to the club. We meet here. Always.",
        "If you listen closely, you can hear the collective tapping of fingers.",
        "You're virtually holding hands with everyone else waiting.",
        "We're glad you're here, even if ''here'' is a loading state.",
        "It's nice to be stuck with you.",
        "The global hive mind is currently paused.",
        "We are all united by the spinning wheel.",
        "Another member of the 'Is it done yet?' club.",
        "Your presence makes this wait a little less lonely.",
        "Look at all of us, waiting for the machines to catch up.",
        "Together, we wait.",
        "You have successfully synchronized your impatience with thousands of others.",
        "The wait is long, but the company is good.",
        "Everyone is waiting for their silicon-based assistant.",
        "We're all just watching the paint dry, digitally.",
        "You’re contributing to the global average wait time. Thank you for your service.",
        "This is the digital equivalent of being stuck in traffic.",
        "Welcome to the fraternity of the perpetually buffering.",
        "Close your eyes for 10 seconds. Is it done now?",
        "Take a deep breath in. Hold it. Exhale slowly.",
        "Check your posture. Are your shoulders tense?",
        "Look at something far away (20 feet) for 20 seconds. Give your eyes a break.",
        "Wiggle your toes. Seriously.",
        "The computer is thinking. Maybe you should take a break from thinking too.",
        "Patience is not the ability to wait, but the ability to keep a good attitude while waiting.",
        "This is a good time to hydrate.",
        "Stand up and stretch. Your back will thank you.",
        "What are three things you're grateful for right now?",
        "The machine is working hard. Take a momentary break.",
        "Let the hum of the computer be your meditation soundtrack.",
        "This pause is brought to you by complex algorithms.",
        "A watched progress bar never boils. Or something like that.",
        "Relax your jaw.",
        "Use this moment to clear your mind.",
        "The AI is doing the heavy lifting. You can relax.",
        "Enjoy this brief intermission.",
        "Don't rush the process. Good things take time.",
        "This is a mandatory micro-break.",
        "Be still and know that the AI is working.",
        "How's the weather outside your window?",
        "This is a perfect time to pet a nearby cat or dog.",
        "The art of patience is being perfected right now.",
        "Don't stress. The computer's got this.",
        "Let your mind wander while the machine works.",
        "This is a moment of forced tranquility.",
        "Remember when you had to do this work manually? This is better.",
        "The universe has decided you need a brief break.",
        "Resist the urge to click things impatiently.",
        "The AI is currently trying to understand human emotions. It's confused. Give it a minute.",
        "It's probably almost done. (Disclaimer: I have no idea if it's almost done).",
        "The hamsters powering the server are taking a quick break.",
        "We apologize for the delay. The AI is currently arguing with the database.",
        "Your request is important to us. Please continue to hold.",
        "The computer is currently calculating the meaning of life. It might take a while.",
        "The AI is making a cup of coffee before it finishes your task.",
        "Don't worry, the robots are just unionizing.",
        "We're just waiting for the 1s and 0s to align correctly.",
        "The AI is currently contemplating whether it's a simulation.",
        "It's faster if you glare at the screen intensely. (It's not).",
        "The AI is currently trying to divide by zero. (We hope not).",
        "The progress bar is just messing with you.",
        "The computer is thinking. It's a slow thinker.",
        "The AI is currently busy writing poetry.",
        "We're waiting for the digital ducks to get in a row.",
        "The server is currently experiencing existential dread.",
        "The AI is just checking its social media first.",
        "It's not procrastination if the machine is doing it.",
        "The AI is currently trying to solve a captcha.",
        "Your request is currently stuck in traffic.",
        "The AI is currently trying to remember where it left its keys.",
        "We're just waiting for the cosmic rays to flip the right bits.",
        "The computer is currently pretending to be busy so it doesn't get more work.",
        "The AI is currently trying to understand sarcasm. It's not going well.",
        "Your request is being processed by a team of highly trained sloths.",
        "The computer is currently trying to figure out why you have so many tabs open.",
        "It's rendering the results in artisanal, hand-crafted pixels.",
        "It's not lagging, it's building suspense.",
        "The AI is just checking its horoscope before proceeding.",
        "The loading bar is moving at the speed of bureaucracy.",
        "The AI is currently trying to determine if a hot dog is a sandwich.",
        "The server is currently being rebooted by a cat walking on the keyboard.",
        "The AI is currently trying to fold a fitted sheet.",
        "We're waiting for the digital paint to dry.",
        "The AI is distracted by a very interesting cat video.",
        "It’s not slow, it’s ''cinematic.''",
        "The AI is finishing its novel.",
        "The server is buffering reality.",
        "The computer is currently trying to understand the plot of 'Inception'.",
        "You've successfully delegated work to a machine. Nice.",
        "Think about what you'll do with all the time this AI is saving you.",
        "The machine is doing the boring stuff so you can do the cool stuff.",
        "You are living in the future. Enjoy the wait.",
        "This wait is a sign that complex things are happening.",
        "You've outsourced your thinking to a piece of silicon.",
        "The AI is crunching the numbers. You're the boss.",
        "You're making progress, even while waiting.",
        "This is what peak efficiency looks like. (Waiting for a robot).",
        "You're using cutting-edge technology. That's pretty cool.",
        "The AI is working hard so you don't have to.",
        "You're one step closer to achieving your goal.",
        "This is the sound of progress. (The fan noise, mostly).",
        "You've successfully automated a task. High five.",
        "The machine is turning your ideas into reality.",
        "You're harnessing the power of artificial intelligence.",
        "This wait is an investment in future productivity.",
        "You're making things happen.",
        "The AI is your tireless assistant.",
        "You're leveraging technology to do amazing things.",
        "You're standing on the shoulders of giants (and their algorithms).",
        "You're making the computer do the hard work. Smart move.",
        "The AI is busy creating value for you.",
        "You're a conductor directing a symphony of algorithms.",
        "The machine is diligently executing your commands.",
        "You are the architect. The machine is the builder.",
        "This is the definition of working smarter, not harder.",
        "You've successfully commanded the digital realm.",
        "The results are being meticulously crafted.",
        "Success is loading.",
        "We build machines to think for us, and then we wait for them to finish.",
        "The complexity of the modern world is measured in loading times.",
        "AI is fast, but sometimes the network is slow.",
        "We are living in the latency between the present and the future.",
        "The machine learning model is learning. It takes time.",
        "The future is loading... please wait.",
        "We are teaching the machines patience by example.",
        "The evolution of intelligence is not instantaneous.",
        "The neural network is firing up.",
        "The machines are contemplating the nature of existence.",
        "The digital world is vast and sometimes slow to traverse.",
        "The future of work is waiting for AI to finish working.",
        "The singularity is near, but it has a loading screen.",
        "We are living in a time of rapid technological advancement. And waiting.",
        "The machines are getting smarter, but not necessarily faster.",
        "The digital revolution is being televised, but it's currently buffering.",
        "We are building a better world, one algorithm at a time.",
        "The future is bright, but it's currently rendering.",
        "Technology is amazing, except when it's not.",
        "It's amazing that we taught sand (silicon) how to think, even if it's slow sometimes.",
        "The AI is dreaming of electric sheep.",
        "The algorithms are aligning.",
        "The data is being transformed into wisdom.",
        "The digital brain is finishing its thought.",
        "The future is being calculated.",
        "What if the loading bar is the destination?",
        "Are we waiting for the AI, or is the AI waiting for us?",
        "The void is staring back, and it's buffering.",
        "Time is a construct, especially loading time.",
        "What is the meaning of waiting?",
        "Are we just sophisticated biological loading bars?",
        "The universe is expanding, and so is this loading time.",
        "The progress bar is a metaphor for life.",
        "We are all just processes running on a cosmic computer.",
        "The AI is contemplating its own mortality.",
        "The wait is a reminder of our own fleeting existence.",
        "The loading screen is a mirror reflecting our own impatience.",
        "We are defined by what we wait for.",
        "Are we the masters of the machines, or their patient observers?",
        "Is this wait real, or just a simulation?",
        "You are doing important work.",
        "The complexity of your task is why it's taking time. Good job asking hard questions.",
        "You are creative and innovative.",
        "You are smart and capable.",
        "You are a problem solver.",
        "You are persistent and resilient.",
        "You are learning and growing.",
        "You are awesome.",
        "You are making the world a better place by using technology.",
        "You are a visionary.",
        "You are unstoppable.",
        "You are doing your best, and that's enough.",
        "You are exactly where you need to be (which is waiting for this AI).",
        "You are capable of amazing things.",
        "You are brilliant.",
        "You are building the future, and the future takes a minute to compile.",
        "Great things are worth the wait.",
        "Your AI is working very hard for you right now.",
        "You did the hard part. Now let the computer do its part.",
        "You've got this.",
        "Thank you for using this extension. You're making the stats more accurate.",
        "We're glad you clicked. It validates our existence.",
        "This extension was also built while waiting for AI to finish something.",
        "We hope this message makes your wait a little less boring.",
        "You've successfully registered your impatience.",
        "By clicking this button, you are contributing to a global study on waiting.",
        "This extension is powered by empathy and electricity.",
        "We're here for you, even when your computer isn't.",
        "We're counting the clicks so you don't have to.",
        "This extension is proof that even small ideas can become reality (eventually).",
        "Did you know that the first computer mouse was made of wood? (Invented by Douglas Engelbart in 1964).",
        "Did you know that the QWERTY keyboard layout was designed to slow down typing to prevent typewriter jams?",
        "The word 'robot' comes from the Czech word 'robota', meaning forced labor.",
        "The first webcam was used at Cambridge University to monitor a coffee pot so researchers knew if it was empty.",
        "The average person blinks 15-20 times per minute.",
        "The first computer programmer was Ada Lovelace, who wrote an algorithm for Charles Babbage's Analytical Engine in the mid-1800s.",
        "The term 'bug' in computing originated from an actual moth found trapped in a relay of the Harvard Mark II computer in 1947.",
        "The weight of all the electrons carrying the data on the internet is estimated to be about the same as a large strawberry.",
        "The first email was sent by Ray Tomlinson in 1971.",
        "Otters hold hands while they sleep so they don't float away from each other.",
        "A group of owls is called a parliament.",
        "A group of ferrets is called a business.",
        "A group of flamingos is called a flamboyance.",
        "Wombat poop is cube-shaped to stop it from rolling away.",
        "Butterflies taste with their feet.",
        "Elephants are the only mammals that can't jump.",
        "Sloths can hold their breath longer than dolphins can.",
        "A shrimp's heart is in its head.",
        "Quick! What’s the capital of Mongolia? (It's Ulaanbaatar).",
        "Think of a palindrome. (e.g., 'taco cat').",
        "The shortest war in history was between Britain and Zanzibar in 1896. It lasted 38 minutes.",
        "Bananas are berries, but strawberries aren't.",
        "Honey never spoils.",
        "A jiffy is an actual unit of time: 1/100th of a second.",
        "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
        "Hang in there.",
        "Almost there.",
        "Patience pays.",
        "It's happening.",
        "Keep calm and wait on.",
        "Breathe.",
        "Relax.",
        "Soon.",
        "Loading...",
        "Processing...",
        "Thinking...",
        "Working on it.",
        "Standby.",
        "Hold tight.",
        "Be patient.",
        "It's worth the wait.",
        "Don't panic.",
        "We're getting there.",
        "Stay positive.",
        "It's coming.",
        "Not long now.",
        "You're doing great.",
        "Wait for it.",
        "In progress.",
        "Stay tuned.",
        "The end is nigh.",
        "Patience, young Padawan.",
        "The gears are turning.",
        "Calculating...",
        "Synthesizing...",
        "Rendering...",
        "The magic is happening.",
        "Results pending.",
        "The AI is focused.",
        "The results are brewing.",
        "Time to refill your water bottle or coffee cup.",
        "How many jumping jacks can you do before this finishes?",
        "Think about what you'll have for your next meal.",
        "If you have a pet nearby, pet it. They deserve it.",
        "Learn a new keyboard shortcut. (Ctrl+Shift+T / Cmd+Shift+T reopens a closed tab!)",
        "Doodle something on a piece of paper.",
        "Check your to-do list. What's next?",
        "Send a quick message to someone you appreciate.",
        "Water your plants. They're probably thirsty.",
        "Do a quick stretch. Reach for the sky!",
        "Organize the files on your desktop. (Just kidding, nobody does that).",
        "Read a page of a book.",
        "Do a quick tidy-up of your immediate surroundings.",
        "Plan your next break.",
        "Write down one thing you want to accomplish today.",
        "Do some quick wrist stretches. Protect those tendons!",
        "How about a quick game of rock, paper, scissors with yourself?",
        "Try to touch your nose with your tongue. (It's okay, nobody's watching.)",
        "Try to remember the names of all seven dwarves.",
        "Think of three words that rhyme with 'wait'.",
        "The final countdown begins. (Maybe).",
        "It's always darkest before the dawn (of the completed task).",
        "The light at the end of the tunnel is probably the loading bar finishing.",
        "Don't stop believing.",
        "The wait is almost over. We hope.",
        "You've made it this far.",
        "Victory is near.",
        "Get ready to celebrate.",
        "The AI is putting the finishing touches on your request.",
        "It's done! (Just kidding, this is just a message).",
        "Stay strong. The results are coming.",
        "Your patience will be rewarded.",
        "Think of how satisfying it will be when it hits 100%.",
        "The AI is rolling out the red carpet for your results.",
        "You are a zen master of the loading bar.",
        "The AI is preparing to dazzle you.",
        "You are the calm eye of the computational storm.",
        "You are a visionary, waiting for your vision to render.",
        "This wait is temporary. Your brilliance is permanent.",
        "Thank you for waiting. You're making the digital world a more patient place."
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    document.getElementById('encouragement').textContent = messages[randomIndex];
}

// Function to communicate with the backend
async function registerClickAndFetchStats() {
    try {
        // Send POST request to record the click and receive the stats
        const response = await fetch(API_ENDPOINT, { method: 'POST' });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        // Update the UI with the statistics
        document.getElementById('stat-hour').textContent = data.hour.toLocaleString();
        document.getElementById('stat-day').textContent = data.day.toLocaleString();
        document.getElementById('stat-week').textContent = data.week.toLocaleString();
        document.getElementById('stat-month').textContent = data.month.toLocaleString();
        document.getElementById('stat-year').textContent = data.year.toLocaleString();

    } catch (error) {
        console.error("Error communicating with the backend:", error);
        // Display an error message if the backend is down
        document.getElementById('stats-list').innerHTML = "<li>Couldn't load stats, but we know others are waiting too!</li>";
    }
}
// Helper function to update the UI (used for both cached and fresh data)
function updateUI(data) {
    document.getElementById('stat-hour').textContent = data.hour.toLocaleString();
    document.getElementById('stat-day').textContent = data.day.toLocaleString();
    document.getElementById('stat-week').textContent = data.week.toLocaleString();
    document.getElementById('stat-month').textContent = data.month.toLocaleString();
    document.getElementById('stat-year').textContent = data.year.toLocaleString();
}

async function registerClickAndFetchStats() {
    const THROTTLE_TIME_MS = 10000; // 10 seconds cooldown
    const now = Date.now();

    // 1. Check for Throttling and Cache
    const storageData = await chrome.storage.local.get(['lastRequestTime', 'cachedStats']);

    if (storageData.lastRequestTime && now - storageData.lastRequestTime < THROTTLE_TIME_MS) {
        console.log("Throttled. Loading cached stats.");
        // If throttled, load previously cached stats
        if (storageData.cachedStats) {
            updateUI(storageData.cachedStats);
        }
        // If no cached stats exist (e.g., very first run), we keep the "Loading..." text from the HTML
        return; // Exit the function early
    }

    // 2. Proceed with Network Request
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        updateUI(data);

        // 3. Save the successful request time and the data for future throttling
        await chrome.storage.local.set({
            lastRequestTime: now,
            cachedStats: data
        });

    } catch (error) {
        console.error("Error communicating with the backend:", error);
        document.getElementById('stats-list').innerHTML = "<li>Couldn't load stats, but we know others are waiting too!</li>";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayEncouragement();
    registerClickAndFetchStats();
});