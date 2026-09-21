> [!NOTE]
> Why this page, and what it must beat


## Publish settings


## ARTICLE — copy from here


# Non-manifold edges

Updated September 2026 · 7-minute read · Part of the TEELI 3D mesh glossary

A non-manifold edge is an edge in a 3D mesh that is not shared by exactly two faces. It either borders a hole (one face), joins three or more faces (a T-junction or internal wall), or sits on top of another edge. Because the mesh no longer encloses a clear inside and outside, slicers can't compute solid walls — so they warn you, auto-repair, or refuse the file.

Quick answers

* Is it just a hole? Sometimes. A hole is one kind of non-manifold edge (a boundary edge). Internal faces and overlapping shells are the other common kinds — and those are invisible from outside.

* Can I print anyway? Often, for a handful of edges on a decorative model. Risky for functional parts or counts in the hundreds. Details below.

* Fastest fix? Automatic repair, then re-check that the count is 0 and that the repair kept your colours and UVs.


## Manifold vs. non-manifold

A mesh a slicer can print is manifold (you'll also hear watertight or 2-manifold): every edge has exactly two faces, the surface encloses a volume, and all normals point outward. Break that and you get one of four cases:


## Why slicers complain

A slicer cuts the mesh into layers, turns each layer into closed 2D polygons, then decides what is inside (walls, infill) and outside. A boundary edge produces a polygon that never closes; a T-junction produces a point where three regions meet. The slicer has to guess — and guesses become missing walls, phantom infill, or a plate it refuses to slice.

* Bambu Studio / Orca Slicer flag the file on import and offer Fix model. The button relies on the Windows mesh-repair service, so it is missing on macOS and can time out on large files. It also rebuilds triangles — which is why painted multi-colour models sometimes come back single-colour.

* PrusaSlicer puts a warning triangle on the object ("auto-repaired N errors"); the deeper Fix through Netfabb option is Windows-only.

* Cura relies on its Mesh Fixes settings (Union Overlapping Volumes, Remove All Holes, Extensive Stitching); the free Mesh Tools plugin adds Check mesh and Fix simple holes.

* Rhino shows them with ShowEdges; Fusion 360 reports them in the Mesh workspace (Modify → Repair).


## Can you still print with non-manifold edges?

Sometimes — the forum posts saying "I printed it with the error and it was fine" are true. Slicers silently close small gaps and ignore tiny internal faces. The problem is you can't tell from the count alone, so use this rule:

* A few edges on a decorative model (miniature, ornament, cosplay prop): slice it and scrub the layer preview. If every layer shows complete walls, print.

* Hundreds of edges, or a functional part (threads, snap fits, anything that must hold liquid or load): repair first. Missing internal walls weaken a part even when the outside looks perfect.

* Multi-colour or textured models: repair with a tool that reports whether colours and UVs survived — or you find out at hour six of the print.


## What causes them

1. Extrude without moving (Blender, Maya) — leaves a duplicate face on top of the original.

1. Booleans that keep internal faces where the two objects overlapped.

1. Zero-thickness surfaces — a plane, a cloth simulation, a logo curve never given depth (add Solidify).

1. Imported CAD (STEP → STL) where offset surfaces don't quite meet.

1. Sculpting and decimation — fragments disconnected during Dyntopo or Remesh.

1. AI-generated meshes (text- or image-to-3D) — often several overlapping shells inside one file.

1. 3D scans / photogrammetry — undersides and occluded areas were never captured.


## How to fix non-manifold edges


### Option 1 — Automatic repair (about 2 minutes)

Upload the file to a mesh-repair tool, let it close boundary loops, remove internal faces and merge duplicates, then re-diagnose: the non-manifold count must be 0 and the mesh must be watertight. Read the appearance report too — if it reports lost UVs or materials, textures will not line up after repair.

→ Free check on TEELI: upload STL, OBJ, GLB or a ZIP and get every issue listed — open holes, flipped normals, duplicate vertices, degenerate faces, scale — before you pay for anything. [CTA button → app.teeli.net]


### Option 2 — Blender (manual, 10–15 minutes)

1. Select the object, press Tab for Edit Mode, then Alt+A to deselect everything.

1. Select → Select All by Trait → Non Manifold (Shift+Ctrl+Alt+M). The bad edges light up.

1. Fix by type:

1. Repeat step 2 until nothing gets selected.

1. Verify with the 3D-Print Toolbox (Blender 4.2+: Get Extensions; older versions: Add-ons) → N-panel → Check All → Non Manifold Edge: 0. Its Make Manifold button automates most of the above.


### Option 3 — Inside the slicer (30 seconds, Windows only)

Right-click the model → Fix model (Bambu Studio, Orca) or click the warning icon → Fix through Netfabb (PrusaSlicer). Fine for small counts. If it times out, strips colours, or the count comes back non-zero, use Option 1 or 2.


### Option 4 — Rebuild the surface (last resort)

Meshmixer (Analysis → Inspector → Auto Repair All, or Edit → Make Solid — no longer developed by Autodesk but still downloadable), Blender's Remesh modifier, or any voxel remesher. This always yields a manifold shell but destroys UVs and fine detail.


## How TEELI checks for them

TEELI's diagnosis loads the raw file, counts open holes (boundary loops), checks normals, duplicate vertices, degenerate faces and scale, and returns a single health score. After a repair it re-runs the same checks and reports holes filled, non-manifold edges remaining, watertight: yes/no and any appearance loss (for example "7 of 8 parts lost their texture coordinates") — so you know whether your colours survived before you download.


## FAQ

What does "non-manifold edge" mean?

An edge in a mesh that is not shared by exactly two faces — one face (a hole or single-sided surface) or three or more faces (an internal wall or overlapping shell).

Can you still print with non-manifold edges?

Often, for a few edges on a decorative model — check the layer preview first. Repair first for functional parts, counts in the hundreds, or multi-colour models.

How do I fix the "non-manifold edges" error in Bambu Studio or Orca Slicer?

Click Fix model (Windows). If the button is missing (macOS), times out, or removes colours, repair the file in Blender or an online repair tool and re-import.

How do I fix non-manifold edges in Blender?

Edit Mode → Select → Select All by Trait → Non Manifold, then Merge by Distance, Fill Holes, delete Interior Faces and Recalculate Normals. Verify with the 3D-Print Toolbox.

How do I fix non-manifold edges in Rhino?

Run ShowEdges to display them, then MeshRepair (or Check / SelBadObjects on the source surfaces). Export the STL again and re-check.

Are non-manifold edges the same as holes?

No. A hole is one kind (a boundary edge). Internal faces and duplicate faces are also non-manifold and never show up as holes.

Why did repairing remove the colours from my model?

Automatic repairers rebuild triangles; painted colours and UVs live on the old triangles and are dropped. Use a repair that reports appearance loss, or repaint after repair.


## Related terms

Watertight mesh · Flipped (inverted) normals · Degenerate faces · Self-intersections · STL vs 3MF · T-junction


## JSON-LD (paste once in the page head — Next.js: <Script id="ld" type="application/ld+json">)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://teeli.net/glossary/non-manifold-edges#article",
      "mainEntityOfPage": "https://teeli.net/glossary/non-manifold-edges",
      "headline": "Non-manifold edges: what they are and how to fix them",
      "description": "A non-manifold edge is a mesh edge not shared by exactly two faces. Why Bambu Studio, Orca and PrusaSlicer warn, when you can print anyway, and how to fix it.",
      "datePublished": "2026-09-08",
      "dateModified": "2026-09-08",
      "author": {
        "@type": "Person",
        "name": "Abhijeet Pratap Singh",
        "url": "https://teeli.net/about",
        "sameAs": ["https://in.linkedin.com/in/abhijeet-pratap-singh-teeli-net"]
      },
      "publisher": {
        "@type": "Organization",
        "name": "TEELI",
        "url": "https://teeli.net",
        "logo": { "@type": "ImageObject", "url": "https://teeli.net/logo.png" }
      },
      "about": { "@id": "https://teeli.net/glossary/non-manifold-edges#term" }
    },
    {
      "@type": "DefinedTerm",
      "@id": "https://teeli.net/glossary/non-manifold-edges#term",
      "name": "Non-manifold edge",
      "description": "An edge in a 3D mesh that is not shared by exactly two faces: one face (a boundary edge or hole) or three or more faces (an internal wall or overlapping shell).",
      "url": "https://teeli.net/glossary/non-manifold-edges",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "TEELI 3D mesh glossary",
        "url": "https://teeli.net/glossary"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://teeli.net/glossary/non-manifold-edges#faq",
      "mainEntity": [
        { "@type": "Question", "name": "What does \"non-manifold edge\" mean?", "acceptedAnswer": { "@type": "Answer", "text": "An edge in a mesh that is not shared by exactly two faces — one face (a hole or single-sided surface) or three or more faces (an internal wall or overlapping shell)." } },
        { "@type": "Question", "name": "Can you still print with non-manifold edges?", "acceptedAnswer": { "@type": "Answer", "text": "Often, for a few edges on a decorative model — check the layer preview first. Repair first for functional parts, counts in the hundreds, or multi-colour models." } },
        { "@type": "Question", "name": "How do I fix the non-manifold edges error in Bambu Studio or Orca Slicer?", "acceptedAnswer": { "@type": "Answer", "text": "Click Fix model (Windows). If the button is missing (macOS), times out, or removes colours, repair the file in Blender or an online repair tool and re-import." } },
        { "@type": "Question", "name": "How do I fix non-manifold edges in Blender?", "acceptedAnswer": { "@type": "Answer", "text": "Edit Mode → Select → Select All by Trait → Non Manifold, then Merge by Distance, Fill Holes, delete Interior Faces and Recalculate Normals. Verify with the 3D-Print Toolbox." } },
        { "@type": "Question", "name": "How do I fix non-manifold edges in Rhino?", "acceptedAnswer": { "@type": "Answer", "text": "Run ShowEdges to display them, then MeshRepair (or Check / SelBadObjects on the source surfaces). Export the STL again and re-check." } },
        { "@type": "Question", "name": "Are non-manifold edges the same as holes?", "acceptedAnswer": { "@type": "Answer", "text": "No. A hole is one kind (a boundary edge). Internal faces and duplicate faces are also non-manifold and never show up as holes." } },
        { "@type": "Question", "name": "Why did repairing remove the colours from my model?", "acceptedAnswer": { "@type": "Answer", "text": "Automatic repairers rebuild triangles; painted colours and UVs live on the old triangles and are dropped. Use a repair that reports appearance loss, or repaint after repair." } }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://teeli.net/" },
        { "@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://teeli.net/glossary" },
        { "@type": "ListItem", "position": 3, "name": "Non-manifold edges", "item": "https://teeli.net/glossary/non-manifold-edges" }
      ]
    }
  ]
}
```

Note: Google stopped showing FAQ rich results for most sites in Aug 2023 — FAQPage here is for AI engines (ChatGPT, Perplexity, AI Overview), not for dropdowns in Google. The FAQ text must stay visible on the page and identical to the schema.


## Pre-publish checklist

Verify slicer strings with fresh screenshots — Bambu Studio (latest), Orca, PrusaSlicer 2.9: exact warning text, where "Fix model" lives, macOS behaviour. The article paraphrases on purpose; adjust anything that differs. Never quote UI text you haven't seen this week.

Blender 4.5: confirm Select All by Trait → Non Manifold, M → By Distance, 3D-Print Toolbox via Get Extensions. Screenshot the selection.

Product truth check (ask agent, report only): the diagnosis UI has no "Non-manifold edges: N" line today (it shows Watertight / Normals / Duplicate verts / Degenerate faces / Self-intersections "not checked" / Scale). The article is worded around "open holes" + "non-manifold edges remaining after repair", which the engine does report. Add the UI line in PR-W2, then strengthen the section.

Do not write "no fix, no charge" anywhere until the agent confirms the repair hold is released when a repair does not converge.

Images: 4-case SVG diagram (Figma/Excalidraw, 1200×675, doubles as OG image) · Bambu warning screenshot · Blender selection screenshot. WebP < 100 KB, alt text like "Bambu Studio non-manifold edges warning dialog".

Internal links: only link glossary terms that exist at publish time — publish stubs for watertight-mesh and flipped-normals first, or ship this page with plain text and add links later.

CTA link: https://app.teeli.net/?utm_source=teeli.net&utm_medium=glossary&utm_campaign=non-manifold until /embed/check?source=glossary:non-manifold exists (T4.1).

View-source test: H1 + answer paragraph + FAQ must be in the server HTML, not injected client-side.

Canonical URL, OG title/description/image, visible "Updated" date, author box linking to LinkedIn.

After publish: regenerate sitemap.xml, add to llms.txt, GSC → Request indexing, Bing Webmaster → Submit URL.

Distribution (Reddit rule from the 15 Aug research: help first, no link for 30 days): answer in the threads Google itself surfaced — r/3Dprinting "Non-manifold Geometry can't be repaired?" (Aug 2026), r/BambuLab "how to deal with non-manifold edges", the Bambu P1S/P2S Facebook group. Offer the free check only when someone asks.

Ads: none yet. Reserve one in-content slot after "What causes them" and one after the FAQ; AdSense application only after 15–20 pages.


## Spoke #2 outline — /blog/bambu-studio-non-manifold-edges

Target ≈ 1,100/mo US, fastest-growing sub-cluster (+247% YoY) [DFS]. Beats: forum.bambulab.com thread (2023) + r/BambuLab threads.

* H1: Bambu Studio "non-manifold edges" warning — what it means and 3 ways to fix it

* 40–60 word answer → why Bambu flags it → Fix model: what it does, when it's missing (macOS), why it times out, why colours vanish on painted 3MF → Fix in Blender (link to hub) → Fix online (free check) → "Can I print anyway?" layer-preview test → FAQ: Orca same? · P1S/P2S/H2D differences (none — it's the slicer) · "error-26 / error-184" = the edge count · multi-colour 3MF

* Links: up to this hub, down to /tools/fix-non-manifold-stl (after T4.1). Screenshots from your own Bambu Studio install.