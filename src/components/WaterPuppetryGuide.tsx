import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Waves, 
  Hammer, 
  Home, 
  Wrench, 
  Camera, 
  Volume2, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ChuyenDeRoiNuoc, LanguageMode, TuLieuMediaItem } from '../types';
import { translations } from '../utils/i18n';

interface WaterPuppetryGuideProps {
  guideData: ChuyenDeRoiNuoc;
  mediaList?: TuLieuMediaItem[];
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const WaterPuppetryGuide: React.FC<WaterPuppetryGuideProps> = ({
  guideData,
  mediaList = [],
  onSpeakText,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'tich' | 'conroi' | 'buongtro' | 'kythuat' | 'media'>('tich');
  const t = translations[lang];

  const subTabs = [
    { id: 'tich', label: t.tabRepertoire, icon: Layers },
    { id: 'conroi', label: t.tabPuppet, icon: Hammer },
    { id: 'buongtro', label: t.tabBooth, icon: Home },
    { id: 'kythuat', label: t.tabTechnique, icon: Wrench },
    { id: 'media', label: t.tabMedia, icon: Camera },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-white p-6 sm:p-10 border border-amber-600/40 shadow-xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800/80 border border-amber-400/40 text-amber-200 text-xs font-semibold uppercase tracking-wider">
          <Waves className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'vi' ? 'Chuyên Khảo Sâu Về Di Sản' : 'Special In-Depth Study'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 tracking-tight leading-snug">
          {t.puppetryIntroTitle}
        </h1>

        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans">
          {t.puppetryIntroSubtitle}
        </p>

        {/* Quick summary strip */}
        <div className="pt-4 border-t border-amber-900/50 flex flex-wrap items-center gap-4 text-xs text-amber-200/90 font-mono">
          <span>🏷️ {lang === 'vi' ? 'Gỗ sung & Sơn ta tự nhiên' : 'Sung wood & Natural lacquer'}</span>
          <span>•</span>
          <span>🌊 {lang === 'vi' ? 'Sân khấu mặt nước Thủy đình' : 'Aquatic stage Thuy Dinh'}</span>
          <span>•</span>
          <span>🎋 {lang === 'vi' ? 'Điều khiển ngầm bằng sào & dây' : 'Submerged pole & wire control'}</span>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="flex border-b border-stone-200 overflow-x-auto gap-2 text-sm bg-white p-2 rounded-xl border shadow-sm">
        {subTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap font-medium transition-all text-xs sm:text-sm ${
                isActive
                  ? 'bg-red-900 text-amber-200 shadow-sm border border-red-800'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Thư viện tích trò cổ */}
      {activeTab === 'tich' && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900">
                {lang === 'vi' ? 'Thư Viện Tích Trò Múa Rối Nước Cổ Truyền' : 'Ancient Water Puppetry Repertoire'}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {lang === 'vi' 
                  ? 'Hệ thống các trò diễn tiêu biểu phản ánh ước vọng tâm linh, đời sống sản xuất và lịch sử chống giặc ngoại xâm.'
                  : 'Representative plays reflecting spiritual aspirations, agrarian life, and heroic national history.'}
              </p>
            </div>
            <button
              onClick={() => onSpeakText("Thư viện tích trò múa rối nước cổ truyền bao gồm các trò tiêu biểu như Chú Tễu giáo trò, Múa rồng phun nước, Chăn vịt bắt cáo, Đánh cá và Sự tích Trả gươm hồ Hoàn Kiếm.")}
              className="p-2 rounded-lg text-stone-600 hover:text-amber-900 hover:bg-stone-100"
              title="Nghe tổng quan các tích trò"
            >
              <Volume2 className="w-5 h-5 text-amber-700" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guideData.tichTroTieuBieu.map((tich, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-900 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {tich.tenTich}
                    </h3>
                  </div>
                  <button
                    onClick={() => onSpeakText(`${tich.tenTich}. Ý nghĩa: ${tich.yNghia}. Nhân vật: ${tich.nhanVat}`)}
                    className="p-1 rounded text-stone-400 hover:text-stone-700"
                    title="Nghe tích trò này"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                  </button>
                </div>

                {lang === 'en' && tich.tenTiengAnh && (
                  <p className="text-xs text-stone-500 italic font-sans">{tich.tenTiengAnh}</p>
                )}

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-stone-700">{lang === 'vi' ? 'Ý nghĩa văn hóa:' : 'Cultural Meaning:'}</span>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">{tich.yNghia}</p>
                  </div>
                  <div className="pt-2 border-t border-stone-100">
                    <span className="font-bold text-stone-700">{lang === 'vi' ? 'Hình tượng nhân vật:' : 'Characters & Props:'}</span>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">{tich.nhanVat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 2: Con rối gỗ sung & sơn ta */}
      {activeTab === 'conroi' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                {lang === 'vi' ? 'Vật liệu & Kỹ nghệ tạo tác' : 'Materials & Craftsmanship'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {lang === 'vi' ? 'Nghệ Thuật Tạo Tác Con Rối Nước' : 'The Art of Water Puppet Carving'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Material */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  🌳
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {lang === 'vi' ? '1. Chất liệu Gỗ Sung' : '1. Sung Wood Selection'}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {guideData.dacTrungConRoi.chatLieu}
                </p>
              </div>

              {/* Crafting & Lacquering */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-bold">
                  🎨
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {lang === 'vi' ? '2. Phủ Sơn Ta Chống Thấm' : '2. Natural Lacquer Layering'}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {guideData.dacTrungConRoi.kyThuatTaoTac}
                </p>
              </div>

              {/* Structural Balance */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  ⚖️
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {lang === 'vi' ? '3. Cấu Trúc Hai Phần' : '3. Two-Part Balancing Body'}
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {guideData.dacTrungConRoi.cauTrucConRoi}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong>{lang === 'vi' ? 'Ghi chú văn hóa:' : 'Cultural Note:'}</strong>
                <p className="leading-relaxed">
                  {lang === 'vi'
                    ? 'Nhựa cây sơn ta (đặc sản vùng đồi Phú Thọ) sau khi khô tạo thành màng bảo vệ hữu cơ cực kỳ bền bỉ trước môi trường bùn nước ao làng, giúp các pho rối cổ có tuổi thọ lưu truyền hàng trăm năm qua nhiều thế hệ phường rối.'
                    : 'Natural lacquer from Phu Tho province forms an extraordinarily waterproof organic resin shield against pond mud, allowing antique wooden puppets to withstand hundreds of years of performance across centuries.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 3: Buồng trò & Thủy đình */}
      {activeTab === 'buongtro' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900">
                {lang === 'vi' ? 'Không gian diễn xướng' : 'Performance Architecture'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {lang === 'vi' ? 'Thủy Đình & Buồng Trò Sau Mành Sáo' : 'Water Pavilion & Backstage Booth'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                  <span>🏛️</span>
                  <span>{lang === 'vi' ? 'Kiến trúc Thủy Đình' : 'Thuy Dinh (Water Pavilion)'}</span>
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {guideData.buongTroVaThuyDinh.kienTruc}
                </p>
                <p className="text-xs text-stone-500 pt-2 border-t border-stone-200">
                  {guideData.buongTroVaThuyDinh.khaiNiem}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <h3 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                  <span>🎋</span>
                  <span>{lang === 'vi' ? 'Bí ẩn sau Mành Sáo Tre' : 'Behind the Split-Bamboo Curtain'}</span>
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {guideData.buongTroVaThuyDinh.buongTro}
                </p>
                <div className="pt-2 border-t border-stone-200 text-xs text-red-900 font-medium">
                  {lang === 'vi' ? 'Hy sinh của nghệ nhân:' : 'Endurance of puppeteers:'}{' '}
                  <span className="text-stone-700 font-normal">{guideData.buongTroVaThuyDinh.dieuKienBieuDien}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 4: Kỹ thuật điều khiển sào dây */}
      {activeTab === 'kythuat' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                {lang === 'vi' ? 'Cơ cấu truyền động cơ học' : 'Mechanical Transmission'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {lang === 'vi' ? 'Kỹ Thuật Điều Khiển Máy Sào & Máy Dây' : 'Pole & String Control Mechanics'}
              </h2>
            </div>

            <div className="space-y-4">
              {/* May Sao */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-mono text-xs font-bold">1</span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {lang === 'vi' ? 'Hệ thống Máy Sào (Cọc tre)' : 'Bamboo Pole System (Máy Sào)'}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-sans">
                    {guideData.kyThuatDieuKhien.maySao}
                  </p>
                </div>
                <div className="text-xs text-stone-500 font-mono bg-white px-3 py-2 rounded-lg border border-stone-200 shrink-0">
                  {lang === 'vi' ? 'Đòn bẩy & Truyền lực tịnh tiến' : 'Leverage & Linear translation'}
                </div>
              </div>

              {/* May Day */}
              <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 font-mono text-xs font-bold">2</span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {lang === 'vi' ? 'Hệ thống Máy Dây (Ròng rọc ngầm)' : 'Submerged Wire String System (Máy Dây)'}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed max-w-2xl font-sans">
                    {guideData.kyThuatDieuKhien.mayDay}
                  </p>
                </div>
                <div className="text-xs text-stone-500 font-mono bg-white px-3 py-2 rounded-lg border border-stone-200 shrink-0">
                  {lang === 'vi' ? 'Cử động khớp nối chi tiết' : 'Fine articulation joints'}
                </div>
              </div>

              {/* Su ket hop */}
              <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h3 className="font-serif text-base font-bold text-amber-950 flex items-center gap-2">
                  <span>🥁</span>
                  <span>{lang === 'vi' ? 'Sự Hiệp Đồng Với Dàn Nhạc Dân Tộc' : 'Synchrony with Folk Orchestra'}</span>
                </h3>
                <p className="text-xs text-stone-800 leading-relaxed font-sans">
                  {guideData.kyThuatDieuKhien.suKetHop}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 5: Tư liệu khảo sát thực địa */}
      {activeTab === 'media' && (
        <section className="space-y-6">
          <div className="rounded-xl border border-stone-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
                {lang === 'vi' ? 'Tư liệu thu thập thực tế' : 'Field Survey Archival'}
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {lang === 'vi' ? 'Tư Liệu Ảnh Khảo Sát Nhà Hát Múa Rối Việt Nam' : 'Vietnam National Puppetry Theatre Survey'}
              </h2>
              <p className="text-xs text-stone-500">
                {lang === 'vi' 
                  ? 'Ảnh gốc thực tế không qua chỉnh sửa AI, ghi rõ 10 trường thông tin kiểm kê theo quy định.'
                  : 'Authentic field photograph without AI alteration, recorded with 10 standard inventory fields.'}
              </p>
            </div>

            {mediaList.map((media, idx) => (
              <div key={idx} className="rounded-2xl border border-stone-300 overflow-hidden bg-stone-50 shadow-md">
                <div className="bg-stone-950 flex items-center justify-center p-2">
                  <img
                    src={media.duongDan}
                    alt={media.tenTuLieu}
                    className="max-h-[500px] w-auto object-contain rounded-lg shadow-inner"
                  />
                </div>

                {/* 10 Standard Inventory Fields Table */}
                <div className="p-6 bg-white space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {media.tenTuLieu}
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-mono text-xs">
                      Mã: {media.maTuLieu}.jpg
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">1. Tên tư liệu:</span>
                      <strong className="text-stone-800">{media.tenTuLieu}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">2. Loại tư liệu:</span>
                      <strong className="text-stone-800">{media.loaiTuLieu}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80 sm:col-span-2">
                      <span className="text-stone-500 block text-[11px]">3. Nội dung mô tả ngắn:</span>
                      <strong className="text-stone-800">{media.noiDungMoTaNgan}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">4. Di sản liên quan:</span>
                      <strong className="text-stone-800">{media.diSanLienQuan}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">5. Địa điểm thu thập:</span>
                      <strong className="text-stone-800">{media.diaDiemThuThap}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">6. Thời điểm thu thập:</span>
                      <strong className="text-stone-800">{media.thoiDiemThuThap}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">7. Người thu thập:</span>
                      <strong className="text-amber-800 font-bold">{media.nguoiThuThap}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">8. Người xuất hiện trong tư liệu:</span>
                      <strong className="text-stone-800">{media.nguoiCungCapHoacXuatHien}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-500 block text-[11px]">9. Phạm vi được phép sử dụng:</span>
                      <strong className="text-emerald-700">{media.phamViDuocPhepSuDung}</strong>
                    </div>

                    <div className="p-2.5 rounded bg-stone-50 border border-stone-200/80 sm:col-span-2">
                      <span className="text-stone-500 block text-[11px]">10. Nguồn gốc nếu không tự thu thập:</span>
                      <strong className="text-stone-800">{media.nguonGocNeuKhongTuThuThap}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
