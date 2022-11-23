import { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Sciagam...");
    if (!isFetching) {
      setCryptos(cryptosList?.data?.coins);
    }
  }, [isFetching, cryptosList]);

  useEffect(() => {
    if (cryptos) {
      const filtered = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCryptos(filtered);
      console.log(filtered);
    }
  }, [searchTerm, cryptos]);

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.trim())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {filteredCryptos?.map((currency, index) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={index}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
