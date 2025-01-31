import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import { Link } from "react-router-dom";

const StudentCard = ({ title, data, route }) => {
  const alunosAtivos =
    Array.isArray(data) && data[0] && "ativo" in data[0]
      ? data.filter((item) => item.ativo).length
      : 0;

  const alunosInativos =
    Array.isArray(data) && data[0] && "ativo" in data[0]
      ? data.filter((item) => !item.ativo).length
      : 0;

  return (
    <Card
      title={title}
      extra={
        <Link to={route}>
          <EyeOutlined />
        </Link>
      }
      style={{
        width: "20rem",
        border: "1px solid rgba(0, 0, 0, 0.10)",
        backgroundColor: "rgba(217, 217, 217, 0.10)",
      }}
    >
      <Space direction="horizontal" size={16}>
        <UserOutlined
          style={{
            color: "#000",
            backgroundColor: "#90ee90 ",
            borderRadius: 22,
            fontSize: 30,
            padding: 12,
          }}
        />
        <Statistic title={"Ativos"} value={alunosAtivos} />
        <Statistic title={"Bloqueados"} value={alunosInativos} />
      </Space>
    </Card>
  );
};

export default StudentCard;
