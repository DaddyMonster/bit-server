import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import {
  AutoGenPreset,
  BlockType,
  ExtractLevel,
  LessonTypes,
  Phases,
  RoleFinalRecordType,
  RolePlayType,
  VocaCategory,
} from "../components/enums";
import {
  allPhases,
  availBlockLists,
  blockClsMap,
  BlockGenConfig,
  IBlockConfig,
  ILessonBlock,
} from "../components/lesson-manager";

@ObjectType()
class BlockGenConfigReturn extends BlockGenConfig {
  @Field(() => BlockType)
  blockType: BlockType;
}

@InputType()
export class TestSoriGenBlockArgs {
  @Field(() => Int)
  level: number;

  @Field(() => AutoGenPreset)
  preset: AutoGenPreset;
}

@InputType()
export class TestSoriConfigDetailArgs {
  @Field(() => BlockType)
  blockType: BlockType;

  @Field(() => Phases)
  phase: Phases;
}

@Resolver()
export class TestResolver {
  @Query(() => [Phases])
  getAllPhases() {
    return allPhases;
  }

  @Query(() => [BlockType])
  getAvailBlockTypes(
    @Arg("lessonType", () => LessonTypes) lessonType: LessonTypes
  ) {
    return availBlockLists[lessonType];
  }

  @Query(() => [BlockGenConfig])
  getBlockGenConfig(
    @Arg("lessonType") { level, preset }: TestSoriGenBlockArgs
  ): BlockGenConfigReturn[] {
    const blockLists = availBlockLists.sori;

    return blockLists.map((blType) => {
      return {
        ...blockClsMap[blType].getGenConfig({ preset, level }),
        blockType: blType,
      };
    });
  }

  @Query(() => IBlockConfig)
  getBlockConfigDetail(
    @Arg("input") { blockType, phase }: TestSoriConfigDetailArgs
  ) {
    const mock: BlockGenConfig = {
      genPhases: [],
      extractLevel: ExtractLevel.H,
    };
    const mockLevel = 3;
    return blockClsMap[blockType].getConfigDetail({
      ...mock,
      phase,
      level: mockLevel,
    });
  }

  @Mutation(() => [ILessonBlock])
  async testGenStDicBlock() {
    return await blockClsMap.dictation_sentence
      .getGenerator({
        blockConfigMap: {
          dictation_sentence: {
            blockType: BlockType.st_dic,
            genConfig: { extractLevel: ExtractLevel.M, genPhases: [Phases.Learn] },
          },
        } as any,
        roleInfo: {
          roleFinalRecordType: RoleFinalRecordType.Shadow,
          rolePlayType: RolePlayType.All,
          trackEnd: 5,
          trackStart: 0,
        },
        level: 7,
        track: new Array(10).fill(0).map((x) => {
          return { korSentence: "", sentence: "", tokkens: [] };
        }),
        vocaCategory: VocaCategory.Ac,
      })
      .generate({ trackIdx: 5 });
  }
}

// NEXT
// Config => GQL Interface Type 확장 DONE
// LessonConfig => Config Context에 넣기 (이건 레슨 config가 되었을때...)
/* TEST CASES  */
