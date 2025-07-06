import { Alert, Card, CardFooter, Progress } from "@heroui/react";
import Image, { StaticImageData } from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./styles.module.css";
import { steps } from "./copy";

const AlertIcon = ({ index }: { index: number }) => {
  return <div className="text-lg font-bold">{index + 1}</div>;
};

const progressValue = (currentStep: number) => {
  const stepValue = 100 / (steps.length || 5);
  //Out of 100
  return (1 + currentStep) * stepValue;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// const CustomRightArrow = ({ onClick }: { onClick: () => void }) => {
//   return (
//     <div
//       className="absolute right-5 top-[calc(200px/2+68px)] text-white"
//       onClick={onClick}
//     >
//       Right
//     </div>
//   );
// };

// const CustomLeftArrow = ({ onClick }: { onClick: () => void }) => {
//   return (
//     <div
//       className="absolute left-50 z-10 top-[calc(200px/2+68px)] text-white"
//       onClick={onClick}
//     >
//       LeftEden
//     </div>
//   );
// };

export default function HowToCarousel({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: { title: string; description: string; image: StaticImageData }[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) {
  return (
    <div className="max-w-[90vw] flex flex-col gap-4 ">
      <Card>
        <Carousel
          arrows={true}
          draggable={true}
          //   customRightArrow={
          //     <CustomRightArrow
          //       onClick={() => {
          //         setCurrentStep(currentStep + 1);
          //       }}
          //     />
          //   }
          ssr={false}
          responsive={responsive}
          beforeChange={(nextSlide) => setCurrentStep(nextSlide)}
        >
          {steps.map((step, index) => (
            <div key={step.title} onClick={() => setCurrentStep(index)}>
              <Alert
                className={styles.alertWrapper}
                color="default"
                icon={<AlertIcon index={index} />}
                classNames={{}}
              >
                <div className="text-xl font-bold">{step.title}</div>
                <div className="text-xs line-clamp-1">{step.description}</div>
              </Alert>
              <div className="relative w-full h-full ">
                <Image
                  src={step.image}
                  alt={step.title}
                  title={step.title}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
        <CardFooter className="p-[0px] mt-[-4px]">
          <Progress value={progressValue(currentStep)} />
        </CardFooter>
      </Card>
    </div>
  );
}
