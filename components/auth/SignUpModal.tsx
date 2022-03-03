import { Container } from "@styles/SignUp";
import React, { useState } from "react";
import Input from "@components/common/Input";
import Selector from "@components/common/Selector";
import { dayList, monthList, yearList } from "@lib/staticData";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";

interface IProps {
  closeModal: () => void;
}

interface infoType {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
}

interface birthdayType {
  day: string;
  month: string;
  year: string;
}

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const [hidePassword, setHidePassword] = useState(true);

  /* 회원가입자 신상정보 */
  const [info, setInfo] = useState<infoType>({
    email: "",
    lastName: "",
    firstName: "",
    password: "",
  });

  /* 회원가입자 생년월일 */
  const [birthday, setBirthday] = useState<birthdayType>({
    day: "일",
    month: "월",
    year: "년",
  });

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const birthdayHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setBirthday({
      ...birthday,
      [name]: value,
    });
  };

  return (
    <Container>
      <CloseXIcon className="mordal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          icon={<MailIcon />}
          value={info.email}
          onChange={inputHandler}
          autoComplete="off"
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예: 길동)"
          name="lastName"
          type="text"
          icon={<PersonIcon />}
          value={info.lastName}
          onChange={inputHandler}
          autoComplete="new-password"
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예: 홍)"
          name="firstName"
          type="text"
          icon={<PersonIcon />}
          value={info.firstName}
          onChange={inputHandler}
          autoComplete="new-password"
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? "password" : "text"}
          name="password"
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={info.password}
          onChange={inputHandler}
          autoComplete="off"
        />
      </div>
      <p className="sign-up-birthdat-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 없습니다.
        <br />
        생일은 다른 에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={["월"]}
            name="month"
            value={birthday.month}
            onChange={birthdayHandler}
          />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={dayList}
            disabledOptions={["일"]}
            name="day"
            value={birthday.day}
            onChange={birthdayHandler}
          />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={yearList}
            disabledOptions={["년"]}
            name="year"
            value={birthday.year}
            onChange={birthdayHandler}
          />
        </div>
      </div>
    </Container>
  );
};

export default SignUpModal;
