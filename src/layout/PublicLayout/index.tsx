import React from "react";
import "./styles.css";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";

interface PublicLayoutProps {
  children: any;
}

const PublicLayout = (props: PublicLayoutProps) => {
  return (
    <div className="app-page">
      <div className="app-page-header">
        <Row gutter={[20, 0]}>
          <Col>
            <Link to="/counter">
              <Button className="app-page-btn">Counter</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/employees">
              <Button className="app-page-btn">Employees</Button>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="app-page-content">{props.children}</div>
    </div>
  );
};

export default PublicLayout;
