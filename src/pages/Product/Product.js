import { Button, Form, Input, Table, Modal as ModalAntd } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Modal from '../../components/Modal/Modal';
import ProductApi from '../../api/product';

export default function Product() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { isLoading, data } = useQuery(['getProducts'], () =>
    ProductApi.getProducts()
  );

  const createProduct = useMutation(
    (data) => ProductApi.createProduct(data),
    {
      onSuccess: () => {
        console.log('success');
      }
    }
  );

  const updateProduct = useMutation(
    (data) => ProductApi.editProduct(data),
    {
      onSuccess: () => {
        console.log('success');
      }
    }
  );

  const removeProduct = useMutation(
    (data) => ProductApi.removeProduct(data),
    {
      onSuccess: () => {
        console.log('success');
      }
    }
  );

  const showModal = () => {
    form.resetFields();
    setIsUpdate(false);
    setIsModalOpen(true);
  };

  const handleOk = (product) => {
    if (isUpdate) {
      updateProduct.mutate(product);
    } else {
      createProduct.mutate(product);
    }
    setIsModalOpen(false);
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
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
            <Button onClick={handleDeleteProduct}>Delete</Button>
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
        dataSource={dataSource}
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
          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Standard Temperature" name="standardTemp">
            <Input />
          </Form.Item>
          <Form.Item label="Standard Humidity" name="standardHumi">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
