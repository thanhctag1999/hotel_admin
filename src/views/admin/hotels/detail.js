import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Image,
  Stack,
  Button,
  Icon,
  Center,
 Spinner} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function HotelDetails() {
  const { hotelId } = useParams(); // Get hotelId from route params
  const [hotel, setHotel] = useState(null); // State to store the fetched hotel data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    // Fetch hotel data from the API
    const fetchHotel = async () => {
      try {
        const response = await axios.get(
          `https://api-tltn.onrender.com/api/v1/hotel/findById/${hotelId}`,
        );
        if (response.status === 200) {
          setHotel(response.data.data); // Set the hotel data
          setLoading(false);
        } else {
          throw new Error('Failed to fetch hotel details');
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Text fontSize="lg" color="red.500">
        {error}
      </Text>
    );
  }

  if (!hotel) {
    return (
      <Text fontSize="lg" color="red.500">
        Hotel not found
      </Text>
    );
  }

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt="100px"
      p={5}
      boxShadow="lg"
      borderRadius="md"
      bg="white"
    >
      <Image
        src={hotel.imageHotel}
        alt={hotel.hotelName}
        borderRadius="md"
        boxShadow="md"
        objectFit="cover"
        w="full"
        h="300px"
      />
      <Stack spacing={4} mt={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {hotel.hotelName}
        </Text>
        <Text fontSize="md" color="gray.600">
          {hotel.description}
        </Text>
        <Text fontSize="lg" color="blue.600" fontWeight="bold">
          {hotel.rating} ⭐
        </Text>
        <Text fontSize="sm" color="gray.500">
          Location: {hotel.location}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Address: {hotel.address}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Type: {hotel.typeHotel}
        </Text>
        <Button mt={4} colorScheme="red" >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}
