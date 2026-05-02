/* =====================
   SEARCH FILTER
===================== */
const searchInput = document.getElementById("search");
const cards = document.querySelectorAll(".card");
const suggestionBox = document.getElementById("suggestions");

const dishes = [
  { name: "Biryani", img: "images/biryani.jpeg", tag: "indian" },
  { name: "Butter Chicken", img: "images/butter_chicken.jpeg", tag: "indian" },
  { name: "Paneer Tikka", img: "images/panner_tikka.jpeg", tag: "indian" },
  { name: "Masala Dosa", img: "images/dosa.jpeg", tag: "indian" },
  { name: "Fried Rice", img: "images/fried_rice.jpeg", tag: "asian" },
  { name: "Noodles", img: "images/noodles.jpeg", tag: "asian" },
  { name: "Pizza", img: "images/pizza.jpeg", tag: "fast food" },
  { name: "Burger", img: "images/burger.jpeg", tag: "fast food" },
  { name: "Ice Cream", img: "images/ice_cream.jpeg", tag: "desserts" },
  { name: "Gulab Jamun", img: "images/gulab_jamun.jpeg", tag: "desserts" },
  { name: "Cold Coffee", img: "images/cold_coffee.jpeg", tag: "beverages" },
  { name: "Milkshake", img: "images/milkshake.jpeg", tag: "beverages" },
  { name: "Lemon Iced Tea", img: "images/lemon_iced_tea.jpeg", tag: "beverages" },
  { name: "Masala Chai", img: "images/masala_chai.jpeg", tag: "beverages" },

];

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  suggestionBox.innerHTML = "";

  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(value)
      ? "block"
      : "none";
  });

  if (!value) {
    suggestionBox.style.display = "none";
    return;
  }

  const matches = dishes.filter(d =>
    d.name.toLowerCase().includes(value)
  );

  matches.forEach(item => {
    const highlighted = item.name.replace(
      new RegExp(value, "gi"),
      match => `<b>${match}</b>`
    );

    const div = document.createElement("div");
    div.className = "suggestion-item";
    div.innerHTML = `
      <img src="${item.img}">
      <span>${highlighted}</span>
    `;

    div.onclick = () => {
      searchInput.value = item.name;
      suggestionBox.style.display = "none";
      searchInput.dispatchEvent(new Event("input"));
      saveRecent(item.name);
    };

    suggestionBox.appendChild(div);
  });

  suggestionBox.style.display = matches.length ? "block" : "none";
});

/* =====================
   FILTERS
===================== */
function applyFilter(type) {
  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(type)
      ? "block"
      : "none";
  });
}

/* =====================
   VOICE SEARCH
===================== */
function startVoiceSearch() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice search not supported");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-IN";
  recognition.start();

  recognition.onresult = e => {
    searchInput.value = e.results[0][0].transcript;
    searchInput.dispatchEvent(new Event("input"));
  };
}

/* =====================
   RECENT SEARCHES
===================== */
function saveRecent(term) {
  let recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
  recent = [term, ...recent.filter(t => t !== term)].slice(0, 5);
  localStorage.setItem("recentSearches", JSON.stringify(recent));
}

/* =====================
   MENU SCROLL FIX
===================== */
function scrollToMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.scrollIntoView({ behavior: "smooth" });
  }
}

/* =====================
   LOCATION MODAL FIX
===================== */
function openLocation() {
  const modal = document.getElementById("locationModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeLocation() {
  const modal = document.getElementById("locationModal");
  if (modal) {
    modal.style.display = "none";
  }
}

/* =====================
   ORDER MODAL FIX
===================== */
const orderModal = document.getElementById("orderModal");

document.querySelectorAll(".order-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    orderModal.style.display = "flex";
  });
});

function closeModal() {
  orderModal.style.display = "none";
}

