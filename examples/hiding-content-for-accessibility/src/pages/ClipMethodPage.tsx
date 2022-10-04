import { VisuallyHidden } from "ui";

import { MySingleRadioInputForm } from "../components/MySingleRadioInputForm";

export function ClipMethodPage() {
  return (
    <div>
      <VisuallyHidden>
        <h2>ClipMethodPage Title</h2>
      </VisuallyHidden>
      <p>ClipMethodPage Body</p>
      <hr style={{ margin: "32px 0" }} />
      <MySingleRadioInputForm />
    </div>
  );
}
