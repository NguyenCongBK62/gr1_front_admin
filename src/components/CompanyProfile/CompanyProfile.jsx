import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Row, Col, Select, InputNumber, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
// import './style/JobForm.less';

const { Option } = Select;

export default function CompanyProfile() {
  const [profile, setProfile] = useState({});
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    register,
  } = useForm({
    defaultValues: {
      address: profile.address,
      description: profile.description,
      field: profile.field,
      logo: profile.logo,
      memberquantity: profile.memberquantity,
      name: profile.name,
      slogan: profile.slogan,
      timeot: profile.timeot,
      worktimeend: profile.worktimeend,
      worktimestart: profile.worktimestart,
    },
  });

  useEffect(() => {
    reset({ ...profile, logo });
  }, [profile]);

  const onSubmit = (data) => {
    data = { ...data, logo, description };
    console.log(555, data, localStorage.getItem('Authorization'));
    fetch('http://localhost:3001/admin/companyprofile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        id: data.id,
        address: data.address,
        description: data.description,
        field: data.field,
        logo: data.logo,
        memberquantity: data.memberquantity,
        name: data.name,
        slogan: data.slogan,
        timeot: data.timeot,
        worktimeend: data.worktimeend,
        worktimestart: data.worktimestart,
        token: localStorage.getItem('Authorization'),
      }),
    })
      .then((response) => JSON.parse(response))
      .then((data) => {
        setProfile(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await fetch('http://localhost:3001/admin/getprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ token: localStorage.getItem('Authorization') }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    setProfile(data);
  };

  const handleFileUpload = async (e) => {
    const uploadData = await new FormData();
    uploadData.append('file', e.target.files[0], 'file');
    fetch('http://localhost:3001/admin/cloudinary-upload', {
      method: 'post',
      body: uploadData,
    })
      .then((response) => response.json())
      .then((data) => setLogo(data.secure_url))
      .then((err) => console.log(err));
    setLogo(uploadData);
  };

  // if (profile === null) {
  //   return <></>;
  // }

  return (
    <div className="editor">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="row-custome">
          <Col span={24} className="col-custome">
            <label htmlFor="name" className="label-input-job-info">
              Tên công ty
            </label>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  name="name"
                  placeholder="Nhập tên công ty"
                  className="job-form-input"
                  defaultValue={profile.name}
                />
              )}
            />
          </Col>
          {errors.CompanyName && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome">
          <Col span={6} className="col-custome">
            <label htmlFor="address" className="label-input-job-info">
              Địa chỉ công ty
            </label>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <Input
                  {...field}
                  name="address"
                  placeholder="Nhập địa chỉ công ty"
                  className="job-form-input"
                  defaultValue={profile.address}
                />
              )}
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="memberquantity" className="label-input-job-info">
              Số lượng nhân viên
            </label>
            <Controller
              control={control}
              name="memberquantity"
              render={({ field }) => (
                <InputNumber
                  {...field}
                  name="memberquantity"
                  placeholder="số lượng nhân viên trong công ty"
                  className="job-form-input"
                  defaultValue={profile.memberquantity}
                />
              )}
            />
          </Col>
          {errors.title && <p>Vui lòng điền thông tin</p>}
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="field" className="label-input-job-info">
              Lĩnh vực hoạt động
            </label>
            <Controller
              control={control}
              name="field"
              render={({ field }) => (
                <Input
                  {...field}
                  name="field"
                  placeholder="LĨnh vực hoạt động"
                  className="job-form-input"
                  defaultValue={profile.field}
                />
              )}
            />
          </Col>
        </Row>
        <Row className="row-custome" justify="flex-start">
          <Col span={6} className="col-custome">
            <label htmlFor="workTime" className="label-input-job-info">
              Thời gian làm việc
            </label>
          </Col>
        </Row>
        <Row className="row-custome" justify="flex-start">
          <Col span={6} className="col-custome">
            <label htmlFor="workTimeStart" className="label-input-job-info">
              Từ
            </label>
            <Controller
              control={control}
              name="worktimestart"
              render={({ field }) => (
                <Select
                  {...field}
                  showArrow={false}
                  name="worktimestart"
                  placeholder="Ngày bắt đầu làm việc trong tuần"
                  allowClear="true"
                  defaultValue={profile.worktimestart}
                >
                  <Option value="Monday">Thứ 2</Option>
                  <Option value="Tuesday">Thứ 3</Option>
                  <Option value="Wednesday">Thứ 4</Option>
                  <Option value="Thursday">Thứ 5</Option>
                  <Option value="Friday">Thứ 6</Option>
                  <Option value="Saturday">Thứ 7</Option>
                  <Option value="Sunday">Chủ Nhật</Option>
                </Select>
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="workTimeEnd" className="label-input-job-info">
              Đến
            </label>
            <Controller
              control={control}
              name="worktimeend"
              render={({ field }) => (
                <Select
                  {...field}
                  showArrow={false}
                  name="worktimeend"
                  placeholder="Ngày kết thúc làm việc trong tuần"
                  allowClear="true"
                  defaultValue={profile.worktimeend}
                >
                  <Option value="Monday">Thứ 2</Option>
                  <Option value="Tuesday">Thứ 3</Option>
                  <Option value="Wednesday">Thứ 4</Option>
                  <Option value="Thursday">Thứ 5</Option>
                  <Option value="Friday">Thứ 6</Option>
                  <Option value="Saturday">Thứ 7</Option>
                  <Option value="Sunday">Chủ Nhật</Option>
                </Select>
              )}
            />
          </Col>
          <Col offset={2} span={6} className="col-custome">
            <label htmlFor="timeOT" className="label-input-job-info">
              Thời gian OT tối đa (giờ/tháng)
            </label>
            <Controller
              control={control}
              name="timeot"
              render={({ field }) => (
                <InputNumber
                  {...field}
                  name="timeot"
                  style={{ width: '100%' }}
                  placeholder="Thời gian OT tối đa (giờ/tháng)"
                  className="job-form-input"
                  defaultValue={
                    profile.timeot !== undefined ? profile.timeot : 0
                  }
                />
              )}
            />
          </Col>
        </Row>
        <Row className="row-custome">
          <Col span={11} className="col-custome">
            <label htmlFor="slogan" className="label-input-job-info">
              Thông điệp công ty
            </label>
            <Controller
              control={control}
              name="slogan"
              render={({ field }) => (
                <Input
                  {...field}
                  name="slogan"
                  placeholder="Nhập thông điệp công ty"
                  className="job-form-input"
                  defaultValue={
                    profile.slogan !== undefined ? profile.slogan : ''
                  }
                />
              )}
            />
          </Col>
          {errors.CompanyName && <p>Vui lòng điền thông tin</p>}
          <Col offset={2} span={11} className="col-custome">
            <label htmlFor="logo" className="label-input-job-info">
              Ảnh đại diện
            </label>
            <div>
              <div style={{ margin: 10 }}>
                <label style={{ margin: 10 }}>Cloudinary:</label>
                <input
                  {...register('logo')}
                  name="logo"
                  type="file"
                  onChange={(e) => handleFileUpload(e)}
                />
              </div>
            </div>
            {profile.logo && (
              <img src={profile.logo} width="200px" height="100px" alt="" />
            )}
          </Col>
          {errors.CompanyName && <p>Vui lòng điền thông tin</p>}
        </Row>
        <Row className="row-custome" justify="space-between">
          <Col span={24}>
            <label htmlFor="desciption" className="label-input-job-info">
              Giới thiệu công ty
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={profile && profile.description}
              onReady={(editor) => {
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
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
    </div>
  );
}
