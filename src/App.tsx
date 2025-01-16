import QRCode, { type QRCode as QRCodeOutput } from "qrcode";
import { useState } from "react";
import { QR } from "./qr";

function App() {
  const [output, setOutput] = useState<{
    content: string;
    code: QRCodeOutput;
  }>();

  function handleChange(data: FormData) {
    const content = data.get("content") as string;

    setOutput({
      content: content,
      code: QRCode.create(content),
    });
  }

  return (
    <>
      <form onChange={(e) => handleChange(new FormData(e.currentTarget))}>
        <textarea name="content"></textarea>
      </form>
      {output && (
        <output>
          <QR content={output.content} />

          <pre>
            {JSON.stringify(
              {
                size: output.code.modules.size,
                version: output.code.version,
                mask: output.code.maskPattern,
                segments: output.code.segments,
              },
              null,
              2
            )}
          </pre>
        </output>
      )}
    </>
  );
}

export default App;
