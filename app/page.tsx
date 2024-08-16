import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Play Kiss or Slap, Earn $Star Tokens',
    },
  ],
  image: {
    src: `https://kissorslap.vercel.app/logo.jpg`,
    aspectRatio: '1:1',
  },
  postUrl: `https://kissorslap.vercel.app/api/connect`,
});

export const metadata: Metadata = {
  title: 'Kiss or Slap',
  description: 'LFG',
  openGraph: {
    title: 'Kiss or Slap',
    description: 'LFG',
    images: [`https://kissorslap.vercel.app/logo.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Kiss or Slap</h1>
    </>
  );
}
