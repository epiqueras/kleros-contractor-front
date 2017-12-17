import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './configure-store'
import App from './app'

const { store, history } = configureStore()
export default store

// Random number is used so hot reloading works with `react-loadable`
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component
        key={process.env.NODE_ENV === 'development' ? Math.random() : undefined}
        store={store}
        history={history}
      />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App)
  })
}
