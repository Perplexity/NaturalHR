<?php
require '../vendor/autoload.php'; //Composer generated autoloader so that we can use our namespaces anywhere.

use \NaturalHR\Authentication\Auth;
use NaturalHR\Users\Upload;

$headers = apache_request_headers();
if (isset($headers["Authorization"])) { //Is the authorization token present?
    $token = Auth::GetBearer($headers["Authorization"]); //Parse token
    $user = Auth::IsValid($token); //Check if token is valid, will return user object if it is.
    if ($user) {
        $response = ["message" => "Something went wrong."];
        switch ($_SERVER['REQUEST_METHOD']) { //POST/GET
            case "GET":
                //Retrieve user uploads.
                try {
                    $uploads = Upload::FromUser($user->Id);
                    header('Content-Type: application/json');
                    die(json_encode($uploads));
                } catch (Exception $e) {
                    http_response_code(500); //Internal server error
                    $response["message"] = $e->getMessage();
                }
                break;
            case "POST":
                //Upload new file.
                if (isset($_FILES)) {
                    $file = $_FILES["file"];
                    try {
                        $uploads = Upload::Insert($file, $user->Id);
                        header('Content-Type: application/json');
                        die(json_encode($uploads));
                    } catch (Exception $e) {
                        http_response_code(500); //Internal server error
                        $response["message"] = $e->getMessage();
                    }
                } else {
                    $response["message"] = "File not provided.";
                    http_response_code(400); //Bad request
                }
                break;
            default:
                $response["message"] = "Invalid request.";
                http_response_code(400); //Bad request
        }
        die($response["message"]);
    } else {
        http_response_code(401); //Unauthorized
    }
} else {
    http_response_code(401); //Unauthorized
}
