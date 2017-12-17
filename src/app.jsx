import React from 'react'
import loadable from 'react-loadable'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import { colors } from './constants/theme'
import { renderNull } from 'utils'

const Contracts = loadable({
  loader: () => import('./containers/contracts/index.jsx'),
  loading: renderNull // T O D O: Use loading spinner
})
const Contract = loadable({
  loader: () => import('./containers/contracts/contract.jsx'),
  loading: renderNull // T O D O: Use loading spinner
})

const App = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="router-root">
        <Switch>
          <Route exact path="/" component={Contracts} />
          <Route exact path="/contracts" component={Contracts} />
          <Route
            exact
            path="/contracts/:contractAddress"
            component={Contract}
          />
        </Switch>
        <style jsx global>{`
          html,
          body,
          #root,
          #router-root {
            width: 100%;
            height: 100%;
            padding: 0;
            border: 0;
            margin: 0;
          }

          #router-root {
            display: flex;
            flex-direction: column;
            background: ${colors.background};
            font-family: sans-serif;
          }
        `}</style>
      </div>
    </ConnectedRouter>
  </Provider>
)

App.propTypes = {
  // State
  store: PropTypes.shape({}).isRequired,

  // Router
  history: PropTypes.shape({}).isRequired
}

export default App
