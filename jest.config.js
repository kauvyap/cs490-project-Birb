//module.exports = {
  //  preset: 'ts-jest',
   // testEnvironment: 'jsdom',
    //testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(test).ts?(x)"],
//    transform: {
  //      "^.+\\.(js|ts)$": "ts-jest",
   // },
 //   transformIgnorePatterns: [
  //      "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.js$",
   //     "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.ts$",
     //   "/node_modules/(?![@autofiy/autofiyable|@autofiy/property]).+\\.tsx$",
    //],
//}

module.exports = {
    preset: 'ts-jest',
    //testEnvironment: 'node', // or your preferred environment
    // Other Jest configuration options...
    //testEnvironment: 'jsdom',

    //preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
  
    // An array of file paths or globs that specify which test files to run.
    testMatch: ['**/__tests__/**/*.test.js'],
  
    // An array of file extensions that are considered test files.
    moduleFileExtensions: ['js', 'mjs', 'jsx', 'json'],
  };
