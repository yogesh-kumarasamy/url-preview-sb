import "@adaptavant/eds-fonts/inter/index.css"; // CSS file with the Tailwind directives

import brand from "@adaptavant/eds-brands/setmore-black";
import { Root } from "@adaptavant/eds-core";
import translations from "@adaptavant/eds-translations/english";

export default function EDSWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Root
      className="min-h-screen relative top-10 left-10"
      brand={brand} // brand config and tokens
      colorScheme="light" // preferred color scheme
      translations={translations} // preferred language for text that is built into components
    >
      {children}
    </Root>
  );
}
