import React, { useEffect, useState } from "react";

const ParticipationForm = () => {
  const [universities, setUniversities] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [fileName, setFileName] = useState("");

  // Form alanları
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    university_id: "",
    // Varsayılan kategori "COVER" ya da "ORIGINAL" olabilir
    category: "COVER",
    bands_name: "",
    genre: "",
    links: "",
    about_1: "", // Sahne Deneyimi
    about_2: "", // Grup Hakkında (kaç yıldır müzik yapıyorsunuz vs.)
    members: [
      { name: "", university_id: "", instrument: "" },
    ],
    termsAccepted: false,
    agreementAccepted: false,
  });

  // Üniversite listesini sayfa yüklenince çekiyoruz
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("https://api.ytumk.com.tr/v1/exapi/universities");
        if (!response.ok) {
          throw new Error("Üniversiteler yüklenirken hata oluştu.");
        }
        const data = await response.json();
        // Beklenen format: [{ id: "uuid", name: "Yıldız Teknik Üniversitesi" }, ...]
        setUniversities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversities();
  }, []);

  // Input değişikliklerini yakalayan fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Dosya seçiminde tetiklenen fonksiyon
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setFileName(file ? file.name : "");
  };

  // Grup üyelerine yeni üye ekleme
  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: "", university_id: "", instrument: "" }],
    }));
  };

  // Grup üyelerindeki alan değişikliği
  const handleMemberChange = (index, field, value) => {
    const updated = [...formData.members];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, members: updated }));
  };

  // CheckBox (Katılım koşulları, sözleşme vb.) değişikliği
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Kategori butonlarına tıklayınca
  const setCategory = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  // Form gönderme işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gönderilecek json gövdesini hazırlıyoruz
      const formObject = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        university_id: formData.university_id,
        category: formData.category,
        bands_name: formData.bands_name,
        members: formData.members.map((m) => ({
          name: m.name,
          university_id: m.university_id,
          instrument: m.instrument,
        })),
        genre: formData.genre,
        links: formData.links,
        about_1: formData.about_1, // Sahne deneyimi
        about_2: formData.about_2, // Grup hakkında
      };

      // multipart/form-data
      const data = new FormData();
      // Ses dosyası
      if (audioFile) data.append("file", audioFile);
      // Diğer bilgiler JSON olarak
      data.append("form", JSON.stringify(formObject));

      // POST isteği
      const response = await fetch("https://api.ytumk.com.tr/v1/exapi/participation_form", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errMsg = await response.text();
        console.error("Sunucu hatası:", errMsg);
        alert("Başvuru gönderilirken bir hata oluştu.");
        return;
      }
      alert("Başvurunuz başarıyla gönderildi!");
      // İsterseniz formu sıfırlayabilirsiniz
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Başvuru gönderilirken bir hata oluştu.");
    }
  };

  return (
    // Dış konteyneri "dark" arka plan rengi (bg-dark-bgcolor) ve yazı rengi (text-form-text-dark) ile kaplıyoruz.
    <div className="dark:bg-dark-bgcolor dark:text-form-text-dark min-h-screen px-4 py-8 flex flex-col items-center">
      {/* Kategori Seçim Butonları */}
      <div className="mb-6 flex space-x-4">
        <button
          type="button"
          onClick={() => setCategory("ORIGINAL")}
          className={`px-4 py-2 rounded border-2
            ${
              formData.category === "ORIGINAL"
                ? "bg-dark-accentpurple border-dark-accentpurple dark:text-dark-white"
                : "bg-transparent border-form-gray-dark dark:text-form-text-dark"
            } 
            hover:opacity-80`}
        >
          Beste Kategorisi
        </button>

        <button
          type="button"
          onClick={() => setCategory("COVER")}
          className={`px-4 py-2 rounded border-2
            ${
              formData.category === "COVER"
                ? "bg-dark-accentpurple border-dark-accentpurple dark:text-dark-white"
                : "bg-transparent border-form-gray-dark dark:text-form-text-dark"
            } 
            hover:opacity-80`}
        >
          Cover Kategorisi
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-transparent"
      >
        {/* Adınız Soyadınız */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Adınız Soyadınız <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Üniversite */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Okuduğunuz Üniversite <span className="text-form-red">*</span>
          </label>
          <select
            name="university_id"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.university_id}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Üniversite Seçiniz --</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            e-Mail Adresiniz <span className="text-form-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Telefon */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Telefon Numaranız <span className="text-form-red">*</span>
          </label>
          <input
            type="tel"
            name="phone_number"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Grup Adı */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Adı <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="bands_name"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.bands_name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Grup Üyeleri */}
        <div className="mb-2 font-semibold">
          Grup Üyelerinin Ad Soyadları, Okudukları Üniversiteler ve Çaldıkları
          Enstrümanlar <span className="text-form-red">*</span>
        </div>
        {formData.members.map((member, index) => (
          <div key={index} className="flex flex-wrap gap-2 mb-4">
            {/* Ad Soyad */}
            <input
              type="text"
              placeholder="Ad Soyad"
              className="flex-1 p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              required
            />
            {/* Üniversite */}
            <select
              className="flex-1 p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.university_id}
              onChange={(e) =>
                handleMemberChange(index, "university_id", e.target.value)
              }
              required
            >
              <option value="">Üniversite</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
            {/* Enstrüman */}
            <input
              type="text"
              placeholder="Enstrüman"
              className="flex-1 p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.instrument}
              onChange={(e) =>
                handleMemberChange(index, "instrument", e.target.value)
              }
              required
            />
          </div>
        ))}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={handleAddMember}
            className="flex items-center px-3 py-1 rounded border border-green-500 text-green-500 hover:bg-green-500 hover:text-dark-white"
          >
            Üye Ekle
          </button>
        </div>

        {/* Müzik Türü */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Yaptığı Müziği Hangi Tür Olarak Tanımlarsınız? <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="genre"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.genre}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Şarkı Linkleri */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Yayımladığı Şarkılar Var İse Link Paylaşabilir misiniz?
          </label>
          <input
            type="text"
            name="links"
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.links}
            onChange={handleInputChange}
          />
        </div>

        {/* about_1 => Sahne Deneyimi */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Sahne Deneyimi Var İse Bahsedebilir misiniz?
          </label>
          <textarea
            name="about_1"
            rows={3}
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.about_1}
            onChange={handleInputChange}
          />
        </div>

        {/* about_2 => Grup Hakkında (Kısaca) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzdan Kısaca Bahsedebilir misiniz? (Kaç yıldır müzik yapıyorsunuz vs.) <span className="text-form-red">*</span>
          </label>
          <textarea
            name="about_2"
            rows={3}
            className="w-full p-2 dark:bg-form-input-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.about_2}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Ses Kaydı (file) */}
        <div className="mb-6">
          <label className="block font-semibold mb-1">
            Yarışmaya Katılmak İstediğiniz Performansınıza Ait Ses Kaydını Yükleyiniz <span className="text-form-red">*</span>
          </label>
          <div className="relative inline-block">
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <label
              htmlFor="fileInput"
              className="px-4 py-2 bg-dark-black text-dark-white border border-form-gray-dark rounded cursor-pointer hover:opacity-80"
            >
              Dosya Seç
            </label>
            {fileName && (
              <span className="ml-3 text-form-gray-light text-sm">
                {fileName}
              </span>
            )}
          </div>
        </div>

        {/* Katılım Koşulları */}
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-dark-accentpurple"
              required
            />
            <span className="ml-2">
              Katılım Koşullarını Okudum Onaylıyorum
            </span>
          </label>
        </div>

        {/* Kullanıcı Sözleşmesi */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="agreementAccepted"
              checked={formData.agreementAccepted}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-dark-accentpurple"
              required
            />
            <span className="ml-2">
              Kullanıcı Sözleşmesini Okudum Onaylıyorum
            </span>
          </label>
        </div>

        {/* Gönder Butonu */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-dark-accentpurple text-dark-white font-semibold px-6 py-2 rounded hover:opacity-80"
          >
            Başvuruyu Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParticipationForm;
