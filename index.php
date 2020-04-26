<?php
//include default
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;

require 'setup.php';

// Uncomment to add custom css file
//$twig->addGlobal('css', 'file-name-without-extension');

try {
    echo $twig->render('home.twig');
} catch (LoaderError $e) {
} catch (RuntimeError $e) {
} catch (SyntaxError $e) {
}