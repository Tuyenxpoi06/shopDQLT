// giohang.js

document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cart-list");
  const totalPriceEl = document.getElementById("total-price");
  const clearBtn = document.getElementById("clear-cart");
  const cartCount = document.getElementById("so-gio");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount(cart) {
    if (cartCount) cartCount.textContent = cart.length;
  }

  function formatVND(n) {
    return Number(n || 0).toLocaleString("vi-VN");
  }

  function renderCart() {
    const cart = getCart();
    updateCartCount(cart);

    if (!cartList) return;

    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      cartList.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4">
            Giỏ hàng đang trống.
          </td>
        </tr>`;
      if (totalPriceEl) totalPriceEl.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      const price = Number(item.price) || 0;
      const qty = 1; // hiện tại bạn lưu mỗi lần bấm là 1 dòng → SL = 1
      const lineTotal = price * qty;
      total += lineTotal;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="width:110px">
          <img src="${item.img}" alt="${item.name}" style="width:80px;height:80px;object-fit:cover;border-radius:8px">
        </td>
        <td class="text-start">${item.name}</td>
        <td>${formatVND(price)}</td>
        <td>${qty}</td>
        <td class="fw-semibold">${formatVND(lineTotal)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger" data-remove="${index}">
            Xóa
          </button>
        </td>
      `;

      cartList.appendChild(tr);
    });

    if (totalPriceEl) totalPriceEl.textContent = formatVND(total);
  }

  // Xóa 1 dòng sản phẩm
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;

    const index = Number(btn.dataset.remove);
    const cart = getCart();
    cart.splice(index, 1);
    setCart(cart);
    renderCart();
  });

  // Xóa toàn bộ
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCart();
    });
  }

  renderCart();
});
