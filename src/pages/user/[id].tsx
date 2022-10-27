import {
  Box,
  Flex,
  Link as ChakraLink,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  Icon,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";

import { RiRefreshLine } from "react-icons/ri";

import { useQuery } from "@tanstack/react-query";

import { GetServerSideProps } from "next";

import { ParsedUrlQuery } from "querystring";

import { Header } from "../../components/Header";

import { api } from "../../services/axios";

type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

export default function User({ id }: IParams) {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function getUser(id: string) {
    const response = await api.get(`users/${id}`);
    return response.data;
  }

  const { data, isLoading, refetch, isFetching } = useQuery(
    ["users", id],
    () => getUser(id),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8">
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="yellow"
              leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
              onClick={() => refetch()}
            >
              Atualizar
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Button>
          </Flex>
          <Table colorScheme="whiteAlpha" marginTop={5}>
            <Thead>
              <Tr>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Nome</Th>}
                <Th>E-mail</Th>
                <Th>Cidade</Th>
                {isWideVersion && <Th>Telefone</Th>}
              </Tr>
            </Thead>

            <Tbody>
              <Tr key={data?.id}>
                <Td>
                  <Box>
                    <Text color="yellow.400" fontWeight="bold">
                      {data?.username}
                    </Text>
                  </Box>
                </Td>
                {isWideVersion && (
                  <Td textTransform="capitalize">
                    {data?.name.firstname} {data?.name.lastname}
                  </Td>
                )}
                <Td>{data?.email}</Td>
                <Td textTransform="capitalize">{data?.address.city}</Td>
                {isWideVersion && <Td>{data?.phone}</Td>}
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as IParams;

  return {
    props: {
      id,
    },
  };
};
