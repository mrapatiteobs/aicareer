document.addEventListener("DOMContentLoaded", async function () {
    const selectedPassion = localStorage.getItem("selectedPassion");
    const selectedIndustry = localStorage.getItem("selectedIndustry");

    if (!selectedPassion || !selectedIndustry) {
        window.location.href = "index.html"; // Redirect if missing data
    }

    document.getElementById("career-heading").innerText = `Great choices! Now pick your career path!`;

    const careerContainer = document.getElementById("career-options");
    const confirmButton = document.getElementById("confirm-career");
    let selectedCareer = null;

    // Fetch AI-generated career options
    async function getCareerOptions(passion, industry) {
        const apiKey = "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"; // Replace with your actual API key
        const prompt = `Generate two career options for someone passionate about ${passion} in the ${industry} industry.`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 50
            })
        });

        const data = await response.json();
        return data.choices[0].message.content.split("\n").filter(opt => opt.trim() !== "");
    }

    // Call AI and populate options
    getCareerOptions(selectedPassion, selectedIndustry).then(careerOptions => {
        careerOptions.forEach(option => {
            const button = document.createElement("button");
            button.classList.add("option-button");
            button.innerText = option;

            button.addEventListener("click", () => {
                document.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
                button.classList.add("selected");
                selectedCareer = option;
                confirmButton.removeAttribute("disabled");
            });

            careerContainer.appendChild(button);
        });
    });

    confirmButton.addEventListener("click", () => {
        if (selectedCareer) {
            localStorage.setItem("selectedCareer", selectedCareer);
            window.location.href = "future-chat.html"; // Move to next page
        }
    });
});


document.addEventListener("DOMContentLoaded", async function () {
    const selectedPassion = localStorage.getItem("selectedPassion");
    const selectedIndustry = localStorage.getItem("selectedIndustry");
    
    if (!selectedPassion || !selectedIndustry) {
        window.location.href = "index.html"; // Redirect if selections are missing
    }

    document.getElementById("career-heading").innerText = `Great choices! Let's see some career options...`;

    // Call OpenAI API to generate career options
    async function generateCareers(passion, industry) {
        const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key
        const endpoint = "https://api.openai.com/v1/chat/completions";

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ 
                    role: "user", 
                    content: `Suggest 2 career options for someone passionate about ${passion} and interested in working in the ${industry} industry.` 
                }]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content.split("\n");
    }

    try {
        const careerOptions = await generateCareers(selectedPassion, selectedIndustry);
        
        document.getElementById("career-option-1").innerText = careerOptions[0];
        document.getElementById("career-option-2").innerText = careerOptions[1];

        let selectedCareer = null;
        const confirmButton = document.getElementById("confirm-career");

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
                window.location.href = "future-chat.html"; // Next step
            }
        });

    } catch (error) {
        console.error("Error fetching AI-generated careers:", error);
        alert("Failed to fetch career options. Please try again.");
    }
});
