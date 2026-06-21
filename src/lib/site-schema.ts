import { LINKEDIN_COMPANY_URL, REDDIT_PROFILE_URL, TEELI_APP_URL } from './social-links';

/**
 * Sitewide Schema.org entity graph (Organization + WebSite + SoftwareApplication).
 *
 * This is the "entity-first" foundation for GEO/AEO: it defines who Teeli is as a
 * stable, cross-referenced entity (@id links) so AI engines and search can ground
 * brand mentions, attribute citations, and understand the product. Rendered once,
 * server-side, in the root layout so every page (and non-JS AI crawlers) sees it.
 */

const SITE_URL = 'https://teeli.net';

export const SITE_DESCRIPTION =
  'Teeli is a browser-based app for repairing, previewing, and cloud-rendering 3D models — upload a model, run geometry diagnostics, repair non-manifold meshes, preview with WebGPU, and render with Blender Cycles on cloud GPUs, billed with simple credits.';

export function generateSiteSchemaGraph(): object {
  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'TEELI.NET',
    alternateName: 'Teeli',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/teeli-logo.svg`,
      contentUrl: `${SITE_URL}/teeli-logo.svg`,
      caption: 'TEELI.NET',
    },
    image: { '@id': `${SITE_URL}/#logo` },
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://twitter.com/teeli_net',
      LINKEDIN_COMPANY_URL,
      REDDIT_PROFILE_URL,
    ],
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'TEELI.NET',
    description: SITE_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-US',
  };

  const softwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#app`,
    name: 'Teeli',
    url: TEELI_APP_URL,
    applicationCategory: 'DesignApplication',
    applicationSubCategory: '3D Rendering',
    operatingSystem: 'Web browser',
    description:
      'Browser SaaS for 3D model import, geometry repair (Assimp, Trimesh, LibIGL), WebGPU preview, and cloud rendering with headless Blender Cycles. Outputs PNG, JPEG, MP4, and turntables. Credit-based billing.',
    featureList: [
      '3D model import (Assimp)',
      'Geometry diagnostics and non-manifold repair (Trimesh, LibIGL)',
      'In-browser WebGPU preview (Babylon.js)',
      'Cloud rendering with headless Blender Cycles on GPU workers',
      'PNG / JPEG / MP4 / turntable export',
      'AI-assisted denoising',
      'Credit-based billing',
    ],
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free to sign up; usage billed with credits.',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, softwareApplication],
  };
}
