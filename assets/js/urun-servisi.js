/* MOTO.BUYA - ürün servisi
   ---------------------------------------------------------------------------
   Sayfalar ürün bilgisine HER ZAMAN bu fonksiyonlar üzerinden ulaşır,
   URUNLER listesine doğrudan dokunmaz.

   Fonksiyonlar "async" yazıldı: bugün veri urun-verisi.js'ten anında geliyor,
   ama sürüm 2'de bir API'den (fetch ile) gelecek. O gün sadece bu dosyanın
   içi değişir; sayfalardaki "await urunServisi.idIleGetir(id)" çağrıları aynı kalır.
--------------------------------------------------------------------------- */

const urunServisi = {
  async tumunuGetir() {
    return URUNLER;
  },

  async idIleGetir(id) {
    return URUNLER.find((u) => u.id === id) || null;
  },

  async kategoriyeGoreGetir(kategori) {
    return URUNLER.filter((u) => u.kategori === kategori);
  },
};
