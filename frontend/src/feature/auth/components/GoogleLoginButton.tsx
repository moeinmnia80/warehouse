import { Button } from "@/shared";
import { GoogleIcon } from "@/assets";
import { useAuth } from "@/feature/auth";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";

export const GoogleLoginButton = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full h-12 mt-4 flex-center">
        <Button
          onClick={() => {}}
          className="btn-secondary gap-3 px-2 cursor-default"
        >
          <GoogleIcon className="size-5" />
          Sign in with Google
        </Button>
        <div className="absolute inset-0 flex-center opacity-0">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (!credentialResponse.credential) return;

              try {
                const result = await loginWithGoogle({
                  token: credentialResponse.credential,
                });
                if (result?.success) {
                  navigate("/dashboard");
                }
              } catch (error) {
                console.log(error);
              }
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            use_fedcm_for_button={true}
            theme="filled_black"
            shape="rectangular"
            size="large"
            text="signin_with"
          />
        </div>
      </div>
    </>
  );
};
