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
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface ILogin {
  authentication: Authenticator;
}

export default function Login({ authentication }: ILogin) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleEmail = (email: string) => {
    setEmail(email.toLowerCase());
  };
  const handlePassword = (password: string) => {
    setPassword(password);
  };

  return (
    <SafeAreaView>
      <Center
        height="100%"
        _dark={{
          bg: "black",
        }}
        _light={{
          bg: "amber.400",
        }}
      >
        <FormControl isRequired maxWidth="90%">
          <Heading size="2xl" mb="10" textAlign="center">
            Welcome motherfucker!
          </Heading>
          <Stack>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              isInvalid={authentication.error}
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
            {/* <FormControl.HelperText>Mail must be valid</FormControl.HelperText> */}
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Mail must be valid motherfucker
            </FormControl.ErrorMessage>
            <FormControl.Label mt="5">Password</FormControl.Label>
            <Input
              InputRightElement={
                <Icon
                  as={<Ionicons name="ios-eye" />}
                  size="sm"
                  mr="2"
                  _light={{ color: "black" }}
                  _dark={{ color: "coolGray.400" }}
                  onPress={() => setPasswordVisible((prev) => !prev)}
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
              type={passwordVisible ? "password" : ""}
              placeholder="Password"
            />
            <FormControl.HelperText>
              Must be at least 6 characters.
            </FormControl.HelperText>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              At least 6 characters are required.
            </FormControl.ErrorMessage>
            <Button
              mt="4"
              minWidth="full"
              onPress={() => {
                authentication.signInWithEmail(email, password);
              }}
            >
              <HStack>
                <Text>Login</Text>
                {authentication.isLoading && <Spinner ml="2" color="white" />}
              </HStack>
            </Button>
            <Button variant="outline" mt="4" minWidth="full">
              Signup
            </Button>
          </Stack>
        </FormControl>
      </Center>
    </SafeAreaView>
  );
}
