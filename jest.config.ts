//npm i -D jest @types/jest
import type { Config } from '@jest/types';


const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/", // игнорировать всю папку dist
    "/test\\.ts$" // игнорировать конкретный файл
  ]
};

export default config;