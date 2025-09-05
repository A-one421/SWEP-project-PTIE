// Dom manipulation to get data from the html file kolo far rara

const userIdElement = document.getElementById("user-id");
const navLinks = document.querySelectorAll(".menu-item");
const contentSections = document.querySelectorAll(".content-section");
const pageHeading = document.getElementById("page-heading");
const pageSubheading = document.getElementById("page-subheading");
const dashboardGrid = document.getElementById("dashboard-grid");
const studentList = document.getElementById("children-list");
const composeMessageForm = document.getElementById("compose-message-form");
const messageStatus = document.getElementById("message-status");
const childSelect = document.getElementById("child-select");

// Mobile sidebar toggle support
const body = document.body;
const menuToggleBtn = document.getElementById("menu-toggle");
const sidebarOverlay = document.getElementById("sidebar-overlay");
if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", () => {
    body.classList.toggle("sidebar-open");
  });
}
if (sidebarOverlay) {
  sidebarOverlay.addEventListener("click", () => body.classList.remove("sidebar-open"));
}
window.addEventListener("resize", () => {
  if (window.innerWidth > 992) body.classList.remove("sidebar-open");
});

// New elements for results section
const childSelectResults = document.getElementById("child-select-results");
const termSelect = document.getElementById("term-select");
const sessionSelect = document.getElementById("session-select");
const resultDisplay = document.getElementById("result-display");
const downloadAllBtn = document.getElementById("download-all-btn");

// Elements for the new profile picture functionality
const parentProfilePic = document.getElementById("parent-profile-pic");
const profileSectionPic = document.getElementById("profile-section-pic");
const changePicBtn = document.getElementById("change-pic-btn");
const changePicBtnProfile = document.getElementById("change-pic-btn-profile");
const profilePicInput = document.getElementById("profile-pic-input");

// Dummy data which includes result, i guess database (David)go do the finishing
const parentData = {
  parentName: "Mr. & Mrs. Adebayo",
  children: [
    {
      id: "child-1",
      name: "Segun Adebayo",
      class: "JSS3B",
      teacher: "Mr. O. Williams",
      teacherImage: "https://placehold.co/100x100/4361ee/ffffff?text=OW",
      results: {
        "2024/2025": {
          first: [
            { subject: "Mathematics", score: 85 },
            { subject: "English Language", score: 78 },
            { subject: "Science", score: 92 },
            { subject: "Social Studies", score: 88 },
          ],
          second: [
            { subject: "Mathematics", score: 82 },
            { subject: "English Language", score: 80 },
            { subject: "Science", score: 95 },
            { subject: "Social Studies", score: 85 },
          ],
        },
        "2025/2026": {
          first: [
            { subject: "Mathematics", score: 90 },
            { subject: "English Language", score: 85 },
            { subject: "Science", score: 91 },
            { subject: "Social Studies", score: 87 },
          ],
        },
      },
    },
    {
      id: "child-2",
      name: "Nifemi Adebayo",
      class: "SSS1A",
      teacher: "Mr. Goodness Adebayo",
      teacherImage: "https://placehold.co/100x100/f72585/ffffff?text=TA",
      results: {
        "2024/2025": {
          first: [
            { subject: "Mathematics", score: 75 },
            { subject: "English Language", score: 85 },
            { subject: "Physics", score: 68 },
            { subject: "Chemistry", score: 72 },
          ],
          second: [
            { subject: "Mathematics", score: 80 },
            { subject: "English Language", score: 88 },
            { subject: "Physics", score: 75 },
            { subject: "Chemistry", score: 70 },
          ],
        },
        "2025/2026": {
          first: [
            { subject: "Mathematics", score: 78 },
            { subject: "English Language", score: 90 },
            { subject: "Physics", score: 80 },
            { subject: "Chemistry", score: 75 },
          ],
        },
      },
    },
  ],
};

// Show message status
const showStatusMessage = (element, message, type) => {
  element.textContent = message;
  element.className = `mt-4 text-center text-sm font-medium transition-colors duration-300 ${
    type === "success" ? "text-green-600" : "text-red-600"
  }`;
  setTimeout(() => {
    element.textContent = "";
  }, 3000);
};

const navigateTo = (sectionId) => {
  contentSections.forEach((section) => {
    section.classList.remove("active");
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  const targetSection = document.getElementById(sectionId);
  const targetLink = document.querySelector(
    `.menu-item[data-section="${sectionId}"]`
  );

  if (targetSection && targetLink) {
    targetSection.classList.add("active");
    targetLink.classList.add("active");
  }

  const title = targetLink.querySelector("span").textContent;
  pageHeading.textContent = title;
  if (sectionId === "dashboard") {
    pageSubheading.style.display = "block";
  } else {
    pageSubheading.style.display = "none";
  }

  if (sectionId === "logout") {
    // user log out
    console.log("User signed out.");
    window.location.reload();
  }
};

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    navigateTo(sectionId);
    body.classList.remove("sidebar-open");
  });
});

// Dummy data funtionality
const renderChildrenCards = (children) => {
  const childrenCardsContainer = document.createElement("div");
  childrenCardsContainer.className = "dashboard-grid";
  children.forEach((child) => {
    const card = document.createElement("div");
    card.className = "child-card";
    card.innerHTML = `
            <img class="child-avatar" src="https://placehold.co/80x80/e9ecef/495057?text=${
              child.name.split(" ")[0][0]
            }${child.name.split(" ")[1][0]}" alt="${child.name}" />
            <div class="child-details">
              <h3>${child.name}</h3>
              <p>Class: ${child.class}</p>
              <p>Assigned Teacher: <b>${child.teacher}</b></p>
            </div>
          `;
    dashboardGrid.appendChild(card);
  });
};

const renderChildrenList = (children) => {
  childrenList.innerHTML = "";
  children.forEach((child) => {
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
            <h3 class="font-bold text-lg">${child.name} <span class="text-sm font-normal text-gray-500">- Class ${child.class}</span></h3>
            <p>Teacher: ${child.teacher}</p>
          `;
    childrenList.appendChild(listItem);
  });
};

const populateChildDropdown = (children) => {
  childSelect.innerHTML =
    '<option value="" selected disabled>Select a child</option>';
  childSelectResults.innerHTML =
    '<option value="" selected disabled>Select a child</option>';
  children.forEach((child) => {
    const option = document.createElement("option");
    option.value = child.id;
    option.textContent = child.name;
    // for dropdwon of message
    childSelect.appendChild(option.cloneNode(true));
    childSelectResults.appendChild(option);
  });
};

// This function is to generate the result from the database available
const renderResult = (childId, term, session) => {
  const child = parentData.children.find((c) => c.id === childId);
  if (!child) {
    resultDisplay.innerHTML = `<p class="loading-message">Child not found.</p>`;
    return;
  }

  const results = child.results[session]?.[term];
  if (!results) {
    resultDisplay.innerHTML = `<p class="loading-message">No result found for this selection.</p>`;
    return;
  }

  let totalScore = 0;
  const tableRows = results
    .map((subject) => {
      totalScore += subject.score;
      return `
        <tr>
          <td>${subject.subject}</td>
          <td>${subject.score}</td>
        </tr>
      `;
    })
    .join("");

  const totalSubjects = results.length;
  const averageScore = (totalScore / totalSubjects).toFixed(2);

  resultDisplay.innerHTML = `
    <div class="result-header">
        <h4>${child.name}</h4>
        <p>Class: ${child.class} | Term: ${
    term.charAt(0).toUpperCase() + term.slice(1)
  } | Session: ${session}</p>
    </div>
    <table class="result-table">
        <thead>
            <tr>
                <th>Subject</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            ${tableRows}
        </tbody>
    </table>
    <div class="result-summary">
        <p>Total Score: ${totalScore}</p>
        <p>Average Score: ${averageScore}%</p>
    </div>
  `;
};

// Event listeners click
childSelectResults.addEventListener("change", () => {
  renderResult(childSelectResults.value, termSelect.value, sessionSelect.value);
});
termSelect.addEventListener("change", () => {
  renderResult(childSelectResults.value, termSelect.value, sessionSelect.value);
});
sessionSelect.addEventListener("change", () => {
  renderResult(childSelectResults.value, termSelect.value, sessionSelect.value);
});

// Download All Button
downloadAllBtn.addEventListener("click", () => {
  const childId = childSelectResults.value;
  const childName =
    childSelectResults.options[childSelectResults.selectedIndex].text;
  if (!childId) {
    alert("Please select a child to download results.");
    return;
  }
  const allResultsText = JSON.stringify(
    parentData.children.find((c) => c.id === childId).results,
    null,
    2
  );
  const filename = `${childName.replace(/\s/g, "_")}_results.pdf`;
  const blob = new Blob([allResultsText], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  alert(`Simulating download for all results of ${childName}.`);
});

// TThis will responsible for form submission handling
composeMessageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const childName = childSelect.value;
  const subject = document.getElementById("message-subject").value;
  const message = document.getElementById("parent-message").value;

  console.log("Simulating message send...");
  console.log({
    childName,
    subject,
    message,
  });

  showStatusMessage(messageStatus, "Message sent successfully!", "success");
  composeMessageForm.reset();
});

// Listen for a click on the "Change Profile Picture" buttons and trigger the hidden file input
changePicBtn.addEventListener("click", () => {
  profilePicInput.click();
});
changePicBtnProfile.addEventListener("click", () => {
  profilePicInput.click();
});

profilePicInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    // Create a temporary URL for the selected file
    const imageUrl = URL.createObjectURL(file);
    // Set the source of both profile pictures to the new image
    parentProfilePic.src = imageUrl;
    profileSectionPic.src = imageUrl;

    localStorage.setItem("profilePicUrl", imageUrl);
  }
});
// Bring up initial pic on load
window.onload = () => {
  // To check pictures on the device you are making use of
  const savedPicUrl = localStorage.getItem("profilePicUrl");
  if (savedPicUrl) {
    parentProfilePic.src = savedPicUrl;
    profileSectionPic.src = savedPicUrl;
  }

  renderChildrenCards(parentData.children);
  renderChildrenList(parentData.children);
  populateChildDropdown(parentData.children);
  navigateTo("dashboard");
};
