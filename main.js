// main.js

ddocument.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("so-gio");
  const addAlert = document.getElementById("tb-them");

  function layGioHang() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function luuGioHang(gioHang) {
    localStorage.setItem("cart", JSON.stringify(gioHang));
  }

  function capNhatSoGio() {
    const gioHang = layGioHang();
    if (cartCount) cartCount.textContent = gioHang.length;
  }

  function hienThongBao() {
    if (!addAlert) return;
    addAlert.style.display = "block";
    setTimeout(() => (addAlert.style.display = "none"), 1200);
  }

  document.querySelectorAll(".them-gio").forEach((nut) => {
    nut.addEventListener("click", function () {
      const sanPham = {
        name: this.dataset.name,
        price: Number(this.dataset.price),
        img: this.dataset.img,
      };

      const gioHang = layGioHang();
      gioHang.push(sanPham);
      luuGioHang(gioHang);

      capNhatSoGio();
      hienThongBao();
    });
  });

  capNhatSoGio();
});
