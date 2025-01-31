import { Spin } from 'antd';

const Loading = ({ tip }) => {
  return (
    <>
      <Spin
        tip={tip}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      />
    </>
  );
};

export default Loading;