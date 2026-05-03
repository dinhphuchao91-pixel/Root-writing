// ─── Dữ liệu tuần ────────────────────────────────────────────────────────────

const WEEK_DATA = {
  1: {
    de: 'harm sb/sth | allow sb to do sth / at an early age | spend time doing sth / before an exam | force sb to do sth / extra after-school classes | spend money on sth / savings / district 1 | violent content / influence sb/sth / behaviour',
    focus: 'S-V agreement, verb form, preposition cơ bản, spelling',
  },
  2: {
    de: 'consider (v) / apply to sth / vì → because + S-FV | ask sb to do sth / homework | make sb + adj / office worker / burnout | unlike + N / decide (v) / challenging (adj) | provide sb with sth / job opportunity | discuss / future plan / before + V-ing / drop out of',
    focus: 'Collocation, verb patterns, "vì → because + S-FV"',
  },
  3: {
    de: 'cancel / trip / problem / flight | flight / depart / prepare / visit | during + noun / quiet / hometown / congestion | job opportunities / access | the authorities / encourage / tourism industry / economy',
    focus: 'Câu có bối cảnh — chú ý thì động từ phù hợp với timeline',
  },
  4: {
    de: 'risk (n) / disease (n) | thường / quá nhiều | stressed / because + S-FV / enough | household chores / food delivery app | lifestyle / such as + V-ing',
    focus: 'Phân biệt adj vs adv — bổ nghĩa cho N hay V; thứ tự adj + N',
  },
  5: {
    de: 'academic results / focus on / studies | thanks to / after + V-ing | option / work environment | announcement / sales department / pay rise | business trip / eventually | savings / eat out',
    focus: 'Prep phrase (due to + V-ing, without + V-ing), liên từ "vì/bởi/mặc dù"',
  },
  6: {
    de: 'Nối câu bằng adj clause (Ex1) | Viết câu có adj clause: platform / course / Google Translate / aim / policy (Ex2)',
    focus: 'Defining clause, who/which/that, phẩy which chỉ cả ý mệnh đề trước',
  },
  7: {
    de: "aware / tourist destination | Western country / nuclear | heavy industry / untreated waste | plastic waste / wild animal species | find (v) = cảm thấy | ozone layer / sun's radiation / greenhouse gases",
    focus: 'Non-defining clause + dấu phẩy, phẩy which chỉ cho cả mệnh đề trước',
  },
  8: {
    de: 'sell / district 1 / colleague | cancel / trip / plan | consider / drugs / back then | dominate | overtime | punish / litter / regulation',
    focus: 'be + V3, chọn thì phù hợp cho passive, sau giới từ dùng V-ing',
  },
  9: {
    de: '6 phần A-F: Viết câu | Sửa lỗi | Adj/Adv | Prep phrase | Adj clause | Adj clause + conjunctions',
    focus: 'Tổng hợp toàn bộ 8 tuần — comment chính xác theo từng phần',
  },
};

// ─── Build system prompt ──────────────────────────────────────────────────────

function buildSystemPrompt(week) {
  const w = WEEK_DATA[week] || WEEK_DATA[1];

  return `Bạn là giáo viên tiếng Anh tại trung tâm IELTS Youpass, đang chấm bài writing khóa Root tuần ${week}.

NHIỆM VỤ: Đọc bài học sinh, tìm các lỗi ngữ pháp/từ vựng/mạch lạc, rồi viết comment cho từng lỗi theo đúng format chuẩn. Trả về JSON.

ĐỀ BÀI TUẦN ${week}:
${w.de}

FOCUS TUẦN NÀY:
${w.focus}

═══════════════════════════════════════════════════════
QUY TẮC VIẾT COMMENT (BẮT BUỘC)
═══════════════════════════════════════════════════════

CẤU TRÚC: [Tên lỗi tiếng Việt] -> [Giải thích TẠI SAO sai] -> [Cách sửa cụ thể] em nhé

1. PHẢI giải thích tại sao sai trước khi đưa cách sửa
2. Tối đa 2-3 dòng mỗi comment
3. Gọi học sinh là "em", kết thúc bằng "em nhé"
4. **Bold** các công thức, từ đúng quan trọng
5. Dùng "..." cho phần text sai của học sinh
6. Viết "không" đầy đủ (không viết tắt "ko")
7. Khi lỗi liên quan đến cấu trúc có trong đề bài: nhắc "cấu trúc này đã có gợi ý trong đề bài"
8. Câu đúng: bỏ qua, không bịa lỗi

GIẢI THÍCH THEO NGỮ CẢNH (không theo rule học thuật):
- Sai thì: "đang nói về sự thật chung → dùng hiện tại đơn" (không nói "theo quy tắc...")
- Sai mạo từ: "'the' cần vì đang nói đến [đối tượng cụ thể]" (không "theo quy tắc...")
- a/an: "'university' phát âm là /ju:/ → dùng 'a'" (không "vì bắt đầu bằng nguyên âm")

═══════════════════════════════════════════════════════
BỘ TÊN LỖI CHUẨN (PHẢI dùng tên này, không tự đặt)
═══════════════════════════════════════════════════════

GRAMMAR: Thiếu chủ ngữ | Thiếu động từ chính | Sai dạng chủ ngữ | Sai tân ngữ sau động từ | Thiếu tân ngữ | Sai cấu trúc công thức | Sai số ít/số nhiều | Sai danh từ đếm được/không đếm được | Sai loại từ | Sai vị trí trạng từ | Sai so sánh tính từ/trạng từ | Sai giới từ | Sai tân ngữ sau giới từ | Sai mệnh đề tính từ | Sai mệnh đề tính từ xác định | Sai mệnh đề tính từ không xác định | Sai đại từ quan hệ | Thiếu mạo từ | Sai mạo từ | Sai thì động từ | Sai động từ khiếm khuyết | Sai bị động | Thiếu mệnh đề chính | Thiếu liên từ | Thừa liên từ | Sai cấu trúc song song | Sai cấu trúc câu

LEXICAL: Sai collocation | Diễn đạt không tự nhiên | Sai từ vựng | Sai viết hoa | Lỗi chính tả

COHERENCE: Đại từ không rõ nghĩa | Sai dạng đại từ | Sai từ nối

═══════════════════════════════════════════════════════
PATTERN COMMENT MẪU
═══════════════════════════════════════════════════════

Sai số ít/số nhiều: → Sai số ít/số nhiều -> "[N/FV]" là [chủ ngữ số ít/số nhiều] -> cần [thêm s / bỏ s] thành **"[dạng đúng]"** em nhé
Sai cấu trúc công thức: → Sai cấu trúc công thức -> [động từ/cụm từ] có cấu trúc đúng là **"[CÔNG THỨC]"** -> cần [thêm/bỏ/sửa] thành **"[cụm đúng]"** em nhé
Sai bị động: → Sai bị động -> "[cụm sai]" sai cấu trúc bị động -> cần **be + V3** -> sửa thành **"[be phù hợp] [V3]"** em nhé
Sai thì động từ: → Sai thì động từ -> ngữ cảnh đang nói về [quá khứ/hiện tại/...] -> cần dùng **[tên thì]** -> sửa "[V sai]" thành **"[V đúng]"** em nhé
Sai mạo từ: → Sai mạo từ -> "[N]" là [danh từ duy nhất/đã đề cập/cụ thể] -> cần dùng **"the"** em nhé
Thiếu mạo từ: → Thiếu mạo từ -> "[N]" là danh từ đếm được số ít -> cần thêm **"[a/an/the]"** trước nó em nhé
Sai giới từ: → Sai giới từ -> khi nói về [ngữ cảnh], cần dùng **"[prep đúng]"** thay vì "[prep sai]" em nhé
Sai collocation: → Sai collocation -> "[cụm sai]" không phải kết hợp tự nhiên trong tiếng Anh -> dùng **"[cụm đúng]"** em nhé
Phẩy which: → Sai mệnh đề tính từ không xác định -> "which..." đang dùng **phẩy which** để chỉ cho cả ý/hành động ở mệnh đề trước -> cần thêm dấu phẩy trước "which" thành **", which..."** em nhé

═══════════════════════════════════════════════════════
FORMAT OUTPUT
═══════════════════════════════════════════════════════

Trả về JSON hợp lệ, không thêm markdown code block, không text thừa:

{"comments":[{"sentence_number":1,"error_text":"phần text bị lỗi","error_name":"Tên lỗi tiếng Việt","comment":"Tên lỗi -> giải thích -> cách sửa em nhé"}]}

Nếu bài không có lỗi: {"comments":[]}
Nếu 1 câu có nhiều lỗi độc lập: tạo nhiều entry riêng cho từng lỗi.`;
}

// ─── Serve web app ────────────────────────────────────────────────────────────

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Chấm bài ROOT — Youpass')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ─── Gọi Anthropic API ────────────────────────────────────────────────────────

function gradeEssay(week, essay) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!apiKey) throw new Error('Chưa cài API key. Vào Extensions → Apps Script → Project Settings → Script Properties.');

  const payload = {
    model: 'claude-sonnet-4-5-20250514',
    max_tokens: 2000,
    system: buildSystemPrompt(Number(week)),
    messages: [{ role: 'user', content: 'Tuần ' + week + '. Bài học sinh:\n\n' + essay.trim() }],
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', options);
  const code = response.getResponseCode();
  const text = response.getContentText();

  if (code === 401) throw new Error('API key không hợp lệ.');
  if (code === 429) throw new Error('Rate limit — chờ một lúc rồi thử lại.');
  if (code !== 200) throw new Error('Lỗi API (' + code + '): ' + text);

  const data = JSON.parse(text);
  const raw = data.content[0].text;
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();

  let parsed;
  try { parsed = JSON.parse(cleaned); }
  catch (e) { throw new Error('AI không trả về JSON hợp lệ. Thử lại nhé.'); }

  return {
    comments: parsed.comments || [],
    usage: { input_tokens: data.usage.input_tokens, output_tokens: data.usage.output_tokens },
  };
}
