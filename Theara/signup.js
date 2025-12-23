function signup() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validation
      if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
      }

      // Basic email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Password strength check (optional)
      if (password.length < 6) {
        alert("Password should be at least 6 characters long");
        return;
      }

      // Check if user already exists
      const existingEmail = localStorage.getItem("userEmail");
      if (existingEmail === email) {
        alert("An account with this email already exists. Please log in instead.");
        return;
      }

      // Save to localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      alert("Sign up successful! You can now log in.");
      window.location.href = "login.html"; // Go to login page
    }

    // Show password functionality
    const password = document.getElementById("password");
    const showBtn = document.getElementById("showBtn");

    if (password && showBtn) {
      showBtn.addEventListener("click", () => {
        if (password.type === "password") {
          password.type = "text";
          showBtn.textContent = "Hide";
        } else {
          password.type = "password";
          showBtn.textContent = "Show";
        }
      });
    }

    // Enter key support for form submission
    document.getElementById("password")?.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        signup();
      }
    });