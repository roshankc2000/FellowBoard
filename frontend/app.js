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