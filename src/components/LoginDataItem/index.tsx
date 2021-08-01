import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import {
  Container,
  LoginData,
  Password,
  Title,
  Email,
  ShowPasswordButton,
  Icon
} from './styles';

interface Props {
  title: string;
  email: string;
  password: string;
}

export function LoginDataItem({
  title,
  email,
  password
}: Props) {
  const theme = useTheme();

  const [passIsVisible, setPassIsVisible] = useState(false);

  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return (
    <Container>
      {passIsVisible
        ? <Password>{password}</Password>
        : (
          <LoginData>
            <Title>{title}</Title>
            <Email>{email}</Email>
          </LoginData>
        )
      }

      <ShowPasswordButton
        onPress={handleTogglePassIsVisible}
      >
        <Icon
          name={passIsVisible ? "eye-off" : "eye"}
          color={theme.colors.primary}
        />
      </ShowPasswordButton>
    </Container>
  );
}