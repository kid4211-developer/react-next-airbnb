import { Container } from "@styles/Login";
import { IProps } from "@components/auth/interface/AuthModal";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import Button from "../common/Button";
import Input from "../common/Input";
import useValidateMode from "../../hooks/useValidateMode";
import { authActions } from "../../store/auth";
import { userActions } from "../../store/user";

const LoginModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEamil = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const changeModal = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          name="email"
          type="email"
          icon={<MailIcon />}
          autoComplete="off"
          value={email}
          onChange={onChangeEamil}
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호"
          icon={<ClosedEyeIcon />}
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit">로그인</Button>
      </div>
      <p>
        에어비엔비 계정이 없나요?
        <span
          className="login-modal-set-signup"
          role="presentation"
          onClick={changeModal}
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
