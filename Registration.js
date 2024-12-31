let isAllowed = false; // Default to false
let isAdmin = false; // Default to false for Admin
let isMember = false; // Default to false for Member

const users = {
  admins: [
    { username: "prki", password: "belgradebet" },
    { username: "Djordje", password: "DjordjeK289" },
  ],
  members: [
    { username: "member1", password: "memberpass" },
  ]
};

// Check sessionStorage for login state
window.onload = function () {
  // Get the current page's pathname
  const currentPage = window.location.pathname;

  // List of restricted pages that require login
  const restrictedPages = ["Home.html", "Dashboard.html"];

  // Retrieve login state from sessionStorage
  const storedIsAllowed = sessionStorage.getItem('isAllowed');
  const storedIsAdmin = sessionStorage.getItem('isAdmin');
  const storedIsMember = sessionStorage.getItem('isMember');

  // Set values from sessionStorage
  if (storedIsAllowed === 'true') {
    isAllowed = true;
  }
  if (storedIsAdmin === 'true') {
    isAdmin = true;
  }
  if (storedIsMember === 'true') {
    isMember = true;
  }

  // Check if the user is trying to access a restricted page
  if (!isAllowed && restrictedPages.some(page => currentPage.endsWith(page))) {
    // Redirect to index.html if not logged in
    window.location.href = "Index.html";
  }

  // Check for restricted page access via navbar
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (event) {
      const currentPage = event.target.getAttribute('href');

      if (!isAllowed && restrictedPages.some(page => currentPage.endsWith(page))) {
        event.preventDefault(); // Prevent the default link behavior
        window.location.href = "Index.html"; // Redirect to index.html
      }
    });
  });

  // Admin specific changes
  if (isAdmin) {
    const navbar = document.querySelector('.links');
    const dashboardLink = document.createElement('a');
    dashboardLink.href = "Dashboard.html";
    dashboardLink.id = "dynamic-link";
    dashboardLink.textContent = "Dashboard";
    navbar.appendChild(dashboardLink);
  }

  // Initial DOM update
  updateCategories();
};

// Handle login form submission
function handleLogin(event) {
  event.preventDefault(); // Prevent form submission

  // Get the input values
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");

  // Check the credentials
  let foundUser = null;
  for (const role in users) {
    foundUser = users[role].find(user => user.username === username);
    if (foundUser) break;
  }

  if (!foundUser) {
    errorMessage.textContent = "Incorrect username.";
    errorMessage.style.color = "red"; // Red for error
  } else if (foundUser.password !== password) {
    errorMessage.textContent = "Incorrect password.";
    errorMessage.style.color = "red"; // Red for error
  } else {
    // Successful login
    errorMessage.textContent = "Successfully logged in!";
    errorMessage.style.color = "green"; // Green for success
    isAllowed = true; // Set access to true

    // Set the role-specific values
    if (users.admins.some(user => user.username === username)) {
      isAdmin = true;
      sessionStorage.setItem('isAdmin', 'true'); // Set admin role
    } else {
      isMember = true;
      sessionStorage.setItem('isMember', 'true'); // Set member role
    }

    // Save login state in sessionStorage
    sessionStorage.setItem('isAllowed', 'true');
    window.location.href = 'Home.html'; // Redirect after login
  }
}

// Function to update the categories dynamically
function updateCategories() {
  const categories = document.querySelectorAll('.category');
  categories.forEach((element) => {
    if (!isAllowed) {
      if (element.tagName === 'A') {
        const div = document.createElement('div');
        div.textContent = element.textContent;
        div.className = 'category';
        element.replaceWith(div);
      }
    } else {
      if (element.tagName === 'DIV') {
        const anchor = document.createElement('a');
        anchor.textContent = element.textContent;
        anchor.href = "#"; // Add a placeholder or actual URL
        anchor.className = 'category';
        element.replaceWith(anchor);
      }
    }
  });
}

// Logout function
function logout() {
  sessionStorage.clear(); // Clear session storage
  isAllowed = false;
  isAdmin = false;
  isMember = false;
  window.location.href = 'Index.html'; // Redirect to the login page
}