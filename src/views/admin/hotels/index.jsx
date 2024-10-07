import { Box, SimpleGrid, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, useDisclosure } from "@chakra-ui/react";
import ComplexTable from "views/admin/hotels/components/ComplexTable";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [tableDataComplex, setTableDataComplex] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api-tltn.onrender.com/api/v1/hotel/list-all");
        if (response.data.status === 200) {
          setTableDataComplex(response.data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching the hotel data: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreate = () => {
    console.log("Hotel Name:", name);
    console.log("Hotel Description:", description);
    onClose();
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid mb="20px" columns={{ sm: 1, md: 1 }} spacing={{ base: "20px", xl: "20px" }}>
        <Flex align="center" justifyContent="end">
          <Button variant="brand" fontWeight="500" w="15%" h="50" mb="24px" onClick={onOpen}>
            Add new hotel
          </Button>
        </Flex>
        <ComplexTable tableData={tableDataComplex} isLoading={isLoading} />
      </SimpleGrid>

      {/* Modal for adding a new hotel */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Hotel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="Hotel Name" mb="4" value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea placeholder="Hotel Description" mb="4" value={description} onChange={(e) => setDescription(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreate}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
