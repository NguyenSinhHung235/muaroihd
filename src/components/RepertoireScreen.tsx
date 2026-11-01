import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Sparkles, 
  Volume2, 
  BookMarked, 
  Music2, 
  Flame, 
  Waves,
  ChevronRight
} from 'lucide-react';
import { TichTroItem, LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface RepertoireScreenProps {
  repertoireList: TichTroItem[];
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const RepertoireScreen: React.FC<RepertoireScreenProps> = ({
  repertoireList,
  onSpeakText,
  lang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[lang];

  const filteredRepertoire = repertoireList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.tenTich.toLowerCase().includes(q) ||
      (item.tenTiengAnh && item.tenTiengAnh.toLowerCase().includes(q)) ||
      item.yNghia.toLowerCase().includes(q) ||
      item.nhanVat.toLowerCase().includes(q);

    let matchCategory = true;
    if (selectedCategory === 'agriculture') {
      matchCategory = item.tenTich.includes('vịt') || item.tenTich.includes('cá') || item.tenTich.includes('cày') || item.tenTich.includes('thuyền');
    } else if (selectedCategory === 'history') {
      matchCategory = item.tenTich.includes('gươm') || item.tenTich.includes('Vinh quy') || item.tenTich.includes('Lê Lợi');
    } else if (selectedCategory === 'festival') {
      matchCategory = item.tenTich.includes('Tễu') || item.tenTich.includes('cờ') || item.tenTich.includes('Tiên') || item.tenTich.includes('Rồng');
    }

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-red-800 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Kho Tàng Kịch Bản Dân Gian' : 'Folk Repertoire Archive'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
          {lang === 'vi' ? 'Thư Viện Tích Trò Múa Rối Nước Cổ Truyền' : 'Ancient Water Puppetry Repertoire Library'}
        </h1>

        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl font-sans">
          {lang === 'vi'
            ? 'Các tích trò rối nước lưu truyền qua hàng thế kỷ, kết hợp nhuần nhuyễn giữa kịch bản dân gian, lời thoại hóm hỉnh, âm nhạc chèo mượt mà và tiếng pháo nổ tưng bừng tạo nên bức tranh đa sắc về tâm hồn người Việt.'
            : 'Centuries-old folk plays integrating rustic comedy, Chèo vocal melodies, cracking fireworks, and water illusions portraying the spiritual world and daily struggles of Vietnamese peasants.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-stone-500 font-medium mr-1">Chủ đề:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Tất cả ({repertoireList.length})
          </button>
          <button
            onClick={() => setSelectedCategory('festival')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedCategory === 'festival'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Lễ hội & Giáo trò
          </button>
          <button
            onClick={() => setSelectedCategory('agriculture')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedCategory === 'agriculture'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Đời sống nông nghiệp
          </button>
          <button
            onClick={() => setSelectedCategory('history')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedCategory === 'history'
                ? 'bg-red-900 text-amber-200 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Lịch sử & Đạo học
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm tích trò, nhân vật..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 bg-stone-50"
          />
        </div>
      </div>

      {/* Plays Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRepertoire.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-lg transition-all p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-red-100 text-red-900 font-bold flex items-center justify-center font-mono text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 text-red-950">
                      {item.tenTich}
                    </h3>
                    {lang === 'en' && item.tenTiengAnh && (
                      <p className="text-xs text-stone-500 italic">{item.tenTiengAnh}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onSpeakText(`${item.tenTich}. Ý nghĩa: ${item.yNghia}. Nhân vật: ${item.nhanVat}`)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-amber-800 hover:bg-stone-100"
                  title="Nghe nội dung tích trò này"
                >
                  <Volume2 className="w-4 h-4 text-amber-700" />
                </button>
              </div>

              {/* Cultural meaning */}
              <div className="space-y-1 text-xs font-sans">
                <span className="font-bold text-amber-900 uppercase text-[11px] block">
                  Ý nghĩa văn hóa & Triết lý nhân sinh:
                </span>
                <p className="text-stone-700 leading-relaxed text-justify">
                  {item.yNghia}
                </p>
              </div>

              {/* Characters */}
              <div className="space-y-1 text-xs font-sans pt-2 border-t border-stone-100">
                <span className="font-bold text-stone-700 uppercase text-[11px] block">
                  Nhân vật & Đạo cụ diễn xướng:
                </span>
                <p className="text-stone-600 leading-relaxed">
                  {item.nhanVat}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1 text-amber-800 font-medium">
                <Music2 className="w-3.5 h-3.5" />
                <span>Âm nhạc: Dàn nhạc chèo truyền thống</span>
              </span>
              <span className="font-mono text-stone-400">Tích trò cổ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
