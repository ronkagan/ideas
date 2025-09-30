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
        "You did it! You are making AI process stuff for you. Good job!"
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