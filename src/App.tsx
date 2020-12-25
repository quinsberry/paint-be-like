import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Canvas, SettingBar, Toolbar } from '@components'

import '@theme/app.scss'

export const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path="/:id">
          <Toolbar />
          <SettingBar />
          <Canvas />
        </Route>
        <Redirect to={`f${(+new Date()).toString(16)}`} />
      </Switch>
    </div>
  )
}
