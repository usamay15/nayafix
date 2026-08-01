/**
 * Client-side Roman Urdu → Nastaliq Urdu word dictionary.
 * Used for instant space-triggered conversion before hitting the AI backend.
 */

export const ROMAN_TO_URDU: Record<string, string> = {
  // Common verbs & auxiliaries
  hai: "ہے",
  hain: "ہیں",
  tha: "تھا",
  thi: "تھی",
  the: "تھے",
  ho: "ہو",
  hoga: "ہوگا",
  hogi: "ہوگی",
  honge: "ہوں گے",
  karna: "کرنا",
  karo: "کرو",
  kiya: "کیا",
  kia: "کیا",
  karte: "کرتے",
  karti: "کرتی",
  karta: "کرتا",
  raha: "رہا",
  rahi: "رہی",
  rahe: "رہے",
  aana: "آنا",
  jana: "جانا",
  jao: "جاؤ",
  ayo: "آؤ",
  dekho: "دیکھو",
  dekha: "دیکھا",
  suno: "سنو",
  suna: "سنا",
  bolo: "بولو",
  likho: "لکھو",
  parho: "پڑھو",
  khao: "کھاؤ",
  piyo: "پیو",

  // Pronouns
  main: "میں",
  mein: "میں",
  hum: "ہم",
  tum: "تم",
  aap: "آپ",
  woh: "وہ",
  wo: "وہ",
  yeh: "یہ",
  ye: "یہ",
  is: "اِس",
  us: "اُس",
  in: "اِن",
  un: "اُن",
  iska: "اِس کا",
  uska: "اُس کا",
  inki: "اِن کی",
  unki: "اُن کی",
  mera: "میرا",
  meri: "میری",
  mere: "میرے",
  tumhara: "تمہارا",
  tumhari: "تمہاری",
  apna: "اپنا",
  apni: "اپنی",

  // Conjunctions & prepositions
  aur: "اور",
  lekin: "لیکن",
  magar: "مگر",
  ya: "یا",
  ke: "کے",
  ka: "کا",
  ki: "کی",
  ko: "کو",
  se: "سے",
  me: "میں",
  par: "پر",
  tak: "تک",
  bhi: "بھی",
  sirf: "صرف",
  bas: "بس",
  phir: "پھر",
  ab: "اب",
  jab: "جب",
  tab: "تب",
  agar: "اگر",
  to: "تو",
  toh: "تو",
  kyun: "کیوں",
  kyunke: "کیونکہ",
  isliye: "اس لیے",
  warna: "ورنہ",
  haan: "ہاں",
  nahi: "نہیں",
  nahin: "نہیں",
  na: "نہ",
  mat: "مت",

  // Question words
  kya: "کیا",
  kaun: "کون",
  kahan: "کہاں",
  kab: "کب",
  kaise: "کیسے",
  kitna: "کتنا",
  kitni: "کتنی",
  kitne: "کتنے",

  // Common nouns
  baat: "بات",
  kaam: "کام",
  waqt: "وقت",
  din: "دن",
  raat: "رات",
  ghar: "گھر",
  dost: "دوست",
  bhai: "بھائی",
  behan: "بہن",
  ammi: "امی",
  abu: "ابو",
  log: "لوگ",
  cheez: "چیز",
  jagah: "جگہ",
  taraf: "طرف",
  wajah: "وجہ",
  matlab: "مطلب",
  masla: "مسئلہ",
  mushkil: "مشکل",
  asaan: "آسان",
  zaruri: "ضروری",
  dunia: "دنیا",
  zindagi: "زندگی",
  pyar: "پیار",
  mohabbat: "محبت",
  khushi: "خوشی",
  gham: "غم",
  umeed: "امید",
  fikr: "فکر",

  // Common adjectives
  acha: "اچھا",
  achi: "اچھی",
  bura: "برا",
  buri: "بری",
  bara: "بڑا",
  bari: "بڑی",
  chota: "چھوٹا",
  choti: "چھوٹی",
  naya: "نیا",
  nayi: "نئی",
  purana: "پرانا",
  purani: "پرانی",
  sahi: "صحیح",
  galat: "غلط",
  khubsoorat: "خوبصورت",
  kamzor: "کمزور",
  mazboot: "مضبوط",
  zyada: "زیادہ",
  kam: "کم",
  sab: "سب",
  har: "ہر",
  kuch: "کچھ",
  bohat: "بہت",
  bahut: "بہت",
  thora: "تھوڑا",
  thodi: "تھوڑی",

  // Greetings & expressions
  salam: "سلام",
  assalam: "السلام",
  assalamualaikum: "السلام علیکم",
  walaikumsalam: "وعلیکم السلام",
  shukriya: "شکریہ",
  meherbani: "مہربانی",
  maafi: "معافی",
  theek: "ٹھیک",
  theekhai: "ٹھیک ہے",
  bilkul: "بالکل",
  zaroor: "ضرور",
  inshallah: "انشاءاللہ",
  mashallah: "ماشاءاللہ",
  alhamdulillah: "الحمدللہ",
  subhanallah: "سبحان اللہ",

  // Numbers (written)
  ek: "ایک",
  do: "دو",
  teen: "تین",
  char: "چار",
  panch: "پانچ",
  chhe: "چھ",
  saat: "سات",
  aath: "آٹھ",
  nau: "نو",
  das: "دس",
  bis: "بیس",
  seh: "سو",

  // Common verbs (more)
  chahiye: "چاہیے",
  chahta: "چاہتا",
  chahti: "چاہتی",
  milna: "ملنا",
  mila: "ملا",
  dena: "دینا",
  lena: "لینا",
  rakho: "رکھو",
  rakha: "رکھا",
  uthao: "اٹھاؤ",
  baitho: "بیٹھو",
  chalo: "چلو",
  ruko: "رکو",
  rao: "آؤ",
  soch: "سوچ",
  socha: "سوچا",
  samjha: "سمجھا",
  samjho: "سمجھو",
  bata: "بتا",
  batao: "بتاؤ",
  pata: "پتہ",
  patanahi: "پتہ نہیں",
};

/**
 * Converts a single Roman Urdu word to Urdu using the dictionary.
 * Returns the original word if not found.
 */
export function lookupWord(word: string): string {
  const lower = word.toLowerCase().trim();
  return ROMAN_TO_URDU[lower] ?? word;
}

/**
 * Performs space-triggered real-time conversion.
 * Only converts the last completed word (before the most recent space).
 * Returns the updated full text.
 */
export function convertLastWord(text: string): string {
  // Only trigger on space
  if (!text.endsWith(" ")) return text;

  const words = text.trimEnd().split(/\s+/);
  if (words.length === 0) return text;

  const lastWord = words[words.length - 1];
  const converted = lookupWord(lastWord);

  if (converted !== lastWord) {
    words[words.length - 1] = converted;
    return words.join(" ") + " ";
  }

  return text;
}

/**
 * Converts all words in a full text string using the dictionary.
 * Used for bulk client-side conversion.
 */
export function convertAllWords(text: string): string {
  return text
    .split(/(\s+)/)
    .map((token) => (/\s+/.test(token) ? token : lookupWord(token)))
    .join("");
}
