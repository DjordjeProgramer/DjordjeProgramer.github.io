// DOM Elements
const previewImage = document.getElementById('previewImage');
const noImageMessage = document.getElementById('noImageMessage');
const textBox = document.getElementById('message-box-write');

// Load saved image and text on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('category3Image');
    if (savedImage) {
        previewImage.src = savedImage;
        previewImage.style.display = 'block';
        noImageMessage.style.display = 'none';
    } else {
        previewImage.style.display = 'none';
        noImageMessage.style.display = 'block';
    }

    const savedText = localStorage.getItem('category3Text');
    // Check if savedText is empty and set default text if necessary
    if (savedText && savedText !== '') {
        textBox.textContent = savedText;
    } else {
        textBox.textContent = 'Nista nije napisano na strani admina.';
    }
});
