import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet.fullscreen";

export function initCoverageMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const zoneStyle = {
    color: 'rgba(72, 165, 232, 1)',
    weight: 0,
    fillColor: 'rgba(72, 165, 232, 1)',
    fillOpacity: 0.5
  };

  const map = L.map(mapElement, {
    fullscreenControl: true
  });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const zones = [
    {
      name: "Zone B - Near Schulenburg",
      coordinates: [
        [29.6905, -96.9220],
        [29.6965, -96.9100],
        [29.6880, -96.8990],
        [29.6820, -96.9120],
      ],
      tariffs: [
        { name: "Premium", price: "$40", speed: "100" },
        { name: "Fiber", price: "$60", speed: "300" }
      ]
    },
    {
      name: "Zone D - Near Columbus",
      coordinates: [
        [29.70, -96.90],
        [29.74, -96.90],
        [29.74, -96.88],
        [29.72, -96.88],
        [29.72, -96.86],
        [29.70, -96.86],
      ],
      tariffs: [
        { name: "G1", price: "$30", speed: "50" },
        { name: "G2", price: "$45", speed: "75" }
      ]
    },
    {
      name: "Zone E - Near Flatonia",
      coordinates: [
        [29.6800, -97.1000],
        [29.6900, -97.0900],
        [29.6750, -97.0800],
        [29.6650, -97.0950],
      ],
      tariffs: [
        { name: "G1", price: "$30", speed: "50" },
        { name: "G2", price: "$45", speed: "75" }
      ]
    }
  ];

  // Add fullscreen control with custom icon
  const fullscreenButton = document.querySelector('.leaflet-control-zoom-fullscreen');
  if (fullscreenButton && !fullscreenButton.querySelector('img')) {
    fullscreenButton.innerHTML = '<img src="/img/leaflet-fullscreen.png" alt="fullscreen" style="width: 20px; height: 20px;">';
  }

  const mapContainer = map.getContainer();

  // Переместим кнопку прямо внутрь карты (в конец), чтобы не зависеть от Leaflet-компоновки
  if (fullscreenButton && mapContainer) {
    fullscreenButton.classList.add('custom-fullscreen-button');
    mapContainer.appendChild(fullscreenButton);
  }
  // End fullscreen control with custom icon


  const allCoords = zones.flatMap(zone => zone.coordinates);
  const bounds = L.latLngBounds(allCoords);
  map.fitBounds(bounds);

  let marker;

  zones.forEach((zone) => {
    const polygon = L.polygon(zone.coordinates, zoneStyle).addTo(map);

    polygon.on("click", () => {
      const zonePoly = turf.polygon([
        [...zone.coordinates.map(c => [c[1], c[0]]), [zone.coordinates[0][1], zone.coordinates[0][0]]]
      ]);

      const center = turf.center(zonePoly).geometry.coordinates;
      const popupLatLng = [center[1], center[0] + 0.01];

      const popupHtml = `
        <div class="tariff-popup">
          <p class="tariff-popup__zone">${zone.name}</p>
          <div class="tariff-popup__items">
            ${zone.tariffs.map(tariff => `
              <div class="tariff-popup__item">
                <p class="tariff-popup__name">${tariff.name}</p>
                <div class="tariff-popup__data">
                  <p class="tariff-popup__price">
                    <span>${tariff.price}</span>/Month
                  </p>
                  <p class="tariff-popup__speed">${tariff.speed} mbit/s</p>
                </div>
              </div>
            `).join("")}
          </div>
          <a href="#" class="tariff-popup__link">See tariffs</a>
        </div>
      `;

      L.popup({ closeOnClick: true, autoClose: true })
        .setLatLng(popupLatLng)
        .setContent(popupHtml)
        .openOn(map);
    });

  });


  document.getElementById("check-address").addEventListener("click", async () => {
    const address = document.getElementById("address-input").value;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
    const data = await res.json();

    if (!data.length) return alert("Address not found");

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 15);

    const turfPoint = turf.point([lon, lat]);

    const foundZone = zones.find((zone) => {
      const turfPoly = turf.polygon([[...zone.coordinates.map(c => [c[1], c[0]]), [zone.coordinates[0][1], zone.coordinates[0][0]]]]);
      return turf.booleanPointInPolygon(turfPoint, turfPoly);
    });

    if (foundZone) {
      // Центр зоны
      const zoneCenter = turf.center(
        turf.polygon([[...foundZone.coordinates.map(c => [c[1], c[0]]), [foundZone.coordinates[0][1], foundZone.coordinates[0][0]]]])
      );
      const [centerLng, centerLat] = zoneCenter.geometry.coordinates;

      // Смещаем попап немного вправо
      const popupLatLng = [centerLat, centerLng + 0.01];

      // HTML контент попапа
      const popupHtml = `
      <div class="tariff-popup">
        <strong>${zone.name}</strong><br/>
        Available tariffs:
          <ul>
            ${zone.tariffs.map(t => `
              <li><strong>${t.name}</strong> — ${t.price}, ${t.speed}</li>
            `).join("")}
          </ul>
        </div>
      `;

      L.popup({ closeOnClick: true, autoClose: true })
        .setLatLng(popupLatLng)
        .setContent(popupHtml)
        .openOn(map);
    } else {
      L.popup({ closeOnClick: true, autoClose: true })
        .setLatLng([lat, lon])
        .setContent("Address is outside coverage.")
        .openOn(map);
    }
  });

  const input = document.getElementById("address-input");
  const clearBtn = document.querySelector(".coverage-form__clear-button");

  input.addEventListener("input", () => {
    clearBtn.style.display = input.value.trim() ? "block" : "none";
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    input.focus();
  });
}

initCoverageMap();
