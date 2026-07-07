import CloseIcon from "@/assets/icons/CloseIcon";
import { Button } from "@/shared/components/ui/Button";
import { useOverflow } from "@/shared/hooks/useOverflow";
import AddInvoicesModal from "@/feature/suite/components/AddInvoicesModal";
// Props Types
interface InvoiceModalProps {
  handleCloseModal: () => void;
  modalStatus: { open: boolean; packageId: string | null };
}

const InvoiceModal = ({
  handleCloseModal,
  modalStatus: { open },
}: InvoiceModalProps) => {
  useOverflow(open);
  return (
    // main wrapper fixed screen
    // close when click outer modal
    <div
      onClick={() => handleCloseModal()}
      className={`${open ? "grid" : "hidden"} fixed inset-0 h-svh z-40 place-items-center bg-b-transparent backdrop-blur-sm animate-fade-in`}
    >
      {/* prevent stopPropagation */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[95vw] max-w-200 bg-b-primary rounded-xl"
      >
        {/* first section */}
        <div className="p-5 border-b border-bo-primary">
          <div className="flex-between ">
            <h3 className="text-t-primary font-bold text-2xl">Add Invoices</h3>
            <Button
              onClick={handleCloseModal}
              className="btn text-t-primary w-8 h-8 bg-b-transparent rounded-full"
            >
              <CloseIcon className="size-3 fill-t-primary" />
            </Button>
          </div>
          <p className="text-t-placeholder text-lg mt-2">
            You can add multiple invoices.
          </p>
        </div>
        {/* second section */}
        <AddInvoicesModal />
      </div>
    </div>
  );
};

export default InvoiceModal;
