import { useCallback, useState } from "react";

const STORAGE_KEY = "loom-sale-banner-dismissed";

function readDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** Pakistan local 0325… → WhatsApp wa.me expects 92325… */
const WHATSAPP_NUMBER = "923256982989";
const DISPLAY_NUMBER = "0325-6982989";

export default function SaleBanner() {
  const [visible, setVisible] = useState(() => !readDismissed());

  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="sale-banner" role="region" aria-label="Sale notice">
      <div className="sale-banner__inner">
        <p className="sale-banner__text">
          <strong>Website For Sale</strong>
          <span className="sale-banner__sep" aria-hidden>
            ·
          </span>
          Contact{" "}
          <a
            className="sale-banner__link"
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {DISPLAY_NUMBER} on WhatsApp
          </a>
        </p>
        <button
          type="button"
          className="sale-banner__close"
          onClick={dismiss}
          aria-label="Dismiss sale notice"
        >
          ×
        </button>
      </div>
    </div>
  );
}
