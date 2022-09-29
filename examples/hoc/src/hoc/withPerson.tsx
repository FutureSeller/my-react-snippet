import { useState, useEffect } from "react";

import { createPerson } from "my-mock-data";
import type { Person } from "my-mock-data";

const fetchSomehting = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

type WithPersonProps = {
  person: Person;
};

export function withPerson<T extends WithPersonProps>(
  Component: React.ComponentType<T>
) {
  // eslint-disable-next-line
  return (props: Omit<T, keyof WithPersonProps>) => {
    const [person, setPerson] = useState<Person | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchSomehting().then(() => {
        setLoading(false);
        setPerson(createPerson());
      });
    }, []);

    if (loading) return <div>Loading....</div>;
    return person && <Component {...(props as T)} person={person} />;
  };
}
