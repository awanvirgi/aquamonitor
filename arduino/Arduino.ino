#include <OneWire.h>
#include <DallasTemperature.h>
#include <Servo.h>

#define ONE_WIRE_BUS 2  // Pin untuk sensor suhu
#define PH_SENSOR A0    // Pin untuk sensor pH
#define SERVO_PIN 3     // Pin untuk servo

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
Servo myServo;
String Status = "Kosong";
int pos = 0;
unsigned long previousServoMillis = 0;
unsigned long previousPhSampleMillis = 0;
const long phInterval = 6000;     // Interval pengambilan pH (6 detik)
const long servoInterval = 1000;  // Interval untuk cek servo (1 detik)
int jumlahSampel = 10;
int sampleCount = 0;
float totalPh = 0;
float totalVoltage = 0;
bool collectingPhSamples = false;
bool phMeasurementComplete = false;
float lastAveragePh = 0.0;


void setup() {
  Serial.begin(115200);
  myServo.attach(SERVO_PIN);
  resetServo();  // Reset servo saat awal menyala
  sensors.begin();
}

void loop() {
  unsigned long currentMillis = millis();
  // Mengecek status jadwal secara real-time
  if (currentMillis - previousServoMillis >= servoInterval) {
    previousServoMillis = currentMillis;
    servoRotation(getStatusJadwal());
  }

  // Mengumpulkan sampel pH secara bertahap
  if (currentMillis - previousPhSampleMillis >= phInterval) {
    previousPhSampleMillis = currentMillis;
    phMeasurementComplete = false;
    collectPhSample();
  }

  // Mengambil suhu setelah pengukuran pH selesai
  if (phMeasurementComplete) {
    getTemp();
    phMeasurementComplete = false;  // Reset flag setelah pengambilan suhu
  }
}

void resetServo() {
  Serial.println("Mereset posisi servo...");
  myServo.write(0);
  delay(1000);
}

String getStatusJadwal() {
  String data = "";
  while (Serial.available() > 0) {
    char c = Serial.read();
    data += c;
  }
  data.trim();
  return data;
}

void servoRotation(String _status) {
  static bool isMoving = false;
  static int step = 5;

  if (_status == "Besar" || _status == "Kecil") {
    if (!isMoving) {
      isMoving = true;
      step = (_status == "Besar") ? 5 : 20;
    }

    if (pos == 0) {
      pos = 180;
    } else {
      pos = 0;
    }
    myServo.write(pos);
  }
}

void getTemp() {
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  if (temperatureC == -127.0) {
    Serial.println("Sensor suhu tidak terhubung!");
  } else {
    Serial.print("Suhu:");
    Serial.println(temperatureC);
  }
}

void collectPhSample() {
  unsigned int ph_value = 0;
  for (int j = 0; j < 10; j++) {
    ph_value += analogRead(PH_SENSOR);
    delay(10);
  }
  float analog = ph_value / 10.0;
  float voltage = analog * (5.0 / 1023.0);
  float ph7 = 2.97;
  float ph4 = 3.35;
  float ph_step = (ph4 - ph7) / 3;
  float ph_act = 7.00 + ((ph7 - voltage) / ph_step);
  totalPh += ph_act;
  totalVoltage += voltage;
  sampleCount++;

  if (sampleCount >= jumlahSampel) {
    lastAveragePh = totalPh / jumlahSampel;
    if (lastAveragePh > 0) {
      Serial.print("pH:");
      Serial.println(lastAveragePh, 1);
      collectingPhSamples = false;
      phMeasurementComplete = true;  // Tandai bahwa pengukuran pH selesai
      totalPh = 0;
      totalVoltage = 0;
      sampleCount = 0;
    } else {
      Serial.print("Sensor pH bermasalah:");
      Serial.println(lastAveragePh);
      collectingPhSamples = false;
      phMeasurementComplete = false;  // Tandai bahwa pengukuran pH selesai
      totalPh = 0;
      totalVoltage = 0;
      sampleCount = 0;
    }
  }
}
