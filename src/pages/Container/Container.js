import React, { useState } from 'react';
import { Button, Form, Input, Table, Modal as ModalAntd } from 'antd';
import './Container.css';
import Modal from '../../components/Modal/Modal';
import DrawerChart from '../../components/DrawerChart/DrawerChart';
import ContainerApi from '../../api/container';
import { useMutation, useQuery } from '@tanstack/react-query';

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

  const { isLoading, data } = useQuery(['getContainers'], () =>
    ContainerApi.getContainers()
  );

  const createContainer = useMutation(
    (data) => ContainerApi.createProduct(data),
    {
      onSuccess: () => {
        console.log('success');
      }
    }
  );

  const updateContainer = useMutation(
    (data) => ContainerApi.editContainer(data),
    {
      onSuccess: () => {
        console.log('success');
      }
    }
  );

  const removeContainer = useMutation(
    (data) => ContainerApi.removeContainer(data),
    {
      onSuccess: () => {
        console.log('success');
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
    if (isUpdate) {
      updateContainer.mutate(container);
    } else {
      createContainer.mutate(container);
    }
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
    form.setFieldsValue(record);
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
  const dataSource = [
    {
      id: '1',
      containerNo: 'Mike',
      grossWeight: 32,
      cubicMeter: '10 Downing Street',
      tareWeight: 13,
      position: 'Ha Noi',
      netWeight: 212,
      recordedTemperature: 10,
      recordedHumidity: 2
    },
    {
      id: '2',
      containerNo: 'Mike',
      grossWeight: 32,
      cubicMeter: '10 Downing Street',
      tareWeight: 13,
      position: 'Ha Noi',
      netWeight: 212,
      recordedTemperature: 10,
      recordedHumidity: 2
    }
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
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
            <Button onClick={handleDelete}>Delete</Button>
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
          <Form.Item label="Container NO" name="containerNo">
            <Input />
          </Form.Item>
          <Form.Item label="Gross Weight" name="grossWeight">
            <Input />
          </Form.Item>
          <Form.Item label="Cubic Meter" name="cubicMeter">
            <Input />
          </Form.Item>
          <Form.Item label="Tare Weight" name="tareWeight">
            <Input />
          </Form.Item>
          <Form.Item label="Net Weight" name="netWeight">
            <Input />
          </Form.Item>
          <Form.Item label="Position" name="position">
            <Input />
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
    </>
  );
}
