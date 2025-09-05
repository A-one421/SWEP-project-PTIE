// DOM Elements
const userIdElement = document.getElementById("user-id");
const navLinks = document.querySelectorAll(".menu-item");
const contentSections = document.querySelectorAll(".content-section");
const pageHeading = document.getElementById("page-heading");
const pageSubheading = document.getElementById("page-subheading");
const uploadForm = document.getElementById("upload-results-form");
const messageForm = document.getElementById("message-admin-form");
const uploadStatus = document.getElementById("upload-status");
const messageStatus = document.getElementById("message-status");
const uploadedResultsList = document.getElementById("uploaded-results-list");
const messageList = document.getElementById("message-list");
const addCourseBtn = document.getElementById("add-course-btn");
const courseListContainer = document.getElementById("course-list-container");
const studentSearchInput = document.getElementById("student-search");
const studentList = document.getElementById("student-list");

// New Attendance DOM elements
const attendanceForm = document.getElementById("attendance-form");
const attendanceDateInput = document.getElementById("attendance-date");
const attendanceClassSelect = document.getElementById("attendance-class");
const studentAttendanceList = document.getElementById(
  "student-attendance-list"
);
const attendanceStatus = document.getElementById("attendance-status");
const recentAttendanceList = document.getElementById("recent-attendance-list");
const attendanceStatistics = document.getElementById("attendance-statistics");
const attendanceChartContainer = document.getElementById(
  "attendance-chart-container"
);
const chartTitle = document.getElementById("chart-title");

// New DOM elements for searchable dropdown
const studentDropdownInput = document.getElementById("student-dropdown-input");
const studentDropdownList = document.getElementById("student-dropdown-list");
const studentNameInput = document.getElementById("student-name");

// Global variable to hold the chart instance
let attendancePieChart;

// Dummy data to simulate a backend with attendance records
const dummyStudents = {
  JSS1A: [
    { name: "John Doe", id: "S1001", attendanceRecords: [] },
    { name: "Emily Clark", id: "S1002", attendanceRecords: [] },
    { name: "Michael Lee", id: "S1003", attendanceRecords: [] },
    { name: "Jessica Alba", id: "S1004", attendanceRecords: [] },
    { name: "Chris Evans", id: "S1005", attendanceRecords: [] },
  ],
  JSS2B: [
    { name: "Jane Smith", id: "S2001", attendanceRecords: [] },
    { name: "Peter Jones", id: "S2002", attendanceRecords: [] },
    { name: "Sarah Brown", id: "S2003", attendanceRecords: [] },
    { name: "Daniel Radcliffe", id: "S2004", attendanceRecords: [] },
    { name: "Emma Watson", id: "S2005", attendanceRecords: [] },
  ],
  SS1A: [
    { name: "Mary Williams", id: "S3001", attendanceRecords: [] },
    { name: "David Johnson", id: "S3002", attendanceRecords: [] },
    { name: "Laura Chen", id: "S3003", attendanceRecords: [] },
    { name: "Tom Holland", id: "S3004", attendanceRecords: [] },
    { name: "Zendaya", id: "S3005", attendanceRecords: [] },
  ],
  SS2C: [
    { name: "Alex Green", id: "S4001", attendanceRecords: [] },
    { name: "Olivia Rodrigo", id: "S4002", attendanceRecords: [] },
    { name: "Harry Styles", id: "S4003", attendanceRecords: [] },
    { name: "Taylor Swift", id: "S4004", attendanceRecords: [] },
    { name: "Justin Bieber", id: "S4005", attendanceRecords: [] },
  ],
};

// Show status message
const showStatusMessage = (element, message, type) => {
  element.textContent = message;
  element.className = `mt-4 text-center text-sm font-medium transition-colors duration-300 ${
    type === "success" ? "text-green-600" : "text-red-600"
  }`;
  setTimeout(() => {
    element.textContent = "";
  }, 3000);
};

// Set today's date automatically
const setTodayDate = () => {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  attendanceDateInput.value = today.toLocaleDateString("en-US", options);
};

// Navigation logic
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

  // Update page heading and subheading
  const title = targetLink.querySelector("span").textContent;
  pageHeading.textContent = title;
  if (sectionId === "dashboard") {
    pageSubheading.style.display = "block";
  } else {
    pageSubheading.style.display = "none";
  }
};

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    navigateTo(sectionId);
  });
});

// Student Search Functionality
window.filterStudents = function () {
  const searchTerm = studentSearchInput.value.toLowerCase();
  const studentItems = studentList.querySelectorAll(".list-item");
  studentItems.forEach((item) => {
    const studentName = item
      .querySelector(".student-name")
      .textContent.toLowerCase();
    if (studentName.includes(searchTerm)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
};

// This is for Course Field Functionality for Uploading Results Section
const addCourseField = () => {
  const courseEntry = document.createElement("div");
  courseEntry.className = "course-entry";
  courseEntry.innerHTML = `
        <div class="form-group">
          <label>Course</label>
          <input type="text" class="course-name" placeholder="e.g., Mathematics" required />
        </div>
        <div class="form-group">
          <label>Grade</label>
          <select class="course-grade" required>
            <option value="">Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
      `;
  courseListContainer.appendChild(courseEntry);
};

addCourseBtn.addEventListener("click", addCourseField);

// --- Attendance System Logic ---

const loadStudentsForAttendance = () => {
  const selectedClass = attendanceClassSelect.value;
  studentAttendanceList.innerHTML = "";
  attendanceStatistics.innerHTML =
    '<p class="loading-message">Select a class to view attendance statistics.</p>';
  attendanceChartContainer.style.display = "none";

  if (!selectedClass) {
    studentAttendanceList.innerHTML =
      '<p class="loading-message">Please select a class to load students.</p>';
    return;
  }

  const students = dummyStudents[selectedClass] || [];

  if (students.length === 0) {
    studentAttendanceList.innerHTML =
      '<p class="loading-message">No students found for this class.</p>';
    return;
  }

  const table = document.createElement("table");
  table.className = "attendance-table";
  table.innerHTML = `
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;
  const tbody = table.querySelector("tbody");

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${student.name}</td>
            <td>
              <div class="attendance-status">
                <label><input type="radio" name="status-${student.id}" value="Present" required> Present</label>
                <label><input type="radio" name="status-${student.id}" value="Absent"> Absent</label>
                <label><input type="radio" name="status-${student.id}" value="Late"> Late</label>
              </div>
            </td>
          `;
    tbody.appendChild(row);
  });
  studentAttendanceList.appendChild(table);

  displayAttendanceStatistics(selectedClass);
  renderAttendanceChart(selectedClass);
};

const displayAttendanceStatistics = (className) => {
  const students = dummyStudents[className];
  if (!students) {
    attendanceStatistics.innerHTML =
      '<p class="loading-message">No data available for this class.</p>';
    return;
  }

  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;

  students.forEach((student) => {
    student.attendanceRecords.forEach((record) => {
      if (record.status === "Present") totalPresent++;
      else if (record.status === "Absent") totalAbsent++;
      else if (record.status === "Late") totalLate++;
    });
  });

  const totalRecords = totalPresent + totalAbsent + totalLate;
  const totalStudents = students.length;

  attendanceStatistics.innerHTML = `
          <div class="stat-card">
            <h4>Total Students</h4>
            <p>${totalStudents}</p>
          </div>
          <div class="stat-card stat-present">
            <h4>Total Present</h4>
            <p>${totalPresent}</p>
          </div>
          <div class="stat-card stat-absent">
            <h4>Total Absent</h4>
            <p>${totalAbsent}</p>
          </div>
          <div class="stat-card stat-late">
            <h4>Total Late</h4>
            <p>${totalLate}</p>
          </div>
        `;
};

// Renders the attendance pie chart
const renderAttendanceChart = (className) => {
  const students = dummyStudents[className];
  if (!students) {
    attendanceChartContainer.style.display = "none";
    return;
  }

  attendanceChartContainer.style.display = "flex";
  chartTitle.textContent = `Overall Attendance for ${className}`;

  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;

  students.forEach((student) => {
    student.attendanceRecords.forEach((record) => {
      if (record.status === "Present") totalPresent++;
      else if (record.status === "Absent") totalAbsent++;
      else if (record.status === "Late") totalLate++;
    });
  });

  const ctx = document.getElementById("attendance-pie-chart").getContext("2d");

  // Destroy existing chart instance if it exists
  if (attendancePieChart) {
    attendancePieChart.destroy();
  }

  attendancePieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Present", "Absent", "Late"],
      datasets: [
        {
          data: [totalPresent, totalAbsent, totalLate],
          backgroundColor: ["#28a745", "#dc3545", "#ffc107"],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: false,
        },
      },
    },
  });
};

attendanceClassSelect.addEventListener("change", () => {
  loadStudentsForAttendance();
});

attendanceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const attendanceDate = attendanceDateInput.value;
  const attendanceClass = attendanceClassSelect.value;
  const students = dummyStudents[attendanceClass];

  if (!students) {
    showStatusMessage(
      attendanceStatus,
      "No students found for this class.",
      "error"
    );
    return;
  }

  students.forEach((student) => {
    const statusInput = document.querySelector(
      `input[name="status-${student.id}"]:checked`
    );
    if (statusInput) {
      const status = statusInput.value;
      const recordIndex = student.attendanceRecords.findIndex(
        (rec) => rec.date === attendanceDate
      );
      if (recordIndex > -1) {
        student.attendanceRecords[recordIndex].status = status;
      } else {
        student.attendanceRecords.push({
          date: attendanceDate,
          status,
        });
      }
    }
  });

  showStatusMessage(
    attendanceStatus,
    `Attendance recorded for ${attendanceClass} on ${attendanceDate}!`,
    "success"
  );
  displayAttendanceStatistics(attendanceClass);
  renderAttendanceChart(attendanceClass);
  displayRecentAttendance(attendanceClass);
});

const displayRecentAttendance = (className) => {
  const students = dummyStudents[className];
  recentAttendanceList.innerHTML = "";
  if (!students || students.length === 0) {
    recentAttendanceList.innerHTML =
      '<p class="loading-message">No recent records found.</p>';
    return;
  }

  const table = document.createElement("table");
  table.className = "attendance-table";
  table.innerHTML = `
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody></tbody>
        `;
  const tbody = table.querySelector("tbody");

  students.forEach((student) => {
    student.attendanceRecords.forEach((record) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${student.name}</td>
              <td>${record.date}</td>
              <td>
                <span class="status-indicator ${record.status.toLowerCase()}"></span>
                <span class="status-${record.status.toLowerCase()}">${
        record.status
      }</span>
              </td>
            `;
      tbody.appendChild(row);
    });
  });

  recentAttendanceList.appendChild(table);
};

// --- New logic for searchable student dropdown ---

// Function to populate the dropdown with all student names
const loadStudentDropdown = () => {
  // Clear any existing list items
  studentDropdownList.innerHTML = "";

  // Get a flattened array of all student objects from all classes
  const allStudents = Object.values(dummyStudents).flat();

  allStudents.forEach((student) => {
    const listItem = document.createElement("div");
    listItem.className = "custom-dropdown-list-item";
    listItem.textContent = student.name;
    listItem.setAttribute("data-id", student.id);
    listItem.addEventListener("click", () => {
      selectStudent(student.name);
    });
    studentDropdownList.appendChild(listItem);
  });
};

// Function to filter the dropdown list based on search input
const filterDropdown = (searchTerm) => {
  const items = studentDropdownList.querySelectorAll(
    ".custom-dropdown-list-item"
  );
  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
};

// Function to handle student selection from the dropdown
const selectStudent = (studentName) => {
  studentDropdownInput.value = studentName;
  studentNameInput.value = studentName; // Update the hidden input
  studentDropdownList.classList.remove("show");
};

// Event listeners for the searchable dropdown
studentDropdownInput.addEventListener("click", () => {
  // Toggle the visibility of the dropdown
  studentDropdownList.classList.toggle("show");
  // Allow text input for searching when clicked
  studentDropdownInput.readOnly = false;
  studentDropdownInput.focus();
  // Filter the list as soon as the input is focused, showing all options
  filterDropdown("");
});

studentDropdownInput.addEventListener("input", (e) => {
  filterDropdown(e.target.value);
});

// Close the dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".custom-dropdown") &&
    studentDropdownList.classList.contains("show")
  ) {
    studentDropdownList.classList.remove("show");
    // Reset the input to read-only when the dropdown is closed
    studentDropdownInput.readOnly = true;
  }
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  navigateTo("dashboard");
  setTodayDate();
  loadStudentsForAttendance();
  loadStudentDropdown(); // Load student names into the searchable dropdown
});
