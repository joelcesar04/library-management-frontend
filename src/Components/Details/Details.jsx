import { Link } from "react-router-dom";
import { Descriptions, Button } from "antd";

const Details = ({ detailTitle, title, items }) => {
  return (
    <>
      <div>
        <h3 className="title">{detailTitle}</h3>
        <h2 className="title">{title}</h2>
      </div>
      <Descriptions layout="vertical" bordered items={items} />
      <Button style={{ marginTop: "15px" }} ghost type="primary">
        <Link to={"/books"}>Voltar</Link>
      </Button>
    </>
  );
};

export default Details;
