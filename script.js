document.addEventListener("DOMContentLoaded", function() {
    // 1. IP Copy Functionality
    const ipBox = document.getElementById("ipBox");
    const ipText = document.getElementById("ipText").innerText;
    const copyHint = document.querySelector(".copy-hint");

    ipBox.addEventListener("click", function() {
        navigator.clipboard.writeText(ipText).then(() => {
            copyHint.innerText = "COPIED TO CLIPBOARD!";
            copyHint.style.color = "#00ff88";
            ipBox.style.borderColor = "#00ff88";
            
            setTimeout(() => {
                copyHint.innerText = "Click to copy IP";
                copyHint.style.color = "#777";
                ipBox.style.borderColor = "#5a189a"; // Resets back to purple
            }, 2500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // 2. Live Player Counter API Fetch
    const serverIP = "play.fronterra.site"; // Ensure this is your actual join IP
    const playerCountElement = document.getElementById("playerCount");
    const statusDot = document.getElementById("statusDot");

    function fetchPlayerCount() {
        fetch(`https://api.mcsrvstat.us/2/${serverIP}`)
            .then(response => response.json())
            .then(data => {
                if (data.online) {
                    playerCountElement.innerText = `${data.players.online} / ${data.players.max} Players Online`;
                    statusDot.style.backgroundColor = "#00ff88"; // Green dot
                    statusDot.style.boxShadow = "0 0 10px #00ff88";
                } else {
                    playerCountElement.innerText = "Server is currently offline";
                    statusDot.style.backgroundColor = "#ff3333"; // Red dot
                    statusDot.style.boxShadow = "0 0 10px #ff3333";
                }
            })
            .catch(error => {
                console.error("Error fetching server data:", error);
                playerCountElement.innerText = "Unable to load server status";
            });
    }

    // Fetch immediately on load, then update every 60 seconds
    fetchPlayerCount();
    setInterval(fetchPlayerCount, 60000);
});
