import { registerEnumType } from "type-graphql";
import {
  BlockStepType,
  BlockType,
  BlockTypeTag,
  LessonTypes,
  Phases,
  ResourceTypes,
} from "./lesson-enums";
import { SparkUserFrom } from "./spark-user-enums";
import { VideoTypes } from "./sori-lesson-enum";
import { ExtractLevel, TokkenGroupLevel } from "./block-enums/config.enum";

// YOU HAVE TO RUN THIS FUNCTION IN SERVER STARTER FUNCTION TO WORK PROPERLY
export const registerEnums = () => {
  registerEnumType(LessonTypes, {
    name: "LessonTypes",
    description: "레슨 및 리소스 타입",
  });
  registerEnumType(Phases, {
    name: "Phases",
    description: "레슨 페이즈 (학습 ,복습 , 테스트)",
  });
  registerEnumType(SparkUserFrom, {
    name: "SparkUserFrom",
    description: "유저의 서비스 환경 engspark | spark-lite",
  });
  registerEnumType(BlockStepType, {
    name: "BlockStepType",
    description: "블럭 스탭 구분용 타입",
  });
  registerEnumType(BlockType, {
    name: "BlockType",
    description: "블럭 타입",
  });
  registerEnumType(BlockTypeTag, {
    name: "BlockTypeTag",
    description: "블럭 타입별 용도 구분용",
  });
  registerEnumType(ResourceTypes, {
    name: "ResourceTypes",
    description: "리소스 종류",
  });
  registerEnumType(VideoTypes, {
    name: "VideoTypes",
    description: "비디오 종류 (Youtube | Uploaded)",
  });
  registerEnumType(ExtractLevel, {
    name: "ExtractLevel",
    description: "레슨 블럭 추출 우선도",
  });
  registerEnumType(TokkenGroupLevel, {
    name: "TokkenGroupLevel",
    description: "토큰 분할시 토큰 그룹 단위",
  });
};
