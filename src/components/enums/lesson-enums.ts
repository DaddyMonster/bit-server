export enum ResourceTypes {
  Sv = "sub-video",
  Txt = "text",
  doc = "img-doc",
  Vl = "voc-list",
  Lec = "lecture",
  Aud = "audio",
}

export enum LessonTypes {
  Sori = "sori",
  Voca = "voca",
  Text = "text",
  Vid = "vid",
  Book = "book",
}

export enum Phases {
  Learn = "learn",
  Review = "review",
  Test = "test",
}

export enum BlockStepType {
  gt = "go-through",
  st = "sentence",
  voc = "vocab", // 단어레슨 같이 단어만 모아 학습할때 사용
  rp = "role-play",
  fq = "final-question",
  // ADD MORE LATER
}

export enum BlockTypeTag {
  sp = "speaking",
  rd = "reading",
  wt = "writing",
  li = "listening",
  gr = "grammer",
  com = "comprehension",
  vo = "vocab",
}

export enum BlockType {
  // SORI SPECIFIC
  ww = "sori_watch_whole",
  rp = "sori_role_play",
  // SENTENCE RELATED
  st_sc = "speech_scramble",
  st_dic = "dictation_sentence",
  st_rd = "read_alone",
  st_ph = "phonics_reading",
  //VOCAB RELATED
  voc = "vocab_simple", // 단순 뜻 + 사진
  voc_lit = "vocab_listen", // 듣기 + 뜻 + 말하기
  voc_pat = "vocab_pattern", // 패턴예시 + 적용
  voc_dic = "dictation_vocab",
  voc_pho = "phonics_vocab",
  // GRAMMAR RELATED
  // ADD LATER
}

export enum StepStateStatus {
  Ns = "not-started",
  Nv = "not-valid",
  V = "valid",
}

export enum AutoGenPreset {
  // Sori Specific Preset
  S_Full = "sori-full",
  S_Light = "sori-light",
  S_Rp = "sori-role-aid",
  S_SD = "sori-standard",
  Cus = "custom",
}

export enum VocaCategory {
  Cs = "core_speech", // CORE SPOKEN
  Gl1 = "GSL_1", // NGSL 1
  Gl2 = "GSL_2", // NGSL 2
  Gl3 = "GSL_3", //NGSL 3
  Ac = "academic", //Academic
  Toeic = "Toeic", //TOEIC
  Bsl = "Business", // Business
  Ui = "user_list", // USER WORDS
  Nc = "no_vocab", //NO Category
}
