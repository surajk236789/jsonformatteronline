import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-extrabold shadow-md shadow-indigo-500/20 text-sm group-hover:scale-105 transition-transform duration-200">
        DT
      </div>
      <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent hidden sm:block">
        Developer Tools
      </span>
    </Link>
  );
}
