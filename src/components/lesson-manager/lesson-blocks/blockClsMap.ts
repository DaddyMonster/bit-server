import { SentenceDicBlock } from "./st_dictation";

export const blockClsMap = {
  dictation_sentence: SentenceDicBlock,
  dictation_vocab: SentenceDicBlock,
  phonics_reading: SentenceDicBlock,
  phonics_vocab: SentenceDicBlock,
  read_alone: SentenceDicBlock,
  sori_role_play: SentenceDicBlock,
  sori_watch_whole: SentenceDicBlock,
  speech_scramble: SentenceDicBlock,
  vocab_listen: SentenceDicBlock,
  vocab_pattern: SentenceDicBlock,
  vocab_simple: SentenceDicBlock,
} as const;
