import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import "./styles.css";

const CounterPage = () => {
  const [counter, setCounter] = useState(0);

  const _clickCounter = () => {
    setCounter((prev) => ++prev);
  };

  const _resetCounter = () => {
    setCounter(0);
  };

  return (
    <div className="counter-page">
      <div className="counter-page-number">
        <span>{counter}</span>
      </div>
      <div className="counter-page-btns">
        <Row gutter={[20, 0]}>
          <Col>
            <Button type="primary" onClick={_clickCounter}>
              Counter
            </Button>
          </Col>
          <Col>
            <Button onClick={_resetCounter}>Reset</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CounterPage;
