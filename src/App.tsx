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
    <div className="p-4 max-w-prose mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
      </header>
      <main className="space-y-8">
        <form onChange={(e) => handleChange(new FormData(e.currentTarget))}>
          <label
            htmlFor="content"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="field-sizing-content resize-none block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
          ></textarea>
        </form>
        {output && (
          <>
            <div className="p-4">
              <QR content={output.content} className="w-full shadow" />
            </div>

            <pre className="bg-teal-100 p-4 rounded-xl">
              {JSON.stringify(
                {
                  size: output.code.modules.size,
                  version: output.code.version,
                  mask: output.code.maskPattern,
                  segments: output.code.segments,
                },
                null,
                2,
              )}
            </pre>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
