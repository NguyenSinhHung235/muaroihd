import React, { useState } from 'react';
import { 
  HelpCircle, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  BookMarked, 
  AlertTriangle, 
  Volume2, 
  CheckCircle2, 
  Bot, 
  User, 
  Clock,
  ShieldAlert
} from 'lucide-react';
import { AskResponse, LanguageMode } from '../types';
import { translations } from '../utils/i18n';
import { initSpeechRecognition } from '../utils/speech';

interface QAScreenProps {
  onSpeakText: (text: string) => void;
  lang: LanguageMode;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recordName?: string;
  sourcesUsed?: string[];
  confidence?: string;
  timestamp: string;
}

export const QAScreen: React.FC<QAScreenProps> = ({
  onSpeakText,
  lang,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: lang === 'vi' 
        ? 'Xin chào! Tôi là trợ lý tra cứu Nhập môn Múa rối nước (Múa Rối HD). Tôi đọc và đối soát câu hỏi DỰA HOÀN TOÀN trên cơ sở dữ liệu disan.json cùng 7 nguồn tư liệu chính thống đã được thẩm định. Mọi câu trả lời đều trích dẫn bản ghi và nguồn tư liệu cụ thể. Nếu không tìm thấy thông tin trong cơ sở dữ liệu, tôi sẽ trả lời trung thực là "chưa có tư liệu", tuyệt đối không suy đoán.'
        : 'Welcome! I am the Water Puppetry Q&A assistant (Múa Rối HD). I answer queries strictly based on disan.json and the 7 verified reference sources. I cite exact records and references. If not found, I honestly state "no documentation available" without speculative fabrication.',
      recordName: 'Hồ sơ Múa rối nước Việt Nam',
      sourcesUsed: ['7 nguồn tư liệu chuẩn hoá trong disan.json'],
      confidence: 'grounded',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string | null>(null);

  const t = translations[lang];

  const suggestedQuestions = lang === 'vi' ? [
    'Quyết định 473/QĐ-BVHTTDL công nhận phường múa rối nước nào?',
    'Múa rối nước Hải Dương có những phường rối nào và lịch sử từ khi nào?',
    'Phường múa rối nước Nguyên Xá ở đâu và phát triển ra sao?',
    'Con rối nước làm bằng chất liệu gỗ gì và chống thấm bằng cách nào?',
    'Buồng trò thủy đình mành sáo tre có cấu tạo và nguyên lý gì?',
    'Kỹ thuật điều khiển máy sào và máy dây dưới nước hoạt động ra sao?',
    'Các tích trò cổ tiêu biểu của múa rối nước là gì?'
  ] : [
    'What did Decision 473/QD-BVHTTDL recognize regarding Đào Thục puppetry?',
    'What are the historic water puppet guilds in Hải Dương province?',
    'What wood is used to carve water puppets and how is it waterproofed?',
    'How does the water pavilion and split-bamboo curtain booth work?',
    'How do submerged bamboo poles and wire string mechanics function?'
  ];

  // Speech to text
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = initSpeechRecognition(
      lang,
      (transcript) => {
        setInputQuery(transcript);
        setVoiceStatus(`Đã nhận diện: "${transcript}"`);
        setTimeout(() => setVoiceStatus(null), 3000);
      },
      (err) => {
        setVoiceStatus(err);
        setTimeout(() => setVoiceStatus(null), 4000);
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

  const handleSend = async (questionToSend?: string) => {
    const query = (questionToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, language: lang })
      });

      const data: AskResponse = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: data.answer || (lang === 'vi' ? 'Hiện chưa có tư liệu về nội dung này trong cơ sở dữ liệu di sản.' : 'No verified documentation found.'),
        recordName: data.recordName || (lang === 'vi' ? 'Hồ sơ dữ liệu' : 'Database record'),
        sourcesUsed: data.sourcesUsed || [],
        confidence: data.confidence || 'grounded',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: lang === 'vi' 
          ? 'Hiện chưa có tư liệu về nội dung này trong cơ sở dữ liệu di sản.'
          : 'Currently, there is no verified documentation about this topic in the heritage database.',
        confidence: 'not_found',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-red-800 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>{lang === 'vi' ? 'Hỏi Đáp Trí Tuệ Nhân Tạo Có Đối Soát Nguồn' : 'Grounded AI Water Puppetry Q&A'}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
          {t.qaTitle}
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
          {t.qaSubtitle}
        </p>

        {/* Strict Constraint Disclaimer */}
        <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {lang === 'vi'
              ? 'Ràng buộc pháp lý bắt buộc: Trả lời hoàn toàn dựa vào tệp disan.json và 7 nguồn tư liệu thẩm định. Luôn nêu rõ tên bản ghi và nguồn tư liệu đã dùng. Nếu không tìm thấy, hệ thống thông báo trung thực là "chưa có tư liệu về nội dung này", tuyệt đối không suy đoán.'
              : 'Mandatory rule: Responses strictly derived from disan.json and the 7 authentic sources. Always cites record name and references. If not found, reports "no verified documentation".'}
          </span>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-stone-600 block">
          {t.suggestedQuestions}
        </span>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-left px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 text-xs transition-colors border border-stone-200"
            >
              💬 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      <div className="space-y-4 min-h-[300px]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isNotFound = msg.confidence === 'not_found';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-stone-800 text-stone-100'
                    : isNotFound
                    ? 'bg-amber-700 text-white'
                    : 'bg-red-800 text-amber-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-3 shadow-sm ${
                  isUser
                    ? 'bg-stone-900 text-white rounded-tr-none'
                    : isNotFound
                    ? 'bg-amber-50 text-stone-900 border border-amber-300 rounded-tl-none'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] text-stone-400 border-b border-stone-100 pb-1.5">
                  <span className="font-semibold text-stone-600">
                    {isUser ? (lang === 'vi' ? 'Người dùng' : 'User') : (lang === 'vi' ? 'Hệ thống đối soát Múa Rối HD' : 'Múa Rối HD Grounded Engine')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {msg.timestamp}
                  </span>
                </div>

                <p className="leading-relaxed whitespace-pre-line font-sans text-stone-800">
                  {msg.text}
                </p>

                {/* Grounded Metadata Box */}
                {!isUser && msg.recordName && !isNotFound && (
                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-2 mt-2 font-sans">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.qaGroundedBadge} {msg.recordName}</span>
                    </div>

                    {msg.sourcesUsed && msg.sourcesUsed.length > 0 && (
                      <div className="space-y-1 pt-1.5 border-t border-stone-200/80">
                        <span className="text-stone-500 font-semibold block text-[11px]">
                          {t.qaSourcesBadge}
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[11px]">
                          {msg.sourcesUsed.map((src, sIdx) => (
                            <li key={sIdx} className="leading-normal">{src}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Not Found Warning Banner */}
                {!isUser && isNotFound && (
                  <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0" />
                    <span>{lang === 'vi' ? 'Hiện chưa có tư liệu về nội dung này trong cơ sở dữ liệu di sản.' : 'No verified documentation found in heritage database.'}</span>
                  </div>
                )}

                {/* Audio TTS button for response */}
                {!isUser && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => onSpeakText(msg.text)}
                      className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-amber-800 font-medium"
                      title="Nghe câu trả lời này"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'Nghe đọc câu này' : 'Read answer'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-800 text-amber-200 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-none p-4 text-xs text-stone-600 shadow-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>{lang === 'vi' ? 'Đang đọc và đối soát tệp disan.json cùng 7 nguồn tư liệu...' : 'Verifying against disan.json and 7 authentic sources...'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="sticky bottom-4 bg-white/95 backdrop-blur-md rounded-2xl border border-stone-300 shadow-lg p-3 space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t.qaInputPlaceholder}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm bg-stone-50/50"
          />

          {/* Voice input button */}
          <button
            type="button"
            onClick={handleToggleVoice}
            title={isListening ? 'Dừng mic' : t.qaVoiceInput}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-red-600 text-white animate-pulse border-red-700'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-red-700" />}
          </button>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 disabled:opacity-50 text-white font-medium text-sm transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t.qaSend}</span>
          </button>
        </form>

        {voiceStatus && (
          <div className="text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
            {voiceStatus}
          </div>
        )}
      </div>
    </div>
  );
};
