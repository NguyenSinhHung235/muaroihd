/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IntroScreen } from './components/IntroScreen';
import { RepertoireScreen } from './components/RepertoireScreen';
import { PuppetTaxonomyScreen } from './components/PuppetTaxonomyScreen';
import { BoothAndStageScreen } from './components/BoothAndStageScreen';
import { MechanicsScreen } from './components/MechanicsScreen';
import { QAScreen } from './components/QAScreen';
import { SourcesScreen } from './components/SourcesScreen';
import { AboutScreen } from './components/AboutScreen';
import { DisanRecord, LanguageMode } from './types';
import { TTSController } from './utils/speech';

// Fallback initial data
import defaultDisanData from './data/disan.json';

export default function App() {
  const [heritages, setHeritages] = useState<DisanRecord[]>(defaultDisanData as any);
  const [currentTab, setCurrentTab] = useState<string>('intro');
  const [lang, setLang] = useState<LanguageMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('muaroi_hd_lang');
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'vi';
  });

  // TTS State
  const [isTTSPlaying, setIsTTSPlaying] = useState(false);
  const [isTTSPaused, setIsTTSPaused] = useState(false);
  const [ttsRate, setTtsRate] = useState(1.0);

  useEffect(() => {
    localStorage.setItem('muaroi_hd_lang', lang);
  }, [lang]);

  useEffect(() => {
    fetch('/api/disan')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setHeritages(json.data);
        }
      })
      .catch((err) => {
        console.warn('Using local bundled disan data:', err);
      });
  }, []);

  const handleTabChange = (newTab: string) => {
    TTSController.stop();
    setIsTTSPlaying(false);
    setIsTTSPaused(false);
    setCurrentTab(newTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpeakText = (text: string) => {
    if (!text || !text.trim()) return;

    setIsTTSPlaying(true);
    setIsTTSPaused(false);

    TTSController.speak(
      text,
      lang,
      ttsRate,
      () => {
        setIsTTSPlaying(false);
        setIsTTSPaused(false);
      },
      (err) => {
        console.warn('TTS Error:', err);
        setIsTTSPlaying(false);
        setIsTTSPaused(false);
      }
    );
  };

  const handleToggleTTS = () => {
    if (isTTSPlaying) {
      if (isTTSPaused) {
        TTSController.resume();
        setIsTTSPaused(false);
      } else {
        TTSController.pause();
        setIsTTSPaused(true);
      }
      return;
    }

    let textToSpeak = '';
    if (currentTab === 'intro') {
      textToSpeak = 'Múa Rối HD - Trình diễn dân gian Việt Nam. Nhập môn nghệ thuật Múa rối nước cổ truyền. Sân khấu mặt nước độc nhất vô nhị của nền văn minh lúa nước sông Hồng.';
    } else if (currentTab === 'repertoire') {
      textToSpeak = 'Thư viện tích trò múa rối nước cổ truyền, bao gồm Chú Tễu giáo trò, Múa rồng phun lửa, Chăn vịt bắt cáo, Đánh cá và Sự tích Trả gươm hồ Hoàn Kiếm.';
    } else if (currentTab === 'puppets') {
      textToSpeak = 'Phân loại và mô tả chi tiết từng loại con rối nước, chế tác từ gỗ sung nhẹ, phủ sơn ta Phú Thọ nhiều lớp chống thấm nước.';
    } else if (currentTab === 'booth') {
      textToSpeak = 'Kiến trúc thủy đình và buồng trò sau tấm mành sáo tre ngập nước, nơi nghệ nhân ngâm mình biểu diễn mà khán giả không thấy người.';
    } else if (currentTab === 'mechanics') {
      textToSpeak = 'Kỹ thuật điều khiển rối nước ngầm thông qua hệ thống máy sào tre và máy dây ròng rọc dưới nước, phối hợp nhịp nhàng với dàn nhạc chèo.';
    } else if (currentTab === 'qa') {
      textToSpeak = 'Hỏi đáp di sản múa rối nước với trí tuệ nhân tạo, đối soát hoàn toàn trên dữ liệu kiểm chứng và 7 nguồn tư liệu chính thống.';
    } else if (currentTab === 'sources') {
      textToSpeak = 'Hệ thống 7 nguồn tư liệu chính thống và tham khảo được thẩm định minh bạch.';
    } else if (currentTab === 'about') {
      textToSpeak = 'Sản phẩm thực tập của Nguyễn Sinh Hùng, mã sinh viên PH70147, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.';
    }

    handleSpeakText(textToSpeak);
  };

  const handleStopTTS = () => {
    TTSController.stop();
    setIsTTSPlaying(false);
    setIsTTSPaused(false);
  };

  const currentRecord = heritages[0] || (defaultDisanData as any)[0];
  const guideData = currentRecord?.chuyenDeRoiNuoc || (defaultDisanData as any)[0]?.chuyenDeRoiNuoc;
  const mediaList = currentRecord?.tuLieuMedia || (defaultDisanData as any)[0]?.tuLieuMedia || [];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 font-sans flex flex-col selection:bg-amber-200 selection:text-stone-900">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        lang={lang}
        setLang={setLang}
        isTTSPlaying={isTTSPlaying}
        isTTSPaused={isTTSPaused}
        onToggleTTS={handleToggleTTS}
        onStopTTS={handleStopTTS}
        ttsRate={ttsRate}
        setTtsRate={setTtsRate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'intro' && guideData && (
          <IntroScreen
            guideData={guideData}
            mediaList={mediaList}
            onSelectTab={handleTabChange}
            onSpeakText={handleSpeakText}
            lang={lang}
          />
        )}

        {currentTab === 'repertoire' && guideData && (
          <RepertoireScreen
            repertoireList={guideData.tichTroTieuBieu}
            onSpeakText={handleSpeakText}
            lang={lang}
          />
        )}

        {currentTab === 'puppets' && guideData && (
          <PuppetTaxonomyScreen
            puppetList={guideData.danhSachConRoi || []}
            craftsmanshipData={guideData.dacTrungConRoi}
            onSpeakText={handleSpeakText}
            lang={lang}
          />
        )}

        {currentTab === 'booth' && guideData && (
          <BoothAndStageScreen
            boothData={guideData.buongTroVaThuyDinh}
            onSpeakText={handleSpeakText}
            lang={lang}
          />
        )}

        {currentTab === 'mechanics' && guideData && (
          <MechanicsScreen
            mechanicsData={guideData.kyThuatDieuKhien}
            onSpeakText={handleSpeakText}
            lang={lang}
          />
        )}

        {currentTab === 'qa' && (
          <QAScreen
            onSpeakText={handleSpeakText}
            lang={lang}
          />
        )}

        {currentTab === 'sources' && (
          <SourcesScreen lang={lang} />
        )}

        {currentTab === 'about' && (
          <AboutScreen lang={lang} />
        )}
      </main>

      {/* Accessible Footer */}
      <footer className="bg-stone-950 border-t border-amber-950 text-stone-400 text-xs py-8 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-serif font-black text-amber-200 text-sm tracking-wide">
              MÚA RỐI HD — TRÌNH DIỄN DÂN GIAN VIỆT NAM
            </p>
            <p className="text-stone-400 max-w-xl text-[11px] leading-relaxed">
              Sản phẩm thực tập của Nguyễn Sinh Hùng, mã sinh viên PH70147, Nhóm 2, Chương trình Thực tập sinh Đợt 15 FPT Polytechnic và IMTA TECH, dự án xã hội phi lợi nhuận.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-stone-400 text-[11px]">
            <button
              onClick={() => handleTabChange('intro')}
              className="hover:text-amber-200 underline"
            >
              Nhập môn
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabChange('repertoire')}
              className="hover:text-amber-200 underline"
            >
              Tích trò
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabChange('puppets')}
              className="hover:text-amber-200 underline"
            >
              Con rối
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabChange('sources')}
              className="hover:text-amber-200 underline"
            >
              7 Nguồn tư liệu kiểm chứng
            </button>
            <span>•</span>
            <button
              onClick={() => handleTabChange('about')}
              className="hover:text-amber-200 underline"
            >
              4 Nguyên tắc bảo tồn
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
