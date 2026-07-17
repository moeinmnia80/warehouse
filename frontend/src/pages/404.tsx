import { Button } from "@/shared/index";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute inset-0 z-50 flex-center flex-col
      w-full h-svh text-tx-primary bg-b-primary gap-2"
    >
      <h2 className="font-extrabold text-[120px]">404</h2>
      <p className="text-md font-light text-t-secondary ">
        somethings went wrong
      </p>

      <Button onClick={() => navigate(-1)} className="btn btn--border max-w-40">
        Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
