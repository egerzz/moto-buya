<div align="center">

# MOTO.BUYA

**Premium motosiklet ekipmanları için duyarlı (responsive) e-ticaret arayüzü**

Kask, mont, eldiven, bot ve aksesuar satan bir motosiklet ekipmanı mağazası için
**HTML5, CSS3, Bootstrap 5.3 ve sade JavaScript** ile hazırlanmış ön yüz projesi.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


[Canlı Demo](https://egerzz.github.io/moto-buya/)

</div>

<!-- Ekran görüntüsü eklemek için: görüntüyü docs/ klasörüne koy ve aşağıdaki satırın yorumunu kaldır.
![MOTO.BUYA ana sayfa](docs/ana-sayfa.png)
-->

---

## İçindekiler

- [Hakkında](#hakkında)
- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Klasör Yapısı](#klasör-yapısı)
- [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
- [GitHub Pages ile Yayınlama](#github-pages-ile-yayınlama)
- [Mimari](#mimari)
- [Yeni Ürün Eklemek](#yeni-ürün-eklemek)
- [Bilinen Sınırlamalar](#bilinen-sınırlamalar)
- [Yol Haritası](#yol-haritası)
- [Geliştirici](#geliştirici)

---

## Hakkında

MOTO.BUYA, Mototaş bayisi olan bir motosiklet ekipmanı mağazası için hazırlanan web sitesinin ön yüzüdür. Proje iki aşamalı planlanmıştır:

- **Sürüm 1 (bu depo):** Ürünlerin kategorili olarak sergilendiği, filtrelenebildiği ve sepete eklenebildiği bir vitrin sitesi. Sunucu (backend) içermez; tüm etkileşimler tarayıcıda çalışır.
- **Sürüm 2 (planlanan):** Online ödeme, üyelik ve stok takibi olan tam bir e-ticaret sitesi.

Kod, sürüm 2'ye geçişte sayfaların yeniden yazılmasına gerek kalmayacak şekilde katmanlı kurulmuştur (bkz. [Mimari](#mimari)).

## Özellikler

### Sayfalar

| Sayfa | Açıklama |
|---|---|
| **Ana Sayfa** | Hero alanı, carousel, fotoğraflı kategori mozaiği, öne çıkan ürünler, SSS ve bülten formu |
| **Ürünler** | Kategori, fiyat aralığı, puan ve aramaya göre filtreleme; fiyata göre sıralama |
| **Ürün Detay** | Tek şablon sayfa; adresteki `?id=` değerine göre ilgili ürünü gösterir |
| **Sepet** | Adet değiştirme, silme, kupon kodu, ücretsiz kargo ilerleme çubuğu ve sipariş özeti |
| **Giriş / Kayıt** | Doğrulamalı formlar, şifre kuralları ve kullanım koşulları penceresi |
| **Hakkımızda** | İstatistikler, zaman çizelgesi ve ekip kartları |
| **İletişim** | İletişim formu, SSS ve Google Haritalar ile mağaza konumu |

### İşlevler

- **Dinamik ürün detay sayfası:** Tüm ürünler tek bir veri dosyasından okunur; her kart kendi ürününün sayfasını açar. Hatalı bir bağlantıda "Ürün bulunamadı" mesajı gösterilir.
- **Çalışan sepet:** Ürün ekleme, adet güncelleme, silme ve toplam hesabı. Sepet `localStorage` ile sayfa yenilense de korunur, ürün fotoğraflarıyla birlikte listelenir.
- **Ürün galerisi:** Birden fazla fotoğrafı olan ürünlerde kaydırmalı galeri ve büyütme penceresi.
- **Stok kontrolü:** Stok durumuna göre "Stokta", "Son X adet" veya "Tükendi" etiketi; seçilebilecek adet stokla sınırlıdır.
- **Filtreleme ve arama:** Kategori, fiyat ve puana göre anlık filtreleme; Türkçe karakter uyumlu arama.
- **Aydınlık / karanlık tema:** Bootstrap 5.3 renk modlarıyla; seçim tarayıcıda hatırlanır.
- **Form doğrulama:** Giriş, kayıt, iletişim, yorum ve bülten formlarında Bootstrap doğrulaması.
- **Duyarlı tasarım:** Masaüstü, tablet ve telefonda uyumlu yerleşim; mobilde filtreler yandan açılan panelde.
- **Erişilebilirlik:** Anlamsal HTML, `aria` etiketleri, alternatif görsel metinleri ve hareket azaltma (`prefers-reduced-motion`) desteği.
- **Optimize görseller:** Ürün ve kategori fotoğrafları WebP formatında ve web için küçültülmüş halde.

### Kullanılan Bootstrap Bileşenleri

Navbar, Dropdown, Carousel, Card, Accordion, Modal, Toast, Offcanvas, Tabs, Breadcrumb, Tooltip, List Group, Input Group, Progress ve Badge.

## Kullanılan Teknolojiler

| Teknoloji | Kullanım |
|---|---|
| HTML5 | Anlamsal sayfa yapısı |
| CSS3 | Özel tasarım katmanı, CSS değişkenleri, CSS Grid |
| [Bootstrap 5.3.3](https://getbootstrap.com/) | Grid sistemi ve bileşenler (CDN) |
| [Bootstrap Icons 1.11.3](https://icons.getbootstrap.com/) | İkonlar (CDN) |
| JavaScript (ES6+) | Sepet, ürün verisi, filtreleme, tema ve form mantığı |
| [Google Fonts](https://fonts.google.com/) | Cormorant Garamond ve Nunito Sans |

Projede herhangi bir derleme aracı veya paket yöneticisi yoktur; dosyalar doğrudan tarayıcıda çalışır.

## Klasör Yapısı

```
moto-buya/
├── index.html                   Ana sayfa
├── pages/
│   ├── urunler.html             Ürün listesi ve filtreler
│   ├── urun-detay.html          Ürün detay şablonu (?id= ile çalışır)
│   ├── sepet.html               Sepet ve sipariş özeti
│   ├── giris.html               Giriş formu
│   ├── kayit.html               Kayıt formu
│   ├── hakkimizda.html          Hakkımızda
│   └── iletisim.html            İletişim ve harita
└── assets/
    ├── css/
    │   └── style.css            Özel stiller
    ├── js/
    │   ├── script.js            Ortak kod: sepet, tema, formlar, bildirimler
    │   ├── urun-verisi.js       Tüm ürün bilgileri
    │   ├── urun-servisi.js      Sayfaların ürün verisine ulaştığı katman
    │   └── urun-detay.js        Ürün detay şablonunu dolduran kod
    └── img/
        ├── hero-banner.jpg      Ana sayfa hero görseli
        ├── kategoriler/         Kategori mozaiği fotoğrafları
        └── urunler/             Ürün fotoğrafları (kare, 800×800, WebP)
```

## Kurulum ve Çalıştırma

Kurulum gerekmez.

```bash
git clone https://github.com/KULLANICI-ADIN/REPO-ADI.git
cd REPO-ADI
```

Ardından iki yoldan biriyle açabilirsin:

- **Doğrudan:** `index.html` dosyasını tarayıcıda aç.
- **Yerel sunucu ile (önerilen):** VS Code'da [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) eklentisiyle `index.html`'e sağ tıklayıp **Open with Live Server** de, ya da terminalde:

  ```bash
  python -m http.server 8000
  ```

  Sonra tarayıcıda `http://localhost:8000` adresini aç.

> Bootstrap, ikonlar ve fontlar CDN üzerinden yüklendiği için internet bağlantısı gerekir.

## GitHub Pages ile Yayınlama

Proje tamamen statik olduğu için GitHub Pages'te ücretsiz yayınlanabilir:

1. Depoyu GitHub'a yükle (`index.html` deponun kök klasöründe olmalı).
2. Depoda **Settings → Pages** bölümüne git.
3. **Source** olarak **Deploy from a branch**, branch olarak `main` ve klasör olarak `/ (root)` seç, **Save**'e bas.
4. Birkaç dakika sonra site `https://KULLANICI-ADIN.github.io/REPO-ADI/` adresinde yayında olur.

Yayınladıktan sonra bu README'nin en üstündeki **Canlı Demo** satırını kendi adresinle güncelleyebilirsin.

## Mimari

Ürünler HTML'e tek tek yazılmaz; tek bir veri dosyasında tutulur ve sayfalar bu veriye bir **servis katmanı** üzerinden ulaşır:

```
Sayfalar (HTML + urun-detay.js)
        │  urunServisi.idIleGetir("v003")
        ▼
Servis katmanı (urun-servisi.js)
        │
        ▼
Veri kaynağı (urun-verisi.js)   ← Sürüm 2'de API veya distribütör XML beslemesi
```

Sayfalar veriye hiçbir zaman doğrudan dokunmaz. Sürüm 2'de veri bir API'den gelmeye başladığında yalnızca `urun-servisi.js` değişir; sayfa kodu aynı kalır. Servis fonksiyonları bu yüzden şimdiden `async` olarak yazılmıştır.

`urun-detay.html` bir **şablondur**: `urun-detay.html?id=v003` adresi açıldığında `urun-detay.js` adresteki kimliği okur, ürünü servisten ister ve sayfadaki boş alanları doldurur. Böylece yüzlerce ürün için tek bir detay sayfası yeterlidir.

## Yeni Ürün Eklemek

1. Ürün fotoğrafını **kare** olarak (en az 800×800 piksel) `assets/img/urunler/` klasörüne koy.
2. `assets/js/urun-verisi.js` içindeki `URUNLER` listesine yeni bir kayıt ekle. Dosyanın başında her alanın açıklaması vardır. `id` benzersiz olmalıdır (örneğin `v007`).
3. Ürün kartının bağlantısını `urun-detay.html?id=v007` olarak ayarla.

Detay sayfasında değişiklik yapmaya gerek yoktur; yeni ürün otomatik olarak doğru görünür.

## Bilinen Sınırlamalar

Bu depo bir **ön yüz (frontend) projesidir**; aşağıdakiler bilinçli olarak kapsam dışındadır:

- **Sunucu yoktur.** Giriş, kayıt, iletişim ve bülten formları doğrulanır ancak veriyi bir yere göndermez.
- **Sipariş gerçek değildir.** Sepetteki "Siparişi Tamamla" adımı bir onay mesajı gösterir; ödeme alınmaz.
- **Ürün verileri örnektir.** Fiyatlar, stok adetleri, puanlar ve yorumlar arayüzü göstermek amacıyla eklenmiştir.
- **Sepet tarayıcıya özeldir.** `localStorage`'da tutulduğu için farklı cihaz veya tarayıcılar arasında paylaşılmaz.
- **Ürün kartları henüz elle yazılıdır.** Ürün detay sayfası veri dosyasından üretilir, ancak ana sayfa ve ürünler sayfasındaki kartlar HTML'de tanımlıdır.

## Yol Haritası

### Sürüm 1

- [x] Duyarlı arayüz ve 8 sayfa
- [x] Çalışan sepet (`localStorage`)
- [x] Filtreleme, sıralama ve arama
- [x] Fotoğraflı kategori mozaiği ve ürün kartları
- [x] Veri dosyasından üretilen ürün detay sayfası
- [ ] Ürün kartlarının da veri dosyasından üretilmesi
- [ ] WhatsApp ile sipariş gönderme
- [ ] Bakım & Temizlik kategorisi
- [ ] Ortak navbar ve footer bileşenleri

### Sürüm 2

- [ ] Distribütörün XML/API ürün beslemesiyle ürün, fiyat ve stok entegrasyonu
- [ ] Üyelik ve cihazlar arası sepet
- [ ] Online ödeme entegrasyonu
- [ ] Sipariş takibi

## Geliştirici

**Ege Erez** ([@egerzz](https://github.com/egerzz))

<!-- GitHub kullanıcı adın farklıysa yukarıdaki bağlantıyı düzelt. -->
