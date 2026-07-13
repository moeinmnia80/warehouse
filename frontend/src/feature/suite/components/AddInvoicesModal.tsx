import { useRef, useState } from "react";
import { PdfIcon, TrashIcon, UploadIcon } from "@/assets/index";

export const AddInvoicesModal = () => {
  // add file to state for submit/show
  //multiple
  const [file, setFile] = useState<File[]>([]);
  //   Error Handling
  const [error, setError] = useState("");
  // select input
  const inputRef = useRef<HTMLInputElement | null>(null);

  // for set file in state from hidden input
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    event.preventDefault();
    // prevent send more files
    if (file.length > 3) {
      setError("3 files not more");
      return;
    }
    const files = event.target.files;
    if (!files || files.length === 0) return;
    // const file = files[0];
    const selected = Array.from(files);
    setFile((prev) => [...prev, ...selected]);
  };
  /* 
    for custom button click on btn => 
    input hidden and use ref for handle 
  */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    inputRef.current.click();
  };
  // handle drop file
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // prevent send more files
    if (file.length > 3) {
      setError("3 files not more");
      return;
    }
    const files = event.dataTransfer?.files;
    if (!files || files.length === 0) return;
    // for set one
    // setFile(files[0].name);
    const selected = Array.from(files);
    //set multiple files
    setFile((prev) => [...prev, ...selected]);
  };
  const handleRemove = (name: string) => {
    // for span preventdefault <X>
    const modifyFile = file.filter((item) => item.name !== name);
    setFile([...modifyFile]);
  };

  return (
    <form onSubmit={() => {}}>
      {/* Drag boundary */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className=" min-h-44 p-6"
      >
        <input
          type="file"
          title="file"
          ref={inputRef}
          accept=".pdf"
          onChange={(e) => handleChange(e)}
          className="hidden"
          multiple
          maxLength={3}
        />
        <div className="flex gap-2">
          {file ? (
            <>
              {file.map((item) => (
                <div
                  key={item.name}
                  className="relative flex-center flex-col gap-2 size-30 bg-b-secondary border border-bo-primary rounded-lg overflow-hidden p-2 animate-fade-in"
                >
                  {/* Trash Wrapper */}
                  <span
                    onClick={() => handleRemove(item.name)}
                    className="absolute right-2 top-2 flex-center size-6 text-error bg-error-50 rounded-full cursor-pointer"
                  >
                    {/* Trash Icon */}
                    <TrashIcon className="size-4 stroke-error" />
                  </span>

                  {/* Pdf Icon */}
                  <PdfIcon className="size-10 stroke-st-primary" />
                  {/* File<name> */}
                  <span className="text-t-secondary text-xs line-clamp-2">
                    {item.name}
                  </span>
                  {/* File<size> */}
                  <span className="text-t-secondary text-xs line-clamp-2">
                    {(item.size / (1024 * 1024)).toFixed(2)}
                    <span className="ml-1">Mb</span>
                  </span>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="text-t-primary"></div>
            </>
          )}
          {/* Upload button */}
          <button
            onClick={(e) => e.preventDefault()}
            type="submit"
            disabled={!file.length}
            className="flex-center flex-col gap-2 size-30 bg-b-secondary border border-bo-primary rounded-lg disabled:opacity-50 disabled:cursor-default"
          >
            {/* Upload Icon */}
            <UploadIcon className="size-10 stroke-st-primary" />
            {/* Text */}
            <span className="text-t-primary text-2xl">Upload</span>
          </button>
        </div>
        {error && (
          <>
            <span className="text-error bg-error-50">{error}</span>
          </>
        )}
        {/* Info/Caption */}
        <span className="text-xs text-t-secondary">
          You can drag/drop files
        </span>
      </div>
      <div className="p-5  border-t border-bo-primary">
        <button
          className="btn max-w-full bg-t-primary text-b-primary rounded-lg"
          onClick={(e) => handleClick(e)}
        >
          Add Invoice
        </button>
      </div>
    </form>
  );
};
