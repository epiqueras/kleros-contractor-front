import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as contractsDux from '../../duxs/contracts'
import contractColumns from '../../columns/contract'
import {
  CreateContractForm,
  getCreateContractIsInvalid,
  submitCreateContract
} from '../../forms/create-contract'
import { Button, Table } from 'components'

class Contracts extends PureComponent {
  // eslint-disable-next-line no-undef
  state = { addingContract: false }

  componentDidMount() {
    const { fetchContracts } = this.props
    fetchContracts()
  }

  // eslint-disable-next-line no-undef
  handleAddContractClick = () =>
    this.setState(prevState => ({ addingContract: !prevState.addingContract }))

  // eslint-disable-next-line no-undef
  handleTableRowClick = (tableState, rowInfo) => {
    const { history } = this.props
    history.push(`contracts/${rowInfo.original.address}`)
  }

  render() {
    const {
      loadingContracts,
      creatingContract,
      contracts,
      createContractIsInvalid,
      fetchContracts,
      submitCreateContract,
      createContract
    } = this.props
    const { addingContract } = this.state
    return (
      <div className="Contracts">
        <div className="buttons">
          <Button
            className="button"
            label="Fetch Contracts"
            onClick={fetchContracts}
          />
          <Button
            className="button"
            label="Add a Contract"
            onClick={this.handleAddContractClick}
          />
        </div>
        {addingContract && (
          <div>
            <CreateContractForm onSubmit={createContract} />
            <Button
              label="Create"
              onClick={submitCreateContract}
              disabled={createContractIsInvalid}
            />
          </div>
        )}
        <Table
          columns={contractColumns}
          data={contracts}
          loading={loadingContracts || creatingContract}
          className="Table"
          onRowClick={this.handleTableRowClick}
        />
        <style jsx>{`
          .Contracts {
            flex: 1;
            display: flex;
            flex-direction: column;

            :global(.Table) {
              flex: 1;
            }
          }

          .buttons {
            display: flex;
            flex-direction: row;

            :global(.button) {
              flex: 1;
            }
          }
        `}</style>
      </div>
    )
  }
}

Contracts.propTypes = {
  // State
  loadingContracts: PropTypes.bool,
  creatingContract: PropTypes.bool,
  contracts: PropTypes.arrayOf(contractsDux.contractShape).isRequired,
  createContractIsInvalid: PropTypes.bool.isRequired,

  // Bounded Action Creators
  fetchContracts: PropTypes.func.isRequired,
  submitCreateContract: PropTypes.func.isRequired,
  createContract: PropTypes.func.isRequired,

  // Router
  history: PropTypes.shape({}).isRequired
}

Contracts.defaultProps = {
  // State
  loadingContracts: false,
  creatingContract: false
}

export default connect(
  state => ({
    loadingContracts: state.contracts.loadingContracts,
    creatingContract: state.contracts.creatingContract,
    contracts: state.contracts.contracts,
    createContractIsInvalid: getCreateContractIsInvalid(state)
  }),
  {
    fetchContracts: contractsDux.fetchContracts,
    submitCreateContract,
    createContract: contractsDux.createContract
  }
)(Contracts)
