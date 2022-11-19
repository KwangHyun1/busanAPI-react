import axios from "axios";
import HeadLayout from "components/layouts/HeadLayout";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  // QueryString
  const { search } = useLocation();
  //const queryString = useMemo(() => new URLSearchParams(search), [search])

  const [attrs, setAttrs] = useState([]);

  const navigate = useNavigate();

  const getPageNo = useMemo(() => {
    const queryString = new URLSearchParams(search);
    let pageNo = "1";
    if (
      queryString.get("pageNo") != null &&
      !isNaN(queryString.get("pageNo"))
    ) {
      pageNo = queryString.get("pageNo");
    }
    if (pageNo <= 0) {
      alert("첫번째 페이지입니다.");
    }
    return pageNo;
  }, [search]);

  const getAttrs = () => {
    axios
      .get(
        `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=eEolSlH5nQ5Z%2F3QO6SKZAvdw8U9IQSaigSfbVh3N0%2BeN8F%2BEgaNiE0R89sTeGvsnuW2tlDdetxeIUr24f8Jpiw%3D%3D&pageNo=${getPageNo}&numOfRows=10&resultType=json`
      )
      .then((response) => {
        console.log(response.data.getAttractionKr.item);
        setAttrs(response.data.getAttractionKr.item);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAttrs();
  }, [getPageNo]);

  return (
    <HeadLayout>
      <div>
        <div>메인페이지</div>
        <Container>
          <Row>
            <Col>
              <Button
                className="me-3"
                variant="dark"
                onClick={() => navigate(`/?pageNo=${parseInt(getPageNo) - 1}`)}
              >
                이전
              </Button>
              <Button
                variant="dark"
                onClick={() => navigate(`/?pageNo=${parseInt(getPageNo) + 1}`)}
              >
                다음
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
            {attrs.map((value, index) => {
              return (
                <Col key={index}>
                  <Card className="mb-5">
                    <Card.Img variant="top" src={value.MAIN_IMG_THUMB} />
                    <Card.Body>
                      <Card.Title>{value.MAIN_TITLE}</Card.Title>
                      <Card.Text
                        style={{ height: "100px", overflow: "hidden" }}
                      >
                        {value.ITEMCNTNTS}
                      </Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/counter/${value.UC_SEQ}`)}
                      >
                        자세히 보기
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <button onClick={() => navigate("/counter")}>카운터로 이 동</button>
      </div>
    </HeadLayout>
  );
};

export default Main;
