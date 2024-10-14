import { Box, SimpleGrid, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import ComplexTable from "views/admin/comments/components/ComplexTable";
import { columnsDataComplex } from "views/admin/comments/variables/columnsData";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [tableDataComplex, setTableDataComplex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/comment/getAll");
      setIsLoading(true);
      if (response.data.status === 200) {
        setTableDataComplex(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching the comments data: ", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid mb="20px" columns={{ sm: 1, md: 1 }} spacing={{ base: "20px", xl: "20px" }}>
        <ComplexTable columnsData={columnsDataComplex} tableData={tableDataComplex} isLoading={isLoading} refreshTable={() => fetchData()} />
      </SimpleGrid>
    </Box>
  );
}