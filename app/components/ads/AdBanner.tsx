import { useEffect } from "react";

type AdBannerProps = {
  dataAdSlot: string;
  dataAdClient: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

const AdBanner = ({
  dataAdSlot,
  dataAdClient,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerProps) => {
  useEffect(() => {
    try {
      interface WindowWithAds extends Window {
        adsbygoogle?: unknown[];
      }
      const win = window as WindowWithAds;
      win.adsbygoogle = win.adsbygoogle || [];
      win.adsbygoogle.push({});
      console.log("AdBanner loaded");
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <ins
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
        className="adsbygoogle bb2"
        data-ad-client={"ca-" + dataAdClient}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      ></ins>
    </div>
  );
};

export default AdBanner;
