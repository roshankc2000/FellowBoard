document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main > div");

  // Loop through each navigation link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior

      // Get the target section id from the href attribute (e.g., #dashboard)
      const targetId = link.getAttribute("href").substring(1);

      // Hide all sections and remove the 'active' class from links
      sections.forEach((section) => {
        section.classList.add("hidden");
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // Display the target section and add the 'active' class to the clicked link
      document.getElementById(targetId).classList.remove("hidden");
      link.classList.add("active");
    });
  });
});

// Event listener for scheduling a session
scheduleForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  // Get form input values
  const sessionName = document.getElementById("sessionName").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  // Create a new list item for the session
  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <strong>Session:</strong> ${sessionName} | 
      <strong>Date:</strong> ${date} | 
      <strong>Time:</strong> ${time} |
      <a href="https://example.com" target="_blank">Join Link</a>
    `;

  // Append the new session to the session list
  sessionList.appendChild(listItem);

  // Reset the form fields
  scheduleForm.reset();
});

//For the resources section
document.addEventListener("DOMContentLoaded", function () {
  const resourcesGrid = document.getElementById("resources-grid");

  // Dummy data for resources
  const resources = [
    {
      title: "Presentation File from XYZ Session",
      link: "https://example.com/resource1",
    },
    {
      title: "Screen Recording from XYZ Session",
      link: "https://example.com/resource2",
    },
    { title: "Notes from ABC Workshop", link: "https://example.com/resource3" },
    {
      title: "Tutorial Slides from DEF Session",
      link: "https://example.com/resource4",
    },
    {
      title: "PDF Guide from GHI Session",
      link: "https://example.com/resource5",
    },
    {
      title: "Audio Recording from JKL Event",
      link: "https://example.com/resource6",
    },
    // Add more dummy data as needed
  ];

  // Generate cards for each resource
  resources.forEach((resource) => {
    const card = document.createElement("div");
    card.classList.add("resource-card");
    card.innerHTML = `
    <img 
                class="card-image"
                src="https://vetresources.com.au/wp-content/uploads/2023/02/Planning-a-training-session-1024x683-1.jpg"
                alt="${resource.title}"
            />
            <h3>${resource.title}</h3>
            <a href="${resource.link}" target="_blank" class="resource-link">View Resource</a>
        `;
    resourcesGrid.appendChild(card);
  });
});
