import { writeFile } from 'fs/promises';
import { registerRoot } from "remotion";

exports.handle = async function(event) {
	await writeFile(`${ __dirname }/Composition.tsx`, event.composition);
	
	const Video = await import('./Video');
	
	registerRoot(Video.RemotionVideo);
}
