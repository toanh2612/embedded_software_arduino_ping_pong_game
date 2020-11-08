#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
#include <ArduinoJson.h>
#include <SocketIoClient.h>

Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified();

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti WiFiMulti;
#define USE_SERIAL Serial

SocketIoClient webSocket;
int roomId = 1;
int side = 0;
float x = 0;
float y = 0;
float z = 0;

void setup(void)
{
    Serial.begin(115200);
    pinMode(LED_BUILTIN, OUTPUT);
    USE_SERIAL.setDebugOutput(true);
    Serial.println("Running.");
    for (uint8_t t = 4; t > 0; t--)
    {
        USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }
    
    WiFiMulti.addAP("null", "null12345");
    while (WiFiMulti.run() != WL_CONNECTED)
    {
        delay(100);
    }
    webSocket.begin("192.168.43.193", 777);
    if (!accel.begin())
    {
        Serial.println("No valid sensor found");
        while (1);
    }
}
uint64_t messageTimestamp;
void loop(void)
{
    webSocket.loop();
    uint64_t now = millis();
    if (now - messageTimestamp > 105)
    {
        messageTimestamp = now;
        sensors_event_t event;
        accel.getEvent(&event);
        StaticJsonDocument<500> data;
        x = event.acceleration.x;
        y = event.acceleration.y;
        z = event.acceleration.z;
        data["roomId"] = roomId;
        data["side"] = side;
        data["x"] = x;
        data["y"] = y;
        data["z"] = z;
        
//        Serial.print("X: ");
//        Serial.print(x);
//        Serial.print("  ");
//        Serial.print("Y: ");
//        Serial.print(y);
//        Serial.print("  ");
//        Serial.print("Z: ");
//        Serial.print(z);
//        Serial.print("  "); 
        String output;
        serializeJson(data, output);
        Serial.print(output); 
        webSocket.emit("device-to-server",output.c_str());
    }
    
    delay(50);
}