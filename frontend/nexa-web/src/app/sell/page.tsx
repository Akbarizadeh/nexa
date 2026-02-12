"use client";

import { useState, useRef } from "react";
import { Camera, Upload, Sparkles, Loader2, Edit3, Check } from "lucide-react";

interface AiResult {
  title: string;
  description: string;
  category: string;
  tags: string[];
  priceMin: number;
  priceMax: number;
  confidenceScore: number;
}

export default function SellPage() {
  const [step, setStep] = useState<"upload" | "analyzing" | "review" | "published">("upload");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [editedResult, setEditedResult] = useState<AiResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      analyzeImage();
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    setStep("analyzing");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result: AiResult = {
      title: "Wireless Bluetooth Headphones",
      description:
        "Premium over-ear wireless headphones with active noise cancellation. Features 30-hour battery life, comfortable memory foam ear cushions, and premium sound quality.",
      category: "Electronics",
      tags: ["headphones", "bluetooth", "wireless", "audio", "noise-cancelling"],
      priceMin: 79.99,
      priceMax: 149.99,
      confidenceScore: 0.92,
    };

    setAiResult(result);
    setEditedResult(result);
    setStep("review");
  };

  const handlePublish = () => {
    setStep("published");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Sell with AI</h1>
        <p className="text-slate-500 mt-1">
          Take a photo or upload an image — AI handles the rest
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8">
        {["Upload", "AI Analysis", "Review & Publish"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i === 0 && step === "upload"
                  ? "bg-indigo-500 text-white"
                  : i === 1 && step === "analyzing"
                  ? "bg-indigo-500 text-white"
                  : (i === 2 && step === "review") || step === "published"
                  ? "bg-indigo-500 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}
            </div>
            <span className="text-sm text-slate-600 hidden sm:inline">{label}</span>
            {i < 2 && <div className="w-8 h-px bg-slate-200" />}
          </div>
        ))}
      </div>

      {step === "upload" && (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 mx-auto rounded-lg"
              />
            ) : (
              <>
                <Upload size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700">
                  Upload a photo
                </h3>
                <p className="text-slate-500 mt-1">
                  Drop an image or click to browse
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  JPG, PNG up to 10MB
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
          >
            <Camera size={20} />
            Take a Photo or Upload
          </button>
        </div>
      )}

      {step === "analyzing" && (
        <div className="text-center py-16">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
              <Sparkles size={32} className="text-indigo-500" />
            </div>
            <Loader2
              size={80}
              className="absolute inset-0 text-indigo-500 animate-spin"
            />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mt-6">
            AI is analyzing your image...
          </h3>
          <p className="text-slate-500 mt-2">
            Detecting objects, generating description, estimating price
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Check size={14} className="text-emerald-500" /> Object detection
            </span>
            <span className="flex items-center gap-1">
              <Loader2 size={14} className="animate-spin" /> Classification
            </span>
            <span className="text-slate-300">Price estimation</span>
          </div>
        </div>
      )}

      {step === "review" && editedResult && (
        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
            <Sparkles size={20} className="text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-800">
                AI Analysis Complete
              </p>
              <p className="text-sm text-emerald-600">
                Confidence: {(editedResult.confidenceScore * 100).toFixed(0)}% —
                Review and edit before publishing
              </p>
            </div>
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product"
              className="w-full h-48 object-cover rounded-xl"
            />
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <Edit3 size={14} className="inline mr-1" /> Title
              </label>
              <input
                type="text"
                value={editedResult.title}
                onChange={(e) =>
                  setEditedResult({ ...editedResult, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                value={editedResult.description}
                onChange={(e) =>
                  setEditedResult({
                    ...editedResult,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={editedResult.category}
                  onChange={(e) =>
                    setEditedResult({
                      ...editedResult,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={editedResult.tags.join(", ")}
                  onChange={(e) =>
                    setEditedResult({
                      ...editedResult,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price Min ($)
                </label>
                <input
                  type="number"
                  value={editedResult.priceMin}
                  onChange={(e) =>
                    setEditedResult({
                      ...editedResult,
                      priceMin: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Price Max ($)
                </label>
                <input
                  type="number"
                  value={editedResult.priceMax}
                  onChange={(e) =>
                    setEditedResult({
                      ...editedResult,
                      priceMax: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handlePublish}
            className="w-full px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Publish Listing
          </button>
        </div>
      )}

      {step === "published" && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">
            Listing Published!
          </h3>
          <p className="text-slate-500 mt-2">
            Your listing is now live and visible to nearby users
          </p>
          <button
            onClick={() => {
              setStep("upload");
              setImagePreview(null);
              setAiResult(null);
              setEditedResult(null);
            }}
            className="mt-6 px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600 transition-colors"
          >
            Sell Another Item
          </button>
        </div>
      )}
    </div>
  );
}
