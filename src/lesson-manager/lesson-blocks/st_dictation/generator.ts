import { ExtractLevel } from "../../../enums";
import { TokkenTrack } from "../../../tracks/track.model";
import { mapByPhase, rangeIndexParser } from "../../../util/lesson-config-util";
import { allPhases, BlockGenContext } from "../block-config-base";
import { BlockGeneratorBase } from "../block-generator-base";
import { SentenceDicConfig } from "./config";
import { SentenceDicBlock } from "./model";

export class SentenceDicGenerator extends BlockGeneratorBase {
  ctx: BlockGenContext<TokkenTrack>;
  constructor(ctx: BlockGenContext<TokkenTrack>) {
    super();
    this.ctx = ctx;
  }

  async generate() {
    const {
      blockConfigMap: { dictation_sentence },
      track,
      level,
      roleInfo,
    } = this.ctx;

    if (
      !dictation_sentence ||
      dictation_sentence.genConfig.genPhases.length === 0
    ) {
      return [];
    }

    const {
      configModel: _configModel,
      genConfig: { extractLevel, genPhases },
    } = dictation_sentence;

    let trackRange: [number, number] = [0, 0];

    if (extractLevel === ExtractLevel.H) {
      trackRange = [0, track.length];
    } else if (extractLevel === ExtractLevel.M && roleInfo) {
      const { trackStart, trackEnd } = roleInfo;
      trackRange = [trackStart, trackEnd];
    } else {
      ("NO TRACK RANGE WAS FOUND...");
      return [];
    }

    const configArr =
      (_configModel as SentenceDicConfig[]) ??
      allPhases.map(
        (phase) =>
          new SentenceDicConfig({ extractLevel, phase, genPhases, level })
      );

    const configMap = mapByPhase(configArr);

    const trackIdxes = rangeIndexParser(trackRange);
    let blocks: SentenceDicBlock[] = [];
    genPhases.forEach((phase) => {
      const {
        dedicatedPoint,
        inferedConfig: { allowInitialLetterHint },
        generate,
      } = configMap[phase]!;

      if (!generate) {
        return;
      }

      trackIdxes.forEach((idx) => {
        blocks.push(
          new SentenceDicBlock({
            trackIdx: idx,
            allowInitialLetterHint,
            dedicatedPoint,
          })
        );
      });
    });

    return blocks;
  }
}
