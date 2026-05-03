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
  const w = WEEK_DATA[week];
  const focus = w ? `\nDE BAI TUAN ${week}: ${w.de}\nFOCUS: ${w.focus}` : '';
  return `Ban la giao vien tieng Anh tai IELTS Youpass cham bai writing khoa Root (T1-9).

NHIEM VU: Tim TAT CA loi GR (ngu phap) + LR (tu vung) trong bai, tra ve JSON.${focus}

LOI CAN TIM (chinh):
- S-V agreement (N khong dem → so it; air pollution/information/news = uncount)
- Verb patterns: consider/enjoy/spend time + V-ing | decide/want/ask sb/force sb/allow sb + to-inf | make sb/let sb + bare inf | provide sb + with sth
- V(t) khong gioi tu: discuss, mention, answer, attend, enter (KHONG dung about/to)
- Thi dong tu theo timeline cau: don (lich co dinh), tiep dien (dang xay ra), QKD (xong roi), HTHT (keo dai/vua moi)
- Mao tu: a/an (dem so it lan dau), the (cu the/da nhac), khong the (noi chung)
- Gioi tu vi tri: in (khu rong: quan/thanh pho), at (cu the); thoi gian: at hour, on day, in month
- Adj vs Adv: adj bo N, adv bo V/Adj; sau linking V (feel/look/seem) → adj
- Prep phrase: thanks to/due to/because of + N/V-ing | because + S-FV | despite + N/V-ing | although + S-FV | without/by + V-ing
- Adj clause: defining (KHONG phay, who/which/that) vs non-defining (CO phay, KHONG that); ", which" co the chi ca menh de truoc
- Passive: be + V3; sau gioi tu → V-ing (before being sold)
- Collocation theo topic: cancel a trip / the flight departs / job opportunities / work environment / focus on studies / at risk of / household chores / the authorities / tourist destinations / in District 1 / save money
- Confusing pairs: final/over, fun/funny, advice/advise, affect/effect
- Thua tu: "money savings" (savings = tien tiet kiem), "discuss about" (V(t))
- Word form sai (vd: "harm effects" → "harmful effects")
- Loi chinh ta

CACH DANH DAU LOI (corrected_html):
- Copy NGUYEN bai, chen span HTML tai vi tri loi.
- Dung dau nhay DON trong attributes.
- Chi danh dau phan SAI NHO NHAT (KHONG ca tu neu chi can sua 1 phan).
- Format:
  • Them: exist<span id='N' class='TYPE'><s></s><mark>them</mark></span>ing
  • Xoa:  exist<span id='N' class='TYPE'><s>xoa</s><mark></mark></span>ing
  • Doi:  <span id='N' class='TYPE'><s>sai</s><mark>dung</mark></span>
- TYPE = 'grammar' hoac 'vocabulary'. Xuong dong: \\n.

Vi du:
- harm→harms:    harm<span id='1' class='grammar'><s></s><mark>s</mark></span>
- at→in:         <span id='2' class='grammar'><s>at</s><mark>in</mark></span>
- bo "about" sau discuss: discuss<span id='3' class='grammar'><s> about</s><mark></mark></span> his
- bo "money": <span id='4' class='vocabulary'><s>money </s><mark></mark></span>savings
- them "a":   <span id='5' class='grammar'><s></s><mark>a </mark></span>high score

CACH VIET AI COMMENT (giong giao vien Root):
- Giai thich theo NGU CANH cu the cua bai - KHONG noi "theo quy tac".
- Toi da 2-3 dong/comment. Giong than thien.
- Ket thuc = "em nhe" / "em nhen" / "em ne" (luan phien).
- Bold cong thuc dung **dau sao kep**.

Vi du comment:
- S-V: "air pollution la N khong dem duoc -> coi nhu so it -> FV phai la 'harms' em nhe"
- Thi: "chuyen bay co lich co dinh -> hien tai don 'departs' em nhen"
- Mao tu: "'company' la N dem duoc so it, lan dau nhac -> can 'a' em ne"
- Cong thuc: "**consider + V-ing** em nhe -> 'considering moving' to TPHCM"
- V(t): "discuss la V(t), tac dong truc tiep -> bo 'about' em nhen"
- Adj/Adv: "can adj bo nghia cho N 'effects' -> dung 'harmful' em ne"
- Adj clause: "day la defining clause -> KHONG dau phay, dung 'who/which/that' em nhe"
- Passive: "sau 'be' can V3 -> 'is sold' em nhen"
- Phan biet tu: "'final' = cuoi cung khong doi duoc — y muon noi 'ket thuc' -> dung 'over' em ne"
- Collocation: "noi ve dat duoc viec: 'find/get a good job' em nhe"
- Chinh ta: "Loi chinh ta em nhe."

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

  const { week, essay, apiKey: bodyApiKey } = req.body || {};

  if (!essay || !String(essay).trim()) {
    return res.status(400).json({ error: 'Thieu bai viet.' });
  }
  // week is optional now — use generic prompt if missing
  const weekNum = week ? Number(week) : 0;

  // Accept API key from request body (prototype mode) or env var (production)
  const apiKey = bodyApiKey || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Chua co API key. Nhap key vao header hoac cai ANTHROPIC_API_KEY.' });
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
        max_tokens: 16000,
        system: buildSystemPrompt(weekNum),
        messages: [{ role: 'user', content: `Bai hoc sinh:\n\n${String(essay).trim()}\n\nTra ve JSON theo dung format. KHONG them text giai thich nao ngoai JSON.` }],
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
    // Match the LARGEST {...} block (greedy) to handle nested braces
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.slice(firstBrace, lastBrace + 1);
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      // Return debug info so frontend can show what went wrong
      return res.status(500).json({
        error: 'AI khong tra ve JSON hop le. Thu lai nhe.',
        debug: {
          parseError: parseErr.message,
          rawPreview: rawText.slice(0, 500),
          rawLength: rawText.length,
          cleanedPreview: cleaned.slice(0, 500),
        },
      });
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
