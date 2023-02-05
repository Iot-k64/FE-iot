import React, { useState } from 'react';
import { Button, Form, Input, Layout, Table } from 'antd';
import './Container.css';
import Modal from '../../components/Modal/Modal';

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
    recordedHumidity: 2,
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
    title: 'Recorded Temperature (C°)',
    dataIndex: 'recordedTemperature',
    key: 'recordedTemperature'
  },
  {
    title: 'Recorded Humidity',
    dataIndex: 'recordedHumidity',
    key: 'recordedHumidity'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => {
      return (
        <div style={{'display': 'flex'}}>
          <Button>Edit</Button>
          <Button>Delete</Button>
        </div>
      )
    }
  }
];
export default function   Container() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="container-header">
        <Button  type="primary" onClick={showModal}>
          Create
        </Button>
      </div>
      
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Create container"
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       <Form 
       labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}>
          <Form.Item 
            label="Container NO"
            name="containerNo"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gross Weight"
            name="grossWeight"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cubic Meter"
            name="cubicMeter"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tare Weight"
            name="tareWeight"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Net Weight"
            name="netWeight"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Recorded Temperature"
            name="recordedTemperature"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Recorded Humidity"
            name="recordedHumidity"
          >
            <Input />
          </Form.Item>
       </Form>
      </Modal>
    </>
  );
}
