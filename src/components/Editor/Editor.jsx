import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Row, Col, Select, InputNumber, Input } from 'antd';
import React, { useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import './style/Editor.less';

const { Option } = Select;

export default function EditContent() {
  const [content, setContent] = useState('');
  const [res, setRes] = useState();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content }),
    };
    fetch(
      'https://61baef79e943920017784ad1.mockapi.io/api/v1/testcontent',
      requestOptions
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
                  defaultValue="fullTime"
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
        </Row>
        <Row className="row-custome">
          <Col span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Giới tính
            </label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue="Male"
                  showArrow={false}
                  name="gender"
                  placeholder="--Giới tính--"
                  allowClear="true"
                >
                  <Option value="Male">Nam</Option>
                  <Option value="FeMale">Nữ</Option>
                </Select>
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="position" className="label-input-job-info">
              Cấp bậc
            </label>
            <Select
              id="staff"
              mode="tags"
              style={{ width: '100%', border: 'transparent !important' }}
              placeholder="Chức vụ"
              allowClear="true"
            >
              <Option value={'staff'}>Nhân Viên</Option>
              <Option value={'PM'}>PM</Option>
              <Option value={'Leader'}>Leader</Option>
              <Option value={'CEO'}>CEO</Option>
              <Option value={'COO'}>COO</Option>
            </Select>
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="title" className="label-input-job-info">
              Kinh nghiệm
            </label>
            <InputNumber
              style={{ width: '100%' }}
              placeholder="Nhập số năm kinh nghiệm"
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
      <div dangerouslySetInnerHTML={{ __html: res }} />
    </div>
  );
}
