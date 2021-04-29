import React from "react";
import "./styles.css";
import { Row, Col, Button } from "antd";
import { Link, useLocation } from "react-router-dom";

const ROUTE_PATH = {
  COUNTER: "/counter",
  EMPLOYEES: "/employees",
};

const ROUTES = [
  {
    path: ROUTE_PATH.COUNTER,
    routeName: "Counter",
  },
  {
    path: ROUTE_PATH.EMPLOYEES,
    routeName: "Employees",
  },
];
interface PublicLayoutProps {
  children: any;
}

const PublicLayout = (props: PublicLayoutProps) => {
  const location = useLocation();

  const getBtnType = (routePath: string) => {
    return location.pathname === routePath ? "primary" : "default";
  };

  return (
    <div className="app-page">
      <div className="app-page-header">
        <Row gutter={[20, 0]}>
          {ROUTES.map((el) => (
            <Col key={el.path}>
              <Link to={el.path}>
                <Button className="app-page-btn" type={getBtnType(el.path)}>
                  {el.routeName}
                </Button>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <div className="app-page-content">{props.children}</div>
    </div>
  );
};

export default PublicLayout;
