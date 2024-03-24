<?php
include 'csrf-functions.php';

// Validate CSRF nonce
try {
    csrf_verifyNonce($_REQUEST['action'], $_POST['nonce']);
} catch (Exception $e) {
}
?>

