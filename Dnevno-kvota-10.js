// DOM Elements
const imageElement = document.getElementById('category5-img');
const fileInput = document.getElementById('category5-upload');
const uploadButton = document.getElementById('uploadBtn5');
const removeButton = document.getElementById('removeBtn5');

// Load saved image on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedImage();
});

// Handle image upload
uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            saveImage(imageData);
            displayImage(imageData);
        };
        reader.readAsDataURL(file);
    }
});

// Handle image removal
removeButton.addEventListener('click', () => {
    localStorage.removeItem('category5Image');
    imageElement.src = '';
    imageElement.style.display = 'none';
    removeButton.style.display = 'none';
    uploadButton.style.display = 'block';
});

// Save image to localStorage
function saveImage(imageData) {
    localStorage.setItem('category5Image', imageData);
}

// Load saved image from localStorage
function loadSavedImage() {
    const savedImage = localStorage.getItem('category5Image');
    if (savedImage) {
        displayImage(savedImage);
    }
}

// Display image and update UI
function displayImage(imageData) {
    imageElement.src = imageData;
    imageElement.style.display = 'block';
    removeButton.style.display = 'block';
    uploadButton.style.display = 'none';
}

// text

// DOM Elements for Text Section
const textElement = document.getElementById('categoryText-input');
const saveTextButton = document.getElementById('saveTextBtn');
const removeTextButton = document.getElementById('removeTextBtn');

// Load saved text on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedText();
});

// Handle text save
saveTextButton.addEventListener('click', () => {
    const text = textElement.value;
    if (text) {
        saveText(text);
        displayText(text);
    }
});

// Handle text removal
removeTextButton.addEventListener('click', () => {
    localStorage.removeItem('category5Text');
    textElement.value = '';
    removeTextButton.style.display = 'none';
    saveTextButton.style.display = 'block';
});

// Save text to localStorage
function saveText(text) {
    localStorage.setItem('category5Text', text);
}

// Load saved text from localStorage
function loadSavedText() {
    const savedText = localStorage.getItem('category5Text');
    if (savedText) {
        displayText(savedText);
    }
}

// Display text and update UI
function displayText(text) {
    textElement.value = text;
    removeTextButton.style.display = 'block';
    saveTextButton.style.display = 'none';
}
