document.addEventListener("DOMContentLoaded", function () {
  // Handle Navigation Links
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main > div");
  const sessionForm = document.getElementById("scheduleForm");
  const sessionList = document.getElementById("sessionList");
  const resourcesGrid = document.getElementById("resources-grid");

  // Toggle between Login and Register forms
  document.getElementById('showRegister').addEventListener('click', function() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
  });

  document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
  });

  // Navigation Logic
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      const targetId = link.getAttribute("href").substring(1); // Get target section ID
      sections.forEach((section) => section.classList.add("hidden"));
      navLinks.forEach((link) => link.classList.remove("active"));

      document.getElementById(targetId).classList.remove("hidden");
      link.classList.add("active");
    });
  });

  // Event listener for scheduling a session
  if (sessionForm) {
    sessionForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent form from submitting normally

      const sessionName = document.getElementById("sessionName").value;
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;

      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>Session:</strong> ${sessionName} | 
        <strong>Date:</strong> ${date} | 
        <strong>Time:</strong> ${time} |
        <a href="https://example.com" target="_blank">Join Link</a>
      `;
      
      // Append the new session to the session list
      sessionList.appendChild(listItem);
      sessionForm.reset();
    });
  }

  // Handle Resources Section
  if (resourcesGrid) {
    const resources = [
      { title: "Presentation File from XYZ Session", link: "https://example.com/resource1" },
      { title: "Screen Recording from XYZ Session", link: "https://example.com/resource2" },
      { title: "Notes from ABC Workshop", link: "https://example.com/resource3" },
      { title: "Tutorial Slides from DEF Session", link: "https://example.com/resource4" },
      { title: "PDF Guide from GHI Session", link: "https://example.com/resource5" },
      { title: "Audio Recording from JKL Event", link: "https://example.com/resource6" },
    ];

    resources.forEach((resource) => {
      const card = document.createElement("div");
      card.classList.add("resource-card");
      card.innerHTML = `
        <img class="card-image"
            src="https://vetresources.com.au/wp-content/uploads/2023/02/Planning-a-training-session-1024x683-1.jpg"
            alt="${resource.title}"
        />
        <h3>${resource.title}</h3>
        <a href="${resource.link}" target="_blank" class="resource-link">View Resource</a>
      `;
      resourcesGrid.appendChild(card);
    });
  }
});
