import { createWalletClient, http, createPublicClient } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { abi } from './abi.json';

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
const providerUrl = process.env.RPC_URL;
const chain = baseSepolia
const contractAddress = '0x01D63f856bA76FA1780c58C5a73939D0F5C45BD2';

export const publicClient = createPublicClient({
  chain,
  transport: http(providerUrl),
});

const walletClient = createWalletClient({
  chain,
  transport: http(providerUrl),
});

export async function kiss(sender: `0x${string}`, _recipient: `0x${string}`) {
  console.log('walletClient', walletClient);
  console.log('account', account);
  try {
    const { request }: any = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi,
      functionName: 'kiss',
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