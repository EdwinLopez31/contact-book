import ContactForm from "@/components/features/contact/contact-form";
import getData from "@/utils/getData";
import type { GetServerSidePropsContext } from "next";
import { Contact } from "@prisma/client";
import Layout from "@/components/layout";
import LeftArrow from "../../components/icons/left-arrow";
import { useRouter } from "next/router";
import Image from "next/image";
import { baseURL, supabaseUrl } from "@/globals";
// This could've been in a modal but I want to showcase the
// concept of dynamic routingwhich is why I put this on a separate page

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { contactId } = ctx.query;
  const data = await getData(`${baseURL}/api/contacts/${contactId}`, {});
  return {
    props: {
      contactDetail: data,
    },
  };
}

interface ViewContactPageProps {
  contactDetail: Contact;
}

function ViewContactPage({ contactDetail }: ViewContactPageProps) {
  const router = useRouter();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <Layout>
      <button className='absolute left-6 top-6' onClick={handleNavigateBack}>
        <LeftArrow />
      </button>
      <div className='grid place-content-center w-full gap-4'>
        <div className='flex justify-center flex-col items-center'>
          <Image
            height='224'
            width='224'
            id='Avatar'
            className={`w-64 h-64 relative flex items-center justify-center mb-4 overflow-hidden transition-colors duration-200 ease-in-out shadow-md rounded-xl bg-white group`}
            alt={contactDetail?.name ?? ""}
            blurDataURL={
              contactDetail?.image
                ? `${supabaseUrl}/storage/v1/object/public/contact-imgs/${contactDetail.image}`
                : `/default_avatar.png`
            }
            src={
              contactDetail?.image
                ? `${supabaseUrl}/storage/v1/object/public/contact-imgs/${contactDetail.image}`
                : `/default_avatar.png`
            }
          />
        </div>
        <p>
          <span className='font-medium'>Name:</span> {contactDetail?.name}
        </p>
        <p>
          <span className='font-medium'>Email:</span> {contactDetail?.email}
        </p>
        <p>
          <span className='font-medium'>Contact Number:</span>{" "}
          {contactDetail?.contactNumber}
        </p>
      </div>
    </Layout>
  );
}

export default ViewContactPage;
