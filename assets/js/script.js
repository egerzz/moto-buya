/* MOTO.BUYA - ana script dosyası */

document.addEventListener("DOMContentLoaded", () => {
  initScrollTopButon();
  initNavbarActiveLink();
  initFormValidation();
  initSepetSayaci();
  initKaranlıkModTuşu();
  initTooltipsVePopovers();
});

/* -------------------------------------------------------------------------
   1) YUKARI ÇIK BUTONU
------------------------------------------------------------------------- */
function initScrollTopButon() {
  const btn = document.querySelector(".zp-scrolltop");
  if (!btn) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        btn.classList.toggle("show", window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* -------------------------------------------------------------------------
   2) NAVBAR'DA "AKTİF SAYFA" LİNKİNİ OTOMATİK İŞARETLEME
------------------------------------------------------------------------- */
function initNavbarActiveLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".zp-navbar .nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* -------------------------------------------------------------------------
   3) BOOTSTRAP FORM DOĞRULAMA (VALIDATION) ŞABLONU
------------------------------------------------------------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll(".needs-validation");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        showToast("Form başarıyla gönderildi.", "success");
        form.reset();
        form.classList.remove("was-validated");
      }
      form.classList.add("was-validated");
    }, false);
  });
}

/* -------------------------------------------------------------------------
   4) SEPET (localStorage)
------------------------------------------------------------------------- */
function sepetiOku() {
  try {
    const veri = JSON.parse(localStorage.getItem("zp_sepet") || "[]");
    return Array.isArray(veri) ? veri : [];
  } catch (e) {
    return [];
  }
}

function sepetiKaydet(sepet) {
  localStorage.setItem("zp_sepet", JSON.stringify(sepet));
  sepetSayaciniGuncelle();
}

function sepeteEkle(urun, adet = 1) {
  const sepet = sepetiOku();
  const mevcut = sepet.find((u) => u.id === urun.id);
  if (mevcut) {
    mevcut.adet += adet;
  } else {
    sepet.push({ ...urun, adet });
  }
  sepetiKaydet(sepet);
}

function sepettenSil(id) {
  sepetiKaydet(sepetiOku().filter((u) => u.id !== id));
}

function adetGuncelle(id, adet) {
  const sepet = sepetiOku();
  const urun = sepet.find((u) => u.id === id);
  if (!urun) return;
  urun.adet = Math.max(1, adet || 1);
  sepetiKaydet(sepet);
}

function sepetToplamAdet() {
  return sepetiOku().reduce((t, u) => t + u.adet, 0);
}

function sepetAraToplam() {
  return sepetiOku().reduce((t, u) => t + u.fiyat * u.adet, 0);
}

function paraFormat(sayi) {
  return "₺" + sayi.toLocaleString("tr-TR");
}

function sepetSayaciniGuncelle() {
  document.querySelectorAll("[data-zp-cart-count]").forEach((badge) => {
    const sayi = sepetToplamAdet();
    badge.textContent = sayi;
    badge.classList.toggle("d-none", sayi === 0);
  });
}

function initSepetSayaci() {
  // Eski sürümden kalan sahte sayaç verisini temizle
  localStorage.removeItem("zp_sepet_sayisi");

  document.querySelectorAll("[data-zp-sepete-ekle]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const urun = {
        id: btn.dataset.zpUrunId,
        ad: btn.dataset.zpUrunAdi || "Ürün",
        fiyat: parseFloat(btn.dataset.zpFiyat) || 0,
        emoji: btn.dataset.zpEmoji || "🎁",
        // Görsel yolu site köküne göre saklanır (assets/img/...);
        // sepet sayfası pages/ içinde olduğu için başına "../" ekleyerek kullanır.
        gorsel: btn.dataset.zpGorsel || "",
      };
      if (!urun.id || !urun.fiyat) return;

      // Ürün detay sayfasında adet seçici varsa onu kullan
      const adetInput = document.getElementById("adetInput");
      const adet = btn.hasAttribute("data-zp-adet-kaynak") && adetInput
        ? Math.max(1, parseInt(adetInput.value, 10) || 1)
        : 1;

      sepeteEkle(urun, adet);
      showToast(`"${urun.ad}" sepete eklendi (${adet} adet).`, "success");
    });
  });

  sepetSayaciniGuncelle();
}

/* -------------------------------------------------------------------------
   5) KARANLIK MOD (DARK MODE) ANAHTARI
------------------------------------------------------------------------- */
function initKaranlıkModTuşu() {
  const toggle = document.querySelector("[data-zp-theme-toggle]");
  const htmlEl = document.documentElement;
  const kayitliTema = localStorage.getItem("zp_tema");

  if (kayitliTema) {
    htmlEl.setAttribute("data-bs-theme", kayitliTema);
  }
  guncelleIkon();

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const suankiTema = htmlEl.getAttribute("data-bs-theme") || "light";
    const yeniTema = suankiTema === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-bs-theme", yeniTema);
    localStorage.setItem("zp_tema", yeniTema);
    guncelleIkon();
  });

  function guncelleIkon() {
    if (!toggle) return;
    const aktifKoyu = htmlEl.getAttribute("data-bs-theme") === "dark";
    toggle.textContent = aktifKoyu ? "Aydınlık Mod" : "Karanlık Mod";
  }
}

/* -------------------------------------------------------------------------
   6) TOOLTIP VE POPOVER BAŞLATMA
------------------------------------------------------------------------- */
function initTooltipsVePopovers() {
  const tooltipTetikleyiciler = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTetikleyiciler.forEach((el) => new bootstrap.Tooltip(el));

  const popoverTetikleyiciler = document.querySelectorAll('[data-bs-toggle="popover"]');
  popoverTetikleyiciler.forEach((el) => new bootstrap.Popover(el));
}

/* -------------------------------------------------------------------------
   7) YARDIMCI FONKSİYON: PROGRAMATİK TOAST GÖSTERME
------------------------------------------------------------------------- */
function showToast(mesaj, tur = "success") {
  const konteyner = document.querySelector(".toast-container");
  if (!konteyner) return;

  const renkSinifi = tur === "success" ? "text-bg-success" : "text-bg-danger";
  const toastEl = document.createElement("div");
  toastEl.className = `toast align-items-center ${renkSinifi} border-0`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${mesaj}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Kapat"></button>
    </div>`;

  konteyner.appendChild(toastEl);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();

  // Bellek sızıntısı olmaması için toast kapanınca DOM'dan tamamen kaldırıyoruz.
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}
