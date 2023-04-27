import ContactForm from "@/components/features/contact/contact-form";
import getData from "@/utils/getData";
import type { GetServerSidePropsContext } from "next";
import { Contact } from "@prisma/client";
import Layout from "@/components/layout";
import LeftArrow from "../../components/icons/left-arrow";
import { useRouter } from "next/router";
import useUpdateContact from "../../components/features/contact/hooks/useUpdateContact";
import { baseURL } from "@/globals";
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

interface EditContactPageProps {
  contactDetail: Contact;
}

function EditContactPage({ contactDetail }: EditContactPageProps) {
  const router = useRouter();
  const { isLoading, reset, mutate } = useUpdateContact();

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <Layout>
      <button className='absolute left-6 top-6' onClick={handleNavigateBack}>
        <LeftArrow />
      </button>
      <div className='grid place-content-center w-full'>
        <ContactForm
          primaryBtnText='Update Contact Details'
          initialValues={contactDetail}
          reactQuery={{ isLoading, reset, mutate }}
        />
      </div>
    </Layout>
  );
}

export default EditContactPage;
