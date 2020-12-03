import React from 'react'

import { Canvas, SettingBar, Toolbar } from '@components'

import '@theme/app.scss'

export const App = () => {
  return (
    <div className="app">
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  )
}
