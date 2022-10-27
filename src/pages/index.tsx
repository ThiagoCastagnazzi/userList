import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";

import Link from "next/link";

import { RiRefreshLine, RiAccountPinBoxLine } from "react-icons/ri";

import { Header } from "../components/Header";
import { api } from "../services/axios";
import { useUsers } from "../services/hooks/useUsers";
import { queryClient } from "../services/queryClient";

export default function Home() {
  const { data, isLoading, isFetching, refetch, error } = useUsers();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function handlePrefetchUser(userId: string) {
    queryClient.prefetchQuery(["users", `${userId}`], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    });
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Flex gap={2}>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="yellow"
                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                onClick={() => refetch()}
              >
                Atualizar
              </Button>
            </Flex>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="yellow" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Telefone</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="yellow" />
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink
                            color="yellow.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Link href={`/user/${user.id}`}>
                              <Text fontWeight="bold">{user.username}</Text>
                            </Link>
                          </ChakraLink>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.phone}</Td>}
                      <Td>
                        <Link href={`/user/${user.id}`}>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="yellow"
                            leftIcon={
                              <Icon as={RiAccountPinBoxLine} fontSize="16" />
                            }
                            cursor="pointer"
                          >
                            {isWideVersion ? "Ver detalhes" : ""}
                          </Button>
                        </Link>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
