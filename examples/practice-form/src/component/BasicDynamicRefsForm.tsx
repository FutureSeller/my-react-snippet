import { useDynamicRefs } from "my-custom-hooks";

export function BasicDynamicRefsForm() {
  const inputKeys = ["firstName", "lastName"];
  const [getRef, setRef] = useDynamicRefs<HTMLInputElement>();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    inputKeys.forEach((inputKey) => {
      console.log(inputKey, getRef(inputKey)?.current?.value);
    });
  };

  return (
    <>
      <h2>BasicDynamicRefsForm</h2>
      <form onSubmit={onSubmit}>
        {inputKeys.map((inputKey) => (
          <label key={inputKey}>
            {inputKey}
            <input type="text" ref={setRef(inputKey)} />
          </label>
        ))}
        <button type="reset">리셋</button>
        <button>제출</button>
      </form>
    </>
  );
}
