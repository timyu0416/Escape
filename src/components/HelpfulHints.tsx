import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronRight, ChevronDown, Award, Lightbulb, Compass } from "lucide-react";

export default function HelpfulHints() {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const hintsList = [
    {
      title: "關卡一新聞排布要領",
      desc: "新聞最原始的状态是中立報導（只說「有具體女屍，警方展開調查」）。當媒體為了發行量加入獵奇描述（比如「慘痛碎屍、二十餘歲、裹高貴床單、床單血跡」）和怪力亂神（「厲鬼夜訴、怨魂夜泣」）時，聳動度即登峰造極。將最不加感情色彩的公告置於第 1 張，最神怪陰謀地攤雜誌的置於最後第 5 張，即可自動反面顯影。「1961」就是那一年的年代代碼。"
    },
    {
      title: "關卡二時間大崩塌",
      desc: "仔細對比左右文件：「警方勘查通報」上記述，在上午 10:00 警方才切實將沉沒的袋子打撈出水、撬鎖破開确认無頭屍體的生命特徵；然而「記者私人手筆」上卻白紙黑字寫著上午 08:00 他就已經起草好了「瑠公圳驚現千金大分屍，怨魂夜啼...」的爆款稿子！這表明有些人在案發前便早早買通撰稿人、佈置好輿論重心。選定上午 10:00 和 08:00 這兩條線即可通關。"
    },
    {
      title: "關卡三紫外線透視術",
      desc: "用手指或滑鼠在奇異筆塗黑的橫條上緩緩移動。紫外線光暈會透析出底部蓋上的螢光機密油墨：在中央偏上的大型塗黑段可以看到「王姓男子已排除嫌嫌」；在中央下方的中等塗黑段，能發現永封印記日期「1961/02/26」。填入此日期，即可解鎖機密防護鎖，獲享王房東被當代罪羊的真正內閣檔案。"
    },
    {
      title: "關卡四倒轉錄音解析",
      desc: "卡式錄音的音頻存在兩段信號：常規播放（逆向按鍵未被按下前）會因為雜音蓋過，無法拆解。請點擊「倒播 (REV)」按鈕。倒帶時，磁帶飛速旋轉，可在倒帶提示上抓取紅色密語「真正毀掉他的，不是案件。」。這提示我們，王房東是被眾口鑠金的「茶餘飯後」談資、以及試圖推卸政治醜聞的「政府高層」共同做掉的，新聞社正好勾結利益「大賺一筆」。依此在中文字格中填入這三組詞彙。"
    },
    {
      title: "關卡五銅針纏線訣竅",
      desc: "要把真正的作假證據和被冤平民、真實偵測對比起來。依次點擊「【疑犯 · 房東王先生】（無辜嫌犯）」、「【警方勘查時序】（10:00 真相時間線）」與「【號外造假新聞稿】（08:00 欺騙與狂熱證據）」三個核心別針 node，Canvas 就會用紅色毛線織出一個三角形的真相羅網。當毛線交織時，藏在當局深處的「未公開調查資料袋」就會在圖紙中央顯現。點擊打開它以觸發命運大抉擇。"
    }
  ];

  const toggleTab = (idx: number) => {
    setActiveTab(activeTab === idx ? null : idx);
  };

  return (
    <div className="bg-zinc-900/60 rounded-xl border border-zinc-850 p-5 md:p-6 shadow-xl my-12">
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-4">
        <Lightbulb size={20} className="text-red-500 animate-pulse animate-duration-1000" />
        <h4 className="font-serif font-black text-amber-200 tracking-wider">
          【 探安部解謎支援手冊 / 常見求救信号 】
        </h4>
      </div>

      <p className="text-xs text-zinc-400 font-serif leading-relaxed mb-4">
        若在破解瑠公圳陳年檔案的進程中遇到瓶頸、時空重力不穩。可點擊展開各關卡偵安要領（不洩漏底牌，僅提供偵查引導）：
      </p>

      <div className="space-y-2.5">
        {hintsList.map((hint, idx) => {
          const isOpen = activeTab === idx;

          return (
            <div
              key={idx}
              className="rounded border border-zinc-850 bg-zinc-950 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleTab(idx)}
                className="w-full text-left p-3 flex justify-between items-center bg-zinc-950 hover:bg-zinc-900 transition font-serif text-xs md:text-sm text-zinc-300 font-bold"
              >
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-mono font-black">#0{idx + 1}</span>
                  <span>{hint.title}</span>
                </div>
                {isOpen ? <ChevronDown size={14} className="text-red-400" /> : <ChevronRight size={14} className="text-zinc-500" />}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 bg-zinc-900/30 border-t border-zinc-900 text-xs text-zinc-400 leading-relaxed font-serif"
                  >
                    {hint.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Retro advise box */}
      <div className="mt-5 p-3 rounded bg-red-950/20 border-l-4 border-red-800 text-[11px] font-serif text-red-200/90 leading-relaxed flex gap-2">
        <Compass size={16} className="text-red-400 shrink-0 mt-0.5" />
        <span>
          <strong>設計致敬建議：</strong>這是一間極佳的冷色系懸疑微恐「劇本殺密室」範本！
          除了線上的 5 關卡，我們建議你在實體體驗時，安排記者NPC在角落瘋狂裁減報紙（製造背景白色噪音）、以及老探長在鐵欄後撕扯錄音帶。
          雙結局設計最能考驗隊伍的抉擇張力，可引發深度社群討論！
        </span>
      </div>
    </div>
  );
}
