import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const HelloWorld = () => {
	const frame = useCurrentFrame();
	const { durationInFrames, fps } = useVideoConfig();
	
	// Animate from 0 to 1 after 25 frames
	const logoTranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});
	
	// Move the logo up by 150 pixels once the transition starts
	const logoTranslation = interpolate(
		logoTranslationProgress,
		[0, 1],
		[0, -150]
	);
	
	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	
	return (
		<AbsoluteFill style={ { backgroundColor: 'white' } }>
			<AbsoluteFill style={ { opacity } }>
				<AbsoluteFill style={ { transform: `translateY(${ logoTranslation }px)` } }>
					<div style={ { position: 'absolute', textAlign: 'center', width: '100%', top: '0px', fontSize: '10rem' }}>
						Frame: { frame }
					</div>
				</AbsoluteFill>
				{/* Sequences can shift the time for its children! */ }
				<Sequence from={ 35 }>
					<div style={ { position: 'absolute', textAlign: 'center', width: '100%', top: '33%', fontSize: '10rem' } }>
						Hello
					</div>
				</Sequence>
				{/* The subtitle will only enter on the 75th frame. */ }
				<Sequence from={ 75 }>
					<div style={ { position: 'absolute', textAlign: 'center', width: '100%', top: '66%', fontSize: '10rem' } }>
						World
					</div>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
