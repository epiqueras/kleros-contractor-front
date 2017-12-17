import kleros, { web3 } from '../kleros'
import * as contractsDux from '../duxs/contracts'
import { call, put, takeLatest } from 'redux-saga/effects'

/**
 * Fetches contracts for the current user and puts them in the store.
 */
function* fetchContracts() {
  const accounts = yield call(web3.eth.getAccounts) // T O D O: Keep this in the store?
  console.log(accounts)
  yield put(
    contractsDux.receiveContracts(
      yield call(
        kleros.arbitrator.getContractsForUser,
        accounts[0].toLowerCase()
      )
    )
  )
}

/**
 * Fetches contract details.
 * @param {object} { payload: contractAddress } - The address of the contract to fetch details for.
 */
function* fetchContract({ payload: { contractAddress } }) {
  const accounts = yield call(web3.eth.getAccounts)
  yield put(
    contractsDux.receiveContract(
      yield call(
        kleros.arbitrableContract.getData,
        contractAddress,
        accounts[0].toLowerCase()
      )
    )
  )
}

/**
 * Creates a new contract.
 * @param {object} { payload: contract } - The contract to create.
 */
function* createContract({ payload: { contract } }) {
  const accounts = yield call(web3.eth.getAccounts)

  let newContract = null
  try {
    newContract = yield call(
      kleros.arbitrableContract.deployContract,
      accounts[0].toLowerCase(),
      web3.utils.toWei(String(contract.payment), 'ether'),
      web3.utils.sha3(contract.description),
      process.env.ARBITRATOR_ADDRESS,
      contract.timeout,
      contract.partyB.toLowerCase(),
      contract.arbitratorExtraData,
      contract.email,
      contract.description
    )
  } catch (err) {
    console.log(err)
  }

  yield put(contractsDux.receiveCreatedContract(newContract))
}

/**
 * @export default contractsSaga - The root of the contracts saga.
 */
export default function* contractsSage() {
  yield takeLatest(contractsDux.FETCH_CONTRACTS, fetchContracts)
  yield takeLatest(contractsDux.FETCH_CONTRACT, fetchContract)
  yield takeLatest(contractsDux.CREATE_CONTRACT, createContract)
}
