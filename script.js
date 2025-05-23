// Navbar scroll behavior
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  const backToTop = document.querySelector(".back-to-top");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Back to top button
document.querySelector(".back-to-top").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up").forEach((element) => {
    observer.observe(element);
  });

  // Stats counter animation
  const statsSection = document.querySelector(".stats-counter");
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;

          statNumbers.forEach((number) => {
            const target = parseInt(number.getAttribute("data-count"));
            let count = 0;
            const duration = 2000; // ms
            const interval = duration / target;

            const counter = setInterval(function () {
              count++;
              number.textContent = count;

              if (count >= target) {
                clearInterval(counter);
              }
            }, interval);
          });

          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );

  statsObserver.observe(statsSection);

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });

      // Close mobile menu after click
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    });
  });
});
