import React, { useEffect, useState } from 'react';

import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { Row, Col, Card, Pagination } from 'antd';
const { Meta } = Card;

function Home() {
  const [trendList, setTrendList] = useState([]);

  let { pageNumber } = useParams();
  const history = useHistory();

  const getTrending = async (pageNum) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_TMDB_KEY}&page=${pageNum}`
      );
      setTrendList([...response.data.results]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const pageNum = typeof pageNumber === 'undefined' || Number(pageNumber) > 1000 ? 1 : Number(pageNumber);
    getTrending(pageNum);
  }, [pageNumber]);

  return (
    <React.Fragment>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Row gutter={[16, 16]} justify='center'>
            <Col span='24'></Col>
            {trendList.map((movie) => (
              <Col xs={{ span: 12 }} lg={{ span: 6 }}>
                <Link to={`/details/${movie.media_type + '/' + movie.id}`}>
                  <Card
                    hoverable
                    style={{ width: 'auto' }}
                    cover={
                      <img
                        alt={movie.name}
                        src={
                          'https://image.tmdb.org/t/p/w300' + movie.poster_path
                        }
                      />
                    }
                  >
                    <Meta
                      title={movie.name || movie.title}
                      description={movie.first_air_date || movie.release_date}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
            <Col>
              <Pagination
                defaultCurrent={pageNumber === undefined ? 1 : pageNumber}
                total={1000}
                pageSize={1}
                showSizeChanger={false}
                onChange={(pageNumber, pageSize) =>
                  history.push('/page/' + pageNumber)
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Home;
