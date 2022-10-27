import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  if (showProfileData) {
    return (
      <Flex align="center">
        <Box mr="4" textAlign="right">
          <Text>Thiago Castagnazzi</Text>
          <Text color="gray.300" fontSize="small">
            thiago.castagnazzi@gmail.com
          </Text>
        </Box>
        <Avatar
          size="md"
          name="Thiago Castagnazzi"
          src="http://github.com/thiagocastagnazzi.png"
        />
      </Flex>
    );
  } else {
    return (
      <Flex align="center">
        <Avatar
          size="md"
          name="Thiago Castagnazzi"
          src="http://github.com/thiagocastagnazzi.png"
        />
      </Flex>
    );
  }
}
