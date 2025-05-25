import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet.fullscreen";
import customPin from '../../img/pin-map.png';

// Ваш кастомный маркер
const customIcon = L.icon({
  iconUrl: customPin,
  iconSize: [28, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

export function initCoverageMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  // Стиль зон по умолчанию
  const zoneStyle = {
    color: 'rgba(72, 165, 232, 1)',
    weight: 0,
    fillColor: 'rgba(72, 165, 232, 1)',
    fillOpacity: 0.5
  };
  // Стиль для активной зоны (граница 5px)
  const activeZoneStyle = {
    color: 'rgb(72, 165, 232)',
    weight: 5,
    fillColor: 'rgba(72, 165, 232, 1)',
    fillOpacity: 0.3
  };

  // Инициализация карты
  const map = L.map(mapElement, { fullscreenControl: true });
  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { attribution: "&copy; OpenStreetMap contributors" }
  ).addTo(map);

  // Описание зон
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

  // Кастомная кнопка fullscreen
  const fullscreenButton = document.querySelector('.leaflet-control-zoom-fullscreen');
  if (fullscreenButton && !fullscreenButton.querySelector('img')) {
    fullscreenButton.innerHTML =
      '<img src="/img/leaflet-fullscreen.png" alt="fullscreen" style="width:20px;height:20px">';
  }
  const mapContainer = map.getContainer();
  if (fullscreenButton && mapContainer) {
    fullscreenButton.classList.add('custom-fullscreen-button');
    mapContainer.appendChild(fullscreenButton);
  }

  // Fit initial bounds
  map.fitBounds(L.latLngBounds(zones.flatMap(z => z.coordinates)));

  let marker = null;
  let activePolygon = null;

  // Создаём и сохраняем полигоны зон
  const polygons = zones.map(zone => {
    const poly = L.polygon(zone.coordinates, zoneStyle).addTo(map);
    poly.on("click", () => {
      highlightZone(poly);
      showZonePopup(zone);
    });
    return { zone, poly };
  });

  // Подсветка активной зоны
  function highlightZone(poly) {
    if (activePolygon) {
      activePolygon.setStyle(zoneStyle);
    }
    if (poly) {
      poly.setStyle(activeZoneStyle);
    }
    activePolygon = poly;
  }

  // Показ попапа зоны
  function showZonePopup(zone) {
    const turfPoly = turf.polygon([[
      ...zone.coordinates.map(c => [c[1], c[0]]),
      [zone.coordinates[0][1], zone.coordinates[0][0]]
    ]]);
    const [lng, lat] = turf.center(turfPoly).geometry.coordinates;
    const popupLatLng = [lat, lng + 0.01];

    const html = `
      <div class="tariff-popup">
        <p class="tariff-popup__zone">${zone.name}</p>
        <div class="tariff-popup__items">
          ${zone.tariffs.map(t => `
            <div class="tariff-popup__item">
              <p class="tariff-popup__name">${t.name}</p>
              <div class="tariff-popup__data">
                <p class="tariff-popup__price"><span>${t.price}</span>/Month</p>
                <p class="tariff-popup__speed">${t.speed} mbit/s</p>
              </div>
            </div>
          `).join("")}
        </div>
        <a href="#" class="tariff-popup__link">See tariffs</a>
      </div>
    `;

    L.popup({
      closeOnClick: true,
      autoClose: true,
      autoPan: true,
      autoPanPadding: [50, 50]
    })
      .setLatLng(popupLatLng)
      .setContent(html)
      .openOn(map);
  }

  // Формирует HTML попапа после поиска
  function buildSearchPopup(zone) {
    if (!zone) {
      return `<div class="tariff-popup">
                <p>Address is outside coverage.</p>
              </div>`;
    }
    return `
      <div class="tariff-popup">
        <p class="tariff-popup__zone">${zone.name}</p>
        <div class="tariff-popup__items">
          ${zone.tariffs.map(t => `
            <div class="tariff-popup__item">
              <p class="tariff-popup__name">${t.name}</p>
              <div class="tariff-popup__data">
                <p class="tariff-popup__price"><span>${t.price}</span>/Month</p>
                <p class="tariff-popup__speed">${t.speed} mbit/s</p>
              </div>
            </div>
          `).join("")}
        </div>
        <a href="#" class="tariff-popup__link">See tariffs</a>
      </div>
    `;
  }

  // Элементы формы
  const input = document.getElementById("address-input");
  const clearBtn = document.querySelector(".coverage-form__clear-button");
  const btn = document.getElementById("check-address");
  if (!input || !clearBtn || !btn) return;

  // Логика Clear-кнопки
  input.addEventListener("input", () => {
    clearBtn.style.display = input.value.trim() ? "block" : "none";
  });
  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    input.focus();
  });

  // Выполняет поиск и отображает результат
  async function performSearch() {
    const q = input.value.trim();
    if (!q) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(q)}&format=json`
      );
      const data = await res.json();
      if (!data.length) {
        alert("Address not found");
        return;
      }
      const { lat, lon } = data[0];

      // Ставим кастомный маркер
      if (marker) map.removeLayer(marker);
      marker = L.marker([+lat, +lon], { icon: customIcon }).addTo(map);

      // Определяем зону для точки
      const pt = turf.point([+lon, +lat]);
      const found = polygons.find(({ zone }) => {
        const poly = turf.polygon([[
          ...zone.coordinates.map(c => [c[1], c[0]]),
          [zone.coordinates[0][1], zone.coordinates[0][0]]
        ]]);
        return turf.booleanPointInPolygon(pt, poly);
      });

      // Подсвечиваем активную зону
      highlightZone(found?.poly || null);

      // Летим к точке и открываем попап
      map.flyTo([+lat, +lon], 14, { animate: true });
      map.once("moveend", () => {
        const html = buildSearchPopup(found?.zone);
        L.popup({
          closeOnClick: true,
          autoClose: true,
          autoPan: true,
          autoPanPadding: [50, 50]
        })
          .setLatLng([+lat, +lon])
          .setContent(html)
          .openOn(map);
      });

    } catch (err) {
      console.error(err);
      alert("Search error");
    }
  }

  // Привязка событий поиска
  btn.addEventListener("click", performSearch);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });
}

initCoverageMap();
