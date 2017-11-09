<?php

include 'simple_html_dom.php';

// Create DOM from URL or file.
$html = file_get_html('http://www.bomberosperu.gob.pe/po_diario.asp');

$emergencies = [];
$tr = $html->find('tr.TextoContenido');

foreach ($tr as $item) {
  $emergency = [];
  $emergency['id'] = _format_string($item->find('td div', 0)->plaintext);
  $emergency['number'] = _format_string($item->find('td div', 1)->plaintext);
  $emergency['created'] = _format_string($item->find('td div', 2)->plaintext);
  $emergency['address'] = _format_string($item->find('td div', 3)->plaintext);
  $emergency['emergency_type'] = str_replace(" (INCIDENTE)", "", _format_string($item->find('td div', 4)->plaintext));
  $emergency['status'] = _format_string($item->find('td div', 5)->plaintext);
  $emergency['machines'] = explode(' ', _format_string($item->find('td div', 6)->plaintext));
  $emergency['fire_stations'] = _get_fire_stations($emergency['machines']);
  $content = explode("'", $item->find('td img', 0)->onclick);
  // @TODO: Validate correctly if $content[i] is a valid lat or lon.
  $emergency['map'] = [
    'latitude' => !empty($content[1]) ? $content[1] : '',
    'longitude' => !empty($content[3]) ? $content[3] : ''
  ];
  $emergencies[] = $emergency;
}

print json_encode($emergencies);
exit();

/**
 * Replaces awful characters, remove spaces, add html entity code.
 * @param type $content
 * @return type
 */
function _format_string($content) {
  $content = preg_replace("/&#?[a-z0-9]{2,8};/i", "", $content);
  $content = trim(preg_replace('/[\s\t\n\r\s]+/', ' ', $content));
  $content = html_entity_decode(htmlentities($content));
  return $content;
}

function _format_lat($content) {
  $content = preg_replace("/^[-]?(([0-8]?[0-9])\.(\d+))|(90(\.0+)?)$/", "", $content);
  return $content;
}

/**
 * Get fire stations from machines list.
 *
 * @param array $machines
 *   Machines array.
 *
 * @return array
 *   Fire stations in array format.
 */
function _get_fire_stations($machines) {
  $fireStations = [];
  foreach ($machines as $machine) {
    $machineDashReplace = preg_replace("/[^0-9-]/", '', $machine);
    $machineDash = preg_split('/-/', $machineDashReplace, NULL, PREG_SPLIT_NO_EMPTY);
    $fireStations[] = !empty($machineDash[0]) ? $machineDash[0] : '';
  }
  return $fireStations;
}
