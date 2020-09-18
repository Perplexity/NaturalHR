<?php


namespace NaturalHR\Users;


use Exception;
use NaturalHR\Database\DB;
use PDO;

class Upload
{
    public $Id;
    public $Uploader;
    public $FileName;
    public $FileSize;
    public $DateUploaded;

    public function __construct($id, $uploader, $fileName, $fileSize, $dateUploaded)
    {
        $this->Id = $id;
        $this->Uploader = $uploader;
        $this->FileName = $fileName;
        $this->FileSize = $fileSize;
        $this->DateUploaded = $dateUploaded;
    }

    /**
     * @param int $userId
     * @return Upload[]
     * @throws Exception
     */

    public static function FromUser($userId)
    {
        $db = DB::getInstance();
        $query = $db->prepare("SELECT * FROM uploads WHERE user_id = :userId");
        $query->bindParam(":userId", $userId);
        if ($query->execute()) {
            $uploads = array();
            if ($query->rowCount() > 0) {
                $results = $query->fetchAll(PDO::FETCH_OBJ);
                foreach ($results as $upload) {
                    $uploads[] = self::FromObject($upload);
                }
            }
            return $uploads;
        } else {
            throw new Exception("Could not execute query.");
        }
    }

    /**
     * @param object $file
     * @param int $userId
     * @return Upload[]
     * @throws Exception
     */
    public static function Insert($file, $userId)
    {
        if ($file["size"] > 5000000) {
            throw new Exception("File is too big. 5mb is the allowed maximum file size.");
        }
        if ($file["error"] > 0) {
            throw new Exception("Error with file.");
        }
        $invalidTypes = ["", "php", "exe"];
        $parts = pathinfo($file["name"]);
        $ext = $parts["extension"];
        if (in_array($ext, $invalidTypes)) {
            throw new Exception("Disallowed file extension (.{$ext})");
        }
        $db = DB::getInstance();
        $query = $db->prepare("INSERT INTO uploads (user_id, file_name, file_size, date_uploaded) VALUES(:id, :fileName, :fileSize, NOW())");
        $query->bindParam(":id", $userId);
        $query->bindParam(":fileName", $file["name"]);
        $query->bindParam(":fileSize", $file["size"]);
        if ($query->execute()) {
            $insertId = $db->lastInsertId();
            $path = __DIR__ . "../../../uploads/$userId/$insertId";
            $destination = $path . "/{$file["name"]}";
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }
            if (move_uploaded_file($file["tmp_name"], $destination)) {
                try {
                    return self::FromUser($userId);
                } catch (Exception $e) {
                    throw $e;
                }
            } else {
                throw new Exception("Upload failed.");
            }
        } else {
            throw new Exception("Could not execute query.");
        }

    }

    /**
     * @param object $obj
     * @return Upload
     */

    public static function FromObject($obj)
    {
        return new self($obj->id, $obj->user_id, $obj->file_name, $obj->file_size, $obj->date_uploaded);
    }
}