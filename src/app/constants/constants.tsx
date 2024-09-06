import { ethers } from 'ethers'

export const pceAddress = '0xf939595726798393F63Dbe098a54C7948DEF8faF'
export const timelockAddress = '0x87CB94699d002aafd4f7036F305866bd406c1e7A'
export const governorAddress = '0xb21473F6103f79991546D44C1417362fF7873b90'
export const pceCommunity = '0xf939595726798393F63Dbe098a54C7948DEF8faF'
export const bountyAddress = '0x4C0195cE264457549e97f84475bcA5bf72e63db8'
export const factoryAddress = '0x98120e33beea75f4dafe4ac249b3b2f16586f5a2'
export const POLY_SCAN_TX = 'https://amoy.polygonscan.com/tx/'
export const provider = new ethers.JsonRpcProvider(
  'https://polygon-amoy.blockpi.network/v1/rpc/public'
)
