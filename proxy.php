<?php
// Ensure no whitespace or BOM before the opening tag!
// Clear any existing output buffers
while (ob_get_level()) {
    ob_end_clean();
}

// Remove any default content-type header
header_remove("Content-Type");

// Force the correct headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: image/svg+xml");

// Validate the URL parameter
if (!isset($_GET['url'])) {
    http_response_code(400);
    exit("No URL specified.");
}

$url = $_GET['url'];

// (Optional) Validate or sanitize $url if needed.
// For a simple test, we assume the URL is valid.

// Fetch the content using file_get_contents. If allow_url_fopen is enabled:
$data = @file_get_contents($url);
if ($data === false) {
    http_response_code(500);
    exit("Error fetching the image.");
}

echo $data;
?>
