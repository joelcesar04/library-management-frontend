import { Menu } from "antd"
import { HomeOutlined, ReadOutlined, UserOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const MenuList = ({ darkTheme }) => {
  return (
    <Menu theme={darkTheme ? "dark" : "light"} className="menu-bar">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Página Inicial</Link>
      </Menu.Item>
      <Menu.SubMenu key="books" icon={<ReadOutlined />} title="Livros">
        <Menu.Item key="book-1">
          <Link to="/books">Listar Livros</Link>
        </Menu.Item>
        <Menu.Item key="book-2">Cadastrar Empréstimo</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="author" icon={<UserOutlined />}>
        <Link to="/authors">Autores</Link>
      </Menu.Item>
      <Menu.Item key="students" icon={<UserOutlined />}>
        <Link to="/students">Alunos</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuList