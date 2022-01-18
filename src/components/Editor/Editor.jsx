import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Row, Col } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./style/Editor.less";

export default function EditContent() {
  const [content, setContent] = useState("");
  const [res, setRes] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: content }),
    };
    fetch(
      "https://61baef79e943920017784ad1.mockapi.io/api/v1/testcontent",
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => setRes(data.content));
    console.log(data);
  };

  return (
    <div className="editor">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="row-custome">
          <Col span={24} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Tiêu đề tuyển dụng
            </label>
            <input
              type="text"
              {...register("title", { required: true, max: 300 })}
              className="input-job-info"
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome">
          <Col span={24} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Ngành nghề & lĩnh vực
            </label>
            <input
              type="text"
              {...register("career", { required: true, max: 300 })}
              className="input-job-info"
            />
          </Col>
          {errors.career && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome" justify="space-between">
          <Col span={10} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Số lượng tuyển
            </label>
            <input
              type="number"
              {...register("numberOfStaff", { required: true, max: 300 })}
              className="input-job-info"
            />
          </Col>
          <Col span={10} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Loại công việc
            </label>
            <input
              type="text"
              {...register("jobType", { required: true, max: 300 })}
              className="input-job-info"
            />
          </Col>
        </Row>
        <div className="form-group-column">
          <label htmlFor="title" className="label-input-job-info">
            Mô tả công việc
          </label>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
        <Button htmlType="submit" className="btn-custome">
          oke
        </Button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: res }} />
    </div>
  );
}
