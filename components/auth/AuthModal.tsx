import React from "react";
import { useSelector, RootState } from "@store/index";
import SignUpModal from "@components/auth/SignUpModal";
import { IProps } from "./interface/AuthModal";
import LoginModal from "./LoginModal";

const AuthModal: React.FC<IProps> = ({ closeModal }) => {
  const authMode = useSelector((state: RootState) => state.auth.authMode);

  return (
    <>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </>
  );
};

export default AuthModal;
