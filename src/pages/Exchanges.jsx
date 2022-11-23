import React from "react";
import { Row, Col, Avatar, Collapse } from "antd";
import millify from "millify";

import { useGetCryptoExchangesQuery } from "../services/cryptoApi";

import Loader from "../components/Loader";

const Exchanges = () => {
  const { data: exchanges, isFetching } = useGetCryptoExchangesQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Row style={{ paddingBottom: "20px", fontWeight: "bold" }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Price</Col>
      </Row>
      <Collapse>
        {exchanges?.data?.exchanges.map((exchange, index) => {
          return (
            <Collapse.Panel
              key={exchange.uuid}
              showArrow={false}
              header={
                <Row>
                  <Col span={6}>
                    {exchange?.rank}.{" "}
                    <Avatar
                      src={exchange?.iconUrl}
                      alt="icon"
                      style={{ marginLeft: "10px" }}
                    ></Avatar>{" "}
                    {exchange?.name}
                  </Col>
                  <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                  <Col span={6}>{exchange.numberOfMarkets}</Col>
                  <Col span={6}>${millify(exchange?.price)}</Col>
                </Row>
              }
            >
              Here we could find the description of {exchange.name} market.
              Unfortunately the API has changed and this data is no longer
              directly available. Don't worry! You can learn more{" "}
              <a
                href={exchange.coinrankingUrl}
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </>
  );
};

export default Exchanges;
