import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Make Connections and Earn',
    },
  ],
  image: {
    src: `https://connect-frame.vercel.app/logo.jpg`,
    aspectRatio: '1:1',
  },
  postUrl: `https://connect-frame.vercel.app/api/connect`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`https://connect-frame.vercel.app/logo.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
    return (
      <div className="">
        Great
      </div>
    );
  }
  