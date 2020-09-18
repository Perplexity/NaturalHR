<?php

namespace NaturalHR\Users;

use Exception;
use \NaturalHR\Database\DB;
use PDO;

class User
{
    public $Id;
    public $Username;
    public $Email;

    public function __construct($id, $username, $email)
    {
        $this->Id = $id;
        $this->Username = $username;
        $this->Email = $email;
    }

    /**
     * @return Upload[]|null
     */

    public function GetUploads()
    {
        try {
            return Upload::FromUser($this->Id);
        } catch (Exception $e) {
            return null;
        }
    }

    public static function UsernameExists($username)
    {
        $db = DB::getInstance();
        $query = $db->prepare("SELECT id FROM users WHERE username = :username");
        $query->bindParam(":username", $username);
        if ($query->execute()) {
            return $query->rowCount() > 0;
        } else {
            throw new Exception("Could not execute query.");
        }
    }

    public static function EmailExists($email)
    {
        $db = DB::getInstance();
        $query = $db->prepare("SELECT id FROM users WHERE email = :email");
        $query->bindParam(":email", $email);
        if ($query->execute()) {
            return $query->rowCount() > 0;
        } else {
            throw new Exception("Could not execute query.");
        }
    }

    /**
     * @param string $username
     * @param string $password
     * @return User
     * @throws Exception
     */
    public static function FromLogin($username, $password)
    {
        $db = DB::getInstance();
        $query = $db->prepare("SELECT id, username, email FROM users WHERE (username = :username OR email = :username) AND password = :password");
        $query->bindParam(":username", $username);
        $query->bindParam(":password", $password);
        if ($query->execute()) {
            if ($query->rowCount() > 0) {
                $user = $query->fetch(PDO::FETCH_OBJ);
                return self::FromObject($user);
            }
            throw new Exception("Invalid username/password.");
        } else {
            throw new Exception("Could not execute query.");
        }
    }

    public static function Insert($username, $password, $confirmPassword, $email)
    {
        try {
            if (self::UsernameExists($username)) {
                throw new Exception("Username already exists.");
            }
            if (self::EmailExists($email)) {
                throw new Exception("Email address already exists.");
            }
            if (strlen($username) == 0) {
                throw new Exception("Invalid username.");
            }
            if (strlen($password) == 0) {
                throw new Exception("Invalid password.");
            }
            if (strlen($email) == 0 || !preg_match("/^\S+@\S+$/", $email)) {
                throw new Exception("Invalid email.");
            }
            if ($confirmPassword !== $password) {
                throw new Exception("Passwords do not match.");
            }
            $password = md5($password); //Hash password with MD5.
            $db = DB::getInstance();
            $query = $db->prepare("INSERT INTO users (username, password, email) VALUES(:username, :password, :email)");
            $query->bindParam(":username", $username);
            $query->bindParam(":password", $password);
            $query->bindParam(":email", $email);
            return $query->execute();
        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * @param object $obj
     * @return User
     */

    public static function FromObject($obj)
    {
        return new self($obj->id, $obj->username, $obj->email);
    }
}