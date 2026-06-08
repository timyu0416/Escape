import { motion, AnimatePresence } from "motion/react";
import { Key, Disc, FileText, Sparkles, FolderLock, HelpCircle, Briefcase } from "lucide-react";
import { InventoryItem } from "../types";

interface InventoryProps {
  items: InventoryItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Inventory({ items, activeTab, setActiveTab }: InventoryProps) {
  return (
    <div className="w-full bg-zinc-950 rounded-xl border border-dashed border-zinc-800 p-5 shadow-2xl relative overflow-hidden">
      {/* Suitcase metal style rim */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-90" />
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-950 via-zinc-800 to-red-950" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-zinc-900">
        <div>
          <h4 className="text-sm font-serif font-black tracking-widest text-amber-200 flex items-center gap-2">
            <Briefcase size={16} className="text-red-500 animate-pulse" />
            【 隨身道具調查箱 · 證據鏈手扎 】
          </h4>
          <p className="text-[10px] text-zinc-500 font-sans mt-0.5">
            解開各關互動謎題將陸續獲得此等證物，輔助解鎖更高深的治安處黑盒檔案。
          </p>
        </div>

        <div className="flex bg-zinc-900 rounded p-1 text-[10px] font-mono border border-zinc-800 gap-1 select-none">
          <span className="text-zinc-500 px-1.5 py-0.5">收集進度:</span>
          <span className="text-red-400 px-1.5 py-0.5 bg-black rounded font-bold font-black">
            {items.filter((i) => i.acquired).length} / {items.length} 
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10 my-2">
        {items.map((item) => {
          const isAcquired = item.acquired;

          return (
            <div
              key={item.id}
              className={`relative p-3.5 rounded-lg border flex flex-col items-center text-center justify-between min-h-[140px] transition-all duration-500 ${
                isAcquired
                  ? "bg-stone-900 border-amber-900/40 text-stone-100 shadow shadow-amber-950/20"
                  : "bg-zinc-950/60 border-zinc-1000/80 text-zinc-650 opacity-45 grayscale"
              }`}
            >
              {/* Dynamic light rays if acquired */}
              {isAcquired && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_30px_at_center,rgba(239,68,68,0.06),transparent)] pointer-events-none" />
              )}

              {/* Icon rendering mapping */}
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center mb-2.5 transition-all duration-300 ${
                isAcquired
                  ? "bg-amber-950/20 border-amber-800/60 text-amber-400"
                  : "bg-zinc-950 border-zinc-900 text-zinc-700"
              }`}>
                {item.icon === "newspaper" && <FileText size={18} />}
                {item.icon === "key" && <Key size={18} />}
                {item.icon === "tape" && <Disc size={18} />}
                {item.icon === "uv" && <Sparkles size={18} />}
                {item.icon === "file" && <FolderLock size={18} />}
              </div>

              <div>
                <span className="text-[11px] font-serif font-black tracking-wider block">
                  {item.name}
                </span>

                <p className="text-[9px] text-zinc-500 font-sans leading-relaxed mt-1 block max-h-16 overflow-y-auto">
                  {item.description}
                </p>
              </div>

              {/* Stamp overlay if acquired */}
              {isAcquired ? (
                <span className="text-[8px] font-mono text-red-500 border border-red-900 px-1 rounded uppercase tracking-wider scale-90 mt-2 rotate-2 bg-stone-900 inline-block font-bold">
                  Acquired / 已登錄
                </span>
              ) : (
                <span className="text-[8px] font-mono text-zinc-700 border border-zinc-900 px-1 rounded uppercase tracking-wider scale-90 mt-2 inline-block">
                  Locked / 待獲取
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
