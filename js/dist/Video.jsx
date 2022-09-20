import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';

// Each <Composition> is an entry in the sidebar!

export const Video = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={ HelloWorld }
				durationInFrames={ 150 }
				fps={ 30 }
				width={ 1920 }
				height={ 1080 }
			/>
		</>
	);
};
