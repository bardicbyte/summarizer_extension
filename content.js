//This will handle text extraction and communication with the background script.
// This code does the following:
// Listens for messages from the background script. When it receives a message with the action summarize, it extracts the highlighted text from the message.
// Logs the selected text to the console (this is for testing purposes and will be replaced with the actual integration with the OpenAI API to get the summary).
// Displays a placeholder alert with a message indicating where the summary will be displayed. This will be replaced with the actual implementation to display the summary in a popup textbox.

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "summarize") {
        // The background script has sent a message to summarize the text
        const selectedText = request.text; // The highlighted text

        if (selectedText) {
            // TODO: Integrate with OpenAI API to get the summary
            // For now, let's just log the selected text
            console.log("Selected text to summarize:", selectedText);

            // Display the summary (this will be replaced with the actual summary later)
            alert("Summary will be displayed here.");
        }
    }
});


// Function to call OpenAI API and get the summary
function getSummary(text) {
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
    const data = {
        prompt: text,
        max_tokens: 100, // Adjust based on desired summary length
        temperature: 0.7
    };

    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const summary = data.choices[0].text.trim();
        // Display the summary (replace the alert with a proper UI in the next steps)
        alert(summary);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "summarize") {
        const selectedText = request.text;
        if (selectedText) {
            getSummary(selectedText);
        }
    }
});
