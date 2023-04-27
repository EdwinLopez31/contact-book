import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import Contact from "@/components/features/contact";
import Add from "@/components/icons/add";
import AddContactModal from "@/components/features/contact/add-contact-modal";
import { useState } from "react";
import { Contact as IContact } from "@prisma/client";
import useGetContacts, {
  getContacts,
} from "@/components/features/contact/hooks/useGetContacts";
import InputField from "@/components/form/input-field";
const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
  contacts: IContact[];
}

export async function getServerSideProps() {
  const contacts = await getContacts({});

  return {
    props: {
      contacts,
    },
  };
}

export default function Home({ contacts }: HomeProps) {
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);

  const toggleAddContactModalOpen = () => {
    setIsAddContactModalOpen((prevState) => !prevState);
  };

  const { data } = useGetContacts("", contacts);

  return (
    <Layout>
      <AddContactModal
        isOpen={isAddContactModalOpen}
        handleClose={toggleAddContactModalOpen}
      />
      {/* <FilterSidebar /> */}
      <section className='w-full overflow-y-auto h-screen'>
        <div className='w-full  h-20 flex items-center p-4 justify-between bg-amber-50'>
          <h1 className='text-xl font-medium'>Contacts</h1>
          <InputField type='search' withLabel={false} />
          <button
            onClick={toggleAddContactModalOpen}
            className='flex gap-2 border-2 border-black p-1 shadow rounded-lg text-sm items-center font-medium text-black'
          >
            New Contact
            <Add />
          </button>
        </div>
        {data?.map((contact: IContact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            image={contact?.image}
            name={contact?.name}
            number={contact.contactNumber}
          />
        ))}
      </section>
    </Layout>
  );
}
