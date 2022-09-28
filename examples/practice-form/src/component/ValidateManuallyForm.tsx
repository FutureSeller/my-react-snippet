import React, { useState } from "react";
import { useDynamicRefs } from "my-custom-hooks";

interface NameState {
  firstName: string;
  lastName: string;
}

interface FormState<T> {
  formValues: T;
  errors?: {
    [Key in keyof T]?: string;
  };
}

const FormControlWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ position: "relative", padding: "16px 0", marginBottom: "16px" }}
    >
      {children}
    </div>
  );
};

const FormError = ({ children }: { children: React.ReactNode }) => {
  return <div style={{ position: "absolute", color: "red" }}>{children}</div>;
};

export function ValidateManuallyForm() {
  const [getRef, setRef] = useDynamicRefs<HTMLInputElement>();
  const [values, setValues] = useState<FormState<NameState>>(() => {
    return {
      formValues: {
        firstName: "",
        lastName: "",
      },
    };
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const errors = { ...values.errors };
    switch (name) {
      case "firstName":
        if (value.length < 4) {
          errors.firstName = "hello firstName";
        } else {
          delete errors.firstName;
        }
        break;
      case "lastName":
        if (value.length < 4) {
          errors.lastName = "hello lastName";
        } else {
          delete errors.lastName;
        }
        break;
      default:
        break;
    }

    setValues({
      formValues: {
        ...values.formValues,
        [name]: value,
      },
      errors: Object.keys(errors).length > 0 ? errors : undefined,
    });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { formValues, errors } = values;

    if (errors) {
      const [errorName] = Object.keys(errors);
      getRef(errorName)?.current?.focus();
      return;
    }

    const newErrors: FormState<NameState>["errors"] = {};
    Object.entries(formValues).forEach(([key, value]) => {
      switch (key) {
        case "firstName":
          if (value.length < 4) {
            newErrors.firstName = "hello firstName";
          }
          break;
        case "lastName":
          if (value.length < 4) {
            newErrors.lastName = "hello lastName";
          }
          break;
        default:
          break;
      }
    });
    if (newErrors) {
      setValues({
        formValues,
        errors: newErrors,
      });
      return;
    }

    console.log(values);
  };

  const onReset = () => {
    setValues({
      formValues: {
        firstName: "",
        lastName: "",
      },
    });
  };

  return (
    <>
      <h2>ValidateManuallyForm</h2>
      <form onSubmit={onSubmit}>
        <FormControlWrapper>
          <label>
            FirstName:
            <input
              ref={setRef("firstName")}
              type="text"
              name="firstName"
              onChange={onChange}
              onBlur={onChange}
              value={values.formValues["firstName"]}
            />
          </label>
          {values.errors?.firstName && (
            <FormError>{values.errors.firstName}</FormError>
          )}
        </FormControlWrapper>
        <FormControlWrapper>
          <label>
            LastName:
            <input
              ref={setRef("lastName")}
              type="text"
              name="lastName"
              onChange={onChange}
              onBlur={onChange}
              value={values.formValues["lastName"]}
            />
          </label>
          {values.errors?.lastName && (
            <FormError>{values.errors.lastName}</FormError>
          )}
        </FormControlWrapper>
        <button type="button" onClick={onReset}>
          리셋
        </button>
        <button>제출</button>
      </form>
    </>
  );
}
