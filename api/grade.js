const WEEK_DATA = {
  1: {
    de: 'harm sb/sth | allow sb to do sth / at an early age | spend time doing sth / before an exam | force sb to do sth / extra after-school classes | spend money on sth / savings / district 1 | violent content / influence sb/sth / behaviour',
    focus: 'S-V agreement, verb form, preposition co ban, spelling',
  },
  2: {
    de: 'consider (v) / apply to sth / vi -> because + S-FV | ask sb to do sth / homework | make sb + adj / office worker / burnout | unlike + N / decide (v) / challenging (adj) | provide sb with sth / job opportunity | discuss / future plan / before + V-ing / drop out of',
    focus: 'Collocation, verb patterns, "vi -> because + S-FV"',
  },
  3: {
    de: 'cancel / trip / problem / flight | flight / depart / prepare / visit | during + noun / quiet / hometown / congestion | job opportunities / access | the authorities / encourage / tourism industry / economy',
    focus: 'Cau co boi canh - chu y thi dong tu phu hop voi timeline',
  },
  4: {
    de: 'risk (n) / disease (n) | thuong / qua nhieu | stressed / because + S-FV / enough | household chores / food delivery app | lifestyle / such as + V-ing',
    focus: 'Phan biet adj vs adv - bo nghia cho N hay V; thu tu adj + N',
  },
  5: {
    de: 'academic results / focus on / studies | thanks to / after + V-ing | option / work environment | announcement / sales department / pay rise | business trip / eventually | savings / eat out',
    focus: 'Prep phrase (due to + V-ing, without + V-ing), lien tu "vi/boi/mac du"',
  },
  6: {
    de: 'Noi cau bang adj clause (Ex1) | Viet cau co adj clause: platform / course / Google Translate / aim / policy (Ex2)',
    focus: 'Defining clause, who/which/that, phay which chi ca y menh de truoc',
  },
  7: {
    de: 'aware / tourist destination | Western country / nuclear | heavy industry / untreated waste | plastic waste / wild animal species | find (v) = cam thay | ozone layer / sun radiation / greenhouse gases',
    focus: 'Non-defining clause + dau phay, phay which chi cho ca menh de truoc',
  },
  8: {
    de: 'sell / district 1 / colleague | cancel / trip / plan | consider / drugs / back then | dominate | overtime | punish / litter / regulation',
    focus: 'be + V3, chon thi phu hop cho passive, sau gioi tu dung V-ing',
  },
  9: {
    de: '6 phan A-F: Viet cau | Sua loi | Adj/Adv | Prep phrase | Adj clause | Adj clause + conjunctions',
    focus: 'Tong hop toan bo 8 tuan - comment chinh xac theo tung phan',
  },
};

function buildSystemPrompt(week) {
  const w = WEEK_DATA[week] || WEEK_DATA[1];
  return `Ban la giao vien tieng Anh tai IELTS Youpass, dang cham bai writing khoa Root tuan ${week}.

NHIEM VU: Doc bai hoc sinh, tim loi GR (ngu phap) va LR (tu vung/collocation), tra ve JSON.

DE BAI TUAN ${week}: ${w.de}
FOCUS: ${w.focus}

════ CACH DANH DAU LOI TRONG corrected_html ════

Copy nguyen bai hoc sinh, chen span HTML tai vi tri loi.
Dung dau nhay DON trong HTML attributes (tranh loi JSON).

QUAN TRONG: Chi danh dau phan sai NHO NHAT co the.
KHONG danh dau ca tu neu chi can sua 1 phan:

Them ky tu/tu:   exist<span id='N' class='TYPE'><s></s><mark>them</mark></span>ing
Xoa ky tu/tu:    exist<span id='N' class='TYPE'><s>xoa</s><mark></mark></span>ing
Doi ca tu:       <span id='N' class='TYPE'><s>sai</s><mark>dung</mark></span>

TYPE = 'grammar' (loi ngu phap) hoac 'vocabulary' (loi tu vung/collocation/chinh ta)
N = so thu tu loi (1, 2, 3...)

Vi du cu the:
- harm -> harms:             harm<span id='1' class='grammar'><s></s><mark>s</mark></span>
- students -> student:       student<span id='2' class='grammar'><s>s</s><mark></mark></span>
- "at" -> "in":              <span id='3' class='grammar'><s>at</s><mark>in</mark></span>
- "healthy" -> "health":     health<span id='4' class='vocabulary'><s>y</s><mark></mark></span>
- bo "money" trong "money savings": <span id='5' class='vocabulary'><s>money </s><mark></mark></span>savings
- them mao tu "a":           <span id='6' class='grammar'><s></s><mark>a </mark></span>high score
- bo gioi tu "about":        discuss<span id='7' class='grammar'><s> about</s><mark></mark></span> his
- "go to" -> "attend":       <span id='8' class='grammar'><s>go to</s><mark>attend</mark></span>
- them "-ing":               walk<span id='9' class='grammar'><s></s><mark>ing</mark></span>

Xuong dong trong corrected_html: dung \\n giua cac cau/dong.

════ CACH VIET AI COMMENT ════

Giai thich theo NGU CANH cu the - KHONG noi "theo quy tac":

S-V agreement:
- N khong dem duoc (air pollution, information...) -> so it -> FV so it
  Ex: "air pollution la N khong dem duoc -> coi nhu so it -> FV phai la 'harms' em nhe"
- N dem duoc noi chung -> so nhieu, khong can "the"
  Ex: "dang noi chung ve nhan vien -> khong chi ai cu the -> dung 'office workers' em nhen"

Thi dong tu (giai thich ngu canh):
- Lich trinh co dinh: "chuyen bay co lich co dinh -> hien tai don em nhe"
- Keo dai den hien tai: "tinh trang mat hung thu van con -> hien tai hoan thanh em nhen"
- Hanh dong dang xay ra: "dang mo ta dieu dang dien ra -> hien tai tiep dien em ne"

Mao tu:
- Dem duoc so it, lan dau: "'company' la N dem duoc so it -> can 'a' em nhe"
- Noi chung chung: "dang noi chung -> khong can 'the' em nhen"
- Doi tuong cu the: "dang noi ve nganh cu the -> can 'the' em ne"

Gioi tu (vi tri):
- Khu vuc lon (quan/thanh pho/nuoc) -> "in": "quan 1 la khu vuc lon -> dung 'in' em nhe"
- Dia diem nho/cu the -> "at"

Cong thuc dong tu (bold cong thuc):
"consider + V-ing", "force sb + to-inf", "allow sb + to-inf",
"spend time + V-ing", "provide sb + with sth", "make sb + bare inf",
"ask sb + to-inf (= yeu cau) khac ask sb + about sth (= hoi ve)"

Thua tu: "'savings' da mang nghia tien tiet kiem -> khong can them 'money' em nhe"

V(t)/V(i): "discuss la V(t) -> object truc tiep, khong can 'about' em nhe"

Loai tu: "can adj bo nghia cho N 'health' -> dung 'harmful' thay vi 'harm' (n) em nhe"

Phan biet 2 tu de nham: giai thich nghia tung tu truoc
  Ex: "'final' nghia la 'cuoi cung, khong the thay doi' — ngu canh muon noi ky nghi 'ket thuc' -> dung 'over' em nhe"

Collocation sai: giai thich nghia cum sai, dua 2 cum tu nhien neu co the
  Ex: "khi noi ve di lam them: 'work part-time' hoac 'do a part-time job' em nhe"

BURNOUT (n) vs burn out (V): "sau 'make sb' can dong tu nguyen mau -> viet tach 'burn out' em nhe"

Loi chinh ta: chi can "Loi chinh ta em nhe."

Giong van than thien, ket thuc = "em nhe" / "em nhen" / "em ne" (luan phien).
Toi da 2-3 dong moi comment.

════ OUTPUT - CHI TRA VE JSON HOP LE, KHONG TEXT THUA ════

{
  "corrected_html": "Cau 1 voi <span id='1' class='grammar'><s>sai</s><mark>dung</mark></span> day.\\nCau 2 tiep theo.",
  "errors": [
    {"id": "1", "type": "grammar", "ai_comment": "giai thich em nhe"},
    {"id": "2", "type": "vocabulary", "ai_comment": "giai thich em nhen"}
  ]
}

Luu y:
- id trong span PHAI khop voi id trong mang errors
- Dung \\n trong corrected_html de xuong dong giua cac cau
- Neu bai khong co loi: {"corrected_html": "nguyen bai", "errors": []}`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { week, essay } = req.body || {};

  if (!week || !essay || !String(essay).trim()) {
    return res.status(400).json({ error: 'Thieu tuan hoc hoac bai viet.' });
  }
  if (week < 1 || week > 9) {
    return res.status(400).json({ error: 'Tuan phai tu 1 den 9.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chua cai ANTHROPIC_API_KEY.' });
  }

  try {
    const apiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: buildSystemPrompt(Number(week)),
        messages: [{ role: 'user', content: `Tuan ${week}. Bai hoc sinh:\n\n${String(essay).trim()}` }],
      }),
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      if (apiRes.status === 401) return res.status(401).json({ error: 'API key khong hop le.' });
      if (apiRes.status === 429) return res.status(429).json({ error: 'Rate limit. Cho mot luc roi thu lai.' });
      return res.status(500).json({ error: data?.error?.message || 'Loi API.' });
    }

    const rawText = data.content?.find((b) => b.type === 'text')?.text ?? '{}';
    let cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) cleaned = jsonMatch[0];

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.status(500).json({ error: 'AI khong tra ve JSON hop le. Thu lai nhe.' });
    }

    return res.status(200).json({
      corrected_html: parsed.corrected_html ?? '',
      errors: parsed.errors ?? [],
      usage: { input_tokens: data.usage?.input_tokens, output_tokens: data.usage?.output_tokens },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Loi server.' });
  }
};
