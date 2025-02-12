import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../assets/LanguageContext";
import MaterialRipple from "material-ripple-effects";

const ParticipationForm = () => {
  const [universities, setUniversities] = useState([]);
  const [audioFile, setAudioFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { translations } = useContext(LanguageContext);

  const ripple = new MaterialRipple(); // Initialize the ripple effect

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
    about_1: "",
    about_2: "",
    members: [{ name: "", university_id: "", instrument: "" }],
    termsAccepted: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          "https://api.ytumk.com.tr/v1/exapi/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0"
        );
        if (!response.ok) throw new Error();
        const data = await response.json();
        setEventData(data);
      } catch (error) {}
      setLoadingEvent(false);
    };
    fetchEventData();
  }, []);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(
          "https://api.ytumk.com.tr/v1/exapi/universities"
        );
        if (!response.ok)
          throw new Error("Üniversiteler yüklenirken hata oluştu.");
        const data = await response.json();
        setUniversities(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUniversities();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    setFileName(file ? file.name : "");
  };

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { name: "", university_id: "", instrument: "" },
      ],
    }));
  };

  const handleDeleteMember = () => {
    if (formData.members.length > 1) {
      setFormData((prev) => ({
        ...prev,
        members: prev.members.slice(0, -1),
      }));
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = formData.members.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );
    setFormData((prev) => ({ ...prev, members: updatedMembers }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const setCategory = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("");
    try {
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
        about_1: formData.about_1,
        about_2: formData.about_2,
      };
      const data = new FormData();
      if (audioFile) data.append("file", audioFile);
      data.append("form", JSON.stringify(formObject));
      const response = await fetch(
        "https://api.ytumk.com.tr/v1/exapi/participation_form",
        {
          method: "POST",
          body: data,
        }
      );
      if (!response.ok) {
        const errMsg = await response.text();
        console.error("Sunucu hatası:", errMsg);
        setSubmissionStatus(
          translations.form.submissionStatusError + ": " + response.json()
        );
        return;
      }
      setSubmissionStatus(translations.form.submissionStatusSuccess);
      setFormData(initialFormData);
      setAudioFile(null);
      setFileName("");
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmissionStatus(
        translations.form.submissionStatusError + ": " + error
      );
    }
    setIsSubmitting(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loadingEvent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{translations.eventStatus.loading}</p>
      </div>
    );
  }

  if (!eventData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{translations.eventStatus.notFound}</p>
      </div>
    );
  }

  const now = new Date();
  const startDate = new Date(eventData.start_date);
  const endDate = new Date(eventData.end_date);

  if (!eventData.active) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{translations.eventStatus.inactive}</p>
      </div>
    );
  }

  if (now < startDate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <p>
          {translations.eventStatus.notStarted}
          <br />
          {translations.eventStatus.startDateLabel}
          <strong>
            {startDate.toLocaleDateString("tr-TR", { dateStyle: "full" })}
          </strong>
        </p>
      </div>
    );
  }

  if (now > endDate) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-4">
        <p>
          {translations.eventStatus.ended}
          <br />
          {translations.eventStatus.endDateLabel}
          <strong>
            {endDate.toLocaleDateString("tr-TR", { dateStyle: "full" })}
          </strong>
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-dark-bgcolor dark:text-form-text-dark min-h-screen px-4 py-8 flex flex-col items-center">
      <h2 className="mb-4 mt-10 font-semibold text-base md:text-lg">
        {translations.form.categoryPrompt}
      </h2>
      <div className="mb-6 flex space-x-4">
        <button
          type="button"
          onClick={(e) => {
            setCategory("ORIGINAL");
            ripple.create(e, "light"); // Add ripple effect
          }}
          className={`px-4 py-2 rounded border-2 transition ${
            formData.category === "ORIGINAL"
              ? "bg-dark-accentpurple border-dark-accentpurple dark:text-dark-white"
              : "bg-transparent border-form-gray-dark dark:text-form-text-dark"
          } hover:opacity-80`}
        >
          {translations.form.categories.original}
        </button>
        <button
          type="button"
          onClick={(e) => {
            setCategory("COVER");
            ripple.create(e, "light");
          }}
          className={`px-4 py-2 rounded border-2 transition ${
            formData.category === "COVER"
              ? "bg-dark-accentpurple border-dark-accentpurple dark:text-dark-white"
              : "bg-transparent border-form-gray-dark dark:text-form-text-dark"
          } hover:opacity-80`}
        >
          {translations.form.categories.cover}
        </button>
      </div>
      <p className="mb-6 text-sm text-form-gray-dark dark:text-form-gray-light">
        {translations.form.requiredFieldNote}
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-transparent">
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.nameLabel}{" "}
            <span className="text-form-red">*</span>
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
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.universityLabel}{" "}
            <span className="text-form-red">*</span>
          </label>
          <select
            name="university_id"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.university_id}
            onChange={handleInputChange}
            required
          >
            <option value="">{translations.form.chooseUniversity}</option>
            {universities.map((uni) => (
              <option key={uni.id} value={uni.id}>
                {uni.university}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.emailLabel}{" "}
            <span className="text-form-red">*</span>
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
        <div className="mb-2">
          <label className="block font-semibold mb-1">
            {translations.form.phoneLabel}{" "}
            <span className="text-form-red">*</span>
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
        <p className="text-sm text-form-gray-dark dark:text-form-gray-light mb-4">
          {translations.form.contactInfoNote}
        </p>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.bandNameLabel}{" "}
            <span className="text-form-red">*</span>
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
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.songNameLabel}{" "}
            <span className="text-form-red">*</span>
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
        <div className="mb-2 font-semibold">
          {translations.form.membersLabel}{" "}
          <span className="text-form-red">*</span>
        </div>
        {formData.members.map((member, index) => (
          <div key={index} className="flex flex-wrap gap-2 mb-4">
            <input
              type="text"
              placeholder={translations.form.namePlaceHolder}
              className="flex-1 p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              required
            />
            <select
              className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.university_id}
              onChange={(e) =>
                handleMemberChange(index, "university_id", e.target.value)
              }
              required
            >
              <option value="">{translations.form.chooseUniversity}</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.university}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder={translations.form.instrumentPlaceHolder}
              className="flex-1 p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
              value={member.instrument}
              onChange={(e) =>
                handleMemberChange(index, "instrument", e.target.value)
              }
              required
            />
          </div>
        ))}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            type="button"
            onClick={handleAddMember}
            className="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-dark-white transition"
            title={translations.form.addMemberButton}
          >
            +
          </button>
          {formData.members.length > 1 && (
            <button
              type="button"
              onClick={handleDeleteMember}
              className="flex items-center justify-center w-8 h-8 text-2xl font-bold rounded-full bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-dark-white transition"
              title={translations.form.removeMemberButton}
            >
              -
            </button>
          )}
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.genreLabel}{" "}
            <span className="text-form-red">*</span>
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
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.linksLabel}
          </label>
          <input
            type="text"
            name="links"
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.links}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.experienceLabel}
          </label>
          <textarea
            name="about_1"
            rows={3}
            className="w-full p-2 dark:bg-form-input-dark dark:text-form-text-dark border border-form-gray-dark focus:outline-none focus:ring-2 focus:ring-dark-accentpurple"
            value={formData.about_1}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">
            {translations.form.aboutLabel}{" "}
            <span className="text-form-red">*</span>
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
        <div className="mb-6">
          <label className="block font-semibold mb-4">
            {translations.form.audioLabel}{" "}
            <span className="text-form-red">*</span>
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
              {translations.form.fileInputLabel}
            </label>
            {fileName && (
              <span className="ml-3 text-form-gray-light text-sm">
                {fileName}
              </span>
            )}
          </div>
        </div>
        <div className="mb-2">
          <div className="mb-2">
            <label className="inline-flex items-center" />
            <div>
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-dark-accentpurple dark:bg-form-input-dark"
                required
              />
              <span
                onClick={toggleModal}
                className="ml-2 cursor-pointer text-blue-500 underline hover:text-blue-700"
              >
                {translations.form.termCheckboxLabel}
                <span className="text-form-red">*</span>
              </span>
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
                <button
                  onClick={toggleModal}
                  className="absolute top-2 right-2 text-black text-3xl font-bold"
                >
                  &times;
                </button>

                <h3 className="text-xl font-semibold mb-4 text-black">
                  {translations.form.term}
                </h3>

                <iframe
                  src="https://api.ytumk.com.tr/v1/exapi/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0/policy"
                  className="w-full h-[70vh] border rounded"
                  title="Şartlar ve Koşullar"
                  frameBorder="0"
                ></iframe>

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, termsAccepted: true }));
                      toggleModal();
                    }}
                    className="bg-dark-accentpurple text-white px-6 py-2 rounded hover:opacity-80 transition"
                  >
                    {translations.form.termAcceptButton}
                  </button>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        termsAccepted: false,
                      }));
                      toggleModal();
                    }}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:opacity-80 transition"
                  >
                    {translations.form.termDenyButton}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={(e) => ripple.create(e, "light")}
            className="bg-dark-accentpurple text-dark-white font-semibold px-6 py-2 rounded hover:opacity-80 transition"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? translations.form.submittingButton
              : translations.form.submitButton}
          </button>
        </div>
        {isSubmitting && (
          <div className="w-full bg-gray-200 rounded-full my-4">
            <div
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: "50%" }}
            >
              {translations.form.submittingButton}
            </div>
          </div>
        )}
        {submissionStatus && (
          <p
            className={`mt-4 ${
              submissionStatus === translations.form.submissionStatusSuccess
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submissionStatus}
          </p>
        )}
      </form>
    </div>
  );
};

export default ParticipationForm;
