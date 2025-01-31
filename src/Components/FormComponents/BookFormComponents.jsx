import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Button,
  Row,
  Col,
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import locale from "antd/es/date-picker/locale/pt_BR";
const { TextArea } = Input;

const BookFormComponents = ({
  authors,
  categories,
  autorId,
  categoriaId,
  setIsAuthorModalOpen,
  setIsCategoryModalOpen,
  handleCategoryChange,
  handleAuthorChange
}) => {  
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Título"
            name="titulo"
            rules={[
              { required: true, message: "O título do livro é obrigatório." },
              {
                min: 1,
                max: 100,
                message: "O título do livro deve ter entre 1 e 100 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Editora"
            name="editora"
            rules={[
              {
                required: true,
                message: "A editora do livro é obrigatória.",
              },
              {
                min: 1,
                max: 100,
                message: "O nome da editora deve ter entre 1 e 100 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Edição"
            name="edicao"
            rules={[
              {
                max: 50,
                message: "O campo edição deve ter no máximo 50 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[
              {
                required: true,
                message: "O ISBN do livro é obrigatório.",
              },
              {
                min: 10,
                max: 50,
                message: "O ISBN do livro deve ter entre 10 e 50 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Páginas"
            name="paginas"
            rules={[
              {
                required: true,
                type: "number",
                min: 1,
                message: "O número de páginas deve ser maior que zero.",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Idioma"
            name="idioma"
            rules={[
              {
                required: true,
                message: "O idioma do livro é obrigatório.",
              },
              {
                min: 1,
                max: 50,
                message: "O idioma do livro deve ter entre 1 e 50 caracteres.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Dt. de Publ."
            name="dataPublicacao"
            rules={[
              {
                required: true,
                type: "date",
                message: "Informe uma data válida para a publicação do livro.",
              },
            ]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              locale={locale}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Disponível"
            name="disponivel"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Autor"
            name="autor"
            rules={[
              {
                required: true,
                message: "Selecione um autor",
              },
            ]}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Select onChange={handleAuthorChange} value={autorId}>
                {Array.isArray(authors) &&
                  authors.map((author) => {
                    return (
                      <Select.Option
                        key={author.autorId}
                        value={author.autorId}
                      >
                        {author.nome}
                      </Select.Option>
                    );
                  })}
              </Select>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginLeft: 8 }}
                onClick={setIsAuthorModalOpen}
              />
            </div>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Categoria"
            name="categoria"
            rules={[
              {
                required: true,
                message: "Selecione uma categoria",
              },
            ]}
          >
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Select onChange={handleCategoryChange} value={categoriaId}>
                {Array.isArray(categories) &&
                  categories.map((category) => {
                    return (
                      <Select.Option
                        key={category.categoriaId}
                        value={category.categoriaId}
                      >
                        {category.nome}
                      </Select.Option>
                    );
                  })}
              </Select>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginLeft: 8 }}
                onClick={setIsCategoryModalOpen}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Descrição"
            name="descricao"
            rules={[
              {
                max: 500,
                message:
                  "A descrição do livro não pode exceder 500 caracteres.",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default BookFormComponents