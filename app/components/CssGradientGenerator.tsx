"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

export default function CssGradientGenerator() {
  const [color1, setColor1] = useState<string>("#4f46e5");
  const [color2, setColor2] = useState<string>("#ec4899");
  const [angle, setAngle] = useState<number>(90);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const [cssCode, setCssCode] = useState<string>("");

  useEffect(() => {
    let gradient = "";
    if (type === "linear") {
      gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    } else {
      gradient = `radial-gradient(circle, ${color1}, ${color2})`;
    }
    setCssCode(`background: ${gradient};`);
  }, [color1, color2, angle, type]);

  return (
    <div className="bg-panel rounded-2xl shadow-sm border border-panel-border p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl">
          🌈
        </div>
        <div>
          <h2 className="text-lg font-bold text-primary">
            CSS Gradient Generator
          </h2>
          <p className="text-sm text-secondary">
            Generate CSS linear and radial gradients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-secondary mb-2">
              TYPE
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-primary">
                <input
                  type="radio"
                  checked={type === "linear"}
                  onChange={() => setType("linear")}
                />{" "}
                Linear
              </label>
              <label className="flex items-center gap-2 text-sm text-primary">
                <input
                  type="radio"
                  checked={type === "radial"}
                  onChange={() => setType("radial")}
                />{" "}
                Radial
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-secondary mb-2">
                COLOR 1
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color1}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColor1(e.target.value)
                  }
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm font-mono text-secondary uppercase">
                  {color1}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-secondary mb-2">
                COLOR 2
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color2}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColor2(e.target.value)
                  }
                  className="w-10 h-10 rounded cursor-pointer"
                />
                <span className="text-sm font-mono text-secondary uppercase">
                  {color2}
                </span>
              </div>
            </div>
          </div>

          {type === "linear" && (
            <div>
              <label className="block text-xs font-bold text-secondary mb-2">
                ANGLE ({angle}°)
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAngle(Number(e.target.value))
                }
                className="w-full accent-indigo-600"
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            Preview
          </label>
          <div
            className="w-full h-40 rounded-xl shadow-inner mb-4"
            style={{
              background:
                type === "linear"
                  ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
                  : `radial-gradient(circle, ${color1}, ${color2})`,
            }}
          />
          <label className="block text-xs font-bold text-secondary mb-2 uppercase tracking-wider">
            CSS Code
          </label>
          <textarea
            className="w-full h-20 p-3 bg-background border border-panel-border rounded-xl text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
            value={cssCode}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
