import Web3 from 'web3'
import { Kleros } from 'kleros-api'

export const web3 =
  window.web3 && window.web3.currentProvider
    ? new Web3(window.web3.currentProvider)
    : new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_PROVIDER))
if (!web3.currentProvider) {
  throw new Error('No Web3.')
}

console.log(web3)

export default new Kleros(web3.currentProvider, process.env.STORE_PROVIDER)
