import {
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Modal as ModalAntd
} from 'antd';
import React, { useState } from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import Modal from '../../components/Modal/Modal';
import ProductApi from '../../api/product';

export default function Product() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const dataProducts = useQuery(['getProducts'], () =>
    ProductApi.getProducts()
  );

  const queryClient = useQueryClient();

  const createProduct = useMutation(
    (data) => ProductApi.createProduct(data),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getProducts');
      }
    }
  );

  const updateProduct = useMutation(
    (data) => ProductApi.editProduct(data),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getProducts');
      }
    }
  );

  const removeProduct = useMutation(
    (data) => ProductApi.removeProduct(data),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getProducts');
      }
    }
  );

  const showModal = () => {
    form.resetFields();
    setIsUpdate(false);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((value) => {
      if (isUpdate) {
        updateProduct.mutate(value);
      } else {
        createProduct.mutate(value);
      }
      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEditProduct = (record) => {
    form.setFieldsValue(record);
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    ModalAntd.confirm({
      title: 'Are you sure delete',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        removeProduct.mutate(productId);
      }
    });
  };
  const dataSource = [
    {
      id: '1',
      name: 'Mike',
      standardTemp: 19,
      standardHumi: 2
    },
    {
      id: '2',
      name: 'Mike',
      standardTemp: 20,
      standardHumi: 1
    }
  ];

  const columns = [
    {
      title: 'STT',
      render: (text, record, index) => {
        return index + 1;
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Standard Temperature (°C)',
      dataIndex: 'standardTemp',
      key: 'standardTemp'
    },
    {
      title: 'Standard Humidity (g/m3)',
      dataIndex: 'standardHumi',
      key: 'standardHumi'
    },
    {
      title: 'Maximum Deviation Temperature',
      dataIndex: 'maxDeviationTemp',
      key: 'maxDeviationTemp'
    },
    {
      title: 'Maximum Deviation Humidity',
      dataIndex: 'maxDeviationHumi',
      key: 'maxDeviationHumi'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              onClick={() => {
                handleEditProduct(record);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDeleteProduct(record._id)}>
              Delete
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <>
      <div className="container-header">
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
      </div>

      <Table
        dataSource={dataProducts.data}
        columns={columns}
        pagination={false}
      />
      <Modal
        title="Create product"
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          form={form}
        >
          <Form.Item label="ID" name="_id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Standard Temperature" name="standardTemp">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Standard Humidity" name="standardHumi">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="'Maximum Deviation Temperature"
            name="maxDeviationTemp"
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Maximum Deviation Humidity"
            name="maxDeviationHumi"
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
