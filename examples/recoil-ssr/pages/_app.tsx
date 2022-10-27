import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot, RecoilRootProps } from "recoil";

import { ssrAllAtoms, isSSRAtomKeys, SSRAllAtoms } from "../store";

type InitializeRecoilStateType = Extract<
  RecoilRootProps,
  { override?: true }
>["initializeState"];

interface RecoilAppProps {
  initialRecoilState?: SSRAllAtoms;
}

export default function App({
  Component,
  pageProps,
}: AppProps<RecoilAppProps>) {
  const { initialRecoilState = { nameState: "" }, ...restPageProps } =
    pageProps;

  const initializeRecoilState: InitializeRecoilStateType = (
    mutableSnapshot
  ) => {
    Object.keys(initialRecoilState).map((key) => {
      if (isSSRAtomKeys(key)) {
        const value = initialRecoilState[key];
        const atom = ssrAllAtoms[key];
        mutableSnapshot.set(atom, value);
      }
    });
  };

  return (
    <RecoilRoot initializeState={initializeRecoilState}>
      <Component {...restPageProps} />
    </RecoilRoot>
  );
}
