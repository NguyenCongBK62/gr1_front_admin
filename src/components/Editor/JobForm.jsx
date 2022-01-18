import { SaveOutlined } from '@ant-design/icons';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Col, Input, InputNumber, Row, Select } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './style/JobForm.less';

const { Option } = Select;

export default function JobForm() {
  const [content, setContent] = useState('');
  const [res, setRes] = useState();
  const [imageURL, setImageURL] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data = { ...data, content };
    console.log(data);
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('file', e.target.files[0], 'file');
    fetch('http://localhost:3001/admin/cloudinary-upload', {
      method: 'post',
      body: uploadData,
    })
      .then((response) => response.json())
      .then((data) => setImageURL(data.secure_url))
      .then((err) => console.log(err));
  };

  return (
    <div className="editor">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="row-custome">
          <Col span={24} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Tiêu đề tuyển dụng
            </label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input {...field} placeholder="Nhập vị trí tuyển dụng" />
              )}
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome">
          <Col span={24} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Ngành nghề & lĩnh vực
            </label>
            <Controller
              control={control}
              name="job"
              render={({ field }) => (
                <Input {...field} placeholder="Nhập ngành nghề & vị trí" />
              )}
            />
          </Col>
          {errors.career && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome" justify="flex-start">
          <Col span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Số lượng tuyển
            </label>
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <InputNumber
                  {...field}
                  name="amount"
                  style={{ width: '100%' }}
                  placeholder="Nhập số lượng cần tuyển"
                />
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Loại công việc
            </label>
            <Controller
              control={control}
              name="jobType"
              render={({ field }) => (
                <Select
                  {...field}
                  showArrow={false}
                  name="jobType"
                  placeholder="--Loại công việc--"
                  allowClear="true"
                >
                  <Option value="fullTime">Toàn thời gian</Option>
                  <Option value="partTime">Bán thời gian</Option>
                </Select>
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Khoảng lương
            </label>
            <Controller
              control={control}
              name="salary"
              render={({ field }) => (
                <Input {...field} placeholder="Khoảng lương" />
              )}
            />
          </Col>
        </Row>
        <Row className="row-custome">
          <Col span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Nơi làm việc
            </label>
            <Controller
              control={control}
              name="worksplace"
              render={({ field }) => (
                <Select
                  {...field}
                  showArrow={false}
                  name="worksplace"
                  placeholder="--Nơi làm việc--"
                  allowClear="true"
                >
                  <Option value="Hanoi">Hà Nội</Option>
                  <Option value="Danang">Đà Nẵng</Option>
                  <Option value="Hochiminh">Hồ Chí Minh</Option>
                </Select>
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="jobPosition" className="label-input-job-info">
              Cấp bậc
            </label>
            <Controller
              control={control}
              name="jobPosition"
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  name="jobPosition"
                  style={{
                    width: '100%',
                    border: 'transparent !important',
                    overflow: 'hidden !important',
                  }}
                  placeholder="Chức vụ"
                  allowClear="true"
                >
                  <Option value="JobPosition">Nhân Viên</Option>
                  <Option value="PM">PM</Option>
                  <Option value="Leader">Leader</Option>
                  <Option value="CEO">CEO</Option>
                  <Option value="COO">COO</Option>
                </Select>
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Kinh nghiệm
            </label>
            <Controller
              control={control}
              name="exp"
              render={({ field }) => (
                <InputNumber
                  {...field}
                  name="exp"
                  style={{ width: '100%' }}
                  placeholder="Nhập số năm kinh nghiệm"
                />
              )}
            />
          </Col>
        </Row>
        <Row className="row-custome" justify="space-between">
          <Col span={24}>
            <label htmlFor="title" className="label-input-job-info">
              Mô tả công việc
            </label>
            <CKEditor
              editor={ClassicEditor}
              data=""
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </Col>
        </Row>
        <Row className="row-custome">
          <Button
            htmlType="submit"
            className="btn-custome"
            icon={<SaveOutlined />}
          >
            Lưu
          </Button>
        </Row>
      </form>
      <div>
        <div style={{ margin: 10 }}>
          <label style={{ margin: 10 }}>Cloudinary:</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </div>
      </div>
      <img src={imageURL} width="100px" height="100px" alt="" />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
