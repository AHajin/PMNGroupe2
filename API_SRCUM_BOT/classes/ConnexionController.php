<?php

namespace Controller;

use mysqli;

class ConnexionController
{
    public $connexion = null;
    public function __construct ()
    {
        if (!is_null($this->connexion)) {
            return $this->connexion;
        } else {
            $this->connexion = mysqli_connect("localhost", "root", "", "scurmacolyte");
        }
        mysqli_set_charset($this->connexion, 'utf8');
    }
}
