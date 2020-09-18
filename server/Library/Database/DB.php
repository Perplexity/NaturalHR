<?php

namespace NaturalHR\Database;

use Exception;
use PDO;

//We're using PDO here and not MYSQLi. PDO provides even more functionality, and supports multiple database engines.

class DB
{
    private static $instance;

    /**
     * DB constructor.
     * @param string $host
     * @param string $username
     * @param string $password
     * @throws Exception
     */
    public function __construct($host, $username, $password)
    {
        if (self::$instance) {
            throw new Exception("DB Instance already exists.");
        }
        self::$instance = new PDO($host, $username, $password);
    }

    /**
     * @return PDO
     */
    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new PDO("mysql:host=localhost;dbname=naturalhr", "root", "");
        }
        return self::$instance;
    }
}