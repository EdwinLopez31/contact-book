import Delete from "@/components/icons/delete";
import Edit from "@/components/icons/edit";
import Image from "next/image";
import useDeleteContact from "./hooks/useDeleteContact";
import { useRouter } from "next/router";
import { FacebookMessengerShareButton } from "react-share";
import Link from "next/link";
import Share from "@/components/icons/share";
import { baseURL } from "@/globals";
interface ContactProps {
  id: string;
  name?: string | null;
  number: string;
  image?: string | null;
}

function Contact({ id, name, number, image }: ContactProps) {
  const {
    isLoading: isDeleteLoading,
    reset,
    mutate: deleteContact,
  } = useDeleteContact();
  const router = useRouter();
  const handleDelete = () => {
    deleteContact({ id });
  };
  const navigateToEditPage = () => {
    router.push(`/edit/${id}`);
  };
  return (
    <div className='w-full bg-amber-400 flex h-20 items-center p-4 gap-4 justify-between border-b border-amber-600/40'>
      <Link href={`/${id}`} className='flex items-center gap-4 flex-1'>
        <Contact.Image image={image} />
        <span className='flex flex-col'>
          <Contact.Name name={name ?? "Unknown"} />
          <Contact.Number number={number} />
        </span>
      </Link>
      <div>
        <Contact.ControllerContainer>
          <Contact.ControllerBtn onClick={navigateToEditPage} icon={<Edit />} />
          <Contact.ControllerBtn
            disabled={isDeleteLoading}
            onClick={handleDelete}
            icon={<Delete />}
          />
          <FacebookMessengerShareButton
            url={`${baseURL}/contact/${id}`}
            appId='786722032609413'
          >
            <Share />
          </FacebookMessengerShareButton>
        </Contact.ControllerContainer>
      </div>
    </div>
  );
}

Contact.Name = function ContactName({ name }: Pick<ContactProps, "name">) {
  return <p className='text-amber-900 font-medium'>{name}</p>;
};

Contact.Number = function ContactNumber({
  number,
}: Pick<ContactProps, "number">) {
  return <p className='text-amber-900'>09297897945</p>;
};

Contact.Image = function ContactImage({
  image,
  name,
}: Partial<Pick<ContactProps, "image"> & Pick<ContactProps, "name">>) {
  return (
    <Image
      placeholder='blur'
      blurDataURL={
        image
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/contact-imgs/${image}`
          : `/default_avatar.png`
      }
      src={
        image
          ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/contact-imgs/${image}`
          : `/default_avatar.png`
      }
      width='64'
      height='64'
      className='w-16 h-16 rounded-full object-cover'
      quality={75}
      alt={name ?? "avatar"}
    />
  );
};

Contact.ControllerBtn = function ControllerBtn({
  icon,
  onClick,
  ...props
}: { icon: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={`hover:text-amber-800 transition-colors`}
      {...props}
    >
      {icon}
    </button>
  );
};

Contact.ControllerContainer = function ControllerContainer({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return <div className='flex items-center gap-4'>{children}</div>;
};

export default Contact;
