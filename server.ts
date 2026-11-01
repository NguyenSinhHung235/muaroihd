import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

const disanFilePath = path.resolve(__dirname, 'disan.json');

function loadDisanData(): any[] {
  try {
    if (fs.existsSync(disanFilePath)) {
      const data = fs.readFileSync(disanFilePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading disan.json:', err);
  }
  return [];
}

// 1. API: Get Disan dataset
app.get('/api/disan', (_req: Request, res: Response) => {
  const data = loadDisanData();
  res.json({ success: true, count: data.length, data });
});

// 2. Helper for exact rule-based knowledge match from disan.json & 7 sources
function findInDisanData(question: string, disanData: any[], language: string) {
  const q = question.toLowerCase();
  const puppetry = disanData.find((d: any) => d.id === 'mua-roi-nuoc' || d.id === 'mua-roi-nuoc-viet-nam') || disanData[0];
  const allSources = puppetry?.nguonTuLieu || [];

  // 1. Quyết định 473 / Đào Thục
  if (q.includes('473') || q.includes('đào thục') || (q.includes('đông anh') && q.includes('thụy lâm'))) {
    return {
      answer: `Theo Quyết định số 473/QĐ-BVHTTDL ngày 06/3/2023 của Bộ trưởng Bộ Văn hóa, Thể thao và Du lịch: Nghệ thuật trình diễn dân gian Múa rối nước Đào Thục (xã Thụy Lâm, huyện Đông Anh, TP. Hà Nội) chính thức được công bố đưa vào Danh mục Di sản văn hóa phi vật thể quốc gia. Phường rối Đào Thục có lịch sử khởi dựng từ thế kỷ XVIII do quan Nội giám Đào Đăng Khiêm truyền dạy, nổi tiếng với nghệ thuật rối dây, tích trò Chú Tễu leo cây và bắn pháo thăng thiên.`,
      recordName: 'Múa rối nước Đào Thục (Hà Nội)',
      sourcesUsed: [
        'NGUỒN 2: Quyết định số 473/QĐ-BVHTTDL ngày 06/3/2023 của Bộ Văn hóa, Thể thao và Du lịch',
        'Cổng thông tin điện tử Bộ Văn hóa, Thể thao và Du lịch: https://bvhttdl.gov.vn/van-ban-quan-ly/110595.htm'
      ],
      confidence: 'grounded'
    };
  }

  // 2. Múa rối nước Hải Dương / Bồ Dương / An Liệt / Bùi Thượng
  if (q.includes('hải dương') || q.includes('bồ dương') || q.includes('an liệt') || q.includes('bùi thượng') || q.includes('thế phúc')) {
    return {
      answer: `Theo tư liệu Cục Di sản văn hóa: Múa rối nước (trò rối nước) ở Hải Dương được đưa vào Danh mục Di sản văn hóa phi vật thể quốc gia (Đợt 1) năm 2012. Tỉnh Hải Dương có ba phường rối cổ truyền nổi tiếng gồm: Bồ Dương, Bùi Thượng (huyện Ninh Giang) và An Liệt (huyện Thanh Hà), với lịch sử truyền nghề lâu đời từ thế kỷ XIV. Nghệ nhân nơi đây đặc trưng với kỹ thuật máy sào dây điêu luyện và tự chế tác con rối từ gỗ sung đầm ao.`,
      recordName: 'Múa rối nước ở Hải Dương',
      sourcesUsed: [
        'NGUỒN 3: Bài giới thiệu "Múa rối nước ở Hải Dương", tác giả Thế Phúc, Cổng thông tin Cục Di sản văn hóa (dsvh.gov.vn/mua-roi-nuoc-o-hai-duong-3154)',
        'Quyết định của Bộ Văn hóa, Thể thao và Du lịch công bố Danh mục di sản quốc gia Đợt 1 năm 2012'
      ],
      confidence: 'grounded'
    };
  }

  // 3. Phường rối Nguyên Xá / Thái Bình
  if (q.includes('nguyên xá') || q.includes('thái bình') || q.includes('đông hưng')) {
    return {
      answer: `Theo tư liệu Bộ Văn hóa, Thể thao và Du lịch: Phường múa rối nước Nguyên Xá (huyện Đông Hưng, tỉnh Thái Bình) là một trong hai phường rối nổi tiếng của tỉnh đã được công nhận là Di sản văn hóa phi vật thể quốc gia. Phường rối Nguyên Xá nổi tiếng với các tích trò sông nước hào sảng, hội bơi thuyền, múa rồng phun lửa và đang kết hợp bảo tồn di sản với phát triển du lịch cộng đồng.`,
      recordName: 'Múa rối nước Nguyên Xá (Thái Bình)',
      sourcesUsed: [
        'NGUỒN 4: Bài viết "Thái Bình: Bảo tồn nghệ thuật múa rối nước góp phần phát triển du lịch cộng đồng", Cổng thông tin điện tử Bộ VHTTDL (bvhttdl.gov.vn)',
        'Hồ sơ di sản văn hóa phi vật thể quốc gia tỉnh Thái Bình'
      ],
      confidence: 'grounded'
    };
  }

  // 4. Sách của Tô Sanh (1976)
  if (q.includes('tô sanh') || (q.includes('1976') && q.includes('sách'))) {
    return {
      answer: `Sách chuyên khảo "Nghệ thuật múa rối nước" của tác giả Tô Sanh do Nhà xuất bản Văn Hóa ấn hành năm 1976 là một trong những công trình nghiên cứu khoa học chuyên sâu và hệ thống đầu tiên về nghệ thuật múa rối nước Việt Nam, phân tích cội nguồn dân gian, cấu trúc sân khấu thủy đình và kỹ thuật tạo tác con rối.`,
      recordName: 'Công trình nghiên cứu của Tô Sanh (1976)',
      sourcesUsed: [
        'NGUỒN 5: Sách chuyên khảo "Nghệ thuật múa rối nước", tác giả Tô Sanh, NXB Văn Hóa, 1976 (CSDL CiNii Books: https://ci.nii.ac.jp/ncid/BA49279846)'
      ],
      confidence: 'grounded'
    };
  }

  // 5. Sách của Nguyễn Huy Hồng (2005)
  if (q.includes('nguyễn huy hồng') || (q.includes('2005') && q.includes('sách')) || q.includes('lịch sử nghệ thuật múa rối')) {
    return {
      answer: `Sách "Lịch sử nghệ thuật múa rối Việt Nam" của tác giả PGS.TS. Nguyễn Huy Hồng do Nhà xuất bản Sân khấu ấn hành năm 2005 là công trình khảo cứu công phu về lịch sử hình thành và phát triển của nghệ thuật múa rối nước qua các triều đại Lý, Trần, Lê cho đến hiện đại, khẳng định bản sắc độc đáo của sân khấu nước Việt Nam.`,
      recordName: 'Công trình nghiên cứu của Nguyễn Huy Hồng (2005)',
      sourcesUsed: [
        'NGUỒN 6: Sách chuyên khảo "Lịch sử nghệ thuật múa rối Việt Nam", tác giả Nguyễn Huy Hồng, NXB Sân khấu, 2005 (HathiTrust Catalog)'
      ],
      confidence: 'grounded'
    };
  }

  // 6. Bài báo Hải Phòng / UNESCO
  if (q.includes('hải phòng') || q.includes('báo nhân dân') || (q.includes('unesco') && (q.includes('hồ sơ') || q.includes('công nhận')))) {
    return {
      answer: `Theo bài báo trên Báo Nhân Dân điện tử về Liên hoan Múa rối Hải Phòng mở rộng lần thứ IV năm 2026: Rối nước Việt Nam được nhận định là di sản văn hóa độc đáo kết tinh trí tuệ và bản sắc dân tộc; việc tổ chức các kỳ liên hoan là tiền đề quan trọng để xây dựng hồ sơ khoa học, hướng tới trình UNESCO công nhận múa rối nước là di sản văn hóa phi vật thể của nhân loại.`,
      recordName: 'Lộ trình đệ trình UNESCO Múa rối nước Việt Nam',
      sourcesUsed: [
        'NGUỒN 7: Bài báo "Hải Phòng đưa múa rối truyền thống ra phố", Báo Nhân Dân điện tử (nhandan.vn ngày 17/10/2026)',
        'Đề án xây dựng hồ sơ di sản đệ trình UNESCO của Bộ VHTTDL'
      ],
      confidence: 'grounded'
    };
  }

  // 7. Ảnh cổng Nhà hát múa rối VN
  if (q.includes('ảnh') || q.includes('cổng') || q.includes('nhà hát múa rối việt nam') || q.includes('361 trường chinh') || q.includes('b04-anh-01')) {
    return {
      answer: `Tư liệu ảnh B04-anh-01.jpg ghi lại cổng Nhà hát Múa rối Việt Nam nhìn từ phía ngoài vào buổi sáng, địa chỉ tại 361 Đường Trường Chinh, Khương Đình, Hà Nội; do sinh viên Nguyễn Sinh Hùng (PH70147, Nhóm 2) trực tiếp thu thập ngày 29/10/2026 và được cấp phép sử dụng cho sản phẩm học tập phi lợi nhuận.`,
      recordName: 'Tư liệu khảo sát thực địa Nhà hát Múa rối Việt Nam',
      sourcesUsed: [
        'NGUỒN 1: Ảnh cổng nhà hát múa rối Việt Nam (B04-anh-01.jpg), người thu thập: Nguyễn Sinh Hùng PH70147'
      ],
      confidence: 'grounded'
    };
  }

  // 8. Chất liệu con rối & Sơn ta
  if (q.includes('gỗ') || q.includes('chất liệu') || q.includes('sơn ta') || q.includes('chống nước') || q.includes('sung') || q.includes('vạng')) {
    const cr = puppetry?.chuyenDeRoiNuoc?.dacTrungConRoi;
    return {
      answer: `Về chất liệu chế tác con rối nước: ${cr?.chatLieu || ''} Về kỹ thuật sơn phủ chống thấm: ${cr?.kyThuatTaoTac || ''} Về cấu trúc cân bằng: ${cr?.cauTrucConRoi || ''}`,
      recordName: 'Nghệ thuật tạo tác con rối nước',
      sourcesUsed: [
        'NGUỒN 5: Sách "Nghệ thuật múa rối nước", Tô Sanh, NXB Văn Hóa, 1976',
        'NGUỒN 6: Sách "Lịch sử nghệ thuật múa rối Việt Nam", Nguyễn Huy Hồng, NXB Sân khấu, 2005'
      ],
      confidence: 'grounded'
    };
  }

  // 9. Buồng trò & Thủy đình & Mành sáo
  if (q.includes('buồng trò') || q.includes('thủy đình') || q.includes('mành sáo') || q.includes('sáo tre') || q.includes('lội nước') || q.includes('nghệ nhân đứng')) {
    const bt = puppetry?.chuyenDeRoiNuoc?.buongTroVaThuyDinh;
    return {
      answer: `Về Thủy đình và buồng trò múa rối nước: ${bt?.kienTruc || ''} ${bt?.buongTro || ''} ${bt?.dieuKienBieuDien || ''}`,
      recordName: 'Kiến trúc Thủy đình & Buồng trò sau mành sáo',
      sourcesUsed: [
        'NGUỒN 3: Hồ sơ di sản múa rối nước, Cục Di sản văn hóa (dsvh.gov.vn)',
        'NGUỒN 6: Sách "Lịch sử nghệ thuật múa rối Việt Nam", Nguyễn Huy Hồng, NXB Sân khấu, 2005'
      ],
      confidence: 'grounded'
    };
  }

  // 10. Kỹ thuật điều khiển sào & dây
  if (q.includes('sào') || q.includes('dây') || q.includes('điều khiển') || q.includes('kỹ thuật') || q.includes('máy sào') || q.includes('máy dây') || q.includes('ròng rọc')) {
    const kt = puppetry?.chuyenDeRoiNuoc?.kyThuatDieuKhien;
    return {
      answer: `Về kỹ thuật điều khiển rối nước ngầm: 1. Hệ thống máy sào: ${kt?.maySao || ''} 2. Hệ thống máy dây: ${kt?.mayDay || ''} 3. Sự hiệp đồng dàn nhạc: ${kt?.suKetHop || ''}`,
      recordName: 'Kỹ thuật điều khiển máy sào và máy dây dưới nước',
      sourcesUsed: [
        'NGUỒN 5: Sách "Nghệ thuật múa rối nước", Tô Sanh, NXB Văn Hóa, 1976',
        'NGUỒN 3: Cục Di sản văn hóa (dsvh.gov.vn)'
      ],
      confidence: 'grounded'
    };
  }

  // 11. Tích trò / Chú Tễu / Rồng / Cáo vịt
  if (q.includes('tích trò') || q.includes('chú tễu') || q.includes('tễu') || q.includes('rồng') || q.includes('cáo') || q.includes('bắt cá') || q.includes('trả gươm') || q.includes('lê lợi')) {
    const tichList = puppetry?.chuyenDeRoiNuoc?.tichTroTieuBieu || [];
    const tichSummary = tichList.slice(0, 6).map((t: any, idx: number) => `${idx + 1}. ${t.tenTich}: ${t.yNghia}`).join('\n\n');
    return {
      answer: `Các tích trò tiêu biểu của nghệ thuật múa rối nước cổ truyền:\n\n${tichSummary}`,
      recordName: 'Thư viện tích trò cổ múa rối nước',
      sourcesUsed: allSources.slice(0, 3),
      confidence: 'grounded'
    };
  }

  // 12. Luật Di sản văn hóa
  if (q.includes('luật') || q.includes('45/2024') || q.includes('pháp luật') || q.includes('nghiêm cấm')) {
    return {
      answer: `Căn cứ Luật Di sản văn hoá số 45/2024/QH15 (hiệu lực từ ngày 01/7/2025): Điều 6 quy định quyền và trách nhiệm của chủ thể di sản (nghệ nhân, phường rối dân gian); Điều 9 nghiêm cấm các hành vi xuyên tạc, hủy hoại, thương mại hóa trục lợi hoặc làm sai lệch di sản; Điều 10 quy định Nghệ thuật trình diễn dân gian là một trong các loại hình di sản văn hóa phi vật thể được Nhà nước và cộng đồng ưu tiên bảo tồn, tư liệu hoá.`,
      recordName: 'Luật Di sản văn hoá số 45/2024/QH15',
      sourcesUsed: ['Luật Di sản văn hoá số 45/2024/QH15 của Quốc hội Việt Nam'],
      confidence: 'grounded'
    };
  }

  // Not found in database -> STRICT REQUIREMENT: Report no documentation honestly!
  return {
    answer: language === 'en'
      ? 'Currently, there is no verified documentation about this topic in the heritage database.'
      : 'Hiện chưa có tư liệu về nội dung này trong cơ sở dữ liệu di sản.',
    recordName: 'Chưa có trong dữ liệu',
    sourcesUsed: [],
    confidence: 'not_found'
  };
}

// 3. API: Ask Gemini with Strict Grounding on disan.json
app.post('/api/ask', async (req: Request, res: Response) => {
  const { question, language = 'vi' } = req.body;

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ success: false, error: 'Câu hỏi không được để trống' });
  }

  const disanData = loadDisanData();

  // If no GEMINI_API_KEY, use deterministic knowledge lookup
  if (!process.env.GEMINI_API_KEY) {
    const result = findInDisanData(question, disanData, language);
    return res.json({ success: true, ...result });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const disanSummary = JSON.stringify(disanData, null, 2);
    const systemInstruction = `
Bạn là chuyên gia tư liệu hồ sơ di sản Múa rối nước Việt Nam (dự án Múa Rối HD).
NHIỆM VỤ QUAN TRỌNG NHẤT:
Đọc câu hỏi của người dùng, tìm thông tin trong tệp dữ liệu disan.json cùng 7 nguồn tư liệu chính thống được cung cấp dưới đây và trả lời DỰA HOÀN TOÀN TRÊN DỮ LIỆU ĐÓ.

RÀNG BUỘC PHÁP LÝ & ĐẠO ĐỨC DI SẢN (TUYỆT ĐỐI TUÂN THỦ):
1. Tuyệt đối không được tự suy đoán, bịa đặt hoặc suy diễn thông tin ngoài tệp dữ liệu disan.json và 7 nguồn tư liệu.
2. Nếu câu hỏi không tìm thấy thông tin xác thực trong dữ liệu, bạn PHẢI trả lời chính xác:
   - Nếu ngôn ngữ là Tiếng Việt: "Hiện chưa có tư liệu về nội dung này trong cơ sở dữ liệu di sản."
   - Nếu ngôn ngữ là Tiếng Anh: "Currently, there is no verified documentation about this topic in the heritage database."
   Tuyệt đối không được đưa ra câu trả lời chung chung mang tính đoán mò!
3. Mỗi câu trả lời có thông tin PHẢI chỉ rõ:
   - recordName: Tên chính thức của bản ghi hoặc mục di sản được sử dụng.
   - sourcesUsed: Mảng các nguồn tư liệu được trích xuất từ các nguồn chính thống (Nguồn 1 đến Nguồn 7).
   - confidence: "grounded" nếu tìm thấy và trả lời từ dữ liệu, hoặc "not_found" nếu không có tư liệu.
4. Trả lời bằng ngôn ngữ người dùng yêu cầu (${language === 'en' ? 'Tiếng Anh' : 'Tiếng Việt'}).

DỮ LIỆU CHUẨN DISAN.JSON:
${disanSummary}
`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout')), 5000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Câu hỏi: "${question}" (Ngôn ngữ: ${language})`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING },
            recordName: { type: Type.STRING },
            sourcesUsed: { type: Type.ARRAY, items: { type: Type.STRING } },
            confidence: { type: Type.STRING }
          },
          required: ['answer', 'recordName', 'sourcesUsed', 'confidence']
        }
      }
    });

    const response = (await Promise.race([generatePromise, timeoutPromise])) as any;
    const textOutput = response.text || '{}';
    const parsedResult = JSON.parse(textOutput);

    return res.json({
      success: true,
      answer: parsedResult.answer || (language === 'en' ? "Currently, there is no verified documentation about this topic in the heritage database." : "Hiện chưa có tư liệu về nội dung này trong cơ sở dữ liệu di sản."),
      recordName: parsedResult.recordName || "Hồ sơ Múa rối nước Việt Nam",
      sourcesUsed: parsedResult.sourcesUsed || [],
      confidence: parsedResult.confidence || "grounded"
    });
  } catch (err: any) {
    const fallbackResult = findInDisanData(question, disanData, language);
    return res.json({ success: true, ...fallbackResult });
  }
});

// Setup Vite or static serving
async function initServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Múa Rối HD server running at http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
