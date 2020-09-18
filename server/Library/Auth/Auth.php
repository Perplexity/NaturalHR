<?php

namespace NaturalHR\Authentication;

use Exception;
use \Firebase\JWT\JWT;

class Auth
{
    public static $Key = "NaturalHR";
    public static $Algorithm = array('HS256');

    /**
     * @param string $header
     * @return string
     */
    public static function GetBearer($header)
    {
        //Retrieve our auth token from the authorization header using regular expressions.
        $reg = "/^Bearer ([\w\W]+\.[\w\W]+\.[\w\W]+)$/";
        if (preg_match($reg, $header, $groups)) {
            return $groups[1];
        }
    }

    /**
     * @param string $token
     * @return bool|object|null
     */
    public static function IsValid($token)
    {
        //Checks that our token is valid. If not, an exception is thrown.
        try {
            return JWT::decode($token, self::$Key, self::$Algorithm);
        } catch (Exception $e) {
            return false;
        }
    }

    /**
     * @param object $obj
     * @return string
     */
    public static function Generate($obj)
    {
        //Convert object to token.
        return JWT::encode($obj, Auth::$Key);
    }
}