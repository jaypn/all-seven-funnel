"use client";

import Image from "next/image";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

export default function BeforeAfterSlider() {
  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Before / After</div>
        <div className="text-xs text-gray-500">Drag the handle</div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src="/before-after/before.jpg"
              alt="Before concrete work"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src="/before-after/after.jpg"
              alt="After concrete work"
            />
          }
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <div className="mt-2 grid grid-cols-2 text-xs text-gray-600">
        <span>Before</span>
        <span className="text-right">After</span>
      </div>
    </div>
  );
}
