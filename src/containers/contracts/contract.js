import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import * as contractsDux from '../../duxs/contracts'
import { objMap } from 'utils'

class Contract extends PureComponent {
  componentDidMount() {
    const { match, fetchContract } = this.props
    fetchContract(match.params.contractAddress)
  }

  render() {
    const { loadingContract, contract } = this.props

    // T O D O: Proper loading
    if (loadingContract || !contract) return <span>Loading....</span>

    return (
      <div>
        <Link to="/contracts">Back to Contracts</Link>
        {objMap(contract, (value, key) => (
          <div key={key}>
            {key}: {value}
          </div>
        ))}
        <style jsx>{`
          div {
            margin: 10px;
          }
        `}</style>
      </div>
    )
  }
}

Contract.propTypes = {
  // State
  loadingContract: PropTypes.bool,
  contract: contractsDux.contractShape, // eslint-disable-line react/no-typos

  // Bounded Action Creators
  fetchContract: PropTypes.func.isRequired,

  // Router
  match: PropTypes.shape({
    params: PropTypes.shape({ contractAddress: PropTypes.string.isRequired })
      .isRequired
  }).isRequired
}

Contract.defaultProps = {
  // State
  loadingContract: false,
  contract: null
}

export default connect(
  (state, ownProps) =>
    console.log(ownProps) || {
      contract:
        state.contracts.detailedContracts[ownProps.match.params.contractAddress]
    },
  { fetchContract: contractsDux.fetchContract }
)(Contract)
