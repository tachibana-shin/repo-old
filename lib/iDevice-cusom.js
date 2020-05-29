
/*!
iDevice.js v2.1.0
(c) Alexandre Dieulot
dieulot.fr/idevice/license
*/

var iDevice = (function() {
  var canvasElement = document.createElement('canvas')
  try {
    var context = canvasElement.getContext('webgl')
    var extension = context.getExtension('WEBGL_debug_renderer_info')
    var gpu = context.getParameter(extension.UNMASKED_RENDERER_WEBGL)
  }
  catch (e) {
    return {}
  }

  var matches = gpu.match(/^Apple (.+) GPU$/)
  var cpu = matches && matches[1]
  var s = screen.width + 'x' + screen.height
  var dpr = devicePixelRatio

  if (!cpu) {
    if (gpu == 'PowerVR SGX 535' && s == '768x1024' && dpr == 1) {
      return { name: 'iPad 2/mini 1', CPU: "Cortex-A9", ARM: 32 }
    }
    if (gpu == 'PowerVR SGX 543' && dpr == 2) {
      if (s == '320x480') {
        return { name: 'iPhone 4s', CPU: "Cortex-A9", ARM: 32 }
      }
      if (s == '768x1024') {
        return { name: 'iPad 3', CPU: "A5X", ARM: 32 }
      }
      if (s == '320x568') {
        if (navigator.userAgent.indexOf('iPod') > -1) {
          return { name: 'iPod Touch 5', CPU: "A5", ARM: 32 }
        }
        return { name: 'iPhone 5/5c', CPU: "A6", ARM: 32 }
      }
    }
    if (gpu == 'PowerVR SGX 554' && s == '768x1024' && dpr == 2) {
      return { name: 'iPad 4', CPU: "A6X", ARM: 32 }
    }
    return
  }

  if (cpu == 'A7') {
    if (s == '320x568') {
      return { name: 'iPhone 5s', CPU: "A7", ARM: 64 }
    }
    if (s == '768x1024') {
      return { name: 'iPad Air/mini 2/mini 3', CPU: "A7", ARM: 64 }
    }
  }

  if (s == '320x568') {
    if (cpu == 'A8' && navigator.userAgent.indexOf('iPod') > -1) {
      return { name: 'iPod Touch 6', CPU: "A8", ARM: 64 }
    }
    if (cpu == 'A9') {
      return { name: 'iPhone SE (or 6s with Display Zoom)', CPU: "A9", ARM: 64 }
    }
  }

  var models = ['6', '6s', '7', '8']
  var cpuGeneration = parseInt(cpu.substr(1))
  if (cpuGeneration >= 8 && cpuGeneration <= 11) {
    if (dpr == 2 && (s == '375x667' || s == '320x568')) {
      return { name: 'iPhone ' + models[cpuGeneration - 8], CPU: "A" + cpuGeneration, ARM: 64 }
    }
    if (dpr == 3 && (s == '414x736' || s == '375x667')) {
      return { name: 'iPhone ' + models[cpuGeneration - 8] + ' Plus', CPU: "A" + cpuGeneration, ARM: 64 }
    }
  }

  if (cpu == 'A8' && s == '768x1024') {
    return { name: 'iPad mini 4', CPU: cpu, ARM: 64 }
  }

  if (cpu == 'A8X' && s == '768x1024') {
    return { name: 'iPad Air 2', CPU: cpu, ARM: 64 }
  }

  if (cpu == 'A9' && s == '768x1024') {
    return { name: 'iPad (2017)', CPU: cpu, ARM: 64 }
  }

  if (cpu == 'A9X') {
    if (s == '768x1024') {
      return { name: 'iPad Pro 9.7" (2016)', CPU: cpu, ARM: 64 }
    }
    if (s == '1024x1366') {
      return { name: 'iPad Pro 12.9" (2015)', CPU: cpu, ARM: 64 }
    }
  }

  if (cpu == 'A10') {
    if (s == '768x1024') {
      return { name: 'iPad (2018)', CPU: cpu, ARM: 64 }
    }
  }

  if (cpu == 'A10X') {
    if (s == '834x1112') {
      return { name: 'iPad Pro 10.5" (2017)', CPU: cpu, ARM: 64 }
    }
    if (s == '1024x1366') {
      return { name: 'iPad Pro 12.9" (2017)', CPU: cpu, ARM: 64 }
    }
  }

  if (cpu == 'A11') {
    if (s == '375x812') {
      return { name: 'iPhone X', CPU: cpu, ARM: 64 }
    }
  }

  if (cpu == 'A12') {
    if (dpr == 2) {
      if (s == '375x812' || s == '414x896') {
        return { name: 'iPhone XR', CPU: cpu, ARM: 64 }
      }
      if (s == '834x1112') {
        return { name: 'iPad Air (2019)', CPU: cpu, ARM: 64 }
      }
      if (s == '768x1024') {
        return { name: 'iPad mini (2019)', CPU: cpu, ARM: 64 }
      }
    }
    if (dpr == 3) {
      if (s == '375x812') {
        return { name: 'iPhone XS (or XS Max with Display Zoom)', CPU: cpu, ARM: 64 }
      }
      if (s == '414x896') {
        return { name: 'iPhone XS Max', CPU: cpu, ARM: 64 }
      }
    }
  }

  if (cpu == 'A12X') {
    if (s == '834x1194') {
      return { name: 'iPad Pro 11" (2018)', CPU: cpu, ARM: 64 }
    }
    if (s == '1024x1366') {
      return { name: 'iPad Pro 12.9" (2018)', CPU: cpu, ARM: 64 }
    }
  }

  return { name: 'Unidentified ' + cpu + ' ' + s + '@' + dpr, CPU: cpu, ARM: 64 }
})();
