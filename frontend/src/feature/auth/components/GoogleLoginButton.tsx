import { Button } from "@/shared";
import { GoogleIcon } from "@/assets";
import { useAuth } from "@/feature/auth";
import { useNavigate } from "react-router";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useRef } from "react";

export const GoogleLoginButton = () => {
  // TODO: this comp have error, so need error handling
  const hiddenButtonRef = useRef<HTMLDivElement>(null);
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;

    const result = await loginWithGoogle({
      token: credentialResponse.credential,
    });

    if (result?.success) {
      navigate("/dashboard");
    }
  };

  const handleCustomButtonClick = () => {
    const googleButton = hiddenButtonRef.current?.querySelector(
      "div[role='button']",
    ) as HTMLElement;
    googleButton?.click();
  };
  return (
    <>
      <Button
        onClick={() => handleCustomButtonClick()}
        className="btn-secondary gap-3 mt-4 px-2"
      >
        <GoogleIcon className="size-5" />
        Sign in with Google
      </Button>
      <div ref={hiddenButtonRef} style={{ display: "none" }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.error("Google login failed")}
        />
      </div>
    </>
  );
};
