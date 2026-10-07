XD
const services = [
  {
    id: 1,
    name: "Web Development",
    price: 150,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80"
  },
  {
    id: 2,
    name: "UI/UX Design",
    price: 80,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80"
  },
  {
    id: 3,
    name: "SEO Optimization",
    price: 60,
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=400&q=80"
  },
  {
    id: 4,
    name: "Content Writing",
    price: 45,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80"
  }
];

let addedItems = [];


const servicesGrid = document.getElementById("servicesGrid");
const addedItemsContainer = document.getElementById("addedItemsContainer");
const totalAmountEl = document.getElementById("totalAmount");
const bookingForm = document.getElementById("bookingForm");
const logoutBtn = document.getElementById("logoutBtn");
const reviewCartBtn = document.getElementById("reviewCartBtn");
const quickBookBtn = document.getElementById("quickBookBtn");

function renderServices() {
  servicesGrid.innerHTML = "";
  services.forEach((service) => {
    const card = document.createElement("div");
    card.className = "service-card";
    card.id = `service-${service.id}`;

    card.innerHTML = `
      <img src="${service.image}" alt="${service.name}">
      <div class="card-details">
        <h4 class="card-title">${service.name}</h4>
        <p class="card-price">$${service.price}</p>
        <div class="card-actions">
          <button class="btn-add" onclick="addItem(${service.id})">Add Item</button>
          <button class="btn-skip" onclick="skipItem(${service.id})">Skip Item</button>
        </div>
      </div>
    `;
    servicesGrid.appendChild(card);
  });
}

function addItem(serviceId) {
  const service = services.find((s) => s.id === serviceId);
  if (!service) return;

  addedItems.push(service);
  updateCartDisplay();
}

function skipItem(serviceId) {
  const card = document.getElementById(`service-${serviceId}`);
  if (card) {
    card.style.display = "none";
  }
}

function updateCartDisplay() {
  addedItemsContainer.innerHTML = "";

  if (addedItems.length === 0) {
    addedItemsContainer.innerHTML = `<p class="empty-msg">No items have been added.</p>`;
    totalAmountEl.textContent = "0";
    return;
  }

  let total = 0;
  addedItems.forEach((item, index) => {
    total += item.price;

    const itemEl = document.createElement("div");
    itemEl.className = "added-item";
    itemEl.innerHTML = `
      <span><strong>${item.name}</strong> - $${item.price}</span>
      <button style="border:none; background:transparent; color:#dc3545; cursor:pointer;" onclick="removeItem(${index})">&times;</button>
    `;
    addedItemsContainer.appendChild(itemEl);
  });

  totalAmountEl.textContent = total;
}

function removeItem(index) {
  addedItems.splice(index, 1);
  updateCartDisplay();
}

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;

  if (addedItems.length === 0) {
    alert("Please add at least one service before booking.");
    return;
  }

  alert(`Thank you, ${name}! Your booking for ${addedItems.length} service(s) has been received.`);
  bookingForm.reset();
  addedItems = [];
  updateCartDisplay();
});

logoutBtn.addEventListener("click", () => {
  alert("Logging out...");
});

reviewCartBtn.addEventListener("click", () => {
  alert(`Items in cart: ${addedItems.length}. Total: $${totalAmountEl.textContent}`);
});

quickBookBtn.addEventListener("click", () => {
  document.getElementById("fullName").focus();
});

renderServices();
updateCartDisplay();