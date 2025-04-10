const ethers = require('ethers')
const axios = require('axios')

// Replace with your wallet's private key (Never expose this in production)

const gistId = '0f91b373d55fbdf918d40e8f7bb342c8'
const url = `https://api.github.com/gists/${gistId}`

const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

// Function to generate a wallet signature
async function generateSignature(walletAddress) {
  const wallet = new ethers.Wallet(PRIVATE_KEY)
  const message = `Claim Bounty for dApp.xyz`

  const signature = await wallet.signMessage(message)

  return {
    message,
    signature,
    walletAddress: wallet.address,
  }
}

// Function to verify a signature
async function verifySignature(message, signature, expectedAddress) {
  const recoveredAddress = ethers.verifyMessage(message, signature)
  return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase()
}

const fetchGist = async () => {
  try {
    const response = await axios.get(url)
    const gistData = response.data

    // Print filenames
    console.log('Gist Files:')
    for (const file in gistData.files) {
      console.log(`- ${file}`)
    }

    // Fetch and print content of the first file
    const firstFile = Object.keys(gistData.files)[0]
    const rawUrl = gistData.files[firstFile].raw_url

    const fileResponse = await axios.get(rawUrl)
    console.log(`\nContent of ${firstFile}:\n${fileResponse.data}`)

    const _data = fileResponse.data

    return {
      message: _data.message,
      signature: _data.signature,
    }
  } catch (error) {
    console.error('Error fetching Gist:', error.message)
  }
}

// Example usage
;(async () => {
  const walletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

  const signedData = await generateSignature(walletAddress)
  console.log('Signed Data:', signedData)

  const gistData = await fetchGist()
  console.log('Gist Data:', gistData)

  const isValid = await verifySignature(
    gistData.message,
    gistData.signature,
    signedData.walletAddress
  )

  console.log('Is Valid:', isValid)
})()
