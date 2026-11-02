/* MOTO.BUYA - ürün detay sayfası
   ---------------------------------------------------------------------------
   urun-detay.html tek bir ŞABLON sayfadır. Hangi ürünün gösterileceğini
   adres söyler:  urun-detay.html?id=v003  → Karbon Korumalı Eldiven

   Akış:
     1) Adresten id'yi oku
     2) urunServisi'nden o ürünü iste
     3) Ürün yoksa "Ürün bulunamadı" kutusunu göster
     4) Varsa sayfadaki boş kutuları ürünün bilgileriyle doldur
--------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", async () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const urun = id ? await urunServisi.idIleGetir(id) : null;

  if (!urun) {
    document.getElementById("urunYok").classList.remove("d-none");
    document.getElementById("bcUrun").textContent = "Ürün bulunamadı";
    document.title = "Ürün bulunamadı | MOTO.BUYA";
    return;
  }

  urunuGoster(urun);
  document.getElementById("urunIcerik").classList.remove("d-none");
  adetSeciciyiBaslat(urun.stok);
});

/* Metni HTML'e güvenle yerleştirmek için (<, >, & gibi karakterleri kaçırır) */
function guvenli(metin) {
  const div = document.createElement("div");
  div.textContent = metin;
  return div.innerHTML;
}

/* Veride yollar site köküne göre ("assets/img/...") yazılı.
   Bu sayfa pages/ klasöründe olduğu için başına "../" ekliyoruz. */
function sayfadanYol(kokYolu) {
  return "../" + kokYolu;
}

function urunuGoster(urun) {
  // --- Başlık ve breadcrumb ---
  document.title = `${urun.ad} | MOTO.BUYA`;
  document.getElementById("bcUrun").textContent = urun.ad;
  const bcKategori = document.getElementById("bcKategori");
  const bcLink = bcKategori.querySelector("a");
  bcLink.textContent = KATEGORI_ADLARI[urun.kategori] || urun.kategori;
  bcLink.href = `urunler.html?kategori=${encodeURIComponent(urun.kategori)}`;
  bcKategori.classList.remove("d-none");

  // --- Rozet ---
  if (urun.rozet) {
    const rozet = document.getElementById("urunRozet");
    rozet.textContent = urun.rozet.metin;
    rozet.classList.add(`text-bg-${urun.rozet.renk}`);
    rozet.classList.remove("d-none");
  }

  // --- Ad, puan, fiyat, kısa açıklama ---
  document.getElementById("urunAd").textContent = urun.ad;

  const tamYildiz = Math.floor(urun.puan);
  document.getElementById("urunPuan").innerHTML =
    `<span aria-label="5 üzerinden ${urun.puan} puan">` +
    "⭐".repeat(tamYildiz) +
    `<span class="text-muted">${"☆".repeat(5 - tamYildiz)}</span></span> ` +
    `<span class="text-muted small">(${urun.degerlendirme} değerlendirme)</span>`;

  document.getElementById("urunFiyat").innerHTML = urun.eskiFiyat
    ? `<span class="zp-price">${paraFormat(urun.fiyat)}</span> <span class="zp-price-old fs-5">${paraFormat(urun.eskiFiyat)}</span>`
    : `<span class="zp-price">${paraFormat(urun.fiyat)}</span>`;

  document.getElementById("urunKisaAciklama").textContent = urun.kisaAciklama;

  // --- Galeri (carousel) ---
  galeriyiCiz(urun);

  // --- Stok + öne çıkan özellik + bedenler listesi ---
  let stokRozeti;
  if (urun.stok === 0) stokRozeti = `<span class="badge text-bg-danger">Tükendi</span>`;
  else if (urun.stok <= 5) stokRozeti = `<span class="badge text-bg-warning">Son ${urun.stok} adet</span>`;
  else stokRozeti = `<span class="badge text-bg-success">Stokta (${urun.stok} adet)</span>`;

  const satirlar = [`<li class="list-group-item d-flex justify-content-between px-0"><span>Stok Durumu</span>${stokRozeti}</li>`];

  // Özellik tablosunun ilk satırını üstte de göster (kaskta "Kabuk", montta "Malzeme" gibi)
  const [ilkBaslik, ilkDeger] = Object.entries(urun.ozellikler)[0] || [];
  if (ilkBaslik) {
    satirlar.push(`<li class="list-group-item d-flex justify-content-between px-0"><span>${guvenli(ilkBaslik)}</span><span class="text-end">${guvenli(ilkDeger)}</span></li>`);
  }
  if (urun.bedenler.length) {
    satirlar.push(`<li class="list-group-item d-flex justify-content-between px-0"><span>Bedenler</span><span>${urun.bedenler.map(guvenli).join(" · ")}</span></li>`);
  }
  document.getElementById("urunBilgiListesi").innerHTML = satirlar.join("");

  // --- Sepete ekle butonu: script.js tıklamada bu data-* değerlerini okur ---
  const btn = document.getElementById("sepeteEkleBtn");
  btn.dataset.zpUrunId = urun.id;
  btn.dataset.zpUrunAdi = urun.ad;
  btn.dataset.zpFiyat = urun.fiyat;
  btn.dataset.zpEmoji = urun.emoji;
  btn.dataset.zpGorsel = urun.gorseller[0] || "";
  if (urun.stok === 0) {
    btn.disabled = true;
    btn.textContent = "Tükendi";
  }

  // --- Sekmeler ---
  document.getElementById("urunAciklama").textContent = urun.aciklama;

  document.getElementById("ozellikTablosu").innerHTML = Object.entries(urun.ozellikler)
    .map(([baslik, deger]) => `<tr><th scope="row">${guvenli(baslik)}</th><td>${guvenli(deger)}</td></tr>`)
    .join("");

  document.getElementById("yorumlar-tab").textContent = `Yorumlar (${urun.yorumlar.length})`;
  document.getElementById("yorumListesi").innerHTML = urun.yorumlar.length
    ? urun.yorumlar.map((y) => `
        <div class="d-flex gap-3 mb-3 border-bottom pb-3">
          <div class="zp-feature-icon" style="width:44px;height:44px;font-size:1rem;margin:0;"><i class="bi bi-person"></i></div>
          <div>
            <strong>${guvenli(y.ad)}</strong> <span class="text-muted small">— ${guvenli(y.zaman)}</span>
            <div aria-label="5 üzerinden ${y.puan} puan">${"⭐".repeat(y.puan)}</div>
            <p class="mb-0 small">${guvenli(y.metin)}</p>
          </div>
        </div>`).join("")
    : `<p class="text-muted mb-0">Bu ürün için henüz yorum yok. İlk yorumu siz yazın!</p>`;
}

function galeriyiCiz(urun) {
  const galeri = document.getElementById("galeri");
  const carousel = document.getElementById("urunCarousel");

  // Fotoğraf yoksa ürünün emojisini göster
  if (!urun.gorseller.length) {
    galeri.innerHTML = `
      <div class="carousel-item active">
        <div class="zp-card-img-wrap" style="aspect-ratio:1/1;"><span class="display-3">${urun.emoji}</span></div>
      </div>`;
  } else {
    galeri.innerHTML = urun.gorseller.map((yol, i) => `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <button class="btn p-0 border-0 w-100" type="button" data-bs-toggle="modal" data-bs-target="#buyutModal"
                data-buyuk-gorsel="${sayfadanYol(yol)}" aria-label="Görseli büyüt">
          <div class="zp-card-img-wrap" style="aspect-ratio:1/1;">
            <img src="${sayfadanYol(yol)}" class="zp-card-img" alt="${guvenli(urun.ad)}, görsel ${i + 1}" width="800" height="800">
          </div>
        </button>
      </div>`).join("");
  }

  // Tek görsel varsa önceki/sonraki okları gereksiz
  const tekGorsel = urun.gorseller.length <= 1;
  carousel.querySelectorAll(".carousel-control-prev, .carousel-control-next")
    .forEach((ok) => ok.classList.toggle("d-none", tekGorsel));

  // Büyütme penceresi: hangi görsele tıklandıysa onu göster
  document.getElementById("buyutModalLabel").textContent = urun.ad;
  document.getElementById("buyutModal").addEventListener("show.bs.modal", (e) => {
    const tetikleyen = e.relatedTarget;
    const buyuk = document.getElementById("buyukGorsel");
    buyuk.src = tetikleyen?.dataset.buyukGorsel || sayfadanYol(urun.gorseller[0]);
    buyuk.alt = `${urun.ad}, büyük görsel`;
  });
}

function adetSeciciyiBaslat(stok) {
  const input = document.getElementById("adetInput");
  const enFazla = Math.max(1, stok);
  document.getElementById("adetArtir").addEventListener("click", () => {
    input.value = Math.min(enFazla, parseInt(input.value, 10) + 1);
  });
  document.getElementById("adetAzalt").addEventListener("click", () => {
    input.value = Math.max(1, parseInt(input.value, 10) - 1);
  });
}
