import { ImageResponse } from 'next/og';

/**
 * Branded default social-share image, generated at build time with next/og.
 * Replaces the old broken /logos/teeli-og-default.png reference and gives every
 * page a real 1200×630 raster preview (SVG OG images don't render on X/FB/LinkedIn).
 * Blog posts still override this with their own thumbnails.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';
export const ogAlt = 'TEELI.NET — Fix & Render 3D Files Automatically';

export function renderTeeliOG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#05080f',
          backgroundImage:
            'linear-gradient(135deg, rgba(22,199,158,0.16) 0%, rgba(5,8,15,0) 40%), linear-gradient(315deg, rgba(139,92,246,0.18) 0%, rgba(5,8,15,0) 42%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 32,
            letterSpacing: 8,
            color: '#16c79e',
            fontWeight: 700,
          }}
        >
          TEELI.NET
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 30,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.05,
            maxWidth: 960,
          }}
        >
          Fix &amp; Render 3D Files Automatically
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 30,
            fontSize: 30,
            color: '#9fb3c8',
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Upload a model — Teeli repairs the mesh, previews it in the browser, and
          renders in the cloud with Blender Cycles.
        </div>
        <div style={{ display: 'flex', marginTop: 'auto', fontSize: 26, color: '#5f7488' }}>
          teeli.net
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
