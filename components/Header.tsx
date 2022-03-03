import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@styles/Header";
import SignUpModal from "@components/auth/SignUpModal";
import useModal from "../hooks/useModal";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logoText.svg";

const Header: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();

  return (
    <Container>
      <Link href="/">
        <a className="Header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      <div className="header-auth-buttons">
        <button
          type="button"
          className="header-sign-up-button"
          onClick={openModal}
        >
          회원가입
        </button>
        <button type="button" className="header-login-button">
          로그인
        </button>
      </div>
      <ModalPortal>
        <SignUpModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
