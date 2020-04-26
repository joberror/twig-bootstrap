<?php

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

$loader = new FilesystemLoader(REL_PATH.'templates');
$twig = new Environment($loader, [
    //TODO change cache on Production
    'cache' => false, //REL_PATH.'cache'
    'auto-reload' => true
]);
