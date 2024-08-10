import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Make Connections and Earn',
    },
  ],
  image: {
    src: `https://connections-frame.vercel.app/park-3.png`,
    aspectRatio: '1:1',
  },
  postUrl: `https://connections-frame.vercel.app/api/connect`,
});

export const metadata: Metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`https://connections-frame.vercel.app/park-1.png`],
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
  