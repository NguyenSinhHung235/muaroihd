import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Info, 
  Globe, 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  Menu, 
  X,
  Waves,
  Layers,
  Hammer,
  Home,
  Wrench,
  Sparkles
} from 'lucide-react';
import { LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: LanguageMode;
  setLang: (lang: LanguageMode) => void;
  isTTSPlaying: boolean;
  isTTSPaused: boolean;
  onToggleTTS: () => void;
  onStopTTS: () => void;
  ttsRate: number;
  setTtsRate: (rate: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  isTTSPlaying,
  isTTSPaused,
  onToggleTTS,
  onStopTTS,
  ttsRate,
  setTtsRate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'intro', label: t.navIntro, icon: Waves },
    { id: 'repertoire', label: t.navRepertoire, icon: Layers },
    { id: 'puppets', label: t.navPuppets, icon: Hammer },
    { id: 'booth', label: t.navBooth, icon: Home },
    { id: 'mechanics', label: t.navMechanics, icon: Wrench },
    { id: 'qa', label: t.navQA, icon: HelpCircle },
    { id: 'sources', label: t.navSources, icon: BookOpen },
    { id: 'about', label: t.navAbout, icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/50 text-stone-100 shadow-lg">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-amber-200 text-xs py-1.5 px-4 border-b border-amber-700/40 flex justify-between items-center">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold tracking-wide">
            {lang === 'vi' 
              ? 'Hồ sơ số chuyên khảo: Nhập môn nghệ thuật múa rối nước cổ truyền Việt Nam'
              : 'Digital Monograph: Introduction to Vietnamese Traditional Water Puppetry'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-amber-300/80">
          <span>{lang === 'vi' ? 'Dự án xã hội phi lợi nhuận' : 'Non-profit Social Initiative'}</span>
          <span>•</span>
          <span>Nguyễn Sinh Hùng PH70147</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title: Múa Rối HD - Trình diễn dân gian Việt Nam */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => handleNavClick('intro')}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-700 via-red-800 to-amber-800 flex items-center justify-center shadow-inner border border-amber-400/50 group-hover:border-amber-300 transition-all">
              <span className="text-sm font-serif font-black text-amber-100 tracking-wider">HD</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-serif font-black text-lg sm:text-xl tracking-tight text-amber-100 leading-none group-hover:text-amber-300 transition-colors">
                  MÚA RỐI HD
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-800 text-amber-200 font-bold border border-red-700">
                  DI SẢN
                </span>
              </div>
              <p className="text-[11px] text-amber-400 font-sans tracking-wide uppercase mt-0.5 font-medium">
                {t.siteSub}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-red-900/90 text-amber-200 border border-amber-600/60 shadow-sm'
                      : 'text-stone-300 hover:text-amber-100 hover:bg-stone-800/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Audio TTS & Language */}
          <div className="flex items-center gap-2">
            {/* TTS Audio Controls */}
            <div className="flex items-center bg-stone-800 border border-stone-700 rounded-lg p-1 text-xs">
              <button
                onClick={onToggleTTS}
                title={isTTSPlaying ? (isTTSPaused ? 'Tiếp tục đọc' : 'Tạm dừng đọc') : 'Đọc trang hiện tại thành tiếng'}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
                  isTTSPlaying
                    ? 'bg-amber-600 text-stone-900 font-bold animate-pulse'
                    : 'text-amber-300 hover:bg-stone-700'
                }`}
              >
                {isTTSPlaying ? (
                  isTTSPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                )}
                <span className="hidden sm:inline">
                  {isTTSPlaying ? (isTTSPaused ? t.ttsPaused : t.ttsReading) : t.ttsPlay}
                </span>
              </button>

              {isTTSPlaying && (
                <button
                  onClick={onStopTTS}
                  title="Dừng đọc"
                  className="px-1.5 py-1 text-stone-400 hover:text-red-400 transition-colors"
                >
                  <Square className="w-3 h-3 fill-current" />
                </button>
              )}

              {/* Speed rate */}
              <select
                value={ttsRate}
                onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                className="bg-transparent text-stone-300 text-xs px-1 py-0.5 border-l border-stone-700 focus:outline-none cursor-pointer"
                title="Tốc độ đọc"
              >
                <option value="0.8" className="bg-stone-800">0.8x</option>
                <option value="1.0" className="bg-stone-800">1.0x</option>
                <option value="1.2" className="bg-stone-800">1.2x</option>
              </select>
            </div>

            {/* Language Selector */}
            <button
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-amber-300 border border-stone-700 transition-colors"
              title="Chuyển đổi ngôn ngữ / Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'vi' ? 'VI 🇻🇳' : 'EN 🇬🇧'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-stone-400 hover:text-amber-200 hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-red-900/90 text-amber-200 border border-amber-600/40'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
