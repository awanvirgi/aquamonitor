# Aquamonitor: Monitoring Air dan Pemberian Pakan Akuarium

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)  
[![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)]()  

Aquamonitor adalah sistem IoT yang memantau suhu dan pH air akuarium serta mengotomatisasi pemberian pakan ikan. Proyek ini terdiri dari kode Arduino dan web berbasis Next.js, dengan Supabase sebagai backend.

---

## ✨ Fitur Utama

- Monitoring suhu air secara real-time  
- Monitoring pH air secara real-time  
- CRUD jadwal pemberian pakan  
- Otomatisasi pemberian pakan melalui servo

---

## 💻 Teknologi yang Digunakan

- **Frontend:** Next.js  
- **Backend:** Supabase  
- **Perangkat Keras:** ESP8266, Sensor DS18b20, Sensor PH402C, Servo Motor , Baterai AA 1,5V x4

---

## 🚀 Instalasi & Setup

### 1. Clone repository:
```bash
   git clone <repository-url>
   cd <repository-folder>
```
### 2. Install dependensi
```bash
    npm install
```
### 3. Siapkan Supabase
- Buat project baru 
- Buat tabel: 
    - `sensor`: `temp_data`, `ph_data` 
    - `feeder_schedule`: `time`, `volume` 
- Salin Anon Key dan URL Supabase ke file `.env`

### 4. Jalankan Next
```bash
    npm start
```

---

## 📂 Contoh .env
Buat file `.env`:
```ini
    NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
    NEXT_PUBLIC_SUPABASE_KEY=your-anon-key
```

--- 

## 🔌 Upload Kode ESP8266
Pada folder arduino terdapat 2 file `.ino` bisa upload kodenya di mikrokontroler masing masing
1. Buka **Arduino IDE** 
2. Pilih **Board:** ESP8266
3. Pilih **Port:** sesuai port yang terdeteksi 
4. Hubungkan board dengan kabel USB 
5. Buka file `.ino` dari folder Arduino 
6. Klik **Upload**”

## 📡 Skema Perkabelan (Disarankan)
![Skema Wiring Aquamonitor](public/wiring-diagram.png)

## 📋 Tabel Hubungan Pin Perangkat Keras

| No | Perangkat Keras    | Pin       | Hubungan Pin                 |
|----|---------------------|-----------|------------------------------|
| 1  | ESP8266 NodeMCU   | 3,3V      | Pin Breadboard Powerbus +    |
|    |                   | GND       | Pin Breadboard Powerbus -    |
|    |                   | A0        | Pin PHOUT PH4502c            |
|    |                   | D4        | Pin DATA DS18B20             |
|    |                   | D2        | Pin PWM Motor Servo          |
| 2  | Sensor DS18B20    | VCC       | Pin Breadboard Powerbus +    |
|    |                   | GND       | Pin Breadboard Powerbus -    |
|    |                   | DATA      | Pin D4 ESP8266            |
| 3  | Motor Servo       | PWM       | Pin D2 ESP8266           |
|    |                   | VCC       | Kabel VCC Holder Baterai    |
|    |                   | GND       | Pin Breadboard Powerbus -    |
| 4  | Sensor PH4502C    | VCC       | Pin Breadboard Powerbus +    |
|    |                   | GND       | Pin Breadboard Powerbus -    |
|    |                   | PHOUT     | Pin A0 ESP8266           |
| 5  | Holder Baterai 4 Slot | 5V        | Pin Breadboard Powerbus +    |
|    |                   | GND       | Pin Breadboard Powerbus -    |

---

