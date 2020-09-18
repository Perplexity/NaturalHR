<?php
require '../vendor/autoload.php'; //Composer generated autoloader so that we can use our namespaces anywhere.

use \NaturalHR\Users\User;

$payload = json_decode(file_get_contents('php://input'));
$response = ["message" => "Something went wrong."];
if ($payload) {
    try {
        if (User::Insert($payload->username, $payload->password, $payload->confirmPassword, $payload->email)) {
            die("Successfully registered!");
        } else {
            $response["message"] = "Failed to register.";
        }
    } catch (Exception $e) {
        $response["message"] = $e->getMessage();
    }
}
http_response_code(400); //Bad request
die($response["message"]);
