import React from "react";
import { Link } from "react-router-dom";

const PersonPage = props => {
  const { person } = props;
  return (
    <div>
      <h2>
        <strong>{person.lastName}</strong>, {person.firstName}
        <p>Diitails</p>
      </h2>
      <div>Ikä: {person.age}</div>
      <div>Sukupuoli: {person.gender}</div>
      <div>Kätisyys: {person.handedness}</div>
      <br />
      <Link to="/">Takaisin</Link>
    </div>
  );
};

export default PersonPage;
