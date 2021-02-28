import { registerEnumType } from "type-graphql";
import { LessonTypes, Phases } from "./lesson-enums";
import { SparkUserFrom } from "./spark-user-enums";

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
};
