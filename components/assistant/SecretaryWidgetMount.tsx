"use client";

import dynamic from "next/dynamic";

const SecretaryWidget = dynamic(() => import("./SecretaryWidget"), {
  ssr: false,
  loading: () => null,
});

export default function SecretaryWidgetMount() {
  return <SecretaryWidget />;
}

