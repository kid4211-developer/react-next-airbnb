import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Container } from "@styles/Header";
import SignUpModal from "@components/auth/SignUpModal";
import { useSelector } from "@store/index";
import { authActions } from "@store/auth";
import useModal from "../hooks/useModal";
import AirbnbLogoIcon from "../public/static/svg/logo/logo.svg";
import AirbnbLogoTextIcon from "../public/static/svg/logo/logoText.svg";
import HamburgerIcon from "../public/static/svg/header/hamburger.svg";
import AuthModal from "./auth/AuthModal";

const Header: React.FC = () => {
  const { openModal, closeModal, ModalPortal } = useModal();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {}, []);

  const setSignUp = () => {
    dispatch(authActions.setAuthMode("signup"));
    openModal();
  };

  const setLogin = () => {
    dispatch(authActions.setAuthMode("login"));
    openModal();
  };

  return (
    <Container>
      <Link href="/">
        <a className="Header-logo-wrapper">
          <AirbnbLogoIcon className="header-logo" />
          <AirbnbLogoTextIcon />
        </a>
      </Link>
      {!user.isLogged && (
        <div className="header-auth-buttons">
          <button
            type="button"
            className="header-sign-up-button"
            onClick={setSignUp}
          >
            회원가입
          </button>
          <button
            type="button"
            className="header-login-button"
            onClick={setLogin}
          >
            로그인
          </button>
        </div>
      )}
      {user.isLogged && (
        <button className="header-user-profile" type="button">
          <HamburgerIcon />
          <img
            src={user.profileImage}
            className="header-user-profile-image"
            alt=""
          />
        </button>
      )}
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
