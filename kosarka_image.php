<?php
// Check if image data is posted
if (isset($_POST['imageData'])) {
    $imageData = $_POST['imageData'];
    
    // Save image data to a file
    file_put_contents('category8_image.txt', $imageData);

    echo json_encode(['status' => 'success', 'message' => 'Image data saved']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No image data received']);
}
?>
