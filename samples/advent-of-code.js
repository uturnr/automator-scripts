/* eslint-env applescript */

// Tasks need to be added to Automator manually.

// Automator - Launch Application: iTerm
// Automator - Get Specified Finder Items: VS Code workspace file
// Automator - Open Finder Items: with Default Application
// Automator - Run Javascript: Copy the code below

function run(input, parameters) { // eslint-disable-line
		
  const bounds = Library('bounds');
  const {presets, sysPresets} = bounds.getBounds();
	
  const iTerm = Application('iTerm2');
  iTerm.includeStandardAdditions = true;

  // Requires a profile set up in iTerm
  // My advent-start profile starts in the appropriate directory and runs yarn start
  iTerm.currentWindow().createTab({withProfile: 'advent-start'}); // Set up a profile that starts in the appropriate directory
  iTerm.currentWindow().bounds = presets.bottomLeft;

  const safari = Application('Safari');
  safari.includeStandardAdditions = true;
  safari.windows[0].make({new: 'document', withProperties: {url: 'http://localhost:3000'}});
  safari.windows[0].bounds = presets.topLeft;
  safari.windows[0].make({new: 'document', withProperties: {url: 'http://www.adventofcode.com'}});
  safari.windows[0].bounds = presets.bottomLeft;

  const systemEvents = Application('System Events');
  systemEvents.processes['Code'].windows[0].position = sysPresets.right.position;
  systemEvents.processes['Code'].windows[0].size = sysPresets.right.size;

	return input;
	
}

// Use presets for apps that can be resized by applescript
// Use sysPresets for apps that must be resized by system events
// sysPresets need both position and size set
