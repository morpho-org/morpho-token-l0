import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'EthERC20Mock'

const deploy: DeployFunction = async (hre) => {
    const { deploy } = hre.deployments
    const signer = (await hre.ethers.getSigners())[0]
    console.log(`deploying ${contractName} on network: ${hre.network.name} with ${signer.address}`)

    await deploy(contractName, {
        from: signer.address,
        args: [], // No constructor args for UUPS implementation
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: false,
        proxy: {
            proxyContract: 'UUPS',
            owner: signer.address,
            execute: {
                init: {
                    methodName: 'initialize',
                    args: ['Ethereum ERC20 Mock', 'EERC20', signer.address], // name, symbol, owner
                },
            },
        },
    })
}

deploy.tags = [contractName]

export default deploy
