/* eslint-env applescript */

function getBounds() { // eslint-disable-line no-unused-vars

  const resolution = Application('Finder').desktop().window().bounds();
  const menuBarHeight = 23;
  const screenWidth = resolution.width;
  const screenHeight = resolution.height - menuBarHeight;

  const presets = {
    topLeft: {
      x: 0,
      y: 0,
      width: screenWidth / 2,
      height: screenHeight / 2,
    },
    topRight: {
      x: screenWidth / 2,
      y: 0,
      width: screenWidth / 2,
      height: screenHeight / 2,
    },
    bottomLeft: {
      x: 0,
      y: screenHeight / 2,
      width: screenWidth / 2,
      height: screenHeight / 2,
    },
    bottomRight: {
      x: screenWidth / 2,
      y: screenHeight / 2,
      width: screenWidth / 2,
      height: screenHeight / 2,
    },
    left: {
      x: 0,
      y: 0,
      width: screenWidth / 2,
      height: screenHeight,
    },
    right: {
      x: screenWidth / 2,
      y: 0,
      width: screenWidth / 2,
      height: screenHeight,
    },
    topLeftStrip: {
      x: 0,
      y: 0,
      width: screenWidth / 2,
      height: 84,
    },
    topLeftUnderStrip: {
      x: 0,
      y: 84,
      width: screenWidth / 2,
      height: screenHeight / 2 - 84,
    },
  } 


  // adjust for menu bar with pixel perfection unless done manually
  // works only for full or half heights
  // also copy data into sysPresets

  const sysPresets = {};

  for (const presetName in presets) {
    const preset = presets[presetName];
    if (!preset.manualMenuBar) { // hoarding this
      preset.y += menuBarHeight;
      if (preset.y < screenHeight / 2) {
        preset.height = Math.round(preset.height);
      } else {
        preset.height = Math.floor(preset.height);
        preset.y = Math.round(preset.y);
      }
    }
    sysPresets[presetName] = {
      position: [preset.x, preset.y],
      size: [preset.width, preset.height],
    }
  }

  return {presets, sysPresets};

}