document.addEventListener("DOMContentLoaded", () => {
  const teachersLink = document.getElementById("teachers-link");
  const studentsLink = document.getElementById("students-link");
  const parentsLink = document.getElementById("parents-link");
  const classesLink = document.getElementById("classes-link");
  const dashboardLink = document.getElementById("dashboard-link");
  const mainContentArea = document.getElementById("main-content-area");

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

  // This section is for Teachers name and data
  const teachersData = [
    {
      full_name: "Mrs. Akingbade Eniola",
      email: "akingbadeeniola12@gmail.com",
      phone: "+234 801 234 5678",
      subject: "Mathematics",
    },
    {
      full_name: "Mr. Ayomide Godwin",
      email: "ayomidegodwin@gmail.com",
      phone: "+234 802 345 6789",
      subject: "English Language",
    },
    {
      full_name: "Mr. Dayo kogberegbe",
      email: "tunde.o@school.ng",
      phone: "+234 803 456 7890",
      subject: "Physics",
    },
    {
      full_name: "Miss Nifemi Kopoke",
      email: "nifemikopoke21@gmail.com",
      phone: "+234 804 567 8901",
      subject: "Biology",
    },
    {
      full_name: "Mr. Adedayo leader",
      email: "adebayoleader@gmail.com",
      phone: "+234 805 678 9012",
      subject: "Chemistry",
    },
    {
      full_name: "Mrs. Eke Adaugo",
      email: "adaugo@gmail.com",
      phone: "+234 806 789 0123",
      subject: "Literature",
    },
    {
      full_name: "Mr. Adebayo Kunle",
      email: "kunleadebayo@gmail.com",
      phone: "+234 807 890 1234",
      subject: "Geography",
    },
    {
      full_name: "Mrs. Taiwo Bola",
      email: "bolataiwo@gmail.com",
      phone: "+234 808 901 2345",
      subject: "History",
    },
    {
      full_name: "Mr. Nnamdi Ifeanyi",
      email: "ifeanyinmandi21@gmail.com",
      phone: "+234 809 012 3456",
      subject: "Economics",
    },
    {
      full_name: "Miss Grace Sunday",
      email: "gracesunday@gmail.com",
      phone: "+234 810 123 4567",
      subject: "Yoruba",
    },
    {
      full_name: "Mrs. Chioma Obi",
      email: "chiomaoba@gmail.com",
      phone: "+234 811 234 5678",
      subject: "Igbo",
    },
    {
      full_name: "Mr. Akingbade Mary",
      email: "akingbade911@gmail.com",
      phone: "+234 812 345 6789",
      subject: "Igbo",
    },
  ];

  // 20 Student names
  const studentsData = [
    { name: "John Doe", parent: "Mr. David Doe", class: "SS1" },
    { name: "Jane Smith", parent: "Mrs. Mary Smith", class: "JSS2" },
    { name: "Peter Jones", parent: "Mr. Paul Jones", class: "SS3" },
    { name: "Blessing Adebayo", parent: "Mrs. Sarah Adebayo", class: "JSS1" },
    { name: "Chinedu Okafor", parent: "Mr. Emeka Okafor", class: "SS2" },
    { name: "Fatima Bello", parent: "Mrs. Aisha Bello", class: "JSS3" },
    { name: "Ahmed Musa", parent: "Mr. Adamu Musa", class: "SS1" },
    { name: "Grace Chukwu", parent: "Mrs. Adaeze Chukwu", class: "JSS2" },
    { name: "Tunde Olatunji", parent: "Mr. Femi Olatunji", class: "SS3" },
    { name: "Cynthia Eze", parent: "Mrs. Juliet Eze", class: "JSS1" },
    { name: "David Johnson", parent: "Mr. Michael Johnson", class: "SS2" },
    { name: "Sarah Williams", parent: "Mrs. Nancy Williams", class: "JSS3" },
    { name: "Femi Adesina", parent: "Mr. Bola Adesina", class: "SS1" },
    { name: "Ngozi Ibe", parent: "Mrs. Clara Ibe", class: "JSS2" },
    { name: "Ibrahim Lawal", parent: "Mr. Sani Lawal", class: "SS3" },
    { name: "Kemi Ojo", parent: "Mrs. Helen Ojo", class: "JSS1" },
    { name: "Emeka Obi", parent: "Mr. Frank Obi", class: "SS2" },
    { name: "Peace Joseph", parent: "Mrs. Rita Joseph", class: "JSS3" },
    { name: "Daniel Eke", parent: "Mr. Samuel Eke", class: "SS1" },
    { name: "Funke Alabi", parent: "Mrs. Bimpe Alabi", class: "JSS2" },
  ];

  // List of Parent Names (20 names)
  const parentsData = studentsData.map((student) => ({
    name: student.parent,
    child: student.name,
    class: student.class,
  }));

  const subjectsData = [
    { name: "Mathematics", assigned: 2, classes: ["JSS1", "SS3"] },
    {
      name: "English Language",
      assigned: 3,
      classes: ["JSS2", "SS1", "SS2"],
    },
    { name: "Physics", assigned: 1, classes: ["SS1", "SS2", "SS3"] },
    { name: "Biology", assigned: 2, classes: ["SS1", "SS2"] },
    { name: "Chemistry", assigned: 1, classes: ["SS2", "SS3"] },
    { name: "Literature", assigned: 1, classes: ["JSS3", "SS1"] },
    { name: "Geography", assigned: 1, classes: ["SS1", "SS2", "SS3"] },
    { name: "History", assigned: 1, classes: ["JSS1", "JSS2", "JSS3"] },
    { name: "Economics", assigned: 1, classes: ["SS2", "SS3"] },
  ];

  // Remove class
  const setActiveLink = (element) => {
    document.querySelectorAll(".menu-item").forEach((item) => {
      item.classList.remove("active");
    });
    element.classList.add("active");
  };

  // The student list
  const renderStudentsList = () => {
    mainContentArea.innerHTML = `
      <h2 class="list-title">Student Directory</h2>
      <div class="search-container">
          <input type="text" id="studentSearch" placeholder="Search students..." />
          <i class="fas fa-search search-icon"></i>
      </div>
      <table class="data-table">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Parent</th>
                  <th>Class</th>
              </tr>
          </thead>
          <tbody id="students-table-body">
          </tbody>
      </table>
      `;

    const tableBody = document.getElementById("students-table-body");
    studentsData.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.parent}</td>
          <td>${student.class}</td>
      `;
      tableBody.appendChild(row);
    });

    // Add search functionality
    document.getElementById("studentSearch").addEventListener("keyup", (e) => {
      const searchText = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#students-table-body tr");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchText)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  };

  // Function to generate and render the parents list
  const renderParentsList = () => {
    mainContentArea.innerHTML = `
      <h2 class="list-title">Parent Directory</h2>
      <div class="search-container">
          <input type="text" id="parentSearch" placeholder="Search parents..." />
          <i class="fas fa-search search-icon"></i>
      </div>
      <table class="data-table">
          <thead>
              <tr>
                  <th>Parent's Name</th>
                  <th>Child's Name</th>
                  <th>Child's Class</th>
              </tr>
          </thead>
          <tbody id="parents-table-body">
          </tbody>
      </table>
      `;

    const tableBody = document.getElementById("parents-table-body");
    parentsData.forEach((parent) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${parent.name}</td>
          <td>${parent.child}</td>
          <td>${parent.class}</td>
      `;
      tableBody.appendChild(row);
    });

    // Add search functionality
    document.getElementById("parentSearch").addEventListener("keyup", (e) => {
      const searchText = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#parents-table-body tr");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchText)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  };

  // Event Listeners for menu links
  studentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveLink(studentsLink);
    renderStudentsList();
    body.classList.remove("sidebar-open");
  });

  parentsLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveLink(parentsLink);
    renderParentsList();
    body.classList.remove("sidebar-open");
  });

  // The rest of the original code, adapted to work with the new structure
  // Function to generate the dashboard content
  const renderDashboard = () => {
    mainContentArea.innerHTML = `
        <div class="dashboard-header">
          <div class="page-title">
            <h1>Admin Dashboard</h1>
            <p>
              Welcome to Faith-Life International management system. Monitor school
              activities at a glance.
            </p>
          </div>
          <div class="user-actions">
            <div class="user-info">
              <img
                id="admin-avatar"
                class="user-avatar"
                src="lecturer.jpg"
                alt="Admin-pic"
              />
              <div class="user-details">
                <h3 id="admin-name">Mr. Kogberegbe</h3>
                <p id="admin-role">Principal</p>
              </div>
            </div>
            <div class="notification-btn">
              <i class="fas fa-bell"></i>
              <span class="notification-badge">3</span>
            </div>
          </div>
        </div>
        <div class="dashboard-grid">
          <div class="dashboard-card" id="students-card">
            <div class="card-header">
              <div>
                <div class="card-title">Students</div>
                <div class="card-count" id="students-count">70</div>
              </div>
              <div class="card-icon students">
                <i class="fas fa-user-graduate"></i>
              </div>
            </div>
            <div class="card-description">
              Total registered students in the school system
            </div>
            <div class="card-footer">
              <span>Last registered: <span id="last-student">-</span></span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="dashboard-card" id="staff-card">
            <div class="card-header">
              <div>
                <div class="card-title">Staff</div>
                <div class="card-count" id="staff-card-count">100</div>
              </div>
              <div class="card-icon staff">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
            </div>
            <div class="card-description">
              Teaching and non-teaching staff members
            </div>
            <div class="card-footer">
              <span>Last added: <span id="last-staff">-</span></span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="dashboard-card" id="payments-card">
            <div class="card-header">
              <div>
                <div class="card-title">Payments</div>
                <div class="card-count" id="payments-amount">₦0</div>
              </div>
              <div class="card-icon payments">
                <i class="fas fa-credit-card"></i>
              </div>
            </div>
            <div class="card-description">Total verified payments this term</div>
            <div class="card-footer">
              <span>Pending: <span id="pending-payments">0</span></span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="dashboard-card" id="attendance-card">
            <div class="card-header">
              <div>
                <div class="card-title">Attendance</div>
                <div class="card-count" id="attendance-percent">50%</div>
              </div>
              <div class="card-icon attendance">
                <i class="fas fa-clipboard-list"></i>
              </div>
            </div>
            <div class="card-description">
              Average student attendance rate today
            </div>
            <div class="card-footer">
              <span>Absent: <span id="absent-today">10</span> students</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="dashboard-card" id="results-card">
            <div class="card-header">
              <div>
                <div class="card-title">Results</div>
                <div class="card-count" id="results-count">10</div>
              </div>
              <div class="card-icon results">
                <i class="fas fa-chart-line"></i>
              </div>
            </div>
            <div class="card-description">Results recorded this term</div>
            <div class="card-footer">
              <span>Pending: <span id="pending-results">10</span></span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>

          <div class="dashboard-card" id="communication-card">
            <div class="card-header">
              <div>
                <div class="card-title">Messages</div>
                <div class="card-count" id="messages-count">3</div>
              </div>
              <div class="card-icon communication">
                <i class="fas fa-comments"></i>
              </div>
            </div>
            <div class="card-description">Unread messages and announcements</div>
            <div class="card-footer">
              <span>Unread: <span id="unread-messages">0</span></span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>

        <div class="stats-section">
          <div class="chart-container">
            <div class="section-header"></div>
            <div class="chart-wrapper">
              <canvas id="paymentsChart"></canvas>
            </div>
          </div>

          <div class="quick-stats">
            <div class="stat-item">
              <div class="stat-icon blue">
                <i class="fas fa-book"></i>
              </div>
              <div class="stat-info">
                <h4 id="subject-stats">30 Subjects</h4>
                <p>Active in curriculum</p>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon green">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h4 id="class-stats">20 Classes</h4>
                <p>Currently active</p>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon purple">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="stat-info">
                <h4 id="assignment-stats">5 Assignments</h4>
                <p>Submitted this week</p>
              </div>
            </div>
          </div>
        </div>
        `;
    // Dashboard details upate
    document.getElementById("student-count").textContent = studentsData.length;
    document.getElementById("students-count").textContent = studentsData.length;
    if (studentsData.length > 0) {
      document.getElementById("last-student").textContent =
        studentsData[studentsData.length - 1].name;
    }

    document.getElementById("teacher-count").textContent = teachersData.length;
    document.getElementById("staff-card-count").textContent =
      teachersData.length;
    if (teachersData.length > 0) {
      document.getElementById("last-staff").textContent =
        teachersData[teachersData.length - 1].full_name;
    }

    document.getElementById("classes-count").textContent = subjectsData.length;
  };

  dashboardLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveLink(dashboardLink);
    renderDashboard();
    body.classList.remove("sidebar-open");
  });

  teachersLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveLink(teachersLink);
    body.classList.remove("sidebar-open");
    mainContentArea.innerHTML = `
          <h2 class="list-title">Teachers Directory</h2>
          <div class="search-container">
              <input type="text" id="teacherSearch" placeholder="Search teachers..." />
              <i class="fas fa-search search-icon"></i>
          </div>
          <table class="data-table">
              <thead>
                  <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subject</th>
                  </tr>
              </thead>
              <tbody id="teachers-table-body">
              </tbody>
          </table>
          `;

    const tableBody = document.getElementById("teachers-table-body");
    teachersData.forEach((teacher) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${teacher.full_name}</td>
              <td>${teacher.email}</td>
              <td>${teacher.phone}</td>
              <td>${teacher.subject}</td>
          `;
      tableBody.appendChild(row);
    });

    // Add search functionality
    document.getElementById("teacherSearch").addEventListener("keyup", (e) => {
      const searchText = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#teachers-table-body tr");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchText)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  classesLink.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveLink(classesLink);
    body.classList.remove("sidebar-open");
    mainContentArea.innerHTML = `
          <h2 class="list-title">Class and Subject Management</h2>
          <div class="search-container">
              <input type="text" id="subjectSearch" placeholder="Search subjects..." />
              <i class="fas fa-search search-icon"></i>
          </div>
          <table class="data-table">
              <thead>
                  <tr>
                      <th>Subject Name</th>
                      <th>Assigned Teachers</th>
                      <th>Classes Taught</th>
                  </tr>
              </thead>
              <tbody id="subjects-table-body">
              </tbody>
          </table>
          `;
    const tableBody = document.getElementById("subjects-table-body");
    subjectsData.forEach((subject) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${subject.name}</td>
              <td>${subject.assigned}</td>
              <td>${subject.classes.join(", ")}</td>
          `;
      tableBody.appendChild(row);
    });

    // Add search functionality
    document.getElementById("subjectSearch").addEventListener("keyup", (e) => {
      const searchText = e.target.value.toLowerCase();
      const rows = document.querySelectorAll("#subjects-table-body tr");
      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchText)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });

  // Initial dashboard load
  renderDashboard();
});
