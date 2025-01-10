import React, { useState } from 'react';
import { postParticipationForm } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    email: "",
    phone: "",
    bandName: "",
    genre: "",
    songLinks: "",
    stageExperience: "",
    aboutBand: "",
    members: [{ name: "", university: "", instrument: "" }],
    termsAccepted: false,
    agreementAccepted: false,
  });

  const [audioFile, setAudioFile] = useState(null);
  const [fileName, setFileName] = useState(""); // Add state for file name

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setFileName(file.name); // Set file name in state
  };

  const handleAddMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { name: "", university: "", instrument: "" }],
    });
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index][field] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleGenreChange = (e) => {
    setFormData({ ...formData, genre: e.target.value });
  };

  const handleSongLinksChange = (e) => {
    setFormData({ ...formData, songLinks: e.target.value });
  };

  const handleStageExperienceChange = (e) => {
    setFormData({ ...formData, stageExperience: e.target.value });
  };

  const handleAboutBandChange = (e) => {
    setFormData({ ...formData, aboutBand: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send with the request
    const data = new FormData();
    data.append("name", formData.name);
    data.append("university", formData.university);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("bandName", formData.bandName);
    data.append("genre", formData.genre);
    data.append("songLinks", formData.songLinks);
    data.append("stageExperience", formData.stageExperience);
    data.append("aboutBand", formData.aboutBand);
    data.append("termsAccepted", formData.termsAccepted);
    data.append("agreementAccepted", formData.agreementAccepted);

    // Append members as a JSON string
    data.append("members", JSON.stringify(formData.members));

    // Append audio file
    if (audioFile) {
      data.append("audioFile", audioFile);
    }

    try {
      const response = await postParticipationForm(data);
      if (response.ok) {
        alert("Başvurunuz başarıyla gönderildi!");
      } else {
        alert("Başvuru gönderilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Başvuru gönderilirken bir hata oluştu.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Adınız Soyadınız *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        {/* University Field */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Okuduğunuz Üniversite *</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleInputChange}
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">e-Mail Adresiniz *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Telefon Numaranız *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        {/* Band Name Field */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grubunuzun Adı *</label>
          <input
            type="text"
            name="bandName"
            value={formData.bandName}
            onChange={handleInputChange}
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        {/* Members */}
        {formData.members.map((member, index) => (
          <div key={index} className="flex space-x-2 mb-4">
            <div><label className="block font-semibold mb-1">Ad Soyad</label>
              <input
                type="text"
                value={member.name}
                onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                className="w-full p-2 mb-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div> <label className="block font-semibold mb-1">Okuduğu Üniversite</label>
              <input
                type="text"
                value={member.university}
                onChange={(e) => handleMemberChange(index, "university", e.target.value)}
                className="w-full p-2 mb-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
            <div> <label className="block font-semibold mb-1">Enstrüman</label>
              <input
                type="text"
                value={member.instrument}
                onChange={(e) => handleMemberChange(index, "instrument", e.target.value)}
                className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>
          </div>
        ))}
        <div className='flex justify-center'>
          <button
            type="button"
            onClick={handleAddMember}
            className="text-purple-600 hover:underline flex items-center"
          >
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" style={{ color: 'green' }} />
          </button>
        </div>
        {/* Genre Field */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grubunuzun Yaptığı Müziği Hangi Tür Olarak Tanımlarsınız? *</label>
          <input
            type="text"
            name="genre"
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={formData.genre}
            onChange={handleGenreChange}
            required
          />
        </div>

        {/* Song Links */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grubunuzun Yayımladığı Şarkılar Var İse Link Paylaşabilir Misiniz?</label>
          <input
            type="text"
            name="songLinks"
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={formData.songLinks}
            onChange={handleSongLinksChange}
          />
        </div>

        {/* Stage Experience */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grubunuzun Sahne Deneyimi Var İse Bahsedebilir Misiniz?</label>
          <textarea
            name="stageExperience"
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={formData.stageExperience}
            onChange={handleStageExperienceChange}
          />
        </div>

        {/* About Band */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Grubunuzdan Kısaca Bahsedebilir Misiniz?</label>
          <textarea
            name="aboutBand"
            className="w-full p-2 dark:bg-dark-black border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-purple-600"
            value={formData.aboutBand}
            onChange={handleAboutBandChange}
            required
          />
        </div>

        {/* Audio File Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            Performansınıza Ait Ses Kaydını Yükleyiniz *
          </label>
          <div className="relative inline-block py-2">
            {/* File input */}
            <input
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
              required
            />

            {/* Styled label as the button */}
            <label
              htmlFor="fileInput"
              className="w-full px-4 py-2 bg-black text-white rounded border border-form-gray-dark text-center cursor-pointer hover:bg-gray-800"
            >
              Dosya Seç
            </label>

            {/* Display file name if a file is selected */}
            {fileName && (
              <span className="ml-4 text-gray-700">Dosyanız yüklendi: {fileName}</span>
            )}
          </div>
        </div>

        {/* Terms and Agreement */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleCheckboxChange}
              className="form-checkbox text-purple-600"
              required
            />
            <span className="ml-2">Katılım Koşullarını Okudum Onaylıyorum</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="agreementAccepted"
              checked={formData.agreementAccepted}
              onChange={handleCheckboxChange}
              className="form-checkbox text-purple-600"
              required
            />
            <span className="ml-2">Kullanıcı Sözleşmesini Okudum Onaylıyorum</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-30 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
          >
            Başvuruyu Gönder
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
