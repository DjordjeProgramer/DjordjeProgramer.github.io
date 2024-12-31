<?php
// Check if text data is posted
if (isset($_POST['text'])) {
    $text = $_POST['text'];

    // Save text data to a file
    file_put_contents('category8_text.txt', $text);

    echo json_encode(['status' => 'success', 'message' => 'Text data saved']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No text data received']);
}
?>
