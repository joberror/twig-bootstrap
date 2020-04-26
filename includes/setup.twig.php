<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;
// set template folder in your directory below eg /templates/
$loader = new FilesystemLoader(REL_PATH.'templates');
// Twig default settings
$twig = new Environment($loader, [
    //TODO change cache on Production
    'cache' => false, //REL_PATH.'cache'
    'auto-reload' => true
]);
