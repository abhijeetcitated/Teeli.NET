interface ToolUploadDropzoneProps {
  slug?: string;
  sizeCapMB?: number;
}

// The real checker runs inside the TEELI app (iframe); teeli.net code never handles the user's file.
export default function ToolUploadDropzone({
  slug = 'fix-non-manifold-stl',
  sizeCapMB = 200,
}: ToolUploadDropzoneProps) {
  return (
    <div className="w-full my-4">
      <iframe
        src={`https://app.teeli.net/embed/check?source=tools:${slug}`}
        title="Free STL check and repair — TEELI"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
        className="block w-full min-h-[560px] rounded-2xl sm:rounded-3xl border border-emerald-500/40 bg-zinc-900/90"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
        <span>
          .STL · .GLB · .OBJ (zipped) · up to {sizeCapMB} MB · checked on TEELI servers · guest files deleted after 24 hours
        </span>
        <a
          href={`https://app.teeli.net/check?source=tools:${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
        >
          Open the checker in a new tab
        </a>
      </div>
    </div>
  );
}
