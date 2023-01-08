import React, { useState } from 'react';
import { Button, Layout, Table } from 'antd';
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
    title: 'tareWeight (kg)',
    dataIndex: 'tareWeight',
    key: 'tareWeight'
  },
  {
    title: 'netWeight (kg)',
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
  }
];
export default function Container() {
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
    <Layout>
      <div className="container-header">
        <Button type="primary" onClick={showModal}>
          Create
        </Button>
      </div>
      <Modal
        title="Create container"
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table dataSource={dataSource} columns={columns} />
    </Layout>
  );
}
