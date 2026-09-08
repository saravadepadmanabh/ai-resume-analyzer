const loading = document.getElementById("loading");
const resumeInput = document.getElementById("resume");
const analyzeButton = document.getElementById("analyzeButton");
const results = document.getElementById("results");

analyzeButton.addEventListener("click", async function () {
  // Check whether a file was selected
  if (resumeInput.files.length === 0) {
    alert("Please select a PDF resume first.");
    return;
  }

  const resumeFile = resumeInput.files[0];

  // Check whether the file is a PDF
 if (
    resumeFile.type !== "application/pdf" &&
    resumeFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
) {
    alert("Please select a PDF or DOCX file.");
    return;
}

  // Create form data
  const formData = new FormData();

  formData.append("file", resumeFile);

  // Show loading screen
  loading.style.display = "flex";

  try {
    // Send PDF to FastAPI
    const response = await fetch("https://ai-resume-analyzer-485q.onrender.com", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

console.log(result);


// Handle HTTP errors
if (!response.ok) {

    alert(result.detail || "Something went wrong.");

    return;
}


// Get AI analysis
const analysis = result.analysis;

    // Get results section
    const results = document.getElementById("results");

    // Display score
    document.getElementById("score").textContent = analysis.score + "/100";

    // Display profile summary
    document.getElementById("profileSummary").textContent =
      analysis.profile_summary;

    // Display strengths
    const strengthsList = document.getElementById("strengths");

    strengthsList.innerHTML = "";

    analysis.strengths.forEach(function (strength) {
      const li = document.createElement("li");

      li.textContent = strength;

      strengthsList.appendChild(li);
    });

    // Display areas for improvement
    const improvementsList = document.getElementById("improvements");

    improvementsList.innerHTML = "";

    analysis.areas_for_improvement.forEach(function (item) {
      const li = document.createElement("li");

      li.textContent = item;

      improvementsList.appendChild(li);
    });

    // Display missing skills or sections
    const missingList = document.getElementById("missing");

    missingList.innerHTML = "";

    analysis.missing_skills_or_sections.forEach(function (item) {
      const li = document.createElement("li");

      li.textContent = item;

      missingList.appendChild(li);
    });

    // Display suggestions
    const suggestionsList = document.getElementById("suggestions");

    suggestionsList.innerHTML = "";

    analysis.suggestions.forEach(function (item) {
      const li = document.createElement("li");

      li.textContent = item;

      suggestionsList.appendChild(li);
    });

    // Show results section
    results.style.display = "block";
  } catch (error) {
    console.error(error);

    alert("Could not connect to the backend.");
  } finally {
    // Always hide loading screen
    loading.style.display = "none";
  }
});
