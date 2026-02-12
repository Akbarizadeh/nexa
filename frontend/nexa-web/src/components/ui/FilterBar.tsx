"use client";

import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOptions?: { label: string; value: string }[];
  selectedSort?: string;
  onSortChange?: (sort: string) => void;
}

const defaultSortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Nearest", value: "distance" },
  { label: "Popular", value: "popular" },
];

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOptions = defaultSortOptions,
  selectedSort = "latest",
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center gap-1 px-3 py-2 bg-slate-100 rounded-lg shrink-0">
        <SlidersHorizontal size={14} className="text-slate-500" />
        <select
          value={selectedSort}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium shrink-0 transition-colors ${
            selectedCategory === ""
              ? "bg-indigo-500 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium shrink-0 transition-colors ${
              selectedCategory === cat
                ? "bg-indigo-500 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
