// Tentative de reconnexion automatique au chargement de la page
window.addEventListener("DOMContentLoaded", async () => {
  const storedId = localStorage.getItem("bluetoothDeviceId");
  if (storedId && navigator.bluetooth.getDevices) {
    try {
      const devices = await navigator.bluetooth.getDevices();
      const device = devices.find(d => d.id === storedId);

      console.log("Appareil en mémoire :", {
        storedId,
        deviceFound: !!device,
        matchingDevice: device ? {
          id: device.id,
          name: device.name,
          uuids: device.uuids,
          connected: device.gatt?.connected
        } : null
      });

      if (device) {
        updateStatus(`Tentative de reconnexion à ${device.name}...`);
        const server = await device.gatt.connect();
        updateStatus("Reconnecté automatiquement !");
        device.addEventListener("gattserverdisconnected", () => reconnectDevice(device));
        configureBloodPressureCharacteristicNotifications(server);
      }
    } catch (err) {
      console.warn("Échec de reconnexion automatique :", err);
      updateStatus("Échec de reconnexion automatique.");
    }
  }
});

// Connexion manuelle via bouton
document.getElementById("connectBtn").addEventListener("click", async () => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ["blood_pressure"] }],
      optionalServices: ["blood_pressure"]
    });

    // Sauvegarde l'ID de l'appareil
    localStorage.setItem("bluetoothDeviceId", device.id);

    console.log("Appareil sélectionné :", {
      id: device.id,
      name: device.name,
      uuids: device.uuids,
      connected: device.gatt?.connected
    });

    updateStatus(`Connexion à ${device.name}...`);
    const server = await device.gatt.connect();
    updateStatus("Connecté !");

    device.addEventListener("gattserverdisconnected", () => {
      reconnectDevice(device);
    });

    configureBloodPressureCharacteristicNotifications(server);
  } catch (error) {
    console.error(error);
    updateStatus("Erreur de connexion : " + error.message);
  }
});

async function configureBloodPressureCharacteristicNotifications(server) {
  const bloodPressureService = await server.getPrimaryService("blood_pressure");
  const measurementChar = await bloodPressureService.getCharacteristic("blood_pressure_measurement");

  await measurementChar.startNotifications();
  measurementChar.addEventListener("characteristicvaluechanged", handleMeasurement);

  updateStatus("En attente des mesures...");
}

async function reconnectDevice(device) {
  updateStatus("Tentative de reconnexion...");
  try {
    const server = await device.gatt.connect();
    updateStatus("Reconnecté !");
    configureBloodPressureCharacteristicNotifications(server);
  } catch (err) {
    console.warn("Échec de reconnexion, nouvelle tentative dans 5 secondes...");
    setTimeout(() => reconnectDevice(device), 5000);
  }
}

function updateStatus(text) {
  document.getElementById("status").textContent = "État : " + text;
}

function readSfloat16(dataView, offset) {
  const raw = dataView.getUint16(offset, true); // little-endian
  let mantissa = raw & 0x0FFF;
  let exponent = raw >> 12;

  if (mantissa >= 0x0800) mantissa -= 0x1000;
  if (exponent >= 0x0008) exponent -= 0x10;

  return mantissa * Math.pow(10, exponent);
}

function handleMeasurement(event) {
  const val = event.target.value;

  const flags = val.getUint8(0);
  const timestampPresent = (flags & 0b00000010) !== 0;
  const pulsePresent = (flags & 0b00000100) !== 0;

  const systolic = readSfloat16(val, 1);
  const diastolic = readSfloat16(val, 3);

  let index = 7;

  if (timestampPresent) index += 7;

  let pulse = null;
  if (pulsePresent) {
    pulse = readSfloat16(val, index);
    index += 2;
  }

  document.getElementById("systolic").textContent = systolic.toFixed(1);
  document.getElementById("diastolic").textContent = diastolic.toFixed(1);
  document.getElementById("pulse").textContent = pulse !== null ? pulse.toFixed(1) : "N/A";

  updateStatus("Mesures reçues à " + new Date().toLocaleString());
}
