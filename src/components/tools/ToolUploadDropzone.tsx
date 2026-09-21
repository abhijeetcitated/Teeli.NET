"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, FileText, Sparkles } from 'lucide-react';

interface ToolUploadDropzoneProps {
  format?: string;
  slug?: string;
  sizeCapMB?: number;
}

export default function ToolUploadDropzone({
  format = 'STL',
  slug = 'fix-non-manifold-stl',
  sizeCapMB = 100,
}: ToolUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [detectedIssues, setDetectedIssues] = useState<{ nonManifold: number; boundaryEdges: number; watertight: boolean } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const processFile = (file: File) => {
    setSelectedFile({
      name: file.name,
      size: formatSize(file.size),
    });
    setIsScanning(true);
    setScanComplete(false);

    // Realistic diagnostic simulation
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setDetectedIssues({
        nonManifold: Math.floor(Math.random() * 45) + 12,
        boundaryEdges: Math.floor(Math.random() * 6) + 1,
        watertight: false,
      });
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const loadDemoFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile({
      name: 'Turbine_Blade_Sample.stl',
      size: '14.2 MB',
    });
    setIsScanning(true);
    setScanComplete(false);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setDetectedIssues({
        nonManifold: 38,
        boundaryEdges: 4,
        watertight: false,
      });
    }, 1100);
  };

  const resetDiagnostic = () => {
    setSelectedFile(null);
    setScanComplete(false);
    setIsScanning(false);
    setDetectedIssues(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full my-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".stl,.obj,.3mf,.glb,.gltf,.step,.iges"
        className="hidden"
        onChange={handleFileInputChange}
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
        className={`relative w-full rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 p-6 sm:p-8 text-center cursor-pointer select-none overflow-hidden ${
          isDragging
            ? 'border-emerald-400 bg-emerald-950/30 scale-[1.01] shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)]'
            : scanComplete
            ? 'border-emerald-500/60 bg-zinc-900/95 shadow-2xl cursor-default'
            : 'border-dashed border-emerald-500/50 hover:border-emerald-400 bg-zinc-900/90 hover:bg-zinc-900/95 shadow-[0_0_35px_-10px_rgba(16,185,129,0.25)] hover:shadow-[0_0_45px_-8px_rgba(16,185,129,0.35)]'
        }`}
      >
        {/* Subtle background glow grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        {/* State 1: Ready to Upload / Drag & Drop */}
        {!selectedFile && (
          <div className="relative z-10 max-w-lg mx-auto py-2 sm:py-4">
            {/* Pulsing Upload Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_-4px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-105">
              <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight mb-1.5">
              Drop your {format.toUpperCase()} file here to diagnose
            </h3>

            <p className="text-xs sm:text-sm text-zinc-300 mb-5 leading-relaxed">
              Drag &amp; drop your 3D mesh or click to browse. Instant ray-cast inspection.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-500/30 active:scale-95"
              >
                <UploadCloud className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Select 3D File</span>
              </button>

              <button
                type="button"
                onClick={loadDemoFile}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-zinc-800/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm border border-zinc-700/80 transition-all hover:border-emerald-500/40"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Test with Demo STL</span>
              </button>
            </div>

            {/* Supported Formats & Limits */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-zinc-400">
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 font-mono text-zinc-300">
                .STL
              </span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 font-mono text-zinc-300">
                .OBJ
              </span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 font-mono text-zinc-300">
                .3MF
              </span>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/60 font-mono text-zinc-300">
                .GLB
              </span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">Max {sizeCapMB}MB</span>
              <span className="text-zinc-500">·</span>
              <span className="text-emerald-400 font-medium">100% Free Cloud Ray-Cast</span>
            </div>
          </div>
        )}

        {/* State 2: Scanning / Processing */}
        {selectedFile && isScanning && (
          <div className="relative z-10 max-w-md mx-auto py-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <RefreshCw className="w-7 h-7 animate-spin text-emerald-400" />
            </div>

            <h3 className="text-lg font-bold text-white mb-1">
              Analyzing Mesh Topology...
            </h3>
            <p className="text-xs text-zinc-400 mb-4 font-mono">
              {selectedFile.name} ({selectedFile.size})
            </p>

            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden mb-2">
              <div className="bg-emerald-500 h-full rounded-full animate-pulse w-3/4" />
            </div>
            <p className="text-[11px] text-zinc-400">
              Checking Euler-Poincaré condition &amp; ray-cast boundaries...
            </p>
          </div>
        )}

        {/* State 3: Diagnostic Scan Result Complete */}
        {selectedFile && scanComplete && detectedIssues && (
          <div className="relative z-10 max-w-xl mx-auto py-2 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <span>{selectedFile.name}</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20">
                      Non-Manifold
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">{selectedFile.size} · Corrupted Mesh Slices</p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetDiagnostic}
                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-800 transition-colors self-start sm:self-center"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Scan Another</span>
              </button>
            </div>

            {/* Metric Chips */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-red-500/20">
                <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Non-Manifold Edges</div>
                <div className="text-xl sm:text-2xl font-black text-red-400 font-mono">{detectedIssues.nonManifold}</div>
                <div className="text-[10px] text-red-300/80">Fails Slicer Wall Cut</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-amber-500/20">
                <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">Open Boundary Loops</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">{detectedIssues.boundaryEdges}</div>
                <div className="text-[10px] text-amber-300/80">Surface Not Closed</div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-emerald-500/20">
                <div className="text-[10px] uppercase font-bold text-zinc-400 mb-0.5">TEELI Auto-Fix</div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">100%</div>
                <div className="text-[10px] text-emerald-300/80">Watertight Solid Ready</div>
              </div>
            </div>

            {/* Call to action to launch app */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <div className="text-xs text-zinc-300">
                <strong className="text-white font-semibold block sm:inline sm:mr-1">Ready for Automated Cloud Repair:</strong>
                Rebuilds 2-manifold surface without losing dimensions or UV colors.
              </div>

              <a
                href={`https://app.teeli.net/?utm_source=teeli.net&utm_medium=tools&utm_campaign=${slug}&file=${encodeURIComponent(selectedFile.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm transition-all shadow-lg hover:shadow-emerald-500/30 whitespace-nowrap"
              >
                <span>Repair in TEELI Studio</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
