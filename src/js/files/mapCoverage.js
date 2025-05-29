import L from "leaflet";
import * as turf from "@turf/turf";
import "leaflet.fullscreen";
import customPin from "../../img/pin-map.png";

// 1) Рендерим три “заглушечных” тарифа без цен
function renderDefaultTariffs() {
  const container = document.querySelector(".tarifs__items");
  if (!container) return;

  container.innerHTML = `
    <!-- Basic -->
    <div class="tarif">
      <div class="tarif-content">
        <div class="tarif-content__start">
          <h3>Basic</h3>
          <p>For those who value simplicity</p>
        </div>
        <div class="tarif-content__medium">
          <p class="tarif-content__strong">Up to 10 Mbit/s</p>
          <p>Unlimited data</p>
        </div>
        <div class="tarif-content__end">
          <p><strong>Best for:</strong></p>
          <div class="tarif-content__options tarif-options">
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">YouTube in 720p</span>
            </div>
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <!-- тот же SVG -->
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">Social media with no lag</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tarif-conversion">
        <div class="tarif-conversion__price">
          <div class="tarif-conversion__price--standard">
            <p><span></span></p>
          </div>
        </div>
        <div class="tarif-conversion__button">
          <button class="hero-content__cta" data-scroll-to="#tarifs">Check internet availability</button>
        </div>
      </div>
    </div>

    <!-- Medium -->
    <div class="tarif">
      <div class="tarif-content">
        <div class="tarif-content__start">
          <h3>Medium</h3>
          <p>For an active online life</p>
        </div>
        <div class="tarif-content__medium">
          <p class="tarif-content__strong">Up to 25 Mbit/s</p>
          <p>Unlimited data</p>
        </div>
        <div class="tarif-content__end">
          <p><strong>Best for:</strong></p>
          <div class="tarif-content__options tarif-options">
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">YouTube in 1080p</span>
            </div>
            <div class="tarif-options__item">
                <span class="tarif-options__icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="10" fill="#F03F27"/>
                    <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                  </svg>
                </span>
                <span class="tarif-options__text">Smart devices</span>
              </div>
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">Online gaming (low ping)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tarif-conversion">
        <div class="tarif-conversion__price">
          <div class="tarif-conversion__price--standard">
            <p><span></span></p>
          </div>
        </div>
        <div class="tarif-conversion__button">
          <button class="hero-content__cta" data-scroll-to="#tarifs">Check internet availability</button>
        </div>
      </div>
    </div>

    <!-- Premium -->
    <div class="tarif">
      <div class="tarif-content">
        <div class="tarif-content__start">
          <h3>Premium</h3>
          <p>For streaming & gaming</p>
        </div>
        <div class="tarif-content__medium">
          <p class="tarif-content__strong">Up to 50 Mbit/s</p>
          <p>Unlimited data</p>
        </div>
        <div class="tarif-content__end">
          <p><strong>Best for:</strong></p>
          <div class="tarif-content__options tarif-options">
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">Movies in 4K</span>
            </div>
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">Multi-streaming</span>
            </div>
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">Perfect for gaming</span>
            </div>
            <div class="tarif-options__item">
              <span class="tarif-options__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" rx="10" fill="#F03F27"/>
                  <path d="M15.5309 5.63315L15.5296 5.63433L7.88778 12.371L4.47078 9.3587C4.47071 9.35864 4.47064 9.35858 4.47056 9.35851C4.37155 9.27061 4.23682 9.22117 4.09629 9.22117C3.95572 9.22117 3.82098 9.27063 3.72196 9.35856C3.72191 9.35861 3.72186 9.35866 3.7218 9.3587L3.15601 9.85747C3.15595 9.85754 3.15587 9.8576 3.1558 9.85767C3.05608 9.94495 3 10.0637 3 10.1876C3 10.3115 3.05611 10.4303 3.15587 10.5176C3.15592 10.5176 3.15596 10.5177 3.15601 10.5177L7.51733 14.3625C7.51741 14.3626 7.5175 14.3626 7.51758 14.3626C7.61659 14.4505 7.75131 14.5 7.89183 14.5C8.03235 14.5 8.16705 14.4505 8.26606 14.3626C8.26614 14.3626 8.26623 14.3626 8.26631 14.3625L16.844 6.8008C16.844 6.80077 16.8441 6.80075 16.8441 6.80073C16.9439 6.71343 17 6.59462 17 6.47067C17 6.34689 16.944 6.22823 16.8445 6.14096C16.8443 6.14083 16.8442 6.14069 16.844 6.14054L16.2785 5.63487V5.63485L16.2765 5.63315C16.0687 5.45562 15.7386 5.45562 15.5309 5.63315Z" fill="white" stroke="white" stroke-width="0.25"/>
                </svg>
              </span>
              <span class="tarif-options__text">Cloud work</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tarif-conversion">
        <div class="tarif-conversion__price">
          <div class="tarif-conversion__price--standard">
            <p><span></span></p>
          </div>
        </div>
        <div class="tarif-conversion__button">
          <button class="hero-content__cta" data-scroll-to="#tarifs">Check internet availability</button>
        </div>
      </div>
    </div>
  `;
}

export function initCoverageMap() {
  const mapEl = document.getElementById("map");
  const tarifsContainer = document.querySelector(".tarifs__items");
  const input = document.getElementById("address-input");
  const clearBtn = document.querySelector(".coverage-form__clear-button");
  const checkBtn = document.getElementById("check-address");
  // if (!mapEl || !tarifsContainer || !input || !clearBtn || !checkBtn) return;
  if (!mapEl || !input || !clearBtn || !checkBtn) return;

  // 1) По-умолчанию показываем “заглушки”
  if (tarifsContainer) {
    renderDefaultTariffs();
  }

  // 2) Логика кнопки очистки
  clearBtn.style.display = "none";
  input.addEventListener("input", () => {
    clearBtn.style.display = input.value.trim() ? "block" : "none";
  });
  clearBtn.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    input.focus();
    if (tarifsContainer) {
      renderDefaultTariffs();
    }
  });

  // 3) Кастомный маркер
  const customIcon = L.icon({
    iconUrl: customPin,
    iconSize: [28, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  // 4) Стили зон
  const zoneStyle = {
    color: "rgba(72, 165, 232, 1)",
    weight: 0,
    fillColor: "rgba(72, 165, 232, 1)",
    fillOpacity: 0.5
  };
  const activeZoneStyle = {
    color: "rgb(72, 165, 232)",
    weight: 5,
    fillColor: "rgba(72, 165, 232, 1)",
    fillOpacity: 0.3
  };

  // 5) Данные зон с их тарифами
  const zones = [
    {
      id: 1,
      name: "Zone A — Downtown",
      coordinates: [
        [29.6905, -96.9220],
        [29.6965, -96.9100],
        [29.6880, -96.8990],
        [29.6820, -96.9120]
      ],
      tariffs: [
        {
          name: "Basic",
          description: "For those who value simplicity",
          speed: "Up to 10 Mbit/s",
          unlimitedData: true,
          options: ["YouTube in 720p", "Social media with no lag"],
          price: "$25"
        },
        {
          name: "Medium",
          description: "For an active online life",
          speed: "Up to 25 Mbit/s",
          unlimitedData: true,
          options: ["YouTube in 1080p", "Online gaming (low ping)"],
          price: "$35",
          isOnSale: true,
          discountPercent: 18,
          oldPrice: "$35",
          newPrice: "$28"
        }
      ]
    },
    {
      id: 2,
      name: "Zone B — Suburbs",
      coordinates: [
        [29.70, -96.90],
        [29.74, -96.90],
        [29.74, -96.88],
        [29.72, -96.88],
        [29.72, -96.86],
        [29.70, -96.86]
      ],
      tariffs: [
        {
          name: "Medium",
          description: "For an active online life",
          speed: "Up to 25 Mbit/s",
          unlimitedData: true,
          options: ["Social media with no lag", "Movies in 4K"],
          price: "$40"
        },
        {
          name: "Premium",
          description: "For streaming & gaming",
          speed: "Up to 50 Mbit/s",
          unlimitedData: true,
          options: ["Movies in 4K", "Multi-streaming"],
          price: "$55",
          isOnSale: true,
          discountPercent: 20,
          oldPrice: "$55",
          newPrice: "$44"
        }
      ]
    },
    {
      id: 3,
      name: "Zone C — Farmland",
      coordinates: [
        [29.68, -97.10],
        [29.69, -97.09],
        [29.675, -97.08],
        [29.665, -97.095]
      ],
      tariffs: [
        {
          name: "Premium",
          description: "For streaming & gaming",
          speed: "Up to 50 Mbit/s",
          unlimitedData: true,
          options: ["Cloud work", "Perfect for gaming"],
          price: "$60"
        }
      ]
    }
  ];

  // 6) Инициализируем карту
  const map = L.map(mapEl, { fullscreenControl: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  map.fitBounds(L.latLngBounds(zones.flatMap(z => z.coordinates)));

  // 7) Переносим свою SVG-иконку в кнопку Fullscreen
  const fsBtn = document.querySelector(".leaflet-control-zoom-fullscreen");
  const mc = map.getContainer();
  if (fsBtn && !fsBtn.querySelector("svg")) {
    fsBtn.innerHTML = `
      <img src="/img/leaflet-fullscreen.png" alt="fullscreen" style="width:20px;height:20px">
    `;
  }
  if (fsBtn && mc) {
    fsBtn.classList.add("custom-fullscreen-button");
    mc.appendChild(fsBtn);
  }

  let marker = null;
  let activePoly = null;

  // 8) Добавляем на карту полигоны + клики
  const polygons = zones.map(z => {
    const poly = L.polygon(z.coordinates, zoneStyle).addTo(map);
    poly.on("click", () => {
      if (activePoly) activePoly.setStyle(zoneStyle);
      poly.setStyle(activeZoneStyle);
      activePoly = poly;
      renderTariffs(z);
      showZonePopup(z);
    });
    return { zone: z, poly };
  });

  // 9) Рендерим тарифы выбранной зоны
  function renderTariffs(zone) {
    if (!tarifsContainer) return;
    tarifsContainer.innerHTML = "";
    zone.tariffs.forEach(t => {
      const saleClass = t.isOnSale ? " tarif--action" : "";
      const sticker = t.isOnSale
        ? `<div class="tarif-sticker">-${t.discountPercent}%</div>`
        : "";
      tarifsContainer.innerHTML += `
        <div class="tarif${saleClass}">
          ${sticker}
          <div class="tarif-content">
            <div class="tarif-content__start">
              <h3>${t.name}</h3>
              <p>${t.description}</p>
            </div>
            <div class="tarif-content__medium">
              <p class="tarif-content__strong">${t.speed}</p>
              <p>${t.unlimitedData ? "Unlimited data" : "Data capped"}</p>
            </div>
            <div class="tarif-content__end">
              <p><strong>Best for:</strong></p>
              <div class="tarif-content__options tarif-options">
                ${t.options
          .map(
            opt => `
                  <div class="tarif-options__item">
                    <span class="tarif-options__icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="10" fill="#F03F27"/>
                        <path d="M15.5309 5.63315...Z" fill="white" stroke="white" stroke-width="0.25"/>
                      </svg>
                    </span>
                    <span class="tarif-options__text">${opt}</span>
                  </div>`
          )
          .join("")}
              </div>
            </div>
          </div>
          <div class="tarif-conversion">
            <div class="tarif-conversion__price">
              ${t.isOnSale
          ? `<div class="tarif-conversion__price--action price-action">
                       <p class="price-action__new">${t.newPrice} <span>/mo.</span></p>
                       <p class="price-action__old">${t.oldPrice} <span>/mo.</span></p>
                     </div>`
          : `<div class="tarif-conversion__price--standard">
                       <p>${t.price} <span>/mo.</span></p>
                     </div>`
        }
            </div>
            <div class="tarif-conversion__button">
              <button class="hero-content__cta" data-scroll-to="#tarifs">
                Check internet availability
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  // 10) Показываем попап (для клика по зоне или по месту)
  function showZonePopup(zone, latlng) {
    let popupLatLng = latlng;
    if (!popupLatLng) {
      const coords = [
        [
          ...zone.coordinates.map(c => [c[1], c[0]]),
          [zone.coordinates[0][1], zone.coordinates[0][0]]
        ]
      ];
      const center = turf.center(turf.polygon(coords)).geometry.coordinates;
      popupLatLng = [center[1], center[0] + 0.01];
    }
    const html = `
      <div class="tariff-popup">
        <p class="tariff-popup__zone">${zone.name}</p>
        <div class="tariff-popup__items">
          ${zone.tariffs
        .map(
          t => `
            <div class="tariff-popup__item">
              <p class="tariff-popup__name">${t.name}</p>
              <div class="tariff-popup__data">
                <p class="tariff-popup__price">
                  <span>${t.isOnSale ? t.newPrice : t.price}</span>/Month
                </p>
                <p class="tariff-popup__speed">${t.speed}</p>
              </div>
            </div>`
        )
        .join("")}
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

  // 11) Поиск по адресу
  async function performSearch() {
    const q = input.value.trim();
    if (!q) return;

    let data;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(q)}&format=json`
      );
      data = await res.json();
    } catch {
      alert("Search error");
      return;
    }

    // не найден
    if (!data.length) {
      L.popup({
        closeOnClick: true,
        autoClose: true,
        autoPan: true,
        autoPanPadding: [50, 50]
      })
        .setLatLng(map.getCenter())
        .setContent(`
          <div class="tariff-popup">
            <p><strong>We couldn't find an address:</strong><br><em>${q}</em></p>
            <p>Please check the accuracy of your details or <a href="/#contacts">contact us</a>.</p>
          </div>
        `)
        .openOn(map);
      if (tarifsContainer) {
        renderDefaultTariffs();
      }
      return;
    }

    const { lat, lon } = data[0];

    if (marker) map.removeLayer(marker);
    marker = L.marker([+lat, +lon], { icon: customIcon }).addTo(map);

    const pt = turf.point([+lon, +lat]);
    const found = polygons.find(({ zone }) => {
      const coords = [
        [
          ...zone.coordinates.map(c => [c[1], c[0]]),
          [zone.coordinates[0][1], zone.coordinates[0][0]]
        ]
      ];
      return turf.booleanPointInPolygon(pt, turf.polygon(coords));
    });

    if (activePoly) activePoly.setStyle(zoneStyle);
    if (found) {
      found.poly.setStyle(activeZoneStyle);
      activePoly = found.poly;
    } else {
      activePoly = null;
    }

    map.flyTo([+lat, +lon], 14);
    map.once("moveend", () => {
      if (!found) {
        L.popup({
          closeOnClick: true,
          autoClose: true,
          autoPan: true,
          autoPanPadding: [50, 50]
        })
          .setLatLng([+lat, +lon])
          .setContent(`
            <div class="tariff-popup">
              <p><strong>We don’t have a network here yet</strong></p>
              <p>We’re expanding — <a href="/#contacts">leave a request</a>.</p>
            </div>
          `)
          .openOn(map);
        if (tarifsContainer) {
          renderDefaultTariffs();
        }
      } else {
        renderTariffs(found.zone);
        showZonePopup(found.zone, [+lat, +lon]);
      }
    });
  }

  checkBtn.addEventListener("click", performSearch);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch();
    }
  });
}

// Запускаем после загрузки DOM
document.addEventListener("DOMContentLoaded", initCoverageMap);