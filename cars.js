
document.addEventListener("DOMContentLoaded", function () {
  const cards = [
    { title: "Lightning McQueen", img: "https://i.pinimg.com/originals/8e/e0/66/8ee06671993e7cef3f45e1b6957d79e3.jpg", text: "Lightning McQueen is a red race car, fast and determined. His journey highlights humility, teamwork, and lasting friendships." },
    { title: "Tow Mater", img: "https://images2.fanpop.com/images/photos/8300000/Tow-Mater-disney-pixar-cars-8365921-1700-1100.jpg", text: "Mater is Lightning’s loyal best friend. A rusty tow truck with a big heart and comic charm." },
    { title: "Sally Carrera", img: "https://1.bp.blogspot.com/-O7xVN1fPRLo/T75eBt_Lt9I/AAAAAAAADGc/JrYyAkD888I/s1600/Beautifull_disney_pixar_cars_sally_2.jpg", text: "Sally is a smart Porsche 911 and McQueen’s love interest, dedicated to Radiator Springs." },
    { title: "Doc Hudson", img: "https://simplywallpaper.net/pictures/2010/10/25/dochudson-Pixar-Cars-Wallpaper.jpg", text: "Doc Hudson, the Fabulous Hudson Hornet, is a retired race car who becomes McQueen’s mentor." },
    { title: "Sheriff", img: "https://simplywallpaper.net/pictures/2010/10/27/sheriff-2-Pixar-Cars-Wallpaper.jpg", text: "Sheriff is the local law enforcement in Radiator Springs, keeping the town safe and orderly." },
    { title: "Mack", img: "https://simplywallpaper.net/pictures/2010/10/26/mack-trailer-2-Pixar-Cars-Wallpaper.jpg", text: "Mack is Lightning’s loyal transport truck, always ready to hit the road." }
  ];

  let collection = JSON.parse(localStorage.getItem("myCollection")) || [];

  let selectedMethod = null;
  const paymentOptions = document.querySelectorAll(".payment-option");
  const continueBtn = document.getElementById("continueBtn");

  paymentOptions.forEach(button => {
    button.addEventListener("click", () => {
      paymentOptions.forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      selectedMethod = button.dataset.method;
      continueBtn.disabled = false;
    });
  });

  continueBtn.addEventListener("click", () => {
    if (!selectedMethod) return;

    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const cardModal = document.getElementById("randomCardModal");
    cardModal.querySelector(".card-title").textContent = randomCard.title;
    cardModal.querySelector(".card-img-top").src = randomCard.img;
    cardModal.querySelector(".card-text").textContent = randomCard.text;

    selectedMethod = null;
    paymentOptions.forEach(b => b.classList.remove("active"));
    continueBtn.disabled = true;
  });

  
  document.addEventListener("click", e => {
    if (e.target.classList.contains("collect-card-btn")) {
      const modal = e.target.closest(".modal");
      const title = modal.querySelector(".card-title").textContent;
      const img = modal.querySelector(".card-img-top").src;
      const text = modal.querySelector(".card-text").textContent;

      if (!collection.some(c => c.title === title)) {
        collection.push({ title, img, text });
        localStorage.setItem("myCollection", JSON.stringify(collection));
        alert(`${title} added to collection!`);
      } else {
        alert(`${title} is already in your collection.`);
      }
    }
  });

  
  function renderCollection() {
    const carouselInner = document.querySelector("#collectionModal .carousel-inner");
    carouselInner.innerHTML = "";

    if (collection.length === 0) {
      carouselInner.innerHTML = `<div class="p-5 text-center">No cards collected yet!</div>`;
      return;
    }

    collection.forEach((card, index) => {
      const item = document.createElement("div");
      item.classList.add("carousel-item");
      if (index === 0) item.classList.add("active");
      item.innerHTML = `<img src="${card.img}" class="d-block w-100" alt="${card.title}">`;
      carouselInner.appendChild(item);
    });
  }

  const collectionModal = document.getElementById("collectionModal");
  collectionModal.addEventListener("show.bs.modal", renderCollection);
});

