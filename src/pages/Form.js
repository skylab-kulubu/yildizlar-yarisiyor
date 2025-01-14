import React, { useEffect, useState } from "react";

const ParticipationForm = () => {
  const [universities, setUniversities] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  // Form alanları
  const initialFormData = {
    name: "",
    email: "",
    phone_number: "",
    university_id: "",
    category: "COVER",
    bands_name: "",
    song_name: "",
    genre: "",
    links: "",
    about_1: "", // Sahne Deneyimi
    about_2: "", // Grup Hakkında (kaç yıldır müzik yapıyorsunuz vs.)
    members: [{ name: "", university_id: "", instrument: "" }],
    termsAccepted: false,
    agreementAccepted: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Üniversite listesini sayfa yüklenince çekiyoruz
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch("https://api.ytumk.com.tr/v1/exapi/universities");
        if (!response.ok) throw new Error("Üniversiteler yüklenirken hata oluştu.");
        const data = await response.json();
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

  // Dinamik olarak yeni grup üyesi ekleme
  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { name: "", university_id: "", instrument: "" }],
    }));
  };

  // Dinamik olarak son grup üyesini silme
  const handleDeleteMember = () => {
    if (formData.members.length > 1) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.slice(0, -1),
      }));
    }
  };

  // Grup üyeleri form alan değişikliği
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = formData.members.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setFormData((prev) => ({ ...prev, members: updatedMembers }));
  };

  // Checkbox değişikliklerini yakalayan fonksiyon
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Kategori seçimini yakalayan fonksiyon
  const setCategory = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  // Form gönderme fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");

    try {
      // Gönderilecek json
      const formObject = {
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone_number,
        university_id: formData.university_id,
        category: formData.category,
        bands_name: formData.bands_name,
        song_name: formData.song_name,
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

      const data = new FormData();
      if (audioFile) data.append("file", audioFile);
      data.append("form", JSON.stringify(formObject));

      const response = await fetch("https://api.ytumk.com.tr/v1/exapi/participation_form", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errMsg = await response.text();
        console.error("Sunucu hatası:", errMsg);
        setSubmissionStatus("Başvuru gönderilirken bir hata oluştu, bir daha gönderiniz");
        return;
      }

      setSubmissionStatus("Başvuru başarıyla gönderildi");
      setFormData(initialFormData);
      setAudioFile(null);
      setFileName("");
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionStatus("Başvuru gönderilirken bir hata oluştu, bir daha gönderiniz");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dark:bg-dark-bgcolor dark:text-form-text-dark min-h-screen px-4 py-8 flex flex-col items-center">
      {/* Kategori Başlığı */}
      <h2 className="mb-4 font-semibold text-base md:text-lg">
        Lütfen yarışmaya katılmak istediğiniz kategoriyi seçiniz.
      </h2>

      {/* Kategori Seçim Butonları */}
      <div className="mb-6 flex space-x-4">
        <button
          type="button"
          onClick={() => setCategory("ORIGINAL")}
          className={`px-4 py-2 rounded border-2 transition ${formData.category === "ORIGINAL" ? "bg-dark-accentpurple border-dark-accentpurple dark:text-dark-white" : "bg-transparent border-form-gray-dark dark:text-form-text-dark"} hover:opacity-80`}
        >
          Beste Kategorisi
        </button>
        <button
          type="button"
          onClick={() => setCategory("COVER")}
          className={`px-4 py-2 rounded border-2 transition ${formData.category === "COVER" ? "bg-dark-accentpurple border-dark-accentpurple dark:text-dark-white" : "bg-transparent border-form-gray-dark dark:text-form-text-dark"} hover:opacity-80`}
        >
          Cover Kategorisi
        </button>
      </div>

      {/* * Zorunlu Soruyu Belirtir */}
      <p className="mb-6 text-sm text-form-gray-dark dark:text-form-gray-light">
        <span className="text-form-red font-bold">*</span> Zorunlu Soruyu Belirtir
      </p>

      {/* Form Alanları */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-transparent">

        {/* Ad Soyad */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Adınız Soyadınız <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Okuduğunuz Üniversite */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Okuduğunuz Üniversite <span className="text-form-red">*</span>
          </label>
          <select
            name="university_id"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.university_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Üniversite Seçiniz</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.university}
              </option>
            ))}
          </select>
        </div>

        {/* e-Mail Adresi */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            e-Mail Adresiniz <span className="text-form-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Telefon Numarası */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">
            Telefon Numaranız <span className="text-form-red">*</span>
          </label>
          <input
            type="tel"
            name="phone_number"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.phone_number}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Başvuru Bilgilendirme */}
        <p className="text-sm text-form-gray-dark dark:text-form-gray-light mb-4">
          Başvurular incelendikten sonra verdiğiniz iletişim bilgileri üzerinden iletişime geçilir.
        </p>

        {/* Grup Bilgileri */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Adı <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="bands_name"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.bands_name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Şarkı Adı */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Şarkınızın Adı <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="song_name"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.song_name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Grup Üyeleri */}
        <div className="mb-2 font-semibold">
          Grup Üyelerinin Ad Soyadları, Okudukları Üniversiteler ve Çaldıkları Enstrümanlar <span className="text-form-red">*</span>
        </div>

        {/* Dinamik olarak grup üyesi form alanları */}
        {formData.members.map((member, index) => (
          <div key={index} className="flex flex-wrap gap-2 mb-4">
            <input
              type="text"
              placeholder="Ad Soyad"
              className="flex-1 p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.name}
              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
              required
            />
            <select
              className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.university_id}
              onChange={(e) => handleMemberChange(index, "university_id", e.target.value)}
              required
            >
              <option value="">Üniversite Seçiniz</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.university}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enstrüman"
              className="flex-1 p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.instrument}
              onChange={(e) => handleMemberChange(index, "instrument", e.target.value)}
              required
            />
          </div>
        ))}

        {/* Grup üye ekleme ve silme butonları */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            onClick={handleAddMember}
            className="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-dark-white transition"
            title="Yeni üye ekle"
          >
            +
          </button>
          {formData.members.length > 1 && (
            <button
              type="button"
              onClick={handleDeleteMember}
              className="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-dark-white transition"
              title="Son üyeyi sil"
            >
              -
            </button>
          )}
        </div>

        {/* Müzik Türü */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Yaptığı Müziği Hangi Tür Olarak Tanımlarsınız? <span className="text-form-red">*</span>
          </label>
          <input
            type="text"
            name="genre"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.genre}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Yayımlanan Şarkılar */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Yayımladığı Şarkılar Var İse Link Paylaşabilir misiniz?
          </label>
          <input
            type="text"
            name="links"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.links}
            onChange={handleInputChange}
          />
        </div>

        {/* Sahne Deneyimi */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzun Sahne Deneyimi Var İse Bahsedebilir misiniz?
          </label>
          <textarea
            name="about_1"
            rows={3}
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.about_1}
            onChange={handleInputChange}
          />
        </div>

        {/* Grup Hakkında */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Grubunuzdan Kısaca Bahsedebilir misiniz? (Kaç yıldır müzik yapıyorsunuz vs.) <span className="text-form-red">*</span>
          </label>
          <textarea
            name="about_2"
            rows={3}
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.about_2}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Dosya Yükleme */}
        <div className="mb-6">
          <label className="block font-semibold mb-4">
            Yarışmaya Katılmak İstediğiniz Performansınıza Ait Ses Kaydını Yükleyiniz <span className="text-form-red">*</span>
          </label>
          <div className="relative inline-block">
            <input
              id="fileInput"
              type="file"
              accept=".mp3"
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

        {/* Katılım Koşulları Onayı */}
        <div className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-dark-accentpurple dark:bg-form-input-dark"
              required
            />
            <span className="ml-2">Katılım Koşullarını Okudum Onaylıyorum</span>
          </label>
        </div>

        {/* Kullanıcı Sözleşmesi Onayı */}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="agreementAccepted"
              checked={formData.agreementAccepted}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-dark-accentpurple dark:bg-form-input-dark"
              required
            />
            <span className="ml-2">Kullanıcı Sözleşmesini Okudum Onaylıyorum</span>
          </label>
        </div>

        {/* Gönder Butonu */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-dark-accentpurple text-dark-white font-semibold px-6 py-2 rounded hover:opacity-80 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
          </button>
        </div>

        {/* Gönderim Durumu */}
        {isSubmitting && (
          <div className="w-full bg-gray-200 rounded-full my-4">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: "50%" }}
            >
              Gönderiliyor...
            </div>
          </div>
        )}
        {submissionStatus && (
          <p className={`mt-4 ${submissionStatus === "Başvuru başarıyla gönderildi" ? "text-green-500" : "text-red-500"}`}>
            {submissionStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default ParticipationForm;