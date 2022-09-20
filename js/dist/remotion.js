var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_path = __toESM(require("path"));
var import_bundler = require("@remotion/bundler");
var import_renderer = require("@remotion/renderer");
const start = async () => {
  const compositionId = "HelloWorld";
  const entry = "./src/index";
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await (0, import_bundler.bundle)(import_path.default.resolve(entry));
  const comps = await (0, import_renderer.getCompositions)(bundleLocation);
  const composition = comps.find((c) => c.id === compositionId);
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found. Review "${entry}" for the correct ID.`);
  }
  const outputLocation = `${compositionId}.mp4`;
  console.log("Attempting to render:", outputLocation);
  await (0, import_renderer.renderMedia)({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation
  });
  console.log("Render done!");
};
exports.handler = (event) => {
  start();
};
