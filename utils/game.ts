import { createWalletClient, http, createPublicClient } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { abi } from './abi.json';

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const providerUrl = process.env.RPC_URL;
const chain = baseSepolia
const contractAddress = '0x2A382FE83B7969e44386B0C6CBc01138bF48Ed72';

export const publicClient = createPublicClient({
  chain,
  transport: http(providerUrl),
});

const walletClient = createWalletClient({
  chain,
  transport: http(providerUrl),
});

export async function kiss(sender: `0x${string}`, _recipient: `0x${string}`) {
  try {
    const { request }: any = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi,
      functionName: 'kiss',
      args: [sender, _recipient],
    });
    console.log('walletClient', walletClient);
    console.log('request', request);
    const transaction = await walletClient.writeContract(request);

    console.log('transaction', transaction);

    return transaction;
  } catch (error) {
    console.error('mintNft error: ', error);
    return 'Already minted';
  }
}

export async function slap(sender: `0x${string}`, _recipient: `0x${string}`) {
    try {
      const { request }: any = await publicClient.simulateContract({
        account,
        address: contractAddress,
        abi,
        functionName: 'slap',
        args: [sender, _recipient],
      });

      const transaction = await walletClient.writeContract(request);

      console.log('transaction', transaction);
  
      return transaction;
    } catch (error) {
      console.error('mintNft error: ', error);
      return 'Already minted';
    }
  }