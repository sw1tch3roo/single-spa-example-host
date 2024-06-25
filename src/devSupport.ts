/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line fp/no-mutation
;(window as any).esmsInitOptions = {
  mapOverrides: true
}

!(window as any).addEventListener(`import-map-overrides:init`, () => {
  const overrideMap = (window as any).importMapOverrides.getOverrideMap()
  const appModuleUrl = overrideMap.imports.app as string
  const isEnabledOverride =
    !(window as any).importMapOverrides.isDisabled(`app`) && appModuleUrl

  if (isEnabledOverride) {
    const { origin } = new URL(appModuleUrl)

    // eslint-disable-next-line fp/no-mutating-assign
    const viteClientScript = Object.assign(document.createElement(`script`), {
      src: `${origin}/@vite/client`,
      type: `module-shim`
    })

    document.head.append(viteClientScript)

    // eslint-disable-next-line fp/no-mutating-assign
    const reactHmrScript = Object.assign(document.createElement(`script`), {
      type: `module-shim`,
      innerHTML: `
          import { injectIntoGlobalHook } from '${origin}/@react-refresh'
          injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          window.__vite_plugin_react_preamble_installed__ = true
        `
    })

    document.head.append(reactHmrScript)
  }
})
