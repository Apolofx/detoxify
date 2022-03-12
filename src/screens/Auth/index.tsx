import React from "react";
import {
  Center,
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Button,
  Icon,
  Heading,
  Spinner,
  HStack,
  Text,
  View,
  Image,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { validateEmail } from "@utils";

interface ILogin {
  authentication: Authenticator;
}

export default function Auth({ authentication }: ILogin) {
  //Internal States
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [errors, setErrors] = React.useState<any>({});
  //Signup states
  const [newUser, setIsNewUser] = React.useState(false);
  const [repeatPassword, setRepeatPassword] = React.useState("");
  //Local consts
  const LOGIN_ERRORS = ["email", "password", "auth"];

  //Local Helpers
  const handleEmail = (email: string) => {
    setEmail(email.toLowerCase());
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const handleRepeatPassword = (password: string) => {
    setRepeatPassword(password);
  };

  const togglePassVisibility = () => setPasswordVisible((prev) => !prev);

  const validateInputs = (): boolean => {
    setErrors({ ...Object.create({}) });
    let isValid = true;
    if (!validateEmail(email)) {
      setErrors({ ...errors, email: "Invalid email" });
      isValid = false;
    }
    if (!password) {
      setErrors({ ...errors, password: "Password cannot be empty" });
      isValid = false;
    }
    if (newUser && !(password === repeatPassword)) {
      setErrors({ ...errors, password: "Passwords do not match" });
      isValid = false;
    }
    return isValid;
  };

  const handlePrimary = () => {
    if (!validateInputs()) return;
    if (newUser) {
      authentication.signUpWithEmail(email, password);
    } else {
      authentication.signInWithEmail(email, password);
    }
  };

  const handleSecondary = () => {
    setIsNewUser((prev) => !prev);
  };

  //Side effects
  React.useEffect(() => {
    authentication.error && alert(authentication.errorMessage);
  }, [authentication.error]);

  return (
    <SafeAreaView>
      <Center position={"relative"} height="100%" bgColor="black">
        <FormControl
          maxWidth="90%"
          isInvalid={Object.keys(errors).some((key) =>
            LOGIN_ERRORS.includes(key)
          )}
        >
          <Heading size="2xl" mb="10" textAlign="center">
            Welcome motherfucker!
          </Heading>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              borderRadius="xl"
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={handleEmail}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="at" />}
                  size="sm"
                  ml="2"
                  _light={{ color: "black" }}
                  _dark={{ color: "coolGray.400" }}
                />
              }
              size="xl"
              _light={{
                bg: "coolGray.100",
              }}
              _dark={{
                bg: "coolGray.800",
              }}
              shadow={2}
              placeholder="Email"
            />
            {!!errors.email && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.email}
              </FormControl.ErrorMessage>
            )}
            <FormControl.Label mt="5">Password</FormControl.Label>
            <Input
              borderRadius="xl"
              autoCompleteType="password"
              autoCapitalize="none"
              InputRightElement={
                <Icon
                  as={
                    <Ionicons
                      name={passwordVisible ? "ios-eye-off" : "ios-eye"}
                    />
                  }
                  size="sm"
                  mr="2"
                  _light={{ color: "black" }}
                  _dark={{ color: "coolGray.400" }}
                  onPress={togglePassVisibility}
                />
              }
              onChangeText={handlePassword}
              size="xl"
              _light={{
                bg: "coolGray.100",
              }}
              _dark={{
                bg: "coolGray.800",
              }}
              shadow={2}
              type={!passwordVisible ? "password" : ""}
              placeholder="Password"
              isInvalid={false}
            />
            {!!errors.password && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.password}
              </FormControl.ErrorMessage>
            )}
            {newUser && (
              <View>
                <FormControl.Label mt="5">Repeat password</FormControl.Label>
                <Input
                  borderRadius="xl"
                  InputRightElement={
                    <Icon
                      key="pasdasd"
                      as={
                        <Ionicons
                          name={passwordVisible ? "ios-eye-off" : "ios-eye"}
                        />
                      }
                      size="sm"
                      mr="2"
                      _light={{ color: "black" }}
                      _dark={{ color: "coolGray.400" }}
                      onPress={togglePassVisibility}
                    />
                  }
                  onChangeText={handleRepeatPassword}
                  size="xl"
                  _light={{
                    bg: "coolGray.100",
                  }}
                  _dark={{
                    bg: "coolGray.800",
                  }}
                  shadow={2}
                  type={!passwordVisible ? "password" : ""}
                  placeholder="Password"
                  isInvalid={false}
                />
              </View>
            )}

            {authentication.error && (
              <Text color="error.400" mt={2} textAlign="center">
                {authentication.errorMessage}
              </Text>
            )}

            <Button
              borderRadius="xl"
              mt="5"
              minWidth="full"
              minHeight="10"
              onPress={handlePrimary}
              bgColor="indigo.600"
            >
              <HStack>
                <Text color="darkText">{newUser ? "Signup" : "Login"}</Text>
                {authentication.isLoading && <Spinner ml="2" color="white" />}
              </HStack>
            </Button>
            <Text mt="4" textAlign={"center"}>
              {newUser ? "I just want to login" : "Don't have an account yet?"}
            </Text>
            <Button variant="link" minWidth="full" onPress={handleSecondary}>
              <Text textDecorationLine="underline">
                {newUser ? "Login" : "Signup"}
              </Text>
            </Button>
          </Stack>
        </FormControl>
      </Center>
    </SafeAreaView>
  );
}
