import QRCode from "qrcode";
import { useEffect, useState } from "react";

export function QR({ content }: { content: string }) {
  const [dataUrl, setDataUrl] = useState<string | undefined>();

  useEffect(() => {
    async function generateDataUrl() {
      const dataUrl = await QRCode.toDataURL(content, {
        width: 512,
      });

      setDataUrl(dataUrl);
    }

    generateDataUrl();
  }, [content]);

  return (
    <div>
      <img src={dataUrl} alt="QR Code" />
    </div>
  );
}
