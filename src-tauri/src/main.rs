// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

#[tauri::command]
fn save_data(key: String, value: String) -> Result<(), String> {
    // In production, this would use Android SharedPreferences
    // For now, we'll use a simple file-based storage
    println!("Saving data: {} = {}", key, value);
    Ok(())
}

#[tauri::command]
fn load_data(key: String) -> Result<String, String> {
    // In production, this would read from Android SharedPreferences
    println!("Loading data: {}", key);
    Ok(String::new())
}

#[tauri::command]
async fn schedule_notification(title: String, body: String, delay_ms: u64) -> Result<(), String> {
    println!("Scheduling notification: {} - {} (delay: {}ms)", title, body, delay_ms);
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![
            save_data,
            load_data,
            schedule_notification
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
