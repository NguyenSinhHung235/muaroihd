import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Mic, 
  MicOff, 
  MapPin, 
  Award, 
  BookMarked, 
  ExternalLink, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { DisanRecord, LanguageMode } from '../types';
import { translations } from '../utils/i18n';
import { initSpeechRecognition } from '../utils/speech';

interface HomeScreenProps {
  heritages: DisanRecord[];
  onSelectHeritage: (heritage: DisanRecord) => void;
  onGoToPuppetry: () => void;
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  heritages,
  onSelectHeritage,
  onGoToPuppetry,
  onSpeakText,
  lang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isListening, setIsListening] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const t = translations[lang];

  // Speech to text for search
  const handleToggleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = initSpeechRecognition(
      lang,
      (transcript) => {
        setSearchQuery(transcript);
        setVoiceNotice(`Đã nhận diện: "${transcript}"`);
        setTimeout(() => setVoiceNotice(null), 3000);
      },
      (err) => {
        setVoiceNotice(err);
        setTimeout(() => setVoiceNotice(null), 4000);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Filtered heritages
  const filteredHeritages = useMemo(() => {
    return heritages.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.tenChinhThuc.toLowerCase().includes(q) ||
        (item.tenTiengAnh && item.tenTiengAnh.toLowerCase().includes(q)) ||
        item.tenGoiKhac.toLowerCase().includes(q) ||
        item.diaPhuong.toLowerCase().includes(q) ||
        item.ngheNhanTieuBieu.toLowerCase().includes(q) ||
        item.moTaDacTrung.toLowerCase().includes(q);

      const matchStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'unesco' && item.tinhTrangGhiDanh.toLowerCase().includes('unesco')) ||
        (selectedStatus === 'national' && item.tinhTrangGhiDanh.toLowerCase().includes('quốc gia'));

      const matchRegion =
        selectedRegion === 'all' ||
        (selectedRegion === 'north' && (item.diaPhuong.includes('Bắc') || item.diaPhuong.includes('Hà Nội') || item.diaPhuong.includes('Phú Thọ'))) ||
        (selectedRegion === 'highlands' && item.diaPhuong.includes('Tây Nguyên')) ||
        (selectedRegion === 'south' && (item.diaPhuong.includes('Nam Bộ') || item.diaPhuong.includes('Hồ Chí Minh')));

      return matchQuery && matchStatus && matchRegion;
    });
  }, [heritages, searchQuery, selectedStatus, selectedRegion]);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Cultural Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-red-950 border border-amber-900/40 text-stone-100 p-6 sm:p-10 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-amber-500/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{lang === 'vi' ? 'Hồ sơ số quy chuẩn quốc gia' : 'National Standard Digital Dossier'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 tracking-tight leading-snug">
            {lang === 'vi' 
              ? 'Khám Phá & Tra Cứu Nghệ Thuật Trình Diễn Dân Gian Việt Nam'
              : 'Explore & Research Vietnamese Folk Performing Arts'}
          </h2>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
            {lang === 'vi'
              ? 'Hệ thống tra cứu chuẩn xác tên gọi, địa bàn cư trú, kỹ thuật diễn xướng, nghệ nhân tiêu biểu và tình trạng ghi danh di sản theo Luật Di sản văn hoá số 45/2024/QH15. Mọi số liệu và mốc thời gian đều được đối soát với tối thiểu 3 nguồn tư liệu chính thống.'
              : 'Accurate research system for heritage nomenclature, practicing domains, performance techniques, distinguished master artisans, and inscription status under Law No. 45/2024/QH15. Every record is verified against at least three authentic sources.'}
          </p>

          {/* Special Quick Action for Water Puppetry Deep-Dive */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToPuppetry}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-600 hover:to-amber-600 text-white font-medium text-sm shadow-md transition-all border border-amber-400/30 hover:scale-[1.02]"
            >
              <Layers className="w-4 h-4 text-amber-200" />
              <span>{lang === 'vi' ? 'Xem Chuyên đề: Nhập Môn Múa Rối Nước' : 'Deep-Dive: Water Puppetry Guide'}</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </button>

            <span className="text-xs text-amber-300/80 font-mono">
              ✓ {lang === 'vi' ? 'Tích trò • Con rối • Buồng trò • Sào dây' : 'Repertoire • Puppets • Pavilion • Mechanics'}
            </span>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="mt-8 pt-6 border-t border-amber-900/40 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
            <div className="text-amber-400 font-bold mb-1">01. {lang === 'vi' ? 'Tư liệu hoá' : 'Documentation'}</div>
            <div className="text-stone-400">{lang === 'vi' ? 'Ghi chép chính xác từ nguồn chính thống' : 'Systematic verified documentation'}</div>
          </div>
          <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
            <div className="text-amber-400 font-bold mb-1">02. {lang === 'vi' ? 'Tra cứu đúng' : 'Accurate Search'}</div>
            <div className="text-stone-400">{lang === 'vi' ? 'Hiểu đúng tên gọi, không xuyên tạc' : 'Standard naming & context'}</div>
          </div>
          <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
            <div className="text-amber-400 font-bold mb-1">03. {lang === 'vi' ? 'Kiểm kê số' : 'Inventory'}</div>
            <div className="text-stone-400">{lang === 'vi' ? 'Số hoá theo chuẩn QĐ 2026/QĐ-TTg' : 'National digital heritage index'}</div>
          </div>
          <div className="p-3 rounded-lg bg-stone-900/80 border border-stone-800">
            <div className="text-amber-400 font-bold mb-1">04. {lang === 'vi' ? 'Bảo vệ di sản' : 'Safeguarding'}</div>
            <div className="text-stone-400">{lang === 'vi' ? 'Chống thông tin giả & xâm hại' : 'Protecting against falsification'}</div>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 space-y-4">
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-24 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent text-sm bg-stone-50/50"
          />

          {/* Voice Search Button */}
          <button
            onClick={handleToggleVoiceSearch}
            title={isListening ? 'Dừng lắng nghe' : t.voiceSearch}
            className={`absolute right-2 px-3 py-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-all ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
            }`}
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-red-700" />}
            <span className="hidden sm:inline">{isListening ? 'Đang nghe...' : 'Giọng nói'}</span>
          </button>
        </div>

        {/* Voice Recognition Notification */}
        {voiceNotice && (
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{voiceNotice}</span>
          </div>
        )}

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-500 font-medium">{lang === 'vi' ? 'Tình trạng:' : 'Status:'}</span>
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-amber-800 text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t.filterAllStatus}
            </button>
            <button
              onClick={() => setSelectedStatus('unesco')}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedStatus === 'unesco'
                  ? 'bg-amber-800 text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              🏛️ UNESCO ({lang === 'vi' ? 'Đại diện & Khẩn cấp' : 'Representative & Urgent'})
            </button>
            <button
              onClick={() => setSelectedStatus('national')}
              className={`px-3 py-1 rounded-full transition-colors ${
                selectedStatus === 'national'
                  ? 'bg-amber-800 text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              📜 {lang === 'vi' ? 'Di sản cấp Quốc gia' : 'National Heritage'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">{lang === 'vi' ? 'Vùng miền:' : 'Region:'}</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-stone-300 text-stone-700 bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 text-xs"
            >
              <option value="all">{t.filterAllRegions}</option>
              <option value="north">{lang === 'vi' ? 'Đồng bằng Bắc Bộ' : 'Northern Delta'}</option>
              <option value="highlands">{lang === 'vi' ? 'Tây Nguyên' : 'Central Highlands'}</option>
              <option value="south">{lang === 'vi' ? 'Nam Bộ' : 'Southern Vietnam'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          {t.foundResults.replace('{count}', filteredHeritages.length.toString())}
        </span>
        <span className="text-stone-400">
          {lang === 'vi' ? 'Dữ liệu chuẩn hoá disan.json' : 'Standardized disan.json'}
        </span>
      </div>

      {/* Heritage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeritages.map((item) => {
          const isPuppetry = item.id === 'mua-roi-nuoc';
          const isUNESCO = item.tinhTrangGhiDanh.toLowerCase().includes('unesco');

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border transition-all duration-200 hover:shadow-lg bg-white overflow-hidden group ${
                isPuppetry
                  ? 'border-amber-500/80 ring-2 ring-amber-400/30'
                  : 'border-stone-200 hover:border-amber-300'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 pb-3 space-y-3">
                {/* Badges row */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-50 text-red-800 border border-red-200/60">
                    {item.loaiHinh}
                  </span>

                  {isUNESCO ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                      <Award className="w-3 h-3 text-blue-600" />
                      <span>UNESCO</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{lang === 'vi' ? 'Quốc gia' : 'National'}</span>
                    </span>
                  )}
                </div>

                {/* Name */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-red-900 transition-colors leading-snug">
                    {item.tenChinhThuc}
                  </h3>
                  {lang === 'en' && item.tenTiengAnh && (
                    <p className="text-xs text-stone-500 italic font-sans">{item.tenTiengAnh}</p>
                  )}
                  {item.tenGoiKhac && item.tenGoiKhac !== 'Không có' && (
                    <p className="text-xs text-stone-500 mt-0.5">
                      <span className="font-medium text-stone-600">{t.alternateNames}:</span> {item.tenGoiKhac}
                    </p>
                  )}
                </div>

                {/* Special Highlight for Water Puppetry */}
                {isPuppetry && (
                  <div className="p-2.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-xs text-amber-900 flex items-center justify-between">
                    <span className="font-medium flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-red-700" />
                      {lang === 'vi' ? 'Chuyên đề: Nhập môn Múa rối nước' : 'Special: Water Puppetry Guide'}
                    </span>
                    <button
                      onClick={onGoToPuppetry}
                      className="text-[11px] font-bold text-red-700 hover:text-red-900 underline"
                    >
                      {lang === 'vi' ? 'Xem ngay →' : 'Explore →'}
                    </button>
                  </div>
                )}

                {/* Practicing Territory */}
                <div className="flex items-start gap-1.5 text-xs text-stone-600 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{item.diaPhuong}</span>
                </div>

                {/* Characteristic Description snippet */}
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed pt-1 font-sans">
                  {lang === 'en' && item.moTaTiengAnh ? item.moTaTiengAnh : item.moTaDacTrung}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between text-xs">
                {/* Verified sources count */}
                <div className="flex items-center gap-1 text-[11px] text-stone-500" title="Số lượng nguồn tư liệu kiểm chứng">
                  <BookMarked className="w-3.5 h-3.5 text-amber-600" />
                  <span>{item.nguonTuLieu.length} {lang === 'vi' ? 'nguồn chính thống' : 'verified sources'}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSpeakText(`${item.tenChinhThuc}. ${item.moTaDacTrung}`)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-amber-800 hover:bg-stone-200 transition-colors"
                    title={t.listenSummary}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectHeritage(item)}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-red-900 text-stone-100 text-xs font-medium transition-colors flex items-center gap-1"
                  >
                    <span>{t.viewDetails}</span>
                    <ExternalLink className="w-3 h-3 text-stone-300" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHeritages.length === 0 && (
        <div className="text-center py-12 px-4 rounded-xl border border-stone-200 bg-white space-y-3">
          <BookMarked className="w-10 h-10 text-stone-400 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-stone-700">
            {lang === 'vi' ? 'Không tìm thấy di sản phù hợp' : 'No matching heritage found'}
          </h4>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            {lang === 'vi'
              ? 'Vui lòng kiểm tra lại từ khoá tìm kiếm hoặc đặt lại các bộ lọc loại hình, vùng miền để hiển thị toàn bộ hồ sơ.'
              : 'Please check your search terms or reset the filters to show all dossiers.'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedRegion('all');
            }}
            className="px-4 py-2 rounded-lg bg-stone-800 text-stone-100 text-xs font-medium hover:bg-stone-700"
          >
            {lang === 'vi' ? 'Xoá bộ lọc tìm kiếm' : 'Clear filters'}
          </button>
        </div>
      )}
    </div>
  );
};
