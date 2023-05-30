import React, { useState } from "react";
import "./CreditCardForm.scss";
import axios from "axios";
interface CreditCardFormState {
  name: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
}

const CreditCardForm: React.FC = () => {
  const [formState, setFormState] = useState<CreditCardFormState>({
    name: "",
    cardNumber: "",
    cvv: "",
    expiry: "",
  });
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: formState.name,
      cardNumber: formState.cardNumber,
      cvv: formState.cvv,
      expiry: formState.expiry,
    };

    try {
      const response = await axios.post(
        "https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9",
        payload
      );
      setResponse(response.data.success ? "Success" : "Error");
    } catch (error) {
      setResponse("An error occurred while processing your request.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber" || name == "cvv") {
      const numericValue = value.replace(/\D/g, "");
      setFormState((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
    } else if (name === "expiry") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = numericValue.replace(
        /^(\d{2})(\d{0,4}).*/,
        (match, p1, p2) => `${p1}${p2 ? `/${p2}` : ""}`
      );
      setFormState((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div className="credit-card-form">
      <h1>Card Details</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
          required
        />

        <div className="row2">
          <div>
            <label htmlFor="card-number">Card Number:</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              value={formState.cardNumber}
              onChange={handleChange}
              required
              maxLength={16}
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={formState.cvv}
              onChange={handleChange}
              required
              maxLength={3}
            />
          </div>
        </div>

        <label htmlFor="expiry">Expiry (MM/YYYY):</label>
        <input
          type="text"
          id="expiry"
          name="expiry"
          value={formState.expiry}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      <div
        className={`${response == "Success" ? "successColor" : "failureColor"}`}
      >
        {response}
      </div>
    </div>
  );
};

export default CreditCardForm;
