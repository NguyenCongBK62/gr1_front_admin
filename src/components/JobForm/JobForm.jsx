import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Row, Col, Select, InputNumber, Input } from 'antd';
import React, { useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import './style/JobForm.less';

const { Option } = Select;

export default function EditContent() {
  const [jobdesrciption, setjobdesrciption] = useState('');
  const [job, setJob] = useState({});
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let token = localStorage.getItem('Authorization');
    data = { ...data, jobdesrciption, token };
    fetch('http://localhost:3001/admin/post-job', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setJob(data));
  };

  return (
    <div className="editor">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="row-custome">
          <Col span={24} className="col-custome">
            <label htmlFor="jobtitle" className="label-input-job-info">
              Tiêu đề tuyển dụng
            </label>
            <Controller
              control={control}
              name="jobtitle"
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Nhập vị trí tuyển dụng"
                  className="job-form-input"
                />
              )}
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome">
          <Col span={6} className="col-custome">
            <label htmlFor="techskill" className="label-input-job-info">
              Công nghệ sử dụng
            </label>
            <Controller
              control={control}
              name="techskill"
              render={({ field }) => (
                <Select
                  mode="tags"
                  {...field}
                  showArrow={false}
                  name="techskill"
                  placeholder="Liên quan đến công nghệ"
                  allowClear="true"
                >
                  <Option value="ReactJS">ReactJS</Option>
                  <Option value="NodeJS">NodeJS</Option>
                  <Option value=".Net">.Net</Option>
                  <Option value="HTML">HTML</Option>
                  <Option value="CSS">CSS</Option>
                  <Option value="JS">JS</Option>
                  <Option value="Java">Java</Option>
                  <Option value="Python">Python</Option>
                  <Option value="C#">C#</Option>
                  <Option value="PHP">PHP</Option>
                </Select>
              )}
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="jobtitle" className="label-input-job-info">
              Yêu cầu ngoại ngữ
            </label>
            <Controller
              control={control}
              name="languageskill"
              render={({ field }) => (
                <Select
                  mode="tags"
                  {...field}
                  showArrow={false}
                  name="languageskill"
                  placeholder="Ngôn ngữ cần thiết trong công việc"
                  allowClear="true"
                >
                  <Option value="Japanese">Tiếng Nhật</Option>
                  <Option value="Korean">Tiếng Hàn</Option>
                  <Option value="English">Tiếng Anh</Option>
                  <Option value="German">Tiếng Đức</Option>
                  <Option valua="Russian">Tiếng Nga</Option>
                </Select>
              )}
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="position" className="label-input-job-info">
              Cấp bậc
            </label>
            <Controller
              control={control}
              name="position"
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  name="position"
                  style={{
                    width: '100%',
                    border: 'transparent !important',
                    overflow: 'hidden !important',
                  }}
                  placeholder="Chức vụ"
                  allowClear="true"
                >
                  <Option value="Fresher">Fresher</Option>
                  <Option value="Senior">Senior</Option>
                  <Option value="Leader">Leader</Option>
                  <Option value="BA">BA</Option>
                  <Option value="PM">PM</Option>
                  <Option value="CTO">CTO</Option>
                </Select>
              )}
            />
          </Col>
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
                  className="job-form-input"
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
              name="worktime"
              render={({ field }) => (
                <Select
                  {...field}
                  showArrow={false}
                  name="worktime"
                  placeholder="Loại công việc"
                  allowClear="true"
                  className="job-form-input"
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
                <Input
                  {...field}
                  placeholder="Khoảng lương"
                  className="job-form-input"
                />
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
                  placeholder="Nơi làm việc"
                  allowClear="true"
                >
                  <Option value="Hanoi">Hà Nội</Option>
                  <Option value="Danang">Đà Nẵng</Option>
                  <Option value="Hochiminh">Hồ Chí Minh</Option>
                </Select>
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
              onReady={(editor) => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setjobdesrciption(data);
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
            color="primary"
            icon={<SaveOutlined />}
          >
            Lưu
          </Button>
        </Row>
      </form>
    </div>
  );
}
