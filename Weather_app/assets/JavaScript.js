function toggleSidebar() {
  const sidebar = document.querySelector(".left-aside-height");
  sidebar.classList.toggle("expanded");
  document.querySelector(".tq-weather2").classList.toggle("display-none");
}
let currentIndex = 0;
const totalItems = 10;
const visibleItems = 6;
const wrapper = document.getElementById("sliderWrapper");

function moveSlide(direction) {
  // Cập nhật vị trí hiện tại (giới hạn từ 0 đến 4, vì 10 - 6 = 4 bước nhảy)
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > totalItems - visibleItems) {
    currentIndex = totalItems - visibleItems;
  }

  // Tính toán khoảng cách dịch chuyển (%)
  // Mỗi bước nhảy tương đương với chiều rộng của 1 card + gap
  const step = 400 / visibleItems;
  wrapper.style.transform = `translateX(-${currentIndex * step}%)`;
}

// 1. Lấy tất cả các div tháng bên trong container
const months = document.querySelectorAll(".slider-month div");

// 2. Lấy chỉ số tháng hiện tại (0 cho tháng 1, 1 cho tháng 2,...)
const currentMonthIndex = new Date().getMonth();

// 3. Thêm class "active-month" vào div tương ứng
if (months[currentMonthIndex]) {
  months[currentMonthIndex].classList.add("active-month");
}
const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const currentMonthName = monthNames[new Date().getMonth()];
const activeElement = document.querySelector(`.${currentMonthName}`);

if (activeElement) {
  activeElement.classList.add("active-month");
}
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleString("vi-VN");

  // Giả sử bạn có một thẻ <div id="clock"></div> trong HTML
  document.getElementById("clock").innerText = timeString;
}

// Chạy hàm mỗi 1000ms (1 giây)
setInterval(updateClock, 1000);

const dates = document.querySelectorAll(".slider-date th");
const currentDate = new Date().getDate();

dates.forEach((date) => {
  if (parseInt(date.innerText) === currentDate) {
    date.classList.add("active-date");
  }
});

function updateClock() {
  const now = new Date();
  // Lay gio, phut
  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  // Chuoi thoi gian dang HH:MM
  const timeString = hours + ":" + minutes;
  document.querySelector("#clock").innerText = timeString;
}
// Cap nhat dong ho moi giay
setInterval(updateClock, 1000);

// API Thời tiết
const apiKey = "92bd3f99fe9ef43988f52adfacacfd7e";
const city = "Hanoi";

async function fetchWeather() {
  const cacheKey = `weather-${city}`;
  const cachedData = localStorage.getItem(cacheKey);
  const now = new Date().getTime();

  // 1. Kiểm tra xem có dữ liệu trong cache không và đã quá 10 phút chưa (600.000 ms)
  if (cachedData) {
    const parsedCache = JSON.parse(cachedData);
    if (now - parsedCache.timestamp < 600000) {
      console.log("Sử dụng dữ liệu từ cache (chạy siêu nhanh)");
      renderWeather(parsedCache.data);
      return; // Thoát hàm, không gọi API nữa
    }
  }

  // 2. Nếu không có cache hoặc cache quá cũ, tiến hành gọi API
  try {
    console.log("Gọi API mới...");
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      // Lưu dữ liệu vào localStorage kèm mốc thời gian
      const cacheObject = {
        timestamp: now,
        data: data,
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheObject));

      renderWeather(data);
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// 3. Tách phần hiển thị dữ liệu ra một hàm riêng để dùng chung
function renderWeather(data) {
  document.getElementById("temperature").innerText = Math.round(data.main.temp);
  document.getElementById("description").innerText =
    data.weather[0].description;
  document.getElementById("feels-like-temp").innerText = Math.round(
    data.main.feels_like,
  );

  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("wind-speed").innerText = `${data.wind.speed} km/giờ`;
  document.getElementById("humidity").innerText = `${data.main.humidity}%`;
  document.getElementById("visibility").innerText =
    `${data.visibility / 1000} km`;
  document.getElementById("pressure").innerText = `${data.main.pressure} mb`;

  // Tính điểm sương
  const dewPoint = data.main.temp - (100 - data.main.humidity) / 5;
  document.getElementById("dew-point").innerText = Math.round(dewPoint);
}

// Chạy hàm
fetchWeather();

function loadMap() {
  // 1. Kiểm tra xem trình duyệt có hỗ trợ định vị không
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // 2. Khởi tạo bản đồ tại vị trí người dùng
        const map = L.map("map").setView([lat, lon], 13);

        // 3. Thêm lớp hình ảnh bản đồ từ OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        // 4. Thêm một Marker (điểm đánh dấu) tại vị trí hiện tại
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup("Bạn đang ở đây!")
          .openPopup();
      },
      function (error) {
        console.error("Không thể lấy vị trí: ", error.message);
      },
    );
  } else {
    alert("Trình duyệt của bạn không hỗ trợ định vị GPS.");
  }
}

// Gọi hàm khi trang web tải xong
window.onload = loadMap;

// Thêm hàm này vào file JS của bạn
async function fetchForecast() {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=vi&appid=${apiKey}`;

  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    if (data.cod === "200") {
      // Lọc dữ liệu: lấy mốc 12:00 trưa hàng ngày
      const dailyData = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00"),
      );
      const cards = document.querySelectorAll("#sliderWrapper .card");

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      cards.forEach((card, index) => {
        // Lấy dữ liệu mốc thời gian (dùng % để lặp lại dữ liệu nếu API free không đủ 10-12 ngày)
        const dayData = dailyData[index % dailyData.length];
        const date = new Date(dayData.dt * 1000);

        // Xác định nhãn ngày
        const daysOfWeek = [
          "CN",
          "Th 2",
          "Th 3",
          "Th 4",
          "Th 5",
          "Th 6",
          "Th 7",
        ];
        let dayLabel = daysOfWeek[date.getDay()];

        // Kiểm tra logic Hôm qua / Hôm nay
        if (date.toDateString() === today.toDateString()) {
          dayLabel = "Hôm Nay";
        } else if (date.toDateString() === yesterday.toDateString()) {
          dayLabel = "Hôm Qua";
        }

        // Đổ dữ liệu vào card theo style image_d51cd9.png
        card.innerHTML = `
          <div class="card-content color-white">
          <div class="card-date-day d-flex align-items-center justify-content-between">
          <div class="card-date">${date.getDate()}</div>
          <div class="card-day">${dayLabel}</div>
          </div>
          <div class="d-flex">
          <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png" alt="icon" style="filter: sepia(1) saturate(5) hue-rotate(10deg) brightness(1.2);">
          <div class="card-temp d-flex flex-direction-column justify-content-center">
            <span class="max">${Math.round(dayData.main.temp_max)}°</span>
            <span class="min">${Math.round(dayData.main.temp_min - 2)}°</span>
          </div>
          </div>
          </div>
        `;
      });
    }
  } catch (error) {
    console.error("Lỗi lấy dự báo:", error);
  }
}

fetchForecast();

const ctx = document.getElementById("weatherChart").getContext("2d");

// Tạo dải màu Gradient cho vùng dưới đường cong
const gradient = ctx.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "rgba(165, 126, 93, 0.5)"); // Màu nâu cam
gradient.addColorStop(1, "rgba(30, 37, 53, 0)"); // Mờ dần về nền

const weatherChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "00:00",
      "02:00",
      "04:00",
      "06:00",
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
      "22:00",
    ],
    datasets: [
      {
        data: [20, 19, 19, 19, 19, 21, 24, 25, 26, 23, 22, 22],
        borderColor: "#a57e5d",
        borderWidth: 2,
        fill: true,
        backgroundColor: gradient,
        tension: 0.4, // Tạo độ cong cho đường kẻ
        pointRadius: 0, // Ẩn các điểm tròn trên đường
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false }, // Ẩn trục X gốc vì ta đã tự tạo nhãn phía trên
      y: {
        ticks: { color: "#666" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  },
});

async function updateWeatherChart() {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=vi&appid=${apiKey}`;

  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    if (data.cod === "200") {
      // 1. Lấy 8 mốc thời gian tiếp theo (tương đương 24 giờ tới)
      const next24Hours = data.list.slice(0, 12);

      const labels = [];
      const temps = [];
      const humidity = [];
      let hourlyHtml = "";
      let humidityHtml = "";

      next24Hours.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours().toString().padStart(2, "0") + ":00";
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const hum = item.main.humidity;

        labels.push(hour);
        temps.push(temp);
        humidity.push(hum);

        // Tạo HTML cho hàng nhãn phía trên biểu đồ (Giờ -> Icon -> Nhiệt độ)
        hourlyHtml += `
                    <div class="text-center" style="flex: 1;">
                        <div class="text-grey" style="font-size: 12px;">${hour}</div>
                        <img src="https://openweathermap.org/img/wn/${icon}.png" style="width: 30px;">
                        <div style="font-weight: bold;">${temp}°</div>
                    </div>
                `;

        // Tạo HTML cho hàng độ ẩm phía dưới biểu đồ
        humidityHtml += `<span style="flex: 1; text-align: center;">💧 ${hum}%</span>`;
      });

      // 2. Cập nhật giao diện HTML
      document.querySelector(".hourly-forecast-labels").innerHTML = hourlyHtml;
      document.querySelector(".precipitation-bar").innerHTML = humidityHtml;

      // 3. Cập nhật dữ liệu vào Chart.js
      weatherChart.data.labels = labels;
      weatherChart.data.datasets[0].data = temps;

      // Hiệu ứng vẽ lại biểu đồ
      weatherChart.update();
    }
  } catch (error) {
    console.error("Lỗi cập nhật biểu đồ:", error);
  }
}

// Gọi hàm sau khi đã khởi tạo weatherChart
updateWeatherChart();
function updateDetailedGrid(data) {
  if (!data) return;

  // Cập nhật giá trị số
  document.getElementById("detail-temp").innerText =
    Math.round(data.main.temp) + "°";
  document.getElementById("detail-feels").innerText =
    Math.round(data.main.feels_like) + "°";
  document.getElementById("detail-hum").innerText = data.main.humidity + "%";
  document.getElementById("pres-val").innerText = data.main.pressure;
  document.getElementById("vis-val").innerText = data.visibility / 1000;
  document.getElementById("wind-val").innerText = Math.round(
    data.wind.speed * 3.6,
  );

  // Xử lý AQI và UV (Nếu có API bổ sung)
  // Giả lập theo ảnh mẫu của bạn
  document.getElementById("aqi-val").innerText = "159";
  document.getElementById("uv-gauge").innerText = "4";
}

function renderWeather(data) {
  // 12 chỉ số chi tiết
  document.getElementById("uv-val").innerText = "4"; // Thường cần API OneCall
  document.getElementById("aqi-val").innerText = "159"; // Cần API Air Pollution
  document.getElementById("visibility-val").innerText = data.visibility / 1000;
  document.getElementById("pressure-val").innerText = data.main.pressure;
  document.getElementById("current-temp-val").innerText =
    Math.round(data.main.temp) + "°";
  document.getElementById("feels-like-val").innerText =
    Math.round(data.main.feels_like) + "°";
  document.getElementById("wind-val").innerText = Math.round(
    data.wind.speed * 3.6,
  );
  document.getElementById("hum-val").innerText = data.main.humidity + "%";

  // Cập nhật màu AQI nếu xấu
  const aqiBox = document.getElementById("aqi-val").parentElement.parentElement;
  if (159 > 150) {
    aqiBox.querySelector(".status-text").classList.add("warning");
  }
}
