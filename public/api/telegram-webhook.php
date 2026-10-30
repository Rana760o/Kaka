<?php
header('Content-Type: application/json');

// Supabase Configuration
$supabaseUrl = 'https://pghzvtneghteglbxlrti.supabase.co';
$supabaseKey = 'sb_publishable_jAoaXLzGFI80zNyMtIZWHw_OobGiFee';

// Read incoming Telegram update
$input = file_get_contents('php://input');
$update = json_decode($input, true);

if (!$update) {
    echo json_encode(['status' => 'no_input']);
    exit;
}

// Check for chat_join_request
if (isset($update['chat_join_request'])) {
    $cjr = $update['chat_join_request'];
    $chatId = $cjr['chat']['id'] ?? null;
    $from = $cjr['from'] ?? [];
    $userId = $from['id'] ?? null;
    $firstName = $from['first_name'] ?? '';
    $lastName = $from['last_name'] ?? '';
    $username = $from['username'] ?? null;
    $inviteLink = $cjr['invite_link']['invite_link'] ?? null;
    $requestDate = isset($cjr['date']) ? date('c', $cjr['date']) : date('c');

    // Find matching lead by invite_link
    $leadId = null;
    if ($inviteLink) {
        $ch = curl_init("$supabaseUrl/rest/v1/leads?invite_link=eq." . urlencode($inviteLink) . "&select=id");
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "apikey: $supabaseKey",
            "Authorization: Bearer $supabaseKey",
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $leadRes = curl_exec($ch);
        curl_close($ch);
        $leadData = json_decode($leadRes, true);
        if (!empty($leadData) && isset($leadData[0]['id'])) {
            $leadId = $leadData[0]['id'];
        }
    }

    // Insert into join_requests
    $record = [
        'chat_id' => $chatId,
        'tg_user_id' => $userId,
        'tg_first_name' => $firstName,
        'tg_last_name' => $lastName,
        'tg_username' => $username,
        'invite_link' => $inviteLink,
        'request_date' => $requestDate,
        'status' => 'pending',
        'meta_status' => 'sent',
        'lead_id' => $leadId
    ];

    $ch = curl_init("$supabaseUrl/rest/v1/join_requests");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $supabaseKey",
        "Authorization: Bearer $supabaseKey",
        "Content-Type: application/json",
        "Prefer: return=minimal"
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($record));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);

    echo json_encode(['ok' => true, 'processed' => 'chat_join_request']);
    exit;
}

echo json_encode(['ok' => true, 'status' => 'ignored']);
