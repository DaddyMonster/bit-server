import { Field, InputType } from "type-graphql";
import { ExtractLevel, Phases } from "../../../enums";
import { TokkenTrack } from "../../../tracks";
import { mapByPhase, rangeIndexParser } from "../../../util";
import { allPhases, IBlockConfig, BlockGenContext } from "../IBlockConfig";
import { BlockGeneratorBase } from "../block-generator-base";
import { SentenceDicConfig } from "./config";
import { SentenceDicBlock, SentenceDicBlockModel } from "./model";

@InputType()
export class GenerateSingleStDicArgs {
  @Field()
  trackIdx: number;
}

type GetConfigReturn<T extends IBlockConfig> = {
  [key in Phases]: T;
};

export class SentenceDicGenerator extends BlockGeneratorBase<TokkenTrack> {
  constructor(ctx: BlockGenContext<TokkenTrack>) {
    super(ctx);
  }

  getConfig(): GetConfigReturn<SentenceDicConfig> {
    const {
      blockConfigMap: { dictation_sentence },
      level,
    } = this.ctx;

    let configs: SentenceDicConfig[] = [];
    const {
      genConfig: { extractLevel, genPhases },
      configModel,
    } = dictation_sentence;
    if (configModel && configModel.length > 0) {
      configs = configModel as SentenceDicConfig[];
    }

    const phasesToFilter = new Set(configs.map((x) => x.phase));
    const phasesToMap = allPhases.filter((phase) => !phasesToFilter.has(phase));

    console.log("PHASE TO FILTER", phasesToFilter);
    console.log("PHASE TO Map", phasesToMap);

    const restConfigs = phasesToMap.map(
      (phase) =>
        new SentenceDicConfig({ extractLevel, genPhases, level, phase })
    );

    configs = configs.concat(restConfigs);

    console.log(mapByPhase(configs));

    return mapByPhase(configs) as GetConfigReturn<SentenceDicConfig>;
  }

  async generate({
    trackIdx,
  }: GenerateSingleStDicArgs): Promise<SentenceDicBlock[]> {
    const {
      blockConfigMap: {
        dictation_sentence: {
          genConfig: { genPhases },
        },
      },
    } = this.ctx;

    let blocks: SentenceDicBlock[] = [];
    const configs = this.getConfig();

    genPhases.forEach((phase) => {
      const {
        dedicatedPoint,
        inferedConfig: { allowInitialLetterHint },
      } = configs[phase];
      blocks.push(
        new SentenceDicBlock({
          phase,
          dedicatedPoint,
          trackIdx,
          allowInitialLetterHint,
        })
      );
    });
    const generatedBlocks = await SentenceDicBlockModel.create(blocks);
    return generatedBlocks;
  }

  async extract(): Promise<SentenceDicBlock[]> {
    const {
      blockConfigMap: { dictation_sentence },
      track,
      roleInfo,
    } = this.ctx;

    if (
      !dictation_sentence ||
      dictation_sentence.genConfig.genPhases.length === 0
    ) {
      return [];
    }

    const {
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

    const configMap = this.getConfig();

    const trackIdxes = rangeIndexParser(trackRange);
    let blocks: SentenceDicBlock[] = [];

    console.log("Track Indexes : ", trackIdxes);

    // LOOP BLOCK
    trackIdxes.forEach((idx) => {
      genPhases.forEach((phase) => {
        const {
          dedicatedPoint,
          inferedConfig: { allowInitialLetterHint },
          generate,
        } = configMap[phase]!;

        if (!generate) {
          return;
        }

        blocks.push(
          new SentenceDicBlock({
            trackIdx: idx,
            allowInitialLetterHint,
            dedicatedPoint,
            phase,
          })
        );
      });
    });
    // LOOP BLOCK

    const generatedBlocks = await SentenceDicBlockModel.create(blocks);

    return generatedBlocks;
  }
}
