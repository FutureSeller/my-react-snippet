import { useState } from "react";

export function BasicControlledFormWithMultipleStates() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(firstName, lastName);
  };

  const onReset = () => {
    setFirstName("");
    setLastName("");
  };

  return (
    <>
      <h2>BasicControlledFormWithMultipleStates</h2>
      <form onSubmit={onSubmit}>
        <label>
          FirstName:
          <input
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </label>
        <label>
          LastName:
          <input
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
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
