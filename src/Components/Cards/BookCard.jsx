import { EyeOutlined, ReadOutlined } from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import { Link } from "react-router-dom";

const BookCard = ({ title, data, route }) => {
  const dataCounts = Array.isArray(data) ? data.length : 0;

  const livrosDisponiveis =
    Array.isArray(data) && data[0] && "disponivel" in data[0]
      ? data.filter((item) => item.disponivel).length
      : 0;

  const livrosEmprestados =
    Array.isArray(data) && data[0] && "disponivel" in data[0]
      ? data.filter((item) => !item.disponivel).length
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
        width: "26rem",
        border: "1px solid rgba(0, 0, 0, 0.10)",
        backgroundColor: "rgba(217, 217, 217, 0.10)",
      }}
    >
      <Space direction="horizontal" size={16}>
        <ReadOutlined
          style={{
            color: "#000",
            backgroundColor: "#ADD8E6",
            borderRadius: 22,
            fontSize: 30,
            padding: 12,
          }}
        />
        <Statistic title={"Cadastrados"} value={dataCounts} />
        <Statistic title={"Disponíveis"} value={livrosDisponiveis} />
        <Statistic title={"Emprestados"} value={livrosEmprestados} />
      </Space>
    </Card>
  );
};

export default BookCard;
