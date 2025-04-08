// src/components/LogoEditor.tsx
import React, { useState } from 'react';

export default function LogoEditor() {
  const [logoURL, setLogoURL] = useState('/assets/splash.png');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const previewURL = URL.createObjectURL(file);
      setLogoURL(previewURL);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Edit Logo</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      {logoURL && (
        <img
          src={logoURL}
          alt="Preview"
          className="w-48 h-auto rounded shadow border"
        />
      )}
    </div>
  );
}
