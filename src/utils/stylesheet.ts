import { config } from "@/config";

function setSolwireStyles() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = config.urls.stylesheet;
  document.head.appendChild(link);
}

export { setSolwireStyles };
