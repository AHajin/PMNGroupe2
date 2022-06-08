<?php 
namespace Loader;

class Autoloader{
    //
    static function register(){
        spl_autoload_register(array(__CLASS__, 'autoload'));
    }
    
    static function autoload($className){
        $className = str_replace('Controller\\', '',$className);
        require SITE_ROOT.'/classes/'.$className.'.php';

    }
}
?>