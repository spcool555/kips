const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});






document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector(".sign-up-container form");
  const signInForm = document.querySelector(".sign-in-container form");
  const loader = document.getElementById("loader");

  // === SIGN UP ===
  if (signUpForm) {
    signUpForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = signUpForm.querySelector('input[placeholder="Name"]').value;
      const email = signUpForm.querySelector('input[placeholder="Email"]').value;
      const password = signUpForm.querySelector('input[placeholder="Password"]').value;

      const data = {
        name: name,
        username: email,
        password: password
      };

      loader.style.display = "flex";

      try {
        const response = await fetch("https://kipstourism.com//auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();
  console.log("📦 Response JSON:", result);
        if (response.ok) {
          localStorage.setItem("name", result.body.name);
          localStorage.setItem("email", result.body.uname);
          localStorage.setItem("token", result.body.token);
          localStorage.setItem("role", result.body.role);

          alert("Registration successful!");
          
          window.location.href = "/";
        } else {
          alert("Registration failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      } finally {
        loader.style.display = "none";
      }
    });
  }

  // === SIGN IN ===
  if (signInForm) {
    signInForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = signInForm.querySelector('input[placeholder="Email"]').value;
      const password = signInForm.querySelector('input[placeholder="Password"]').value;

      const data = {
        username: email,
        password: password
      };

      loader.style.display = "flex";

      try {
        const response = await fetch("https://kipstourism.com//auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem("name", result.body.name);
          localStorage.setItem("email", result.body.uname);
          localStorage.setItem("token", result.body.token);
          localStorage.setItem("role", result.body.role);
          alert("Login successful!");
          window.location.href = "/";
        } else {
          alert("Login failed: " + (result.message || "Invalid credentials"));
        }
      } catch (error) {
        console.error("Error:", error);
        alert("You Are Not Registred!");
      } finally {
        loader.style.display = "none";
      }
    });
  }
});

