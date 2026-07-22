"use client";
import React, { useState, useMemo } from "react";
import { Button } from "./ui/Button";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    
    // Split by whitespace to count words, filter out empty strings
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    
    // Split by newlines to count lines, filter out empty
    const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

    // Split by sentences (roughly ending in ., ! or ?)
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;

    // Paragraphs (split by 2 or more newlines)
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(Boolean).length;

    // Reading time (average 238 words per minute)
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 238));

    return {
      chars,
      charsNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      readingTime: readingTimeMinutes,
    };
  }, [text]);

  const clearText = () => setText("");

  return (
    <div className="w-full p-2 md:p-4 lg:p-6 rounded-2xl glass-panel shadow-lg border border-slate-200/40 dark:border-slate-800/40 transition-all duration-300 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-2.5 h-6 bg-cyan-500 rounded-full inline-block" />
            {"Word & Character Counter"}
          </h2>
          <p className="text-xs text-secondary mt-1">
            {"Instantly count words, characters, sentences, and paragraphs in real-time."}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={clearText} variant="ghost" className="text-rose-600 dark:text-rose-400">
            Clear
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.words}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1">Words</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stats.chars}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1">Chars</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl hidden md:flex">
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.charsNoSpaces}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1 text-center">Chars<br/>(No Space)</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.sentences}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1">Sentences</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.paragraphs}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1">Paragraphs</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl hidden lg:flex">
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.lines}</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1">Lines</span>
        </div>
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl hidden lg:flex">
          <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">{stats.readingTime}m</span>
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider mt-1 text-center">Reading<br/>Time</span>
        </div>
      </div>

      {/* Input Area */}
      <div className="flex flex-col mt-2">
        <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
          {"Text Input"}
        </label>
        <textarea
          className="w-full h-80 md:h-[400px] p-6 font-sans text-base leading-relaxed border border-panel-border rounded-xl bg-panel focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 shadow-inner resize-none text-slate-800 dark:text-slate-200"
          placeholder="Type or paste your text here to begin counting..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={true}
        />
      </div>
    </div>
  );
}
