"use client";

import React, { useState, useCallback, useRef } from "react";
import mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { convertAllWords } from "@/lib/dictionary";

interface FileConverterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FileConverter({ isOpen, onClose }: FileConverterProps) {
  const [status, setStatus] = useState<"idle" | "processing" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "txt" && ext !== "docx" && ext !== "pdf") {
      setStatus("error");
      setErrorMsg("Only .txt, .docx, and .pdf files are supported.");
      return;
    }

    setStatus("processing");
    setErrorMsg("");

    try {
      let text = "";

      if (ext === "txt") {
        text = await file.text();
      } else if (ext === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      } else if (ext === "pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item: any) => item.str);
          fullText += strings.join(" ") + "\n";
        }
        text = fullText;
      }

      // Translate text
      const lines = text.split("\n");
      const translatedLines = lines.map(line => convertAllWords(line));

      // Download
      if (ext === "txt" || ext === "pdf") {
        const outText = translatedLines.join("\n");
        const blob = new Blob([outText], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        // Output PDF as txt to preserve text accurately without formatting issues
        const originalName = file.name.replace(/\.[^/.]+$/, "");
        link.download = `${originalName}_Urdu.txt`;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 1000);
      } else if (ext === "docx") {
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: translatedLines.map(line => 
                new Paragraph({
                  children: [new TextRun({ text: line, rightToLeft: true })],
                })
              ),
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.name.replace(".docx", "_Urdu.docx");
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 1000);
      }

      setStatus("done");
      setTimeout(() => {
        setStatus("idle");
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg("Failed to process file. It might be corrupted or too large.");
    }
  }, [onClose]);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 9999 }}>
      <div className="modal-content file-converter-modal">
        <div className="modal-header">
          <h2 className="modal-title">📄 Document Converter</h2>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="modal-body file-converter-body">
          {status === "processing" ? (
            <div className="processing-state">
              <div className="large-spinner" />
              <p>Translating Document...<br/><small>Please wait, large files may take a few seconds.</small></p>
            </div>
          ) : status === "done" ? (
            <div className="success-state">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--clr-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <p>Translation Complete!</p>
              <small>Your translated file has been downloaded.</small>
            </div>
          ) : (
            <div
              className="drag-drop-zone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
              <p><strong>Click to upload</strong> or drag and drop</p>
              <small>Supported formats: .txt, .docx, .pdf</small>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".txt,.docx,.pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    processFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}
          {status === "error" && <p className="panel-error" style={{textAlign:"center", marginTop:"1rem"}}>⚠ {errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}
