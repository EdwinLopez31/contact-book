import Modal from "@/components/modal";
import InputField from "@/components/form/input-field";
import ButtonPrimary from "@/components/button/btn-primary";
import PictureUpload from "@/components/form/picture-upload";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Contact } from "@prisma/client";
interface ContactFormProps {
  initialValues?: Partial<Contact>;
  primaryBtnText: string;
  reactQuery: {
    isLoading: boolean;
    reset: () => void;
    mutate: (variables: Partial<Contact>) => void;
  };
}

function ContactForm({
  initialValues,
  primaryBtnText,
  reactQuery,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    id: initialValues?.id ?? "",
    image: initialValues?.image ?? "",
    name: initialValues?.name ?? "",
    contactNumber: initialValues?.contactNumber ?? "",
    email: initialValues?.email ?? "",
  });

  const isRequiredFieldsMissing = !formData.email || !formData.contactNumber;
  const handleSubmit = async (
    onSubmitEvt: React.FormEvent<HTMLFormElement>
  ) => {
    onSubmitEvt.preventDefault();

    try {
      toast.loading("Loading");
      reactQuery.mutate(formData);
    } catch (err) {
      console.error(err);
    } finally {
      toast.dismiss();
      reactQuery.reset();
    }
  };
  const handleGetImagePath = (imgPath?: string) => {
    if (!imgPath) {
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, image: imgPath }));
  };

  const handleChangeFormData = (
    onChangeEvt: React.ChangeEvent<HTMLInputElement>
  ) => {
    const key = onChangeEvt.target.id;
    const value = onChangeEvt.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <div className='flex justify-center flex-col items-center'>
        <PictureUpload
          handleGetImagePath={handleGetImagePath}
          name='avatar'
          id='Avatar'
          value={
            formData.image
              ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/contact-imgs/${formData.image}`
              : ""
          }
        />
      </div>
      <InputField
        onChange={handleChangeFormData}
        labelText='Name'
        id='name'
        value={formData.name}
      />
      <InputField
        onChange={handleChangeFormData}
        type='email'
        labelText='Email'
        id='email'
        value={formData.email}
      />
      <InputField
        onChange={handleChangeFormData}
        type='number'
        labelText='Number'
        id='contactNumber'
        value={formData.contactNumber}
      />
      <div className='flex gap-2 justify-end mt-4'>
        <ButtonPrimary
          type='submit'
          className='bg-indigo-900 w-full'
          text={primaryBtnText}
          disabled={isRequiredFieldsMissing || reactQuery.isLoading}
        />
      </div>
    </form>
  );
}

export default ContactForm;
