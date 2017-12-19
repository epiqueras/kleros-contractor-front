import PropTypes from 'prop-types'
import { createReducer } from 'utils'

// Actions
export const FETCH_CONTRACTS = 'FETCH_CONTRACTS'
const RECEIVE_CONTRACTS = 'RECEIVE_CONTRACTS'
export const FETCH_CONTRACT = 'FETCH_CONTRACT'
const RECEIVE_CONTRACT = 'RECEIVE_CONTRACT'
export const CREATE_CONTRACT = 'CREATE_CONTRACT'
const RECEIVE_CREATED_CONTRACT = 'RECEIVE_CREATED_CONTRACT'

// Reducer
export default createReducer(
  { contracts: [], detailedContracts: {} },
  {
    [RECEIVE_CONTRACTS]: (state, action) => ({
      ...state,
      contracts: action.payload.contracts
    }),
    [RECEIVE_CONTRACT]: (state, action) => ({
      ...state,
      detailedContracts: {
        ...state.detailedContracts,
        [action.payload.contract.address]: action.payload.contract
      }
    }),
    [RECEIVE_CREATED_CONTRACT]: (state, action) => ({
      ...state,
      contracts: [...state.contracts, action.payload.contract]
    })
  }
)

// Action Creators
export const fetchContracts = () => ({ type: FETCH_CONTRACTS })
export const receiveContracts = contracts => ({
  type: RECEIVE_CONTRACTS,
  payload: { contracts }
})
export const fetchContract = contractAddress => ({
  type: FETCH_CONTRACT,
  payload: { contractAddress }
})
export const receiveContract = contract => ({
  type: RECEIVE_CONTRACT,
  payload: { contract }
})
export const createContract = contract => ({
  type: CREATE_CONTRACT,
  payload: { contract }
})
export const receiveCreatedContract = contract => ({
  type: RECEIVE_CREATED_CONTRACT,
  payload: { contract }
})

// Selectors

// Shapes
export const contractShape = PropTypes.shape({
  address: PropTypes.string,
  arbitrator: PropTypes.string,
  description: PropTypes.string,
  disputeId: PropTypes.number,
  email: PropTypes.string,
  evidencePartyA: PropTypes.string,
  evidencePartyB: PropTypes.string,
  evidences: PropTypes.arrayOf(
    PropTypes.shape({ _id: PropTypes.string, url: PropTypes.string })
  ),
  partyB: PropTypes.string,
  timeout: PropTypes.number,
  _id: PropTypes.string
})
