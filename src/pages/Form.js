import React from 'react';

const Form = () => {
  return (
    <form>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="school">School:</label>
        <input type="text" id="school" name="school" required />
      </div>
      <div>
        <label htmlFor="number">Number:</label>
        <input type="text" id="number" name="number" required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;