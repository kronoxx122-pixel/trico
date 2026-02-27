<?php
// data/proxy_discord.php

// Permitir acceso solo desde el mismo dominio o controlar CORS si es necesario
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Obtener el cuerpo de la solicitud
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || (!isset($data['content']) && !isset($data['embeds']))) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid payload', 'received' => $data]);
    exit;
}

// URL del Webhook (Usando el proxy de Hyra para saltar el bloqueo de IP de Render)
$webhookUrl = 'https://discord.com/api/webhooks/1474183808919273645/Uz_Tw3TehyfH9o8L-6zxE2O0BB1A96fGRyvOjzYrKG024hmKXr0NIWRTxi0BrMlHYOVd';

// Iniciar CURL
$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Opcional, dependiendo de la config SSL del servidor

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($httpCode === 429) {
    // Intentar obtener el tiempo de espera si Discord lo envía
    $details = json_decode($response, true);
    $retryAfter = isset($details['retry_after']) ? $details['retry_after'] : 'desconocido';
    http_response_code(429);
    echo json_encode([
        'error' => 'Rate Limit exceeded',
        'retry_after' => $retryAfter,
        'message' => 'Discord está bloqueando temporalmente la IP de este servidor. Intenta de nuevo en unos segundos.'
    ]);
}
else if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo json_encode(['error' => 'Discord API Error', 'details' => $response]);
}
else if ($error) {
    http_response_code(500);
    echo json_encode(['error' => 'CURL Error', 'details' => $error]);
}
else {
    echo json_encode(['success' => true]);
}

?>
