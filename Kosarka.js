// DOM Elements for Image Section
const imageElement = document.getElementById('category8-img');
const fileInput = document.getElementById('category8-upload');
const uploadButton = document.getElementById('uploadBtn8');
const removeButton = document.getElementById('removeBtn8');

// DOM Elements for Text Section
const textElement = document.getElementById('categoryText-input');
const saveTextButton = document.getElementById('saveTextBtn');
const removeTextButton = document.getElementById('removeTextBtn');

// Load saved image and text from localStorage or from server
document.addEventListener('DOMContentLoaded', () => {
    loadSavedImage();
    loadSavedText();
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
            sendImageToServer(imageData);  // Send image data to server
        };
        reader.readAsDataURL(file);
    }
});

// Handle image removal
removeButton.addEventListener('click', () => {
    localStorage.removeItem('category8Image');
    imageElement.src = '';
    imageElement.style.display = 'none';
    removeButton.style.display = 'none';
    uploadButton.style.display = 'block';
    sendImageToServer('');  // Notify server to remove the image
});

// Save image to localStorage
function saveImage(imageData) {
    localStorage.setItem('category8Image', imageData);
}

// Load saved image from localStorage
function loadSavedImage() {
    const savedImage = localStorage.getItem('category8Image');
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

// Handle text save
saveTextButton.addEventListener('click', () => {
    const text = textElement.value;
    if (text) {
        saveText(text);
        displayText(text);
        sendTextToServer(text);  // Send text data to server
    }
});

// Handle text removal
removeTextButton.addEventListener('click', () => {
    localStorage.removeItem('category8Text');
    textElement.value = '';
    removeTextButton.style.display = 'none';
    saveTextButton.style.display = 'block';
    sendTextToServer('');  // Notify server to remove the text
});

// Save text to localStorage
function saveText(text) {
    localStorage.setItem('category8Text', text);
}

// Load saved text from localStorage
function loadSavedText() {
    const savedText = localStorage.getItem('category8Text');
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

// Function to send image data to server
function sendImageToServer(imageData) {
    fetch('kosarka_image.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `imageData=${encodeURIComponent(imageData)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function to send text data to server
function sendTextToServer(text) {
    fetch('kosarka_text.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `text=${encodeURIComponent(text)}`
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
