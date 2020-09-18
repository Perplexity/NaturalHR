<?php
require '../vendor/autoload.php'; //Composer generated autoloader so that we can use our namespaces anywhere.

use \NaturalHR\Users\User;
use \NaturalHR\Authentication\Auth;

$payload = json_decode(file_get_contents('php://input'));
$response = ["message" => "Something went wrong."];
if ($payload) {
    try {
        $user = User::FromLogin($payload->username, md5($payload->password));
        die(Auth::Generate($user)); //Generate JWT token from our User object.
    } catch (Exception $e) {
        $response["message"] = $e->getMessage();
    }
}
http_response_code(401); //Unauthorized
die($response["message"]);
