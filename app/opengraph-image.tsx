import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AllFormatter — Free Online Developer Tools';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a', // slate-900
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {/* Logo Mark */}
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '32px',
              background: 'linear-gradient(to top right, #6366f1, #a855f7, #ec4899)', // indigo-500 -> purple-500 -> pink-500
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '72px',
              fontWeight: 900,
              boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.2)',
            }}
          >
            AF
          </div>
          
          {/* Text Mark */}
          <div
            style={{
              fontSize: '96px',
              fontWeight: 900,
              background: 'linear-gradient(to right, #818cf8, #c084fc, #f472b6)', // indigo-400 -> purple-400 -> pink-400
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            AllFormatter
          </div>
        </div>

        <div
          style={{
            marginTop: '48px',
            fontSize: '36px',
            color: '#94a3b8', // slate-400
            fontWeight: 500,
          }}
        >
          Format JSON, convert YAML, decode JWTs, and more.
        </div>
        
        {/* Pills */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '64px' }}>
          {['JSON Formatter', 'JWT Decoder', 'HTML Beautifier', 'Base64 Tool'].map((text) => (
            <div
              key={text}
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                color: '#818cf8',
                padding: '12px 24px',
                borderRadius: '99px',
                fontSize: '24px',
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
