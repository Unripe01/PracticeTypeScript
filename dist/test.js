"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test2 = exports.test1 = void 0;
const sample_1 = require("../src/sample");
const a = sample_1.samleText;
const b = sample_1.sampleFunction;
function test1() {
    return "test1";
}
exports.test1 = test1;
function test2() {
    return { value: "test2" };
}
exports.test2 = test2;
