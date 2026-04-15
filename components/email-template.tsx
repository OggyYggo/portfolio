import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function EmailTemplate({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        color: '#111827',
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
        New portfolio inquiry
      </h1>
      <p style={{ margin: '0 0 8px' }}>
        <strong>From:</strong> {name}
      </p>
      <p style={{ margin: '0 0 8px' }}>
        <strong>Email:</strong> {email}
      </p>
      <p style={{ margin: '0 0 16px' }}>
        <strong>Subject:</strong> {subject}
      </p>
      <div
        style={{
          padding: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          backgroundColor: '#f9fafb',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message}
      </div>
    </div>
  );
}
