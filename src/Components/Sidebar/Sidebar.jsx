import { Layout } from 'antd';
import Logo from "../Logo/Logo";
import MenuList from '../MenuList/MenuList';
import ToggleThemeButton from '../ToggleThemeButton/ToggleThemeButton';
const { Sider } = Layout;

const Sidebar = ({ darkTheme, toggleTheme }) => {
  return (
    <>
      <Sider theme={darkTheme ? "dark" : "light"}>
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
    </>
  );
};

export default Sidebar