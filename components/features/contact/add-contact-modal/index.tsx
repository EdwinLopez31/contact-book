import Modal from "@/components/modal";
import ContactForm from "../contact-form";
import useAddContact from "../hooks/useAddContact";

interface AddContactModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function AddContactModal({ isOpen, handleClose }: AddContactModalProps) {
  const { isLoading, reset, mutate } = useAddContact();

  return (
    <>
      {isOpen && (
        <Modal onClose={handleClose} title={"Add Contact"}>
          <ContactForm
            primaryBtnText='Add New Contact'
            reactQuery={{ isLoading, reset, mutate }}
          />
        </Modal>
      )}
    </>
  );
}

export default AddContactModal;
