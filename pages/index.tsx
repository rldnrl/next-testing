import type { NextPage } from "next";
import Input from "@components/Input";
import Label from "@components/Label";
import Head from "next/head";
import { ChangeEventHandler, useState } from "react";
import emailValidate from "@utils/email-validate";
import { Error } from "@components/Error";

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatchedPassword, setIsMatchedPassword] = useState(false);
  const [isLessThan5Character, setIsLessThan5Character] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsEmail(emailValidate(e.target.value));
    setEmail(e.target.value);
  };

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setIsLessThan5Character(e.target.value.length < 5);
    setIsMatchedPassword(e.target.value === confirmPassword);
    setPassword(e.target.value);
  };

  const onChangeConfirmedPassword: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setIsMatchedPassword(password === e.target.value);
    setConfirmPassword(e.target.value);
  };

  const renderErrorMessage = () => {
    if (!isEmail) {
      return <Error>The email you input is invalid</Error>;
    } else if (isLessThan5Character) {
      return (
        <Error>
          The password you entered should contain 5 or more character
        </Error>
      );
    } else if (!isMatchedPassword) {
      return <Error>{`The password don't match. try again`}</Error>;
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={() => {}}>
        <Label htmlFor="email">
          <span>Email Address</span>
          <Input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </Label>
        <Label htmlFor="password">
          <span>Password</span>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
        </Label>
        <Label htmlFor="confirm-password">
          <span>Confirm Password</span>
          <Input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={onChangeConfirmedPassword}
          />
        </Label>
        {renderErrorMessage()}
        <button
          type="submit"
          disabled={!isEmail || isLessThan5Character || !isMatchedPassword}
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default Home;
