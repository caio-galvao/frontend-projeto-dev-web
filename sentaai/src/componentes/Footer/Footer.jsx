import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

return (
    <Box
        as="footer"
        position="fixed"
        bottom={0}
        width="100%"
        bg="gray.100"
        color="gray.800"
        py={2}
        boxShadow="0 -2px 5px rgba(0, 0, 0, 0.1)"
    >
        <Flex justify="space-around" align="center">
            <Button
                variant="ghost"
                color="gray.800"
                _hover={{ bg: "gray.300" }}
                onClick={() => navigate("/reserves")}
            >
                <Image
                    src="img/reserve.svg"
                    alt="Reserva"
                    boxSize="24px"
                />
            </Button>
            <Button
                variant="ghost"
                color="gray.800"
                _hover={{ bg: "gray.300" }}
                onClick={() => navigate("/buildings")}
            >
                <Image
                    src="img/building.svg"
                    alt="Buildings"
                    boxSize="24px"
                />
            </Button>
            <Button
                variant="ghost"
                color="gray.800"
                _hover={{ bg: "gray.300" }}
                onClick={() => navigate("/profile")}
            >
                <Image
                    src="img/profile.svg"
                    alt="Profile"
                    boxSize="24px"
                />
            </Button>
        </Flex>
    </Box>
);
};

export default Footer;
