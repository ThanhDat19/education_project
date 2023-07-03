import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../asset/css/custom.css";
import "../../asset/css/bootstrap.min.css";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import RestClient from "../../api/RestClient";
import AppUrl from "../../api/AppUrl";
import parse from 'html-react-parser';

const Analysis = () => {
  const [data, setData] = useState([]);
  const [techDesc, setTechDesc] = useState("...");

  useEffect(() => {
    RestClient.GetRequest(AppUrl.ChartData)
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error(error);
      });

    RestClient.GetRequest(AppUrl.HomeTechnical)
      .then((result) => {
        setTechDesc(result[0]['tech_description']);
      })
      .catch((error) => {
        console.error(error);
        setTechDesc("...");
      });
  }, []);

  var blue = "#051b35";

  return (
    <Container>
      <h1 className="serviceMainTitle text-center">CÔNG NGHỆ SỬ DỤNG</h1>
      <div className="bottom"></div>
      <Row>
        <Col lg={6} md={12} sm={12}>
          <ResponsiveContainer>
            <BarChart style={{ width: "100%", height: "300px" }} width={100} height={300} data={data}>
              <XAxis dataKey="x_data" />
              <Tooltip />
              <Bar dataKey="y_data" fill={blue}></Bar>
            </BarChart>
          </ResponsiveContainer>
        </Col>
        <Col lg={6} md={12} sm={12}>
          <p className="text-justify serviceDescription">
            {parse(techDesc)}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Analysis;
