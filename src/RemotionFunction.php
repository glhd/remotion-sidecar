<?php

namespace Glhd\RemotionSidecar;

use Hammerstone\Sidecar\Architecture;
use Hammerstone\Sidecar\LambdaFunction;
use Hammerstone\Sidecar\Package;
use Hammerstone\Sidecar\Runtime;

class RemotionFunction extends LambdaFunction
{
	public function handler()
	{
		return 'remotion.handle';
	}
	
	public function name()
	{
		return 'remotion';
	}
	
	public function package()
	{
		return Package::make()
			->setBaseDir(__DIR__.'/../js/dist/')
			->include([
				'HelloWorld.jsx',
				'index.jsx',
				'remotion.js',
				'Video.jsx',
			]);
	}
	
	public function runtime()
	{
		return Runtime::NODEJS_16;
	}
	
	public function memory()
	{
		return config('remotion-sidecar.memory', 2048);
	}
	
	public function layers()
	{
		// See https://www.remotion.dev/docs/lambda/custom-layers
		
		if (! empty($layers = config('remotion-sidecar.layers'))) {
			return $layers;
		}
		
		$region = config('sidecar.aws_region');
		$arch = config('sidecar.architecture', Architecture::X86_64);
		
		return [
			"arn:aws:lambda:{$region}:678892195805:layer:remotion-binaries-fonts-{$arch}",
			"arn:aws:lambda:{$region}:678892195805:layer:remotion-binaries-ffmpeg-{$arch}",
			"arn:aws:lambda:{$region}:678892195805:layer:remotion-binaries-chromium-{$arch}",
		];
	}
}
