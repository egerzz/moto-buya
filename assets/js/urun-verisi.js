/* MOTO.BUYA - ürün verisi
   ---------------------------------------------------------------------------
   Sitedeki bütün ürünlerin bilgisi BURADA tutulur. Yeni ürün eklemek veya
   bir ürünü değiştirmek için sadece bu dosyayı düzenlemen yeterli.

   Alanlar:
     id            Ürünün kalıcı kimliği. Linklerde kullanılır (urun-detay.html?id=v001).
                   Sonradan değiştirme; Mototaş stok kodu varsa onu kullanabilirsin.
     ad            Ürün adı
     kategori      kask | mont | eldiven | bot | aksesuar
     fiyat         Satış fiyatı, SAYI olarak (12450), metin değil ("12.450 TL")
     eskiFiyat     İndirim varsa üstü çizili eski fiyat, yoksa null
     rozet         Kartta/detayda görünen etiket: { metin, renk } veya null
                   renk: Bootstrap rengi (warning, danger, info, secondary, success)
     puan          0-5 arası ortalama puan
     degerlendirme Değerlendirme sayısı
     stok          Stoktaki adet (0 ise "Tükendi" görünür, sepete eklenemez)
     emoji         Fotoğraf yoksa yedek olarak gösterilir
     gorseller     Fotoğraf yolları, SİTE KÖKÜNE göre (assets/img/...).
                   İlki kartta ve sepette kullanılır; birden fazlaysa detayda galeri olur.
     kisaAciklama  Kartta ve detay sayfasının üstünde görünen tek cümle
     aciklama      Detay sayfasındaki "Açıklama" sekmesi
     ozellikler    "Özellikler" sekmesindeki tablo: { "Başlık": "Değer", ... }
     bedenler      Beden listesi; bedeni olmayan üründe boş liste []
     yorumlar      [{ ad, zaman, puan, metin }] — boşsa "Henüz yorum yok" görünür

   Not: v001 dışındaki ürünlerin açıklama ve özellikleri, kartlardaki kısa
   yazılardan yola çıkılarak yazılmış ÖRNEK metinlerdir. Gerçek ürün
   bilgileriyle değiştir.

   İleride (sürüm 2) bu liste bir API'den veya Mototaş'ın XML beslemesinden
   gelecek. Sayfalar veriye doğrudan değil urun-servisi.js üzerinden ulaştığı
   için o gün sadece servis dosyası değişecek.
--------------------------------------------------------------------------- */

const URUNLER = [
  {
    id: "v001",
    ad: "Karbon Fiber Full-Face Kask",
    kategori: "kask",
    fiyat: 12450,
    eskiFiyat: null,
    rozet: { metin: "Çok Satan", renk: "warning" },
    puan: 4.5,
    degerlendirme: 128,
    stok: 12,
    emoji: "🪖",
    gorseller: [
      "assets/img/urunler/karbon-full-face-kask.webp",
      "assets/img/kategoriler/kask.webp",
      "assets/img/kategoriler/tum-ekipmanlar.webp",
    ],
    kisaAciklama: "Pist ve uzun yol sürüşleri için tasarlanan bu kask, 1.250 gram ağırlığındaki karbon fiber kabuğu, çok yoğunluklu EPS iç katmanı ve buğulanmaz Pinlock 120 vizörüyle maksimum güvenlik ve konforu bir arada sunar.",
    aciklama: "Rüzgar tünelinde geliştirilen aerodinamik form, yüksek hızlarda bile baş ve boyun yorgunluğunu azaltır. Çıkarılabilir, yıkanabilir antibakteriyel iç döşeme ve acil durum yanak pedi sistemi standart olarak gelir. Kask, ECE 22.06 güvenlik standardına göre test edilmiştir.",
    ozellikler: {
      "Kabuk": "%100 Karbon fiber",
      "Ağırlık": "1.250 g (± 50 g)",
      "Vizör": "Pinlock 120 hazır, buğulanmaz",
      "Sertifika": "ECE 22.06",
    },
    bedenler: ["XS", "S", "M", "L", "XL"],
    yorumlar: [
      { ad: "Elif K.", zaman: "3 gün önce", puan: 5, metin: "Çok hafif, otoyolda neredeyse hiç rüzgar sesi yok. Kesinlikle tavsiye ederim!" },
    ],
  },
  {
    id: "v002",
    ad: "Deri Racing Mont",
    kategori: "mont",
    fiyat: 9600,
    eskiFiyat: 12000,
    rozet: { metin: "-%20", renk: "danger" },
    puan: 4.0,
    degerlendirme: 54,
    stok: 7,
    emoji: "🧥",
    gorseller: ["assets/img/urunler/deri-racing-mont.webp"],
    kisaAciklama: "Tam tahıl dana derisi, CE Level 2 omuz ve dirsek koruması.",
    aciklama: "Pist ve sportif yol kullanımı için kesilmiş, ön kavisli kollara sahip racing mont. Omuz ve dirseklerde CE Level 2 korumalar standarttır, sırtta koruma cebi bulunur. Delikli deri paneller sıcak havada hava akışı sağlar; pantolona bağlama fermuarı sayesinde iki parça tulum gibi kullanılabilir.",
    ozellikler: {
      "Malzeme": "Tam tahıl dana derisi",
      "Koruma": "CE Level 2 omuz ve dirsek",
      "Sırt koruması": "Koruma cebi mevcut (koruma ayrı satılır)",
      "Havalandırma": "Delikli göğüs ve sırt panelleri",
      "Bağlantı": "Pantolona bağlama fermuarı",
    },
    bedenler: ["48", "50", "52", "54", "56"],
    yorumlar: [],
  },
  {
    id: "v003",
    ad: "Karbon Korumalı Eldiven",
    kategori: "eldiven",
    fiyat: 2750,
    eskiFiyat: null,
    rozet: { metin: "Yeni", renk: "info" },
    puan: 4.8,
    degerlendirme: 37,
    stok: 20,
    emoji: "🧤",
    gorseller: ["assets/img/urunler/karbon-korumali-eldiven.webp"],
    kisaAciklama: "Keçi derisi, karbon knuckle ve dokunmatik ekran uyumlu parmak uçları.",
    aciklama: "Sportif sürüş için tasarlanan kısa bilekli eldiven. Parmak eklemlerindeki karbon fiber koruma ve avuç içindeki ek deri katman, düşme anında aşınmaya karşı direnç sağlar. İşaret ve başparmak uçları dokunmatik ekranlarla uyumludur; delikli parmak üstleri havalandırma sağlar.",
    ozellikler: {
      "Malzeme": "Keçi derisi",
      "Eklem koruması": "Karbon fiber knuckle",
      "Avuç içi": "Çift kat deri",
      "Dokunmatik": "İşaret ve başparmak uçları",
      "Kapama": "Cırtlı bilek ayarı",
    },
    bedenler: ["S", "M", "L", "XL"],
    yorumlar: [],
  },
  {
    id: "v004",
    ad: "Su Geçirmez Touring Bot",
    kategori: "bot",
    fiyat: 7890,
    eskiFiyat: null,
    rozet: { metin: "Sınırlı Stok", renk: "secondary" },
    puan: 3.5,
    degerlendirme: 21,
    stok: 3,
    emoji: "🥾",
    gorseller: ["assets/img/urunler/su-gecirmez-touring-bot.webp"],
    kisaAciklama: "Gore-Tex membran, ayak bileği ve topuk koruması.",
    aciklama: "Uzun yol ve her mevsim sürüş için tasarlanan touring bot. Su geçirmez membran yağmurda ayağı kuru tutarken nefes alabilirliği korur. Ayak bileği ve topuktaki sert korumalar, kaymaz kauçuk taban ve vites pedi hem sürüşte hem yürürken konfor sağlar.",
    ozellikler: {
      "Membran": "Gore-Tex, su geçirmez",
      "Koruma": "Ayak bileği, topuk ve kaval kemiği",
      "Taban": "Kaymaz kauçuk",
      "Kapama": "Fermuar ve ayarlı tokalar",
      "Vites pedi": "Var",
    },
    bedenler: ["40", "41", "42", "43", "44", "45", "46"],
    yorumlar: [],
  },
  {
    id: "v005",
    ad: "Bluetooth İnterkom Sistemi",
    kategori: "aksesuar",
    fiyat: 4610,
    eskiFiyat: null,
    rozet: null,
    puan: 4.2,
    degerlendirme: 63,
    stok: 15,
    emoji: "🎧",
    gorseller: ["assets/img/urunler/bluetooth-interkom.webp"],
    kisaAciklama: "Mesh bağlantı, sürücüler arasında 1,2 km'ye kadar menzil.",
    aciklama: "Grup sürüşleri için mesh bağlantılı Bluetooth interkom. Telefon görüşmesi, navigasyon yönlendirmesi ve müzik tek dokunuşla kontrol edilir. Eldivenle rahatça kullanılan büyük döner düğme ve kaskın içine yerleşen ince hoparlörlerle gelir.",
    ozellikler: {
      "Bağlantı": "Mesh ve Bluetooth",
      "Menzil": "1,2 km'ye kadar (açık alanda)",
      "Montaj": "Kask yan kelepçesi veya yapışkan taban",
      "Kontrol": "Eldivenle kullanılabilen döner düğme",
      "Paket içeriği": "Ana ünite, 2 hoparlör, bom mikrofon",
    },
    bedenler: [],
    yorumlar: [],
  },
  {
    id: "v006",
    ad: "Modüler Touring Kask",
    kategori: "kask",
    fiyat: 8380,
    eskiFiyat: null,
    rozet: null,
    puan: 3.0,
    degerlendirme: 18,
    stok: 9,
    emoji: "🪖",
    gorseller: [
      "assets/img/urunler/moduler-touring-kask.webp",
      "assets/img/kategoriler/kask.webp",
    ],
    kisaAciklama: "Çene kısmı açılan, iç güneş vizörlü modüler touring kask.",
    aciklama: "Şehir içi ve uzun yol için çene kısmı yukarı açılan modüler kask. Molalarda kaskı çıkarmadan konuşabilir, su içebilirsiniz. İç güneş vizörü tek hareketle iner; geniş görüş alanı ve ayarlanabilir havalandırma kanalları uzun sürüşlerde konfor sağlar.",
    ozellikler: {
      "Tip": "Modüler (çene açılır)",
      "Vizör": "Şeffaf ana vizör ve iç güneş vizörü",
      "Havalandırma": "Ayarlanabilir alın ve çene kanalları",
      "İç döşeme": "Çıkarılabilir, yıkanabilir",
      "Sertifika": "ECE 22.06",
    },
    bedenler: ["XS", "S", "M", "L", "XL"],
    yorumlar: [],
  },
];

/* Kategori kodlarının ekranda görünen adları */
const KATEGORI_ADLARI = {
  kask: "Kask",
  mont: "Mont & Ceket",
  eldiven: "Eldiven",
  bot: "Bot",
  aksesuar: "Aksesuar & İnterkom",
};
