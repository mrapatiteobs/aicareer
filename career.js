document.addEventListener("DOMContentLoaded", async function () {
    const selectedPassion = localStorage.getItem("selectedPassion");
    const selectedIndustry = localStorage.getItem("selectedIndustry");

    if (!selectedPassion || !selectedIndustry) {
        window.location.href = "index.html"; // Redirect if selections are missing
        return;
    }

    document.getElementById("career-heading").innerText = `Great choices! Now pick your AI-generated career path!`;

    const careerOption1Btn = document.getElementById("career-option-1");
    const careerOption2Btn = document.getElementById("career-option-2");
    const confirmButton = document.getElementById("confirm-career");

    try {
        const careers = await fetchCareerOptions(selectedPassion, selectedIndustry);
        careerOption1Btn.innerText = careers[0];
        careerOption2Btn.innerText = careers[1];
    } catch (error) {
        careerOption1Btn.innerText = "Career Option 1 Unavailable";
        careerOption2Btn.innerText = "Career Option 2 Unavailable";
    }

    let selectedCareer = null;
    document.querySelectorAll(".option-button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedCareer = button.innerText;
            confirmButton.removeAttribute("disabled");
        });
    });

    confirmButton.addEventListener("click", () => {
        if (selectedCareer) {
            localStorage.setItem("selectedCareer", selectedCareer);
            window.location.href = "future-chat.html";
        }
    });
});

async function fetchCareerOptions(passion, industry) {
    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your API key
    const prompt = `Suggest two career options based on the user's passion for ${passion} and interest in ${industry}. Provide short and realistic career titles.`;
    
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4", 
            prompt: prompt,
            max_tokens: 50,
            n: 2,
            stop: "\n"
        })
    });

    const data = await response.json();
    return data.choices.map(choice => choice.text.trim());
}
