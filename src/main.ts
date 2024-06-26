import { registerApplication, start } from 'single-spa'
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine
} from 'single-spa-layout'
import microLayout from './microfrontend-layout.html?raw'

const routes = constructRoutes(microLayout)

const applications = constructApplications({
  routes,
  loadApp: ({ name }) => import(/* @vite-ignore */ name)
})

const layoutEngine = constructLayoutEngine({ routes, applications })

applications.forEach(registerApplication)
layoutEngine.activate()
start()
