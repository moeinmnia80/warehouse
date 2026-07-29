import { calculateFileSize } from "@/shared";
interface InvoiceFileProps {
  file: File;
  removeFile: (fileName: string) => void;
}
export const InvoiceFile = ({ file, removeFile }: InvoiceFileProps) => {
  return (
    <div
      key={file.name}
      className="relative flex-center flex-col size-30 text-tx-primary text-xs text-center border border-bo-primary rounded-lg overflow-hidden p-2"
    >
      <button
        onClick={() => removeFile(file.name)}
        className="absolute top-1 right-1 bg-b-primary flex-center size-5 rounded-full opacity-50 disabled:opacity-40 hover:text-alert transition duration-200 delay-75"
      >
        x
      </button>

      <span className="line-clamp-2">{file.name}</span>
      <span className="opacity-30">{calculateFileSize(file.size)}</span>
    </div>
  );
};
