import { Card, Col, Row } from 'antd';
import React from 'react';
import './Dashboard.css';

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
            <div className="large-text">80</div>
            <h4>Number of truck is active</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#FBC108', color: '#000' }}
          >
            <div className="large-text">80</div>
            <h4>Number of truck is warning</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#DC3545', color: '#fff' }}
          >
            <div className="large-text">80</div>
            <h4>Number of truck is inactive</h4>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            hoverable
            style={{ backgroundColor: '#28A745', color: '#fff' }}
          >
            <div className="large-text">80</div>
            <h4>Number of truck is safe</h4>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
