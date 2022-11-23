import { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "../components/Loader";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const count = simplified ? 6 : 12;

  const { data: news, isFetching: newsFetching } = useGetNewsQuery({
    newsCategory: newsCategory,
    count,
  });

  const { data } = useGetCryptosQuery(100);

  if (newsFetching) return <Loader />;

  if (!news?.value) return "No news...";

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            value={newsCategory}
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => {
              return (
                // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                option.children.toLowerCase().includes(input.toLowerCase())
              );
            }}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin, index) => (
              <Option value={coin.name} key={index}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {news.value.map((data, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={data.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {data.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={data.image?.thumbnail?.contentUrl || demoImg}
                  alt={data.name}
                ></img>
              </div>
              <p>
                {data.description > 100
                  ? `${data.description.substring(0, 100)}...`
                  : data.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      data.provider[0]?.image?.thumbnail?.contentUrl || demoImg
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {data.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(data.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
