<?php
if (session_id() === '') {
    // If not already done
    session_start();
}

/**
 * Replace value below with appropriate header to root distance of this include file
 */

$header_to_root_distance = 1;
$header_dir = __DIR__;
$root_distance = substr_count($header_dir, DIRECTORY_SEPARATOR) - $header_to_root_distance;
if ($_SERVER['SERVER_ADDR']) {
    $include_distance = substr_count(dirname($_SERVER['SCRIPT_FILENAME']), '/');
} else {
    $include_distance = substr_count(dirname($_SERVER['SCRIPT_FILENAME']), "\\");
}

define('REL_PATH', str_repeat('../', $include_distance - $root_distance));

$_SESSION['REL_PATH'] = REL_PATH;
