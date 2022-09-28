import { useState } from "react";

interface ValueType {
  firstName: string;
  lastName: string;
}

export function BasicControlledForm() {
  const [values, setValues] = useState<ValueType>({
    firstName: "",
    lastName: "",
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(values);
  };

  const onReset = () => {
    setValues({
      firstName: "",
      lastName: "",
    });
  };

  return (
    <>
      <h2>BasicControlledForm</h2>
      <form onSubmit={onSubmit}>
        <label>
          FirstName:
          <input
            type="text"
            name="firstName"
            onChange={onChange}
            value={values["firstName"]}
          />
        </label>
        <label>
          LastName:
          <input
            type="text"
            name="lastName"
            onChange={onChange}
            value={values["lastName"]}
          />
        </label>
        <button type="button" onClick={onReset}>
          리셋
        </button>
        <button>제출</button>
      </form>
    </>
  );
}
