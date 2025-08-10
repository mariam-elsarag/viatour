import { Accordion, AccordionTab } from "primereact/accordion";
import { Skeleton } from "primereact/skeleton";
import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "../../../assets/icons/Icon";
import useGetData from "../../../hooks/useGetData";
import { API } from "../../../service/apiUrl";
import Section_Header from "../../../components/shared/header/Section_Header";
import { FaqImg } from "../../../assets/images/images";
import Shape from "../../../components/shared/shape/Shape";

type faqType = {
  answer: string;
  question: string;
};
const Faq = () => {
  const { data, loading } = useGetData<faqType>(API.home.faq);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIcon = (index) => {
    return activeIndex === index ? (
      <MinusIcon fill="white" width="20" height="20" />
    ) : (
      <PlusIcon fill="white" width="20" height="20" />
    );
  };

  const onAccordionChange = (e) => {
    setActiveIndex(e.index);
  };

  return (
    <div className="max-w-[1536px] mx-auto section_p section_gap relative overflow-hidden min-h-[80vh]">
      <Shape position="end" />
      <Section_Header title="Frequently Ask Questions" />
      <div className="container grid  md:grid-cols-2 gap-6 content-baseline  ">
        <div className="relative z-10 px-4 md:px-0 w-full max-w-[700px] mx-auto">
          <Accordion activeIndex={activeIndex} onTabChange={onAccordionChange}>
            {loading
              ? [1, 2, 3].map((_, index) => (
                  <AccordionTab key={index} header={<Skeleton width="300" />}>
                    <Skeleton />
                  </AccordionTab>
                ))
              : data?.slice(0, 4)?.map((item, index) => (
                  <AccordionTab
                    key={index}
                    header={
                      <div className="flex items-center justify-between p-2">
                        <p className="text-primary-700 body_lg font-medium">
                          {item.question}
                        </p>
                        <span className="flex_center bg-primary-700 rounded-full w-6 h-6">
                          {" "}
                          {toggleIcon(index)}
                        </span>
                      </div>
                    }
                  >
                    <p className={`body_md text-neutral-500 font-normal`}>
                      {item.answer}
                    </p>
                  </AccordionTab>
                ))}
          </Accordion>
        </div>
        <figure className="hidden md:flex items-center justify-start flex-col gap-6 text-center ">
          <img
            src={FaqImg}
            alt="image"
            className="h-[150px] lg:h-[220px] mx-auto"
          />
          <div className="flex flex-col gap-3">
            <h3 className="text-primary-700 headline_sm font-medium">
              Any Question?
            </h3>
            <p className="text-neutral-500 body_lg">
              You can ask anything you want to know Feedback
            </p>
          </div>
        </figure>
      </div>
      <Shape position="start" />
    </div>
  );
};

export default Faq;
