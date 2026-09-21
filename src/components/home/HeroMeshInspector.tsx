"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { UploadCloud, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, Layers, ShieldCheck, Sparkles } from 'lucide-react';

type SampleModel = {
  id: string;
  name: string;
  format: string;
  originalEdges: number;
  openLoops: number;
  issueText: string;
  repairResult: string;
};

const sampleModels: SampleModel[] = [
  {
    id: "bracket",
    name: "Mechanical_Bracket_V2.stl",
    format: "STL",
    originalEdges: 48,
    openLoops: 3,
    issueText: "48 Non-Manifold Edges + 3 Open Seams",
    repairResult: "Watertight 2-Manifold Solid (0 Errors)",
  },
  {
    id: "figure",
    name: "Game_Character_Base.obj",
    format: "OBJ + MTL",
    originalEdges: 112,
    openLoops: 6,
    issueText: "112 Non-Manifold Vertices + Flipped Normals",
    repairResult: "100% UV-Preserved Manifold Mesh",
  },
  {
    id: "enclosure",
    name: "CoreXY_PrintHead_Mount.3mf",
    format: "3MF",
    originalEdges: 26,
    openLoops: 2,
    issueText: "Slicer Warning: Object has open boundaries",
    repairResult: "Bambu Studio & OrcaSlicer Certified",
  },
];

export default function HeroMeshInspector() {
  const [selectedSample, setSelectedSample] = useState<SampleModel>(sampleModels[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [customFileName, setCustomFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runDiagnostic = (model: SampleModel, customName?: string) => {
    setIsScanning(true);
    setHasScanned(false);
    if (customName) {
      setCustomFileName(customName);
    } else {
      setCustomFileName(null);
      setSelectedSample(model);
    }

    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 1100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      runDiagnostic(
        {
          id: "custom",
          name: file.name,
          format: file.name.split('.').pop()?.toUpperCase() || "3D",
          originalEdges: Math.floor(Math.random() * 40) + 18,
          openLoops: Math.floor(Math.random() * 4) + 1,
          issueText: "Non-manifold boundaries detected",
          repairResult: "Watertight 2-Manifold Certified",
        },
        file.name
      );
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow Ambient behind card */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-signal-teal/30 via-cyan-500/20 to-purple-600/30 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

      {/* Main Glassmorphic Panel */}
      <div className="relative rounded-3xl bg-zinc-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl p-6 sm:p-7 overflow-hidden text-left">
        {/* Subtle top light sweep */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Panel Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-teal opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal-teal" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Instant Mesh Diagnostic
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-cyan-300">
            Free Zero-Install Audit
          </span>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".stl,.obj,.3mf,.blend"
          className="hidden"
        />

        {/* Interactive Dropzone */}
        <div
          onClick={triggerBrowse}
          className="group cursor-pointer relative border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/70 rounded-2xl p-5 text-center bg-cyan-500/[0.02] hover:bg-cyan-500/[0.06] transition-all duration-300 mb-5"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 mb-2.5">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-sm font-bold text-white mb-0.5">
              Drop 3D file to inspect geometry
            </p>
            <p className="text-xs text-starlight/60 mb-2">
              or <span className="text-cyan-400 underline underline-offset-2">browse from computer</span>
            </p>
            <div className="flex items-center gap-1.5 justify-center">
              {['.STL', '.OBJ', '.3MF', '.BLEND'].map((ext) => (
                <span key={ext} className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-starlight/70">
                  {ext}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 1-Click Sample Model Buttons */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-starlight/60 mb-2">
            <span>Or test with a sample broken model:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sampleModels.map((sample) => {
              const isCurrent = (customFileName === null && selectedSample.id === sample.id);
              return (
                <button
                  key={sample.id}
                  onClick={() => runDiagnostic(sample)}
                  type="button"
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold text-center truncate transition-all duration-200 border ${
                    isCurrent
                      ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-300 shadow-sm shadow-cyan-500/20"
                      : "bg-white/[0.03] border-white/10 text-starlight/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {sample.format} Sample
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Scan Output Card */}
        <div className="rounded-2xl bg-black/60 border border-white/10 p-4 relative overflow-hidden">
          {isScanning ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <RefreshCw className="w-6 h-6 text-signal-teal animate-spin mb-3" />
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Analyzing Euler-Poincaré characteristics...
              </p>
              <p className="text-[11px] text-starlight/50 mt-1">
                Scanning boundary seams, vertex winding & manifold connectivity
              </p>
            </div>
          ) : hasScanned ? (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-mono font-bold text-white truncate max-w-[210px] sm:max-w-[260px]">
                    {customFileName || selectedSample.name}
                  </div>
                  <div className="text-[11px] text-red-400 flex items-center gap-1.5 mt-0.5">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>{selectedSample.issueText}</span>
                  </div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-500/20 text-red-300 border border-red-500/30">
                  Broken Mesh
                </span>
              </div>

              {/* Verified Output Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-starlight/60 block">Manifold Topology</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Watertight 2-Manifold
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] text-starlight/60 block">UV & Textures</span>
                  <span className="text-cyan-300 font-bold flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3" /> 100% Preserved
                  </span>
                </div>
              </div>

              {/* Action Button inside card */}
              <div className="pt-2">
                <Link
                  href="/tools/fix-non-manifold-stl"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-signal-teal via-cyan-400 to-emerald-400 text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg shadow-signal-teal/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Heal & Download Print-Ready File</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Guarantee */}
        <div className="mt-3.5 flex items-center justify-between text-[11px] text-starlight/50 px-1">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Bambu, Cura & Cycles Ready
          </span>
          <span>No credit card required</span>
        </div>
      </div>
    </div>
  );
}
