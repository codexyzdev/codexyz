"use client";
import { useState, useEffect } from "react";

export default function TerminalIcon() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <path d="m4 17 6-6-6-6" />
      <path
        d="M12 19h8"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      />
    </svg>
  );
}
