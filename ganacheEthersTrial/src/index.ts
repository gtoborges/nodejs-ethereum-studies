import { ethers } from 'ethers'

const SERVER_ADRESS = 'http://127.0.0.1:7545'

const main = async () => {

}

// main()

const deployContract = async () => {

  const ABI = [{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"valor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
  const bytecode = "0x6080604052601460005534801561001557600080fd5b50610163806100256000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063d09de08a1461003b578063ecbac7cf14610045575b600080fd5b610043610063565b005b61004d61007c565b60405161005a919061009b565b60405180910390f35b600080815480929190610075906100e5565b9190505550565b60005481565b6000819050919050565b61009581610082565b82525050565b60006020820190506100b0600083018461008c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006100f082610082565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610122576101216100b6565b5b60018201905091905056fea2646970667358221220109701862520441ce8400051e2513074625b4a16d1ddf3dfc4f764c18f2f552564736f6c63430008130033" 
  
  const provider = new ethers.JsonRpcProvider(SERVER_ADRESS)
  const signer = await provider.getSigner()
  
  const Contagem = new ethers.ContractFactory(ABI, bytecode, signer)
  const contagem = await Contagem.deploy()
  console.log(contagem)

  return
}

const accessCreatedContract = async () => {
  
  const provider = new ethers.JsonRpcProvider(SERVER_ADRESS)
  const signer = await provider.getSigner()

  const contractAdress = "0x5a399A3e595dFC99ff3B2393AAB4bf712BB747f5"
  const ABI = [{"inputs":[],"name":"increment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"valor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

  const contagem = new ethers.Contract(contractAdress, ABI, signer)
  const response = await contagem.increment()
  console.log(response)

  const contagem2 = new ethers.Contract(contractAdress, ABI, provider)
  const qualquerNome = await contagem2.valor()

  console.log(qualquerNome, qualquerNome.toString())
  return
}

const submitNewContract = async () => {

  const provider = new ethers.JsonRpcProvider(SERVER_ADRESS)
  const signer = await provider.getSigner()
  
  const transacao = { // enviar uma transacao sem um endereço para receber (param: "to") para submeter um contrato
    data: "0x6080604052601460005534801561001557600080fd5b50610163806100256000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063d09de08a1461003b578063ecbac7cf14610045575b600080fd5b610043610063565b005b61004d61007c565b60405161005a919061009b565b60405180910390f35b600080815480929190610075906100e5565b9190505550565b60005481565b6000819050919050565b61009581610082565b82525050565b60006020820190506100b0600083018461008c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006100f082610082565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610122576101216100b6565b5b60018201905091905056fea2646970667358221220109701862520441ce8400051e2513074625b4a16d1ddf3dfc4f764c18f2f552564736f6c63430008130033"
  }

  const response = await signer.sendTransaction(transacao)
  console.log(response)
  return
}

const transferWithSigner = async () => {

  const provider = new ethers.JsonRpcProvider(SERVER_ADRESS)
  const signer = await provider.getSigner()
  
  const response = await signer.sendTransaction({
    to: "0xB0892ad068d90ef27b1Ff3E2E1fdC775cB3ddB3C",
    value: ethers.parseEther("1")
  })
  
  console.log(response)
  return
}

const firstTransfer = async () => {

  const provider = new ethers.JsonRpcProvider(SERVER_ADRESS)
  const wallet = new ethers.Wallet("0x790c92c4db03ca125bf6a0a9988ff1386074535539933ad2dab3510b9c2feff8")

  const response = await wallet.connect(provider).sendTransaction({
    to: "0x636224F0f4d3c910770f6e3103CBA380400B9fCf",
    value: ethers.parseEther("1")
  })

  console.log(response)
  return
}

const firstTests = async () => {
  
  const provider = new ethers.JsonRpcProvider(SERVER_ADRESS)
  
  const balance = await provider.getBalance("0xD19f50B9Db72baCb82e105C60f9e6B8e5213584b")
  console.log(ethers.formatEther(balance))

  const response = await provider.send('eth_getBalance', ["0xD19f50B9Db72baCb82e105C60f9e6B8e5213584b"])
  console.log(parseInt(response,16))

  const blockNumber = await provider.getBlockNumber()
  console.log(blockNumber)

  const block = await provider.getBlock(blockNumber)
  console.log(block)
  return
}

