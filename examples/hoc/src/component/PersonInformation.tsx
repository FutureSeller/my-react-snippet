import { withPerson } from "../hoc/withPerson";
import { inject } from "../hoc/injectProps";

import type { Person } from "my-mock-data";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  person: Person;
}

function PersonCard({ person, ...rest }: Props) {
  const personEntries = Object.entries(person);

  return (
    <div {...rest}>
      <ul>
        {personEntries.map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const PersonInformation = inject(withPerson(PersonCard), {
  style: {
    width: "calc(50% - 10px)",
    marginTop: "20px",
    border: "1px solid white",
    borderRadius: "8px",
  },
});
