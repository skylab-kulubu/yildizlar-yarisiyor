const BASE_URL = 'https://api.ytumk.com.tr/v1/exapi';

/**
 * Sends a participation form to the server.
 * @param {FormData} formData - The form data to be sent.
 * @returns {Promise<Response>} The server's response.
 */
export const postParticipationForm = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/participation_form`, {
      method: 'POST',
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Error submitting the participation form:", error);
    throw error;
  }
};

/**
 * Fetches the list of sponsors.
 * @returns {Promise<any>} The list of sponsors.
 */
export const getSponsors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0/sponsors`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sponsors: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    throw error;
  }
};

/**
 * Fetches the list of juries.
 * @returns {Promise<any>} The list of juries.
 */
export const getJuries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/event/c7165832-1fad-48bc-9219-dd12e8cd2ec0/juries`);
    if (!response.ok) {
      throw new Error(`Failed to fetch juries: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching juries:", error);
    throw error;
  }
};

/**
 * Fetches the list of universities.
 * @returns {Promise<any>} The list of universities.
 */
export const getUniversities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/universities`);
    if (!response.ok) {
      throw new Error(`Failed to fetch universities: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching universities:", error);
    throw error;
  }
};
