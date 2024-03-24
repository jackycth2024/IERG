<?php
session_start();

function csrf_getNonce($action){
    $nonce = mt_rand().mt_rand();
    if(!isset($_SESSION['csrf_nonce']))
        $_SESSION['csrf_nonce'] = array();
    $_SESSION['csrf_nonce'][$action] = $nonce;
    return $nonce;
}

function csrf_verifyNonce($action, $receivedNonce){
    if(isset($receivedNonce) && isset($_SESSION['csrf_nonce'][$action]) && $_SE>
        unset($_SESSION['csrf_nonce'][$action]);
        return true;
    }
    throw new Exception('csrf-attack');
}
// Validate CSRF nonce
try {
    csrf_verifyNonce($_REQUEST['action'], $_POST['nonce']);
} catch (Exception $e) {
  exit;
}
?>
