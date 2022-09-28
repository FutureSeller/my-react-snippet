import { useRef } from "react";

export function BasicUncontrolledForm() {
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    console.log(firstNameInputRef.current?.value);
    console.log(lastNameInputRef.current?.value);
  };

  return (
    <>
      <h2>BasicUncontrolledForm</h2>
      <form onSubmit={onSubmit}>
        <label>
          FirstName
          <input type="text" name="firstName" ref={firstNameInputRef} />
        </label>
        <label>
          LastName
          <input type="text" name="lastName" ref={lastNameInputRef} />
        </label>
        <button type="reset">리셋</button>
        <button>제출</button>
      </form>
    </>
  );
}
