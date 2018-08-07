import React from "react";
import { Link } from "react-router-dom";

const needsPerson = params => Component => props => {
  const { person, ...rest } = props;
  if (!person || person.age > params.age) {
    return null;
  }
  return <Component {...rest} person={person} />;
};

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

export default needsPerson({ age: 80 })(PersonPage);
