import React, { useState } from 'react';
import { 
  Hammer, 
  Search, 
  Sparkles, 
  Volume2, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ConRoiItem, DacTrungConRoi, LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface PuppetTaxonomyScreenProps {
  puppetList: ConRoiItem[];
  craftsmanshipData: DacTrungConRoi;
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const PuppetTaxonomyScreen: React.FC<PuppetTaxonomyScreenProps> = ({
  puppetList,
  craftsmanshipData,
  onSpeakText,
  lang,
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[lang];

  const filteredPuppets = puppetList.filter((puppet) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      puppet.tenConRoi.toLowerCase().includes(q) ||
      (puppet.tenTiengAnh && puppet.tenTiengAnh.toLowerCase().includes(q)) ||
      puppet.vaiTro.toLowerCase().includes(q) ||
      puppet.hinhDang.toLowerCase().includes(q);

    let matchCategory = true;
    if (filterType === 'human') {
      matchCategory = puppet.tenConRoi.includes('Tễu') || puppet.tenConRoi.includes('Nông dân') || puppet.tenConRoi.includes('Ngư') || puppet.tenConRoi.includes('Tiên');
    } else if (filterType === 'tulinh') {
      matchCategory = puppet.tenConRoi.includes('Rồng') || puppet.tenConRoi.includes('Lân') || puppet.tenConRoi.includes('Phượng') || puppet.tenConRoi.includes('Kim Quy');
    } else if (filterType === 'animals') {
      matchCategory = puppet.tenConRoi.includes('Cáo') || puppet.tenConRoi.includes('Cá');
    }

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
          <Hammer className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Phân Loại & Tạo Tác Con Rối' : 'Puppet Taxonomy & Craft'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
          {lang === 'vi' ? 'Hệ Thống & Mô Tả Từng Loại Con Rối Nước' : 'Taxonomy & Description of Water Puppets'}
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl font-sans">
          {lang === 'vi'
            ? 'Mỗi con rối nước là một tác phẩm điêu khắc gỗ dân gian sống động, được chế tác từ gỗ cây sung đầm ao, phủ sơn ta Phú Thọ nhiều lớp chống thấm và có cấu trúc cân bằng trọng lực đặc biệt để trình diễn trên mặt nước.'
            : 'Each water puppet is a buoyant masterpiece of folk woodcarving, crafted from resilient sung wood, layered with natural lacquer against moisture, and weighted to maintain balance on water.'}
        </p>

        {/* 3 Core Craftsmanship Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 text-xs font-sans">
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80">
            <strong className="text-amber-900 block font-serif">1. Chất liệu gỗ sung</strong>
            <span className="text-stone-700 leading-normal">{craftsmanshipData.chatLieu}</span>
          </div>
          <div className="p-3 rounded-xl bg-red-50 border border-red-200/80">
            <strong className="text-red-900 block font-serif">2. Phủ sơn ta chống thấm</strong>
            <span className="text-stone-700 leading-normal">{craftsmanshipData.kyThuatTaoTac}</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80">
            <strong className="text-emerald-900 block font-serif">3. Cấu trúc cân bằng</strong>
            <span className="text-stone-700 leading-normal">{craftsmanshipData.cauTrucConRoi}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500 font-medium mr-1">Lọc theo nhóm:</span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'all'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tất cả ({puppetList.length})
          </button>
          <button
            onClick={() => setFilterType('tulinh')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'tulinh'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tứ Linh & Thần thoại
          </button>
          <button
            onClick={() => setFilterType('human')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'human'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Con người & Tiên nữ
          </button>
          <button
            onClick={() => setFilterType('animals')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              filterType === 'animals'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Muông thú đồng quê
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm loại con rối..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 bg-stone-50"
          />
        </div>
      </div>

      {/* Puppet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPuppets.map((puppet, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Top Info */}
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2.5">
                <div>
                  <h3 className="font-serif text-base font-bold text-stone-900 text-red-950">
                    {puppet.tenConRoi}
                  </h3>
                  {lang === 'en' && puppet.tenTiengAnh && (
                    <p className="text-xs text-stone-500 italic">{puppet.tenTiengAnh}</p>
                  )}
                </div>
                <button
                  onClick={() => onSpeakText(`${puppet.tenConRoi}. Vai trò: ${puppet.vaiTro}. Hình dáng: ${puppet.hinhDang}. Cơ chế điều khiển: ${puppet.coCheDieuKhien}`)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-amber-800 hover:bg-stone-100"
                  title="Nghe mô tả con rối này"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                </button>
              </div>

              {/* Role */}
              <div className="text-xs">
                <span className="font-bold text-amber-900 block text-[11px] uppercase">Vai trò trong vở diễn:</span>
                <p className="text-stone-700 mt-0.5 leading-relaxed font-sans">{puppet.vaiTro}</p>
              </div>

              {/* Appearance */}
              <div className="text-xs">
                <span className="font-bold text-stone-700 block text-[11px] uppercase">Tạo hình & Phục trang:</span>
                <p className="text-stone-600 mt-0.5 leading-relaxed font-sans">{puppet.hinhDang}</p>
              </div>

              {/* Material */}
              <div className="text-xs">
                <span className="font-bold text-stone-700 block text-[11px] uppercase">Chất liệu chế tác:</span>
                <p className="text-stone-600 mt-0.5 leading-relaxed font-sans">{puppet.chatLieu}</p>
              </div>
            </div>

            {/* Mechanics Footer */}
            <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 text-xs">
              <span className="font-bold text-emerald-900 block text-[11px] uppercase">Cơ chế điều khiển dưới nước:</span>
              <p className="text-stone-700 mt-0.5 leading-relaxed font-sans text-[11px]">
                {puppet.coCheDieuKhien}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
