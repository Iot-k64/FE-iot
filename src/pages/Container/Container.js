import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Modal as ModalAntd,
  Select,
  Spin
} from 'antd';
import './Container.css';
import Modal from '../../components/Modal/Modal';
import DrawerChart from '../../components/DrawerChart/DrawerChart';
import ContainerApi from '../../api/container';
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import ProductApi from '../../api/product';

const dataTemper = [
  {
    name: 'Installation & Developers',
    data: [
      43934,
      48656,
      65165,
      81827,
      112143,
      142383,
      171533,
      165174,
      155157,
      161454,
      154610
    ]
  }
];

export default function Container() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [status, setStatus] = useState(1);

  const dataContainer = useQuery(
    ['getContainers'],
    () => ContainerApi.getContainers(status),
    {
      keepPreviousData: true
    }
  );

  const dataProducts = useQuery(
    ['getProducts'],
    () => ProductApi.getProducts(),
    {
      keepPreviousData: true
    }
  );

  const queryClient = useQueryClient();

  const createContainer = useMutation(
    (data) => ContainerApi.createContainer(data),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getAllQuestion');
      }
    }
  );

  const updateContainer = useMutation(
    (data) => ContainerApi.editContainer(data),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getAllQuestion');
      }
    }
  );

  const removeContainer = useMutation(
    (data) => ContainerApi.removeContainer(data),
    {
      onSuccess: () => {
        console.log('success');
        queryClient.invalidateQueries('getAllQuestion');
      }
    }
  );

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    form.resetFields();
    setIsUpdate(false);
    setIsModalOpen(true);
  };

  const handleOk = (container) => {
    form.validateFields().then((value) => {
      if (isUpdate) {
        console.log(value);
        updateContainer.mutate(value);
      } else {
        createContainer.mutate(value);
      }
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = ({ record, rowIndex }) => {
    return {
      onDoubleClick: (event) => {
        showDrawer();
      }
    };
  };

  const handleEditContainer = (record) => {
    form.setFieldsValue({ ...record, product: record.product._id });
    setIsUpdate(true);
    setIsModalOpen(true);
  };

  const handleDelete = (containerId) => {
    ModalAntd.confirm({
      title: 'Are you sure delete',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        removeContainer.mutate(containerId);
      }
    });
  };
  const columns = [
    {
      title: 'Container No',
      dataIndex: 'containerNo',
      key: 'containerNo'
    },
    {
      title: 'Gross Weight (kg)',
      dataIndex: 'grossWeight',
      key: 'grossWeight'
    },
    {
      title: 'Cubic Meter (m)',
      dataIndex: 'cubicMeter',
      key: 'cubicMeter'
    },
    {
      title: 'Tare Weight (kg)',
      dataIndex: 'tareWeight',
      key: 'tareWeight'
    },
    {
      title: 'Net Weight (kg)',
      dataIndex: 'netWeight',
      key: 'netWeight'
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record, index) => {
        return record.product.name
      }
    },
    ,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              onClick={() => {
                handleEditContainer(record);
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(record._id)}>
              Delete
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <Spin
      spinning={dataContainer.isLoading || dataProducts.isLoading}
    >
      <div className="container-header">
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
        <Select
          options={[
            {
              label: "Đang hoạt động",
              value: 1
            }, {
              label: "Không hoạt động",
              value: 0
            }
          ]}
          defaultValue={1}
          onChange={(value) => {
            setStatus(value);
          }}
        />
      </div>

      <Table
        dataSource={dataContainer.data?.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        onRow={handleClick}
        pagination={false}
      />
      <Modal
        title="Create container"
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
          <Form.Item label="Container NO" name="containerNo">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Gross Weight" name="grossWeight">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Cubic Meter" name="cubicMeter">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Tare Weight" name="tareWeight">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Net Weight" name="netWeight">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Position" name="position">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Product" name="product">
            <Select
              options={
                dataProducts.data
                  ? dataProducts.data.map((item) => ({
                    label: item.name,
                    value: item._id
                  }))
                  : []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      {open && (
        <DrawerChart
          closeDrawer={onClose}
          showDrawer={open}
          dataHumi={dataTemper}
          dataTemper={dataTemper}
        />
      )}
    </Spin>
  );
}
