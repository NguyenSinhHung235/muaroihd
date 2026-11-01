import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  UserCheck, 
  BookOpen, 
  Volume2, 
  Layers, 
  Share2, 
  ShieldCheck, 
  Image as ImageIcon,
  Calendar,
  FileText
} from 'lucide-react';
import { DisanRecord, LanguageMode } from '../types';
import { translations } from '../utils/i18n';

interface HeritageDetailScreenProps {
  heritage: DisanRecord;
  onBack: () => void;
  onGoToPuppetry: () => void;
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

export const HeritageDetailScreen: React.FC<HeritageDetailScreenProps> = ({
  heritage,
  onBack,
  onGoToPuppetry,
  onSpeakText,
  lang,
}) => {
  const t = translations[lang];
  const isPuppetry = heritage.id === 'mua-roi-nuoc';

  const fullTextToRead = `
    Hồ sơ di sản: ${heritage.tenChinhThuc}.
    Tên gọi khác: ${heritage.tenGoiKhac}.
    Loại hình: ${heritage.loaiHinh}.
    Địa bàn thực hành: ${heritage.diaPhuong}.
    Tình trạng ghi danh: ${heritage.tinhTrangGhiDanh}.
    Nghệ nhân tiêu biểu: ${heritage.ngheNhanTieuBieu}.
    Mô tả đặc trưng: ${heritage.moTaDacTrung}.
  `;

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Back button & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 text-sm font-medium transition-colors border border-stone-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToList}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSpeakText(fullTextToRead)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold border border-amber-300 transition-colors"
            title="Đọc toàn bộ hồ sơ di sản"
          >
            <Volume2 className="w-4 h-4 text-amber-800" />
            <span>{lang === 'vi' ? 'Đọc toàn bộ hồ sơ' : 'Read Dossier'}</span>
          </button>
        </div>
      </div>

      {/* Main Dossier Header Card */}
      <div className="rounded-2xl bg-white border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Classification Tags */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-900 border border-red-200">
            {heritage.loaiHinh}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
            {lang === 'vi' ? 'Luật Di sản văn hoá số 45/2024/QH15' : 'Heritage Law 45/2024/QH15'}
          </span>
          {heritage.tinhTrangGhiDanh.toLowerCase().includes('unesco') && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              <span>UNESCO Inscribed</span>
            </span>
          )}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {heritage.tenChinhThuc}
          </h1>
          {lang === 'en' && heritage.tenTiengAnh && (
            <p className="text-base text-stone-600 italic font-sans">{heritage.tenTiengAnh}</p>
          )}
          {heritage.tenGoiKhac && heritage.tenGoiKhac !== 'Không có' && (
            <p className="text-sm text-stone-500 font-sans">
              <strong className="text-stone-700">{t.alternateNames}:</strong> {heritage.tenGoiKhac}
            </p>
          )}
        </div>

        {/* Special Banner for Water Puppetry */}
        {isPuppetry && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-900 to-amber-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>{lang === 'vi' ? 'Chuyên đề đặc biệt' : 'Featured Deep-Dive'}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                {lang === 'vi' ? 'Nhập Môn Nghệ Thuật Múa Rối Nước Cổ Truyền' : 'Introduction to Water Puppetry'}
              </h3>
              <p className="text-xs text-stone-200 font-sans">
                {lang === 'vi' 
                  ? 'Khám phá thư viện tích trò cổ, cấu trúc con rối gỗ sung sơn ta, buồng trò thủy đình và kỹ thuật sào dây.'
                  : 'Explore classical repertoire, lacquered wood puppets, water pavilion, and submerged mechanics.'}
              </p>
            </div>
            <button
              onClick={onGoToPuppetry}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-sm"
            >
              {lang === 'vi' ? 'Mở Chuyên Đề →' : 'Open Deep-Dive →'}
            </button>
          </div>
        )}

        {/* Key Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
          {/* Practicing Territory */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-red-700" />
              <span>{t.location}</span>
            </div>
            <p className="text-xs text-stone-800 leading-relaxed font-sans">{heritage.diaPhuong}</p>
          </div>

          {/* Legal / Inscription Status */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-700" />
              <span>{t.status}</span>
            </div>
            <p className="text-xs text-stone-800 leading-relaxed font-sans">{heritage.tinhTrangGhiDanh}</p>
          </div>
        </div>

        {/* Master Artisans */}
        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <UserCheck className="w-4 h-4 text-amber-800" />
            <span>{t.artisans}</span>
          </div>
          <p className="text-xs text-stone-800 leading-relaxed font-sans">
            {heritage.ngheNhanTieuBieu}
          </p>
        </div>

        {/* Characteristic Description */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-800" />
              <span>{t.description}</span>
            </h3>
            <button
              onClick={() => onSpeakText(lang === 'en' && heritage.moTaTiengAnh ? heritage.moTaTiengAnh : heritage.moTaDacTrung)}
              className="text-stone-500 hover:text-stone-800 p-1 rounded"
              title="Nghe mô tả này"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line font-sans text-justify">
            {lang === 'en' && heritage.moTaTiengAnh ? heritage.moTaTiengAnh : heritage.moTaDacTrung}
          </p>
        </div>

        {/* Authoritative Sources Cited (Must have at least 3 sources) */}
        <div className="space-y-3 pt-6 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif text-base font-bold text-stone-900">
              {t.sources}
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            {lang === 'vi' 
              ? 'Tất cả nguồn tham khảo đều là văn bản quy chuẩn, hồ sơ khoa học đệ trình UNESCO hoặc công trình nghiên cứu chuyên khảo có xuất bản chính thống.'
              : 'All sources cited are official regulatory standards, UNESCO scientific dossiers, or peer-reviewed published monographs.'}
          </p>
          <ul className="space-y-2">
            {heritage.nguonTuLieu.map((src, idx) => (
              <li
                key={idx}
                className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5 font-sans"
              >
                <span className="w-5 h-5 rounded-full bg-amber-800 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{src}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Attached Field Survey Media (if any) */}
        {heritage.tuLieuMedia && heritage.tuLieuMedia.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-stone-200">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-800" />
              <h3 className="font-serif text-base font-bold text-stone-900">
                {t.mediaSection}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {heritage.tuLieuMedia.map((media, mIdx) => (
                <div 
                  key={mIdx}
                  className="rounded-xl border border-stone-300 bg-stone-50 overflow-hidden shadow-sm"
                >
                  <div className="relative bg-stone-900 flex justify-center items-center">
                    <img 
                      src={media.duongDan} 
                      alt={media.tenTuLieu}
                      className="max-h-96 w-auto object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Photo Caption & 10 Metadata Fields */}
                  <div className="p-4 space-y-3 bg-white">
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900">
                        {media.tenTuLieu} ({media.maTuLieu})
                      </h4>
                      <p className="text-xs text-stone-600 mt-1">{media.noiDungMoTaNgan}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-stone-100 font-sans">
                      <div>
                        <span className="text-stone-500">{lang === 'vi' ? 'Địa điểm thu thập:' : 'Location:'}</span>{' '}
                        <strong className="text-stone-700">{media.diaDiemThuThap}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500">{lang === 'vi' ? 'Thời điểm:' : 'Date:'}</span>{' '}
                        <strong className="text-stone-700">{media.thoiDiemThuThap}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500">{lang === 'vi' ? 'Người thu thập:' : 'Collector:'}</span>{' '}
                        <strong className="text-stone-700">{media.nguoiThuThap}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500">{lang === 'vi' ? 'Phạm vi cho phép:' : 'Usage license:'}</span>{' '}
                        <strong className="text-stone-700">{media.phamViDuocPhepSuDung}</strong>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-stone-500">{lang === 'vi' ? 'Nguồn gốc:' : 'Origin:'}</span>{' '}
                        <strong className="text-emerald-700">{media.nguonGocNeuKhongTuThuThap}</strong>
                        {' '}({lang === 'vi' ? 'Ảnh nguyên bản không chỉnh sửa bằng AI' : 'Original unedited photo without AI alteration'})
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
