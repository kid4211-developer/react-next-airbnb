import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container } from "@styles/SignUp";
import Input from "@components/common/Input";
import Selector from "@components/common/Selector";
import { dayList, monthList, yearList } from "@lib/staticData";
import Button from "@components/common/Button";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { signupApi } from "@lib/api/auth";
import { userActions } from "../../store/user";
import { IProps, infoType, birthdayType } from "./interface/SignUp";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";
import CloseXIcon from "../../public/static/svg/modal/modal_colose_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import { authActions } from "@store/auth";

/* 생년월일 default value */
const disabledMoths = ["월"];
const disabledDays = ["일"];
const disabledYears = ["년"];

const PASSWORD_MIN_LENGTH = 8;

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setValidateMode } = useValidateMode();

  const [hidePassword, setHidePassword] = useState(true);
  const [passwordFocused, setPasswordFocused] = useState(false);

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

  /* password : 툭수문자와 숫자를 사용하지 않으면 false 반환 */
  const isPasswordNumberAndHash = useMemo((): boolean => {
    const { password } = info;
    return (
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) &&
      /[0-9]/g.test(password)
    );
  }, [info]);

  /* password가 name or email을 포함하는가 */
  const isPasswordHasNameOrEmail = useMemo((): boolean => {
    const { password, lastName, email } = info;
    return (
      !(password === lastName) &&
      !(email.length > 0 && password === email.split("@")[0])
    );
  }, [info]);

  const isPasswordOverMinlength = useMemo((): boolean => {
    const { password } = info;
    return password.length >= PASSWORD_MIN_LENGTH;
  }, [info]);

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

  /* email 형식 체크함수 : 형식에 어긋나면 true를 반환함 */
  const emailCheck = useMemo((): boolean => {
    const { email } = info;
    const reg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return !reg.test(email);
  }, [info]);

  const checkSignUpFormValidation = (): boolean => {
    if (!info.email || !info.lastName || !info.firstName || !info.password) {
      return false;
    }

    if (emailCheck) {
      return false;
    }

    if (
      !(
        isPasswordHasNameOrEmail &&
        isPasswordOverMinlength &&
        isPasswordNumberAndHash
      )
    ) {
      return false;
    }

    if (
      birthday.day.length === 1 ||
      birthday.month.length === 1 ||
      birthday.year.length === 1
    ) {
      return false;
    }

    return true;
  };

  const submitInfo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);
    /* 회원가입 validation check */
    if (checkSignUpFormValidation()) {
      try {
        const birthDate = `${birthday.year}-${birthday.month!.replace(
          "월",
          ""
        )}-${birthday.day}`;

        const param = {
          email: info.email,
          lastName: info.lastName,
          firstName: info.firstName,
          password: info.password,
          birthday: birthDate,
        };

        const { data } = await signupApi(param);

        /* 회원가입한 회원정보 store에 저장 */
        dispatch(userActions.setLoggedUser(data));

        /* 회원가입창 종료 */
        closeModal();

        router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  /* 회원가입창이 닫힐때  */
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  //* 비밀번호 인풋 포커스 되었을때
  const onFocusPassword = useCallback(() => {
    setPasswordFocused(true);
  }, []);

  const changeModal = () => {
    dispatch(authActions.setAuthMode("login"));
  };

  return (
    <Container onSubmit={submitInfo}>
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
          useValidation
          isValid={!!info.email && !emailCheck}
          errorMessage="E-mail 형식을 확인해주세요"
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
          useValidation
          isValid={!!info.lastName}
          errorMessage="이름을 입력해주세요"
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
          isValid={!!info.firstName}
          errorMessage="성을 입력해주세요"
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
          useValidation
          isValid={
            isPasswordHasNameOrEmail &&
            isPasswordOverMinlength &&
            isPasswordNumberAndHash
          }
          errorMessage="비밀번호를 확인해주세요"
          onFocus={onFocusPassword}
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={!isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning
            isValid={!isPasswordOverMinlength}
            text="비밀번호는 최소 8자리 이상입니다."
          />
          <PasswordWarning
            isValid={!isPasswordNumberAndHash}
            text="숫자와 특수기호를 포함하세요."
          />
        </>
      )}
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
            disabledOptions={disabledMoths}
            name="month"
            value={birthday.month}
            onChange={birthdayHandler}
            isValid={!(birthday.month.length === 1)}
          />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={dayList}
            disabledOptions={disabledDays}
            name="day"
            value={birthday.day}
            onChange={birthdayHandler}
            isValid={!(birthday.day.length === 1)}
          />
        </div>
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={yearList}
            disabledOptions={disabledYears}
            name="year"
            value={birthday.year}
            onChange={birthdayHandler}
            isValid={!(birthday.year.length === 1)}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있나요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={changeModal}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
