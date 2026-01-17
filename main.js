// main.js

document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("so-gio");
  const addAlert = document.getElementById("tb-them");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const cart = getCart();
    if (cartCount) cartCount.textContent = cart.length;
  }

  function showAlert() {
    if (!addAlert) return;
    addAlert.style.display = "block";
    setTimeout(() => (addAlert.style.display = "none"), 1200);
  }

  // Gắn sự kiện cho tất cả nút "Thêm vào giỏ hàng"
  document.querySelectorAll(".them-gio").forEach((btn) => {
    btn.addEventListener("click", function () {
      const product = {
        name: this.dataset.name,
        price: Number(this.dataset.price),
        img: this.dataset.img,
      };

      const cart = getCart();
      cart.push(product);
      setCart(cart);

      updateCartCount();
      showAlert();
    });
  });

  // Cập nhật số giỏ khi tải trang
  updateCartCount();
});
      