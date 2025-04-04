import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

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
                    borderBottom={isActive("/reserves") ? "4px solid #87CEEB" : "none"}
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
                    borderBottom={isActive("/buildings") ? "4px solid #87CEEB" : "none"}
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
                    borderBottom={isActive("/profile") ? "4px solid #87CEEB" : "none"}
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
