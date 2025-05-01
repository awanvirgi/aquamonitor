#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <ArduinoJson.h>
//test upload
// Wi-Fi credentials
#define SSID "Kokom Komariah"
#define PASSWORD "19122008"
#define LED 2

// Supabase credentials
#define supabaseUrl "isi dengan url supabase"
#define supabaseKey "isi dengan anon key supabase"
#define tableName "feeder_schedule"
#define tableName2 "sensor"

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 25200, 60000);

float temp_data = 0;
float ph_data = 0;
float sem_ph = 0;
float sem_temp = 0;
bool firstOn = true;
bool sekaliAj = false;
String jadwal = "";

unsigned long previousMillisGetData = 0;
unsigned long previousMillisGetWaktu = 0;
unsigned long previousMillisGetUno = 0;
unsigned long previousMillisTransferData = 0;
unsigned long previousMillisBlink = 0;

int lastMinutes = 100;

unsigned long lastReconnectAttempt = 0;

const long intervalGetData = 60000;             // 1 menit
const long intervalGetWaktu = 10000;            // 10 detik
const long intervalGetUno = 60000;              // 1 menit
const long intervalTransferData = 60000;        // 1 menit
const long intervalBlink = 5000;                // 5 detik
const unsigned long reconnectInterval = 10000;  // 10 detik


void setup() {
  Serial.begin(115200);
  pinMode(LED, OUTPUT);

  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi\n");
  timeClient.begin();
  syncToZeroSecond();
}

void loop() {
  unsigned long currentMillis = millis();


  if (WiFi.status() != WL_CONNECTED) {
    unsigned long now = millis();
    if (now - lastReconnectAttempt >= reconnectInterval) {
      Serial.println("WiFi terputus! Mencoba reconnect...");
      WiFi.disconnect();
      WiFi.begin(SSID, PASSWORD);
      lastReconnectAttempt = now;
    }
    return;
  }

  if (currentMillis - previousMillisGetWaktu >= intervalGetWaktu) {
    previousMillisGetWaktu = currentMillis;
    waktu();
  }
  if (currentMillis - previousMillisGetData >= intervalGetData) {
    previousMillisGetData = currentMillis;
    getData();
  }

  if (currentMillis - previousMillisGetUno >= intervalGetUno) {
    previousMillisGetUno = currentMillis;
    getUno();
  }

  if ((currentMillis - previousMillisTransferData >= intervalTransferData ) && currentMillis > 120000) {
    previousMillisTransferData = currentMillis;
    transferData();
  }

  if (currentMillis - previousMillisBlink >= intervalBlink) {
    previousMillisBlink = currentMillis;
    digitalWrite(LED, !digitalRead(LED));
      // Toggle LED
  }
}

void syncToZeroSecond() {
  timeClient.update();
  int seconds = timeClient.getSeconds();
  while (seconds != 58) {
    delay(100);
    timeClient.update();
    seconds = timeClient.getSeconds();
  }
  Serial.println("START");
  delay(2000);
}


void waktu() {
  if (WiFi.status() != WL_CONNECTED) return;
  timeClient.update();

  int currentHour = timeClient.getHours();
  int currentMinute = timeClient.getMinutes();

  if (lastMinutes == currentMinute + 2) {
    lastMinutes = 100;  // Reset lastExecutedTimeStr setiap hari
  }

  StaticJsonDocument<1024> doc;
  DeserializationError error = deserializeJson(doc, jadwal);
  for (JsonObject obj : doc.as<JsonArray>()) {
    String timeStr = obj["time"].as<String>();
    String volume = obj["volume"].as<String>();

    int jamUTC = timeStr.substring(11, 13).toInt();
    int menit = timeStr.substring(14, 16).toInt();
    int jamWIB = (jamUTC + 7) % 24;

    if (jamWIB == currentHour && menit == currentMinute) {
      // Jika belum pernah dijalankan untuk jadwal ini
      if (lastMinutes != currentMinute) {
        Serial.println(volume);  // Kirim ke Arduino
        lastMinutes = currentMinute;
      }
      return;
    }
  }
  Serial.println("Belum");
}

void getUno() {
  String air = "";
  unsigned long start = millis();
  while (Serial.available() > 0) {
    char c = Serial.read();
    air += c;

    // biar gak terlalu lama
    if (millis() - start > 1000) break;
  }

  if (air.length() == 0) return;

  sscanf(air.c_str(), "pH:%f\nSuhu:%f", &sem_ph, &sem_temp);
}


void getData() {
  if (WiFi.status() != WL_CONNECTED) return;
  WiFiClientSecure client;
  client.setInsecure();
  HTTPClient http;
  String endpoint = String(supabaseUrl) + "/rest/v1/" + tableName + "?select=time,volume";
  http.begin(client, endpoint);
  http.addHeader("apikey", supabaseKey);
  http.addHeader("Authorization", "Bearer " + String(supabaseKey));

  int httpResponseCode = http.GET();
  if (httpResponseCode > 0) {
    jadwal = http.getString();
  }
  http.end();
}

void transferData() {
  if (WiFi.status() != WL_CONNECTED) return;
  if (sem_ph > 0 || sem_temp > 0) {
    ph_data = sem_ph;
    temp_data = sem_temp;
  }
  WiFiClientSecure client;
  client.setInsecure();
  HTTPClient http;
  String serverName = String(supabaseUrl) + "/rest/v1/" + tableName2;
  http.begin(client, serverName);

  http.addHeader("apikey", supabaseKey);
  http.addHeader("Authorization", "Bearer " + String(supabaseKey));
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Prefer", "return=minimal");

  StaticJsonDocument<200> jsonDoc;
  jsonDoc["temp_data"] = temp_data;
  jsonDoc["ph_data"] = ph_data;

  String requestBody;
  serializeJson(jsonDoc, requestBody);

  http.POST(requestBody);
  http.end();
}
