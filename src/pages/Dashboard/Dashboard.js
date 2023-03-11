import { Card, Col, Row } from 'antd';
import React from 'react';
import './Dashboard.css';
import {
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import ContainerApi from '../../api/container';
export default function Dashboard() {
  const dataContainer = useQuery(
    ['getContainers'],
    () => ContainerApi.getContainers(),
    {
      keepPreviousData: true
    }
  );
  const queryClient = useQueryClient();
  return (
    <div style={{ marginTop: '20px' }}>
      {' '}
      <Row gutter={16}>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#2AA2B8', color: '#fff' }}
          >
            <div className="large-text">{dataContainer.data?.filter(item => (item.status === 1 || item.status === 2 || item.status === 3)).length || 0}</div>
            <h4>Number of truck is active</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#FBC108', color: '#000' }}
          >
            <div className="large-text">{dataContainer.data?.filter(item => item.status === 3).length || 0}</div>
            <h4>Number of truck is warning</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#DC3545', color: '#fff' }}
          >
            <div className="large-text">{dataContainer.data?.filter(item => item.status === 4).length || 0}</div>
            <h4>Number of truck is inactive</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#28A745', color: '#fff' }}
          >
            <div className="large-text">{dataContainer.data?.filter(item => item.status === 2).length || 0}</div>
            <h4>Number of truck is safe</h4>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
