# Yıldızlar Yarışıyor '24 Web Uygulaması

Bu proje, Yıldız Teknik Üniversitesi Müzik Kulübü (YTÜMK) tarafından düzenlenen "Yıldızlar Yarışıyor '24" etkinliği için SkyLab - WebLab ekibi tarafından geliştirilmiştir. Uygulama, katılımcılara ödül kategorileri, jüri üyeleri ve sponsorlar hakkında bilgi sunar. Ayrıca bir katılım formu sayfası içerir.

## 🚀 Proje Özellikleri

- **ReactJS** ve **Tailwind CSS** kullanılarak geliştirildi.
- Açık/Koyu mod desteği.
- Bölümlere yumuşak kaydırma ve yönlendirme.
- "Katılım Formu" için ayrı bir sayfa.
- Modern ve kullanıcı dostu arayüz.

---

## 🗂️ Dosya Yapısı

```plaintext
src/
├── components/
│   ├── sections/
│   │   ├── Hero.js               # Ana sayfa giriş bölümü
│   │   ├── CategorySection.js    # Ödül kategorileri bölümü
│   │   ├── JurySection.js        # Jüri üyeleri bölümü
│   │   ├── SponsorSection.js     # Sponsorlar bölümü
│   ├── Footer.js                 # Sayfa alt bölümü
│   ├── Header.js                 # Sayfa üst navigasyonu (Navbar)
├── images/                       # Görseller ve ikonlar
│   ├── cross.png                 # Sponsor logosu
│   ├── discord.png               # Discord ikonu
│   ├── ing.png                   # İngilizce bayrak ikonu
│   ├── insta.png                 # Instagram ikonu
│   ├── konusmaci.png             # Jüri placeholder görseli
│   ├── linkedin.png              # LinkedIn ikonu
│   ├── mod-gece.png              # Koyu mod ikonu
│   ├── mod-gunduz.png            # Açık mod ikonu
│   ├── turk.png                  # Türkçe bayrak ikonu
│   ├── x.png                     # X (Twitter) ikonu
│   ├── ytumklogo.png             # YTÜMK logo
├── pages/
│   ├── Form.js                   # Katılım formu sayfası
│   ├── Home.js                   # Ana sayfa bileşeni
├── App.js                        # Ana uygulama dosyası
├── index.css                     # Ana CSS konfigürasyonu
```
---

## 🌟 Bölümler

   - Hero (Giriş Bölümü)
     - Uygulamanın ilk ekranında etkinlik hakkında kısa bilgi ve görsel yer alır.

   - Kategori Bölümü
     - "Beste Kategorisi" ve "Cover Kategorisi" gibi ödül kategorilerini içerir.
     - Bireysel ve grup performans alt kategorileri tanıtılır.

   - Jüri Bölümü
     - Jüri üyelerinin placeholder görselleri ve isimleri listelenir.

   - Sponsorlar Bölümü
     - Ana sponsor ve diğer sponsorların logoları görüntülenir.

   - Katılım Formu Sayfası
     - Kullanıcıların etkinliğe katılmak için bilgilerini doldurabileceği bir form içerir.

---

## ⚙️ Teknolojiler ve Araçlar

  * ReactJS: Kullanıcı arayüzü için.
  * Tailwind CSS: Hızlı ve özelleştirilebilir CSS framework.
  * React Router: Sayfa yönlendirme için.
  * JavaScript (ES6): Dinamik işlevler için.

---

## 📜 Kurulum ve Çalıştırma

### 1. Depoyu klonlayın:
```plaintext
git clone https://github.com/skylab-kulubu/yildizlar-yarisiyor.git cd Yildizlar-Yarisiyor
```

### 2. Bağımlılıkları yükleyin:
```plaintext
npm install
```

### 3. Uygulamayı başlatın:
```plaintext
npm start
```

Tarayıcınızda http://localhost:3000 adresini açarak uygulamayı görüntüleyebilirsiniz.

---

## 🌈 Kullanıcı Deneyimi

  * Açık/Koyu Mod: Kullanıcılar mod arasında geçiş yapabilir.
  * Bölümlere Yumuşak Kaydırma: Ana sayfadaki bölümlere tıklayarak yumuşak geçiş yapılır.
  * Katılım Formu: "Katılım Formu" düğmesine tıklayarak form sayfasına yönlendirilirsiniz.

---

# SKY LAB: Yıldız Teknik Üniversitesi Bilgisayar Bilimleri Kulübü - WEBLAB
