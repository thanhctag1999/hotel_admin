import {
  Box,
  Flex,
  Table,
  Spinner,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import * as React from 'react';

const columnHelper = createColumnHelper();

export default function ComplexTable(props) {
  const { tableData, isLoading } = props;
  const [sorting, setSorting] = React.useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  const navigate = useNavigate(); // Initialize navigate

  const columns = [
    columnHelper.accessor('image_hotel', {
      header: 'Hotel Image',
      cell: (info) => (
        <Image
          src={info.getValue()}
          w={{ base: '150px', sm: '150px' }}
          h={{ base: '150px', sm: '150px' }}
          borderRadius="20px"
        />
      ),
    }),
    columnHelper.accessor('hotel_name', {
      header: 'Hotel Name',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('rating', {
      header: 'Rating',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()} ⭐
        </Text>
      ),
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('typeHotel', {
      header: 'Type Hotel',
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleRowClick = (hotelId) => {
   navigate(`/admin/hotel/${hotelId}`);
  };

  return (
    <Card w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          List of Hotels
        </Text>
        <Menu />
      </Flex>
      <Box>
        {isLoading ? (
          <Flex justify="center" align="center" height="200px">
            <Spinner
              size="lg"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
            />
          </Flex>
        ) : (
          <Table variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      borderColor={borderColor}
                      onClick={header.column.getToggleSortingHandler()}
                      cursor="pointer"
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted()
                          ? header.column.getIsSorted() === 'asc'
                            ? ' 🔼'
                            : ' 🔽'
                          : null}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  onClick={() => handleRowClick(row.original.id)} // Add onClick handler
                  _hover={{ bg: 'gray.100', cursor: 'pointer' }} // Add hover effect
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id} borderColor="transparent">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Card>
  );
}
