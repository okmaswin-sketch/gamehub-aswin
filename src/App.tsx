import {
  Box,
  Flex,
  Grid,
  GridItem,
  Show,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import GameGrid from "./components/GameGrid";
import GameHeading from "./components/GameHeading";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";

import { Platform } from "./hooks/useGames";
import { Genre } from "./hooks/useGenres";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

  const [collapsed, setCollapsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* 📱 Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#020617">
          <DrawerCloseButton />
          <Box mt={10} p={3}>
            <GenreList
              collapsed={false}
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) => {
                setGameQuery({ ...gameQuery, genre });
                onClose();
              }}
            />
          </Box>
        </DrawerContent>
      </Drawer>

      {/* 💻 Desktop Layout */}
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: `${collapsed ? "80px" : "250px"} 1fr`,
        }}
        transition="0.3s"
      >
        {/* ✅ Navbar */}
        <GridItem area="nav">
          <NavBar
            onSearch={(searchText) =>
              setGameQuery({ ...gameQuery, searchText })
            }

            // 🔥 LOGO CLICK → MOBILE DRAWER
            onLogoClick={() => {
              if (window.innerWidth < 992) {
                onOpen(); // mobile
              } else {
                setCollapsed(!collapsed); // desktop toggle
              }
            }}
          />
        </GridItem>

        {/* Sidebar (Desktop) */}
        <Show above="lg">
          <GridItem area="aside">
            <GenreList
              collapsed={collapsed}
              selectedGenre={gameQuery.genre}
              onSelectGenre={(genre) =>
                setGameQuery({ ...gameQuery, genre })
              }
            />
          </GridItem>
        </Show>

        {/* Main */}
        <GridItem area="main">
          <Box pl={{ base: 2, lg: 4 }} transition="0.3s">
            <GameHeading gameQuery={gameQuery} />

            <Flex mb={5} wrap="wrap" gap={3}>
              <PlatformSelector
                selectedPlatform={gameQuery.platform}
                onSelectPlatform={(platform) =>
                  setGameQuery({ ...gameQuery, platform })
                }
              />

              <SortSelector
                sortOrder={gameQuery.sortOrder}
                onSelectSortOrder={(sortOrder) =>
                  setGameQuery({ ...gameQuery, sortOrder })
                }
              />
            </Flex>

            <GameGrid gameQuery={gameQuery} />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}

export default App;