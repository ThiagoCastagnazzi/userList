import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/mitg.png";

export function Logo() {
  return (
    <Link href="/">
      <a>
        <Flex align="center" justify="center">
          <Image src={logo} alt="MiTG" width={50} height={50} />
          <Text
            fontSize={["2xl", "3xl"]}
            fontWeight="bold"
            letterSpacing="tight"
            w="64"
            as="span"
            ml="1"
          >
            MiTG
            <Text as="span" ml="1" color="yellow.400">
              .
            </Text>
          </Text>
        </Flex>
      </a>
    </Link>
  );
}
