function signup() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (name === "" || email === "" || password === "") {
        alert("Please fill in all fields");
        return;
      }
      

      //check
      const existingEmail = localStorage.getItem("userEmail");
      if (existingEmail === email) {
        alert("An account with this email already exists. Please log in instead.");
        return;
      }

      //save
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
