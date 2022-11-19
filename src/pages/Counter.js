import axios from "axios";
import Footer from "components/commons/Footer";
import HeadlessLayout from "components/layouts/HeadlessLayout";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Counter = () => {
  // pathVariable
  const { seq } = useParams();
  const navigate = useNavigate();
  const [attrs, setAttrs] = useState([]);

  const getAttrs = () => {
    axios
      .get(
       // `https://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=eEolSlH5nQ5Z%2F3QO6SKZAvdw8U9IQSaigSfbVh3N0%2BeN8F%2BEgaNiE0R89sTeGvsnuW2tlDdetxeIUr24f8Jpiw%3D%3D&pageNo=${getPageNo}&numOfRows=10&resultType=json`
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




  return (
    <HeadlessLayout>
      <div>
        <div>카운터페이지</div>
        
        {/* <Link to={"/"}>메인으로 이동</Link> */}


        <button onClick={() => navigate("/")}>메인으로 이 동</button>
        <Footer />
      </div>
    </HeadlessLayout>
  );
};

export default Counter;
