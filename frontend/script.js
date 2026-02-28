const newsInput = document.getElementById("newsInput");
const charCount = document.getElementById("charCount");
const analyzeBtn = document.getElementById("analyzeBtn");
const progress = document.getElementById("progress");

const resultSection = document.getElementById("resultSection");
const resultText = document.getElementById("resultText");
const confidenceBar = document.getElementById("confidenceBar");
const confidenceScore = document.getElementById("confidenceScore");

const historyTable = document.getElementById("historyTable");
const toast = document.getElementById("toast");

const searchInput = document.getElementById("searchHistory");
const filterResult = document.getElementById("filterResult");

newsInput.addEventListener("input", () => {
    charCount.textContent = newsInput.value.length + " characters";
});

analyzeBtn.addEventListener("click", startAnalysis);

function startAnalysis() {
    if(newsInput.value.trim() === "") {
        showToast("Enter news text first");
        return;
    }

    simulateLoading();

    setTimeout(runFakeAI, 2000);
}

function simulateLoading() {
    let width = 0;
    progress.style.width = "0%";

    const interval = setInterval(() => {
        width += 5;
        progress.style.width = width + "%";
        if(width >= 100) clearInterval(interval);
    }, 80);
}

function runFakeAI() {
    const probability = Math.random();

    let result;
    let color;

    if(probability > 0.7) {
        result = "Fake";
        color = "#ff4d6d";
    }
    else if(probability > 0.5) {
        result = "Warning";
        color = "#ffd60a";
    }
    else {
        result = "Real";
        color = "#70e000";
    }

    displayResult(result, probability, color);
    saveHistory(newsInput.value, result, probability);
    loadHistory();
}

function displayResult(result, probability, color) {
    resultSection.classList.remove("hidden");

    resultText.textContent = "Result: " + result;
    confidenceScore.textContent =
        "Confidence Score: " + Math.round(probability * 100) + "%";

    confidenceBar.style.width = probability * 100 + "%";
    confidenceBar.style.background = color;

    showToast("AI Analysis Completed");
}

function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2500);
}

function saveHistory(news, result, probability) {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({
        news: news.substring(0,50) + "...",
        result: result,
        confidence: Math.round(probability*100) + "%",
        date: new Date().toLocaleString()
    });

    localStorage.setItem("history", JSON.stringify(history));
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    const search = searchInput.value.toLowerCase();
    const filter = filterResult.value;

    historyTable.innerHTML = "";

    history
    .filter(item => {
        return (filter === "all" || item.result === filter) &&
               item.news.toLowerCase().includes(search);
    })
    .forEach(item => {
        const row = `
        <tr>
        <td>${item.news}</td>
        <td>${item.result}</td>
        <td>${item.confidence}</td>
        <td>${item.date}</td>
        </tr>`;
        historyTable.innerHTML += row;
    });
}

searchInput.addEventListener("input", loadHistory);
filterResult.addEventListener("change", loadHistory);

loadHistory();