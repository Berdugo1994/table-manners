import Script from "next/script";

type AdSenseProps = {
  publisherId: string;
};

const AdSense = ({ publisherId }: AdSenseProps) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${publisherId}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default AdSense;
