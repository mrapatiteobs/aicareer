document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.getAttribute("data-page");

    if (page === "index") {
        setupIndexPage();
    } else if (page === "passion") {
        setupPassionPage();
    } else if (page === "industry") {
        setupIndustryPage();
    } else if (page === "career") {
        setupCareerPage();
    }
});

/* 🎯 Step 1: Index Page - Get User Name & Move to Passion Page */
function setupIndexPage() {
    document.getElementById("start-button").addEventListener("click", function () {
        let userName = document.getElementById("userName").value.trim();

        if (userName === "") {
            alert("Please enter your name!");
            return;
        }

        localStorage.setItem("userName", userName);
        window.location.href = "passion.html";
    });
}

/* 🎯 Step 2: Passion Page - Select Passion & Move to Industry Page */
function setupPassionPage() {
    const userName = localStorage.getItem("userName") || "there";
    document.getElementById("passion-heading").innerText = `${userName}, what is your #1 passion?`;

    const passions = [
        "Technology", "Medicine", "Business", "Art & Design", "Psychology",
        "Environment", "Education", "Engineering", "Finance", "Music",
        "Social Work", "Marketing", "Writing", "Sports", "Public Relations",
        "Science", "Politics", "Gaming", "Space/Astronomy", "Entrepreneurship",
        "History", "Travel", "Photography", "Law", "Automotive", "Fashion",
        "AI & Robotics", "Architecture", "Cybersecurity", "Film & Media",
        "Philosophy", "Interior Design", "Culinary Arts", "Sociology",
        "Fitness & Nutrition", "Human Rights", "Journalism", "Theology",
        "Marine Biology", "Agriculture", "Animal Care", "Luxury Goods",
        "Cultural Studies", "Military Strategy", "Meditation & Mindfulness",
        "Psychology of Habits", "Renewable Energy", "Sustainable Living",
        "Blockchain & Cryptocurrency", "ESports", "VR/AR Development",
        "Genetic Engineering", "Astrobiology", "Virtual Economies",
        "Metaverse Development", "Futurism", "Urban Planning", "Biochemistry",
        "Wilderness Survival"
    ];

    populateOptions("passion-options", passions, "passion-confirm");

    document.getElementById("passion-confirm").addEventListener("click", function () {
        const selectedPassion = document.querySelector(".option-button.selected");
        if (selectedPassion) {
            localStorage.setItem("selectedPassion", selectedPassion.innerText);
            window.location.href = "industry.html";
        } else {
            alert("Please select your passion before continuing!");
        }
    });
}

/* 🎯 Step 3: Industry Page - Select Industry & Move to Career Page */
function setupIndustryPage() {
    const userName = localStorage.getItem("userName") || "there";
    document.getElementById("industry-heading").innerText = `${userName}, now choose the industry you’d like to work in!`;

    const industries = [
        "Healthcare", "Technology", "Finance", "Education", "Law", "Marketing",
        "Engineering", "Government", "Nonprofit", "Environment & Sustainability",
        "Cybersecurity", "Retail & E-commerce", "Entertainment", "Automotive",
        "Aerospace", "Art & Design", "Consulting", "Social services", "Gaming",
        "Hospitality & Tourism", "Media & Journalism", "Architecture", "Real Estate",
        "Sports & Fitness", "Fashion", "Military & Defense", "Supply Chain & Logistics",
        "AI & Robotics", "Data Science", "Biotechnology", "Renewable Energy",
        "Agriculture", "Food Science", "Space Exploration", "Blockchain & Cryptocurrency",
        "Pharmaceuticals", "Biotech", "Virtual Reality (VR)", "Augmented Reality (AR)",
        "Metaverse Development", "Animation & VFX", "Human Resources",
        "Cultural Heritage Preservation", "AI Ethics & Governance", "Home Automation",
        "Personal Development & Coaching", "Journalism & Investigative Reporting",
        "Mental Health & Wellness", "Ethical Hacking", "Personal Finance & Wealth Management",
        "Fine Arts & Sculpture", "Quantum Computing", "Renewable Infrastructure",
        "Smart Cities", "Legal Tech", "Autonomous Vehicles", "Nanotechnology",
        "Sustainable Architecture", "Political Analysis", "Humanitarian Aid",
        "Wildlife Conservation", "Experimental Science"
    ];

    populateOptions("industry-options", industries, "confirm-industry");

    document.getElementById("confirm-industry").addEventListener("click", function () {
        const selectedIndustry = document.querySelector(".option-button.selected");
        if (selectedIndustry) {
            localStorage.setItem("selectedIndustry", selectedIndustry.innerText);
            window.location.href = "career.html";
        } else {
            alert("Please select an industry before continuing!");
        }
    });
}

/* 🎯 Step 4: Career Page - Select Career Option */
function setupCareerPage() {
    const selectedPassion = localStorage.getItem("selectedPassion");
    const selectedIndustry = localStorage.getItem("selectedIndustry");

    if (!selectedPassion || !selectedIndustry) {
        alert("Missing selections! Redirecting back to the start.");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("career-heading").innerText = `Great choices! Now pick your career path!`;

    const careerOption1 = `${selectedPassion} Specialist in ${selectedIndustry}`;
    const careerOption2 = `${selectedIndustry} Consultant with expertise in ${selectedPassion}`;

    document.getElementById("career-option-1").innerText = careerOption1;
    document.getElementById("career-option-2").innerText = careerOption2;

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
            window.location.href = "future-chat.html"; // Move to final chat experience
        }
    });
}

/* 🎯 Utility: Generate Option Buttons */
function populateOptions(containerId, options, confirmButtonId) {
    const container = document.getElementById(containerId);
    const confirmButton = document.getElementById(confirmButtonId);

    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option-button");
        button.innerText = option;

        button.addEventListener("click", () => {
            document.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            confirmButton.removeAttribute("disabled");
        });

        container.appendChild(button);
    });
}


document.addEventListener("DOMContentLoaded", async function () {
    const selectedPassion = localStorage.getItem("selectedPassion");
    const selectedIndustry = localStorage.getItem("selectedIndustry");

    if (!selectedPassion || !selectedIndustry) {
        window.location.href = "index.html"; // Redirect if selections are missing
        return;
    }

    document.getElementById("career-heading").innerText = `Great choices! Here are your career options:`;

    // OpenAI API request to generate career options
    async function generateCareerOptions(passion, industry) {
        const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API key
        const endpoint = "https://api.openai.com/v1/completions";

        const prompt = `Suggest two career options based on passion: ${passion} and industry: ${industry}. 
        Format: 1. [Career Option 1] 2. [Career Option 2]`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                prompt: prompt,
                max_tokens: 50
            })
        });

        const data = await response.json();
        return data.choices[0].text.trim().split("\n"); // Extracting career options
    }

    try {
        const careerOptions = await generateCareerOptions(selectedPassion, selectedIndustry);

        if (careerOptions.length >= 2) {
            document.getElementById("career-option-1").innerText = careerOptions[0];
            document.getElementById("career-option-2").innerText = careerOptions[1];

            document.getElementById("career-option-1").removeAttribute("disabled");
            document.getElementById("career-option-2").removeAttribute("disabled");
        }
    } catch (error) {
        console.error("Error generating career options:", error);
        document.getElementById("career-heading").innerText = "Error loading career options.";
    }

    // Career selection logic
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
            window.location.href = "future-chat.html";
        }
    });
});
