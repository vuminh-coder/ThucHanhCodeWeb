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
