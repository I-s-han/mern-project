import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, Text, HStack, IconButton, Image, useColorModeValue, useToast, Modal, ModalOverlay, ModalContent, ModalHeader,useDisclosure, ModalCloseButton, ModalBody, Input, VStack, ModalFooter, Button } from '@chakra-ui/react'
import { useProductStore } from '../store/product';
import { useState } from 'react';


const ProductCard = ({product}) => {
    const [udpatedProduct, setUpdatedProduct] = useState(product)
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");


    const toast = useToast()
     const {deleteProduct, updateProduct } =useProductStore()
     const { isOpen, onOpen, onClose } = useDisclosure()
     const handleDeleteProduct = async (pid) =>{
        const {success, message} = await deleteProduct(pid)
        if(!success){
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }else{
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
     }

     const handleUpdateProduct = async (pid, udpatedProduct) =>{
      const {success, message} = await updateProduct(pid, udpatedProduct);
        onClose();
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }else{
            toast({
                title : "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
     }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform: "translateY(-5px)", shadow: "x1"}}
    bg={bg}
    cursor='pointer'
    >
        <Image src={product.image} alt={product.name} h ={48} w = 'full' objectFit='cover'/>

<Box
p={4}
>
    <Heading as = 'h3' size='md' mb={2}>
        {product.name}

    </Heading>
    <Text fontWeight = 'bold' fontSize='x1' color={textColor} mb={4}>
        ${product.price}

    </Text>
    <HStack spacing={2}>
        <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme='blue'/>
        <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>

    </HStack>

</Box>
<Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader>
            Update Product
        </ModalHeader>
        <ModalCloseButton/>
   
<ModalBody>
    
<VStack spacing={4}>
            <Input
            placeholder='Product Name'
            name='name'
            value={udpatedProduct.name}
            onChange={(e) => setUpdatedProduct({...udpatedProduct, name: e.target.value})}
            
            />
            <Input
            placeholder='Price'
            name='price'
            type='number'
            value={udpatedProduct.price}
            onChange={(e) => setUpdatedProduct({...udpatedProduct, price: e.target.value})}
           
            />
            <Input
            placeholder='Image URL'
            name='image'
            value={udpatedProduct.image}
            onChange={(e) => setUpdatedProduct({...udpatedProduct, image: e.target.value})}
            />
            </VStack>
</ModalBody>

<ModalFooter>
    <Button colorScheme='blue' mr={3} onClick={()=> handleUpdateProduct(product._id, udpatedProduct)} >
        Update

    </Button>
    <Button variant='ghost' onClick={onClose}>
        Cancel 

    </Button>
</ModalFooter>
</ModalContent>
</Modal>
    </Box>
  )
}

export default ProductCard
