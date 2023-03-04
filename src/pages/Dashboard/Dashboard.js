import { Card, Col, Row } from 'antd';
import React from 'react';

export default function Dashboard() {
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
            <h1>80</h1>
            <h4>Số lượng xe đang hoạt động</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#FBC108', color: '#000' }}
          >
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#DC3545', color: '#fff' }}
          >
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#28A745', color: '#fff' }}
          >
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}
