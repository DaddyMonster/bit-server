import { registerEnumType } from "type-graphql";
import {
  LessonTypes,
  Phases,
  BlockStepType,
  BlockType,
  BlockTypeTag,
} from "./lesson-enums";
import { SparkUserFrom } from "./spark-user-enums";

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
};
