import { HStack, Image } from '@chakra-ui/react';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import SearchInput from './SearchInput';

interface Props {
  onSearch: (searchText: string) => void;
  onLogoClick?: () => void; // ✅ NEW
}

const NavBar = ({ onSearch, onLogoClick }: Props) => {
  return (
    <HStack padding="10px" gap={4}>
      
      {/* 🔥 Clickable Logo */}
      <Image
        src={logo}
        boxSize="60px"
        cursor="pointer"
        onClick={onLogoClick}
      />

      <SearchInput onSearch={onSearch} />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;