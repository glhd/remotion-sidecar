import path from "path";
import {bundle} from "@remotion/bundler";
import {getCompositions, renderMedia} from "@remotion/renderer";

const start = async () => {
	const compositionId = "HelloWorld";
	const entry = "./src/index";
	
	console.log("Creating a Webpack bundle of the video");
	
	const bundleLocation = await bundle(path.resolve(entry));
	const comps = await getCompositions(bundleLocation);
	
	const composition = comps.find((c) => c.id === compositionId);
	if (!composition) {
		throw new Error(`No composition with the ID ${compositionId} found. Review "${entry}" for the correct ID.`);
	}
	
	const outputLocation = `${compositionId}.mp4`;
	console.log("Attempting to render:", outputLocation);
	
	await renderMedia({
		composition,
		serveUrl: bundleLocation,
		codec: "h264",
		outputLocation,
	});
	
	console.log("Render done!");
};

exports.handler = (event) => {
	start();
};
