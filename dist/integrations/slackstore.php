<?php

$teamUser = $_POST['teamUser'];
$actions = $_POST['actions'];
$store = $_POST['store'];

$slackAPIToken = getenv('SlackAPIToken');

$url = 'https://slack.com/api/files.upload';
$data = array(
	'content' => $actions,
	'token' => $slackAPIToken,
	'filetype' => 'javascript',
	'filename' => 'actions.' . $teamUser . '.json',
	'channels' => getenv('SlackAPIChannel'),
	'title' => 'Actions JSON from ' . $teamUser
);

$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) {
	echo('Error in Slack request');
}

// Send Store
$data['content'] = $store;
$data['filename'] = 'store.' . $teamUser . '.json';
$data['title'] = 'Store JSON from ' . $teamUser;
$options['http']['content'] = http_build_query($data);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) {
	echo('Error in Slack request');
}

// $jsonResult = json_decode($result, true);
// $jsonResult['file']['id'];


?>
