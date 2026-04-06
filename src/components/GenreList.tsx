import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
  collapsed: boolean;
}

const GenreList = ({
  selectedGenre,
  onSelectGenre,
  collapsed,
}: Props) => {
  const { data, isLoading, error } = useGenres();

  if (error) return null;

  if (isLoading)
    return (
      <Box p={5}>
        <Spinner />
      </Box>
    );

  return (
    <Box
      bg="#020617"
      color="white"
      h="calc(100vh - 80px)" 
      p={collapsed ? 2 : 5}
      w="100%"
      transition="all 0.3s ease"
      overflowY="auto"
    >
      {/* Logo */}
      <Heading
        fontSize="md"
        mb={6}
        textAlign={collapsed ? "center" : "left"}
      >
        {collapsed ? "🎮" : "🎮 GameHub"}
      </Heading>

      {/* Title */}
      {!collapsed && (
        <Text fontSize="lg" mb={3} color="gray.400">
          Genres
        </Text>
      )}

      <List spacing={2}>
        {data.map((genre) => (
          <ListItem key={genre.id}>
            <HStack
              p={2}
              borderRadius="8px"
              transition="all 0.2s"
              cursor="pointer"
              align="center"
              _hover={{
                bg: "gray.700",
                transform: collapsed ? "none" : "translateX(5px)",
              }}
              bg={
                genre.id === selectedGenre?.id
                  ? "blue.500"
                  : "transparent"
              }
              onClick={() => onSelectGenre(genre)}
            >
              <Image
                boxSize="32px"
                borderRadius="8px"
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />

              {/* Text hidden when collapsed */}
              {!collapsed && (
                <Button
                  whiteSpace="normal"
                  textAlign="left"
                  fontWeight={
                    genre.id === selectedGenre?.id
                      ? "bold"
                      : "normal"
                  }
                  fontSize="sm"
                  variant="ghost"
                  color="white"
                  justifyContent="flex-start"
                  _hover={{ bg: "transparent" }}
                >
                  {genre.name}
                </Button>
              )}
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default GenreList;