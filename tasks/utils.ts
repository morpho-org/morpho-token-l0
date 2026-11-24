import { endpointIdToNetwork } from '@layerzerolabs/lz-definitions'

export const deploymentMetadataUrl = 'https://metadata.layerzero-api.com/v1/metadata/deployments'

/**
 * Given a srcEid and on-chain tx hash, return
 * `https://…blockExplorers[0].url/tx/<txHash>`, or undefined.
 */
export async function getBlockExplorerLink(srcEid: number, txHash: string): Promise<string | undefined> {
    const network = endpointIdToNetwork(srcEid) // e.g. "ethereum-mainnet"
    const res = await fetch(deploymentMetadataUrl)
    if (!res.ok) return
    const all = (await res.json()) as Record<string, { blockExplorers?: { url: string }[] }>
    const meta = all[network]
    const explorer = meta?.blockExplorers?.[0]?.url
    if (explorer) {
        // many explorers use `/tx/<hash>`
        return `${explorer.replace(/\/+$/, '')}/tx/${txHash}`
    }
    return
}

// Get LayerZero scan link
export function getLayerZeroScanLink(txHash: string, isTestnet = false): string {
    const baseUrl = isTestnet ? 'https://testnet.layerzeroscan.com' : 'https://layerzeroscan.com'
    return `${baseUrl}/tx/${txHash}`
}

export { DebugLogger, KnownErrors, KnownOutputs, KnownWarnings } from '@layerzerolabs/io-devtools'
