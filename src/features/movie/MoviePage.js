import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../user/userSlice';

import { useParams, useHistory } from 'react-router-dom';
import { Row, Col, Image, Typography, Button } from 'antd';

import axios from 'axios';
import './MoviePage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ReactPlayer from 'react-player';

const { Title, Paragraph } = Typography;

function MoviePage() {
  const { format, id } = useParams();
  const [programData, setProgramData] = useState('');
  const [isAddingShow, setIsAddingShow] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);
  const [imagesPoster, setImagesPoster] = useState([])

  const dispatch = useDispatch();
  const history = useHistory();

  const getProgramData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${format}/${id}?api_key=92a2777ea629eeeb7dbc832d18f0caa2&append_to_response=videos,images`
      );
      setProgramData(response.data);
      setImagesPoster([...response.data.images.backdrops])
    } catch (error) {
      console.error(error);
    }
  };

  const checkIfShowInDB = async () => {
    try {
      const response = await axios.get(
        `https://demo-store-backend.herokuapp.com/checkshow?showid=${id}`,
        { withCredentials: true }
      );
      setIsAdded(response.data.isItLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const addShowToAccount = async () => {
    if (!isLogin) {
      return history.push('/login');
    }
    try {
      setIsAddingShow(true);
      const response = await axios.post(
        'https://demo-store-backend.herokuapp.com/addshow/',
        {
          showid: id,
          format: format,
        },
        { withCredentials: true }
      );
      if (response.data.showaddstatus) {
        setIsAddingShow(false);
      }
    } catch (error) {
      console.error(error);
      alert('ERROR');
    }
  };

  useEffect(() => {
    dispatch(checkLogin());
    getProgramData();
    checkIfShowInDB();
  }, []);

  useEffect(() => {
    dispatch(checkLogin());
    checkIfShowInDB();
  }, [isAddingShow]);

  return (
    <React.Fragment>
      <Row className='moviepage-parent-row'>
        <div
          className='moviepage-parent-row-div'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${programData.backdrop_path})`,
          }}
        ></div>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Row gutter={[8, 8]} style={{ padding: '20px 0 20px 0' }}>
            <Col xs={{ span: 10, offset: 1 }} md={{ span: 12, offset: 0 }}>
              <Image
                className='moviepage-parent-poster'
                style={{ borderRadius: '15px' }}
                height='100%'
                width='100%'
                src={`https://image.tmdb.org/t/p/w500/${programData.poster_path}`}
              />
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 12 }}>
              <Details
                programData={programData}
                isAdded={isAdded}
                addShowToAccount={addShowToAccount}
                isAddingShow={isAddingShow}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify='center'>
        <Col xs={{ span: 22 }} md={{ span: 0 }}>
          <Details
            programData={programData}
            isAdded={isAdded}
            addShowToAccount={addShowToAccount}
            isAddingShow={isAddingShow}
          />
        </Col>
      </Row>

      <Row
        style={{
          flexWrap: 'nowrap',
          overflow: 'scroll',
          overflowY: 'hidden',
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            imagesPoster[1] ? imagesPoster[1].file_path : '' })`,
        }}
      >
        {programData.videos
          ? programData.videos.results.map((video) => (
              <Col
                style={{ padding: '8px 0 8px 8px' }}
                xs={{ span: 20 }}
                md={{ span: 22 }}
                lg={{ span: 11 }}
                xxl={{ span: 7 }}
              >
                <ReactPlayer
                  width='100%'
                  muted={true}
                  url={`https://www.youtube.com/watch?v=${
                    video.key ? video.key : 'dQw4w9WgXcQ'
                  }`}
                />
              </Col>
            ))
          : ''}
      </Row>
    </React.Fragment>
  );
}

function Details(props) {
  const programData = props.programData;
  return (
    <>
      <Title>{programData.title || programData.name}</Title>
      <Paragraph strong='true'>{programData.overview}</Paragraph>
      <Paragraph strong='true'>{`Tag:${programData.tagline}`}</Paragraph>
      <Paragraph strong='true'>{`Status:${programData.status}`}</Paragraph>
      <Title level={4}>{`Release Date:${
        programData.release_date || programData.first_air_date
      }`}</Title>
      <Title level={4}>{`Network:${
        programData.networks ? programData.networks[0].name : ''
      }`}</Title>
      <Button
        hidden={props.isAdded}
        onClick={() => props.addShowToAccount()}
        type='primary'
        size='large'
        loading={props.isAddingShow}
      >
        Like
      </Button>
      <Button hidden={!props.isAdded} disabled type='primary' size='large'>
        You Liked This Show/Movie !!
      </Button>
    </>
  );
}

export default MoviePage;
