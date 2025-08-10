import React, { useState } from "react";
import Section_Header from "../../../components/shared/header/Section_Header";
import { useForm } from "react-hook-form";
import { emailRegex } from "../../../common/constant/validator";
import { EmailIcon, MessageIcon, UserIcon } from "../../../assets/icons/Icon";
import Form_Builder from "../../../components/shared/form/Form_Builder";
import Button from "../../../components/shared/button/Button";
import { handleError } from "../../../common/utils/handleError";
import axiosInstance from "../../../service/axiosInstance";
import { API } from "../../../service/apiUrl";
import { toast } from "react-toastify";

const Support = () => {
  const [loading, setLoading] = useState(false);

  // ___________ useform _________
  const {
    control,
    setError,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });
  //list
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "fullName",
      name: "Full name",
      type: "Full name",
      label: "Full name",
      labelClassName: "!text-neutral-300",
      errorClassName: "!text-neutral-400",
      errorFill: "var(--color-neutral-400)",
      placeholder: "Full name",
      validator: {
        required: "Full name is required",
        maxLength: {
          value: "80",
          message: "Full name must be 80 characters or fewer.",
        },
      },
      icon: <UserIcon />,
    },
    {
      id: 1,
      formType: "input",
      fieldName: "email",
      name: "Email",
      type: "email",
      label: "Email",
      labelClassName: "!text-neutral-300",
      errorClassName: "!text-neutral-400",
      errorFill: "var(--color-neutral-400)",
      placeholder: "Email",
      validator: {
        required: "Email is required",
        pattern: {
          value: emailRegex,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      icon: <EmailIcon />,
    },
    {
      id: 2,
      formType: "textarea",
      fieldName: "message",
      name: "Message",
      type: "Message",
      label: "Message",
      placeholder: "Leave us a message...",
      labelClassName: "!text-neutral-300",
      errorClassName: "!text-neutral-400",
      errorFill: "var(--color-neutral-400)",
      validator: {
        required: "Message is required",
        maxLength: {
          value: "255",
          message: "Message must be 255 characters or fewer.",
        },
      },
      icon: <MessageIcon />,
    },
  ];
  //_____________________ function _______________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(API.home.support, data);
      if (response.status === 201) {
        reset();
        toast.success("Your message has been sent successfully!");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="support_bg grid gap-10 section_p min-h-[80vh] container">
      <Section_Header
        title="Get In Touch"
        des="We’d love to hear from you. Please fill out this form."
        variant="light"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-10 w-full max-w-[600px] mx-auto"
      >
        <fieldset className="flex flex-col gap-5">
          <Form_Builder
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
          />
        </fieldset>
        <Button
          buttonType="submit"
          hasFullWidth={true}
          type="secondary"
          disabled={loading}
          loading={loading}
        >
          Send Message{" "}
        </Button>
      </form>
    </section>
  );
};

export default Support;
