<?php

use Controller\ScrumBotController;
use Loader\Autoloader;

require('config.php');
require('./classes/Autoloader.php');
Autoloader::register();
$requestMethod = $_SERVER["REQUEST_METHOD"];
$scrumbotcontroller = new ScrumBotController();
// Avec un switch on gère les méthodes de requête
switch ($requestMethod) {
    case 'GET';
        if (!empty($_GET["id"])) {
            echo json_encode($scrumbotcontroller->getWorkerById($_GET["id"]));
        } else {
            echo json_encode($scrumbotcontroller->getAllWorker());
        }
        if (!empty($_GET["id_user"])) {
            echo json_encode($scrumbotcontroller->getResponseById($_GET["id_user"]));
        } else {
            echo json_encode($scrumbotcontroller->getAllResponse());
        }
        break;
    case 'POST':
        echo json_encode($scrumbotcontroller->addWorker($_POST));
        break;
        // case 'POST':
        //     echo json_encode($scrumbotcontroller->addResponse($_POST));
        //     break;
    case 'PUT':
        $_PUT = [];
        parse_str(file_get_contents('php://input'), $_PUT);
        echo json_encode($scrumbotcontroller->updateWorkerStatus($_PUT));
        break;
    case 'DELETE':
        echo json_encode($scrumbotcontroller->deleteWorker($_GET["id_user"]));
        break;
}
