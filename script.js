// function to fetch book data from google books api.
function searchBooks() {
  const searchInput = document.getElementById("searchInput").value;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => displaySearchResults(data.items))
    .catch(error => console.error('Error fetching data:', error));
}

// function to display search results on the page.
function displaySearchResults(books) {
  const searchResultsDiv = document.getElementById("searchResults");
  searchResultsDiv.innerHTML = "";

  if (books.length === 0) {
    searchResultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  books.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.className = "book-card";

    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
    const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "https://via.placeholder.com/150";

    bookDiv.innerHTML = `
      <a href="${book.volumeInfo.infoLink}" target="_blank">
        <img src="${thumbnail}" alt="${title}">
        <h2>${title}</h2>
        <p>Author(s): ${authors}</p>
      </a>
    `;

    searchResultsDiv.appendChild(bookDiv);
  });
}

// function to make return key act like search button when it is pressed.
function handleSearchOnEnter(event) {
  if (event.key === "Enter") {
    searchBooks();
  }
}

//event listener for the above return key and all.
const searchInputField = document.getElementById("searchInput");
searchInputField.addEventListener("keydown", handleSearchOnEnter);


const users = [
  { username: 'raghav', email: 'raghav@gmail.com', password: 'password123' },
  { username: 'garima', email: 'garima@gamil.com', password: 'password1234' }
];

// function to handle sign in
function signIn(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert('Sign in successful!'); // In a real-world app, you'd redirect to the user dashboard.
    document.getElementById('signInForm').reset();
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

// function to handle sign up
function signUp(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  const newUser = { username, email, password };
  users.push(newUser);

  alert('Sign up successful!'); 
  document.getElementById('signUpForm').reset();
}

// event listeners for form submission
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', signIn);

const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', signUp);
