import {
  info1,
  info2,
  info3,
  info4,
  info5,
  info6,
  subtitle,
  WhatIsTitle,
  WhatItsNot,
  WhatItsNotInfo1,
  WhatItsNotInfo2,
  WhatItsNotInfo3,
} from "./copy";

export default function WhatIsComponent() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col gap-1 px-4 ">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{WhatIsTitle}</div>
          <div className="text-lg">{subtitle}</div>
        </div>
        <cite>
          <div className="text-sm ">{info1}</div>
          <div className="text-sm">{info2}</div>
          <div className="text-sm">{info3}</div>
          <div className="text-sm">{info4}</div>
          <div className="text-sm">{info5}</div>
          <div className="text-sm">{info6}</div>
        </cite>
      </div>
      <div className="flex flex-col gap-1 px-4">
        <div className="text-2xl font-bold">{WhatItsNot}</div>
        <cite>
          <div className="text-sm">{WhatItsNotInfo1}</div>
          <div className="text-sm">{WhatItsNotInfo2}</div>
          <div className="text-sm">{WhatItsNotInfo3}</div>
        </cite>
      </div>
    </div>
  );
}
