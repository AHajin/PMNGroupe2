<?php

namespace Controller;

use Controller\ConnexionController;
use mysqli;

class ScrumBotController
{
    private $connexionController;

    public function __construct()
    {
        $this->connexionController = new ConnexionController();
    }

    public function getAllWorker()
    {
        $req = mysqli_query($this->connexionController->connexion, 'SELECT * FROM workers');
        $responses = [];

        while ($worker = mysqli_fetch_assoc($req)) {
            array_push($responses, $worker);
        }
        return $responses;
    }

    public function getWorkerById($id)
    {
        $req = mysqli_query($this->connexionController->connexon, 'SELECT * FROM workers WHERE id=' . $id);
        return mysqli_fetch_assoc($req);
    }

    public function getAllResponse()
    {
        $req = mysqli_query($this->connexionController->connexion, 'SELECT * FROM response');
        $responses = [];

        while ($response = mysqli_fetch_assoc($req)) {
            array_push($responses, $response);
        }
        return $responses;
    }

    public function getResponseById($id)
    {
        $req = mysqli_query($this->connexionController->connexon, 'SELECT * FROM response WHERE id=' . $id);
        return mysqli_fetch_assoc($req);
    }

    public function addWorker($post)
    {
        $idUser = $post["id_user"];
        $username = htmlentities(htmlspecialchars($post["username"]));
        $step = $post["step"];
        $idGuild = $post['id_guild'];
        $sql = "INSERT INTO workers (id_user, username, step, id_guild) VALUES ('{$idUser}', '{$username}', '{$step}', '{$idGuild}')";

        if (mysqli_query($this->connexionController->connexion, $sql)) {
            return [
                "status" => 1,
                "message" => "Ajout dans la BDD ok"
            ];
        } else {
            return [
                "status" => 0,
                "message" => "Une erreur s'est produite"
            ];
        }
    }

    // public function addResponse($post)
    // {
    //     $idUser = $post["id_user"];
    //     $nameUser = htmlentities(htmlspecialchars($post["name_user"]));
    //     $responseObj = htmlentities(htmlspecialchars($post["response_obj"]));
    //     $step = $post['step'];
    //     $sql = "INSERT INTO response (id_user, name_user, response_obj, step) VALUES ('{$idUser}', '{$nameUser}', '{$responseObj}', '{$step}')";

    //     if (mysqli_query($this->connexionController->connexion, $sql)) {
    //         return [
    //             "status" => 1,
    //             "message" => "Ajout dans la BDD ok"
    //         ];
    //     } else {
    //         var_dump($sql);
    //         return [
    //             "status" => 0,
    //             "message" => "Une erreur s'est produite"
    //         ];
    //     }
    // }

    public function updateWorkerStatus($put)
    {
        $sqlSet = '';
        if (!empty($put["status"])) {

            $status = intval($put["status"]);
            (strlen($sqlSet) == 0) ? $sqlSet .= 'status ="' . $status . '"' : $sqlSet .= '-status ="' . $status . '"';
        }
        $sql = 'UPDATE workers SET ' . $sqlSet . ' WHERE id_user=' . $put["id_user"];
        // return $sql;
        if (mysqli_query($this->connexionController->connexion, $sql)) {
            return [
                "status" => 1,
                "message" => "Modification dans la BDD ok"
            ];
        } else {
            return [
                "status" => 0,
                "message" => " NIQUE TA MERE !!!!!!"
            ];
        }
    }

    public function deleteWorker($id) {
        if (mysqli_query($this->connexionController->connexion, "DELETE FROM workers WHERE id_user={$id}")) {
            return [
                "status"=>1,
                "message"=>"Suppression dans la BDD ok"
            ];
        } else {
            return [
                "status"=>0,
                "message"=>"Une erreur s'est produite"
            ];
        }
    }
    
}
