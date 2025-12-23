function login() {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (loginEmail === "" || loginPassword === "") {
        alert("Please fill in all fields");
        return;
    }

    if (loginEmail === savedEmail && loginPassword === savedPassword) {
        alert("Login successful!");
        window.location.href = "../Dyna/Home/Home.html";
    } else {
        alert("Invalid email or password");
    }
}

// Show password
const password = document.getElementById("loginPassword");
const showBtn = document.getElementById("showBtn");

showBtn.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        showBtn.textContent = "Hide";
    } else {
        password.type = "password";
        showBtn.textContent = "Show";
    }
});

// Enter key support
document.getElementById("loginPassword").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        login();
    }
});