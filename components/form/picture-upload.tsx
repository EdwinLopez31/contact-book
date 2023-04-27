import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import React from "react";

interface PictureUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  handleGetImagePath: (imgPath?: string) => void;
}

function PictureUpload({
  name,
  id,
  handleGetImagePath,
  value,
}: PictureUploadProps) {
  const [image, setImage] = useState((value as string) ?? "");

  const uploadToBucket = async (file: File) => {
    const filename = `${file.name}-${new Date().toISOString()}`;
    const { data, error } = await supabase.storage
      .from("contact-imgs")
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });

    const filePath = data?.path;
    handleGetImagePath(filePath);
  };

  const handleChange = async (
    onChangeEvt: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !onChangeEvt.target.files ||
      typeof onChangeEvt?.target?.files[0] === "undefined"
    ) {
      return;
    }
    const file = onChangeEvt.target.files[0];
    const reader = new FileReader();
    reader.onloadend = showImage as (
      this: FileReader,
      ev: ProgressEvent<FileReader>
    ) => any;
    reader.readAsDataURL(onChangeEvt?.target?.files[0]);

    uploadToBucket(file);
  };

  const showImage = (fileReaderEvt: Event & { target: { result: string } }) => {
    setImage(fileReaderEvt?.target?.result);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`w-64 h-64 relative flex items-center justify-center mb-4 overflow-hidden transition-colors duration-200 ease-in-out shadow-md cursor-pointer rounded-xl bg-white group`}
      >
        <div
          className={`absolute flex items-center uppercase opacity-0 justify-center z-50 w-full h-full transition-opacity hover:bg-gray-400/50 group-focus:opacity-70 group-hover:opacity-70  text-gray-800 font-medium text-sm
            ${image ? "font-bold" : ""}`}
        >
          Upload a picture
        </div>

        {image && (
          <Image
            src={image}
            width={160}
            height={160}
            alt='avatar'
            className='w-full h-full object-cover'
          />
        )}
      </label>

      <input
        name={name}
        id={id}
        className='hidden'
        type='file'
        accept='image/*'
        onChange={handleChange}
      />
    </>
  );
}

export default PictureUpload;
