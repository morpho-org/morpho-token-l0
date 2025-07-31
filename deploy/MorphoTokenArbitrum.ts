import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'MorphoTokenArbitrum'

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
                    args: ['Morpho Token', 'MORPHO', signer.address], // name, symbol, owner
                },
            },
        },
    })
}

deploy.tags = [contractName]

export default deploy
