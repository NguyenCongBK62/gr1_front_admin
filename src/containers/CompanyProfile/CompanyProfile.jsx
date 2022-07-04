import { useForm } from 'react-hook-form';

import { Col, Row } from 'antd';

import DataSidePreview from 'components/DataSidePreview';
import CompanyProfileForm from 'components/Form/CompanyProfileForm';
import FormHeader from 'components/FormHeader/index';
import SettingsIcon from 'components/Icons/SettingsIcon';
import { useEffect, useState } from 'react';

export default function CompanyProfile() {
  const methods = useForm({
    mode: 'onSubmit',
  });
  const { handleSubmit, control, setValue, watch } = methods;
  const [profile, setProfile] = useState({});

  useEffect(() => {
    let token = localStorage.getItem('Authorization');
    fetch('http://localhost:3001/admin/getprofile', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile(data);
      });
  }, []);

  useEffect(() => {
    setValue('address', profile.address);
    setValue('description', profile.description);
    setValue('field', profile.field);
    setValue('logo', profile.logo);
    setValue('memberquantity', profile.memberquantity);
    setValue('name', profile.name);
    setValue('slogan', profile.slogan);
    setValue('timeot', profile.timeot);
    setValue('worktimeend', profile.worktimeend);
    setValue('worktimestart', profile.worktimestart);
  }, [profile]);

  const dataPreview = [
    {
      heading: 'Nội dung',
      items: [
        {
          label: 'Tên công ty',
          value: (watcher) => {
            const v = watcher.name ? `${watcher.name}` : '';
            return v || '';
          },
        },
        {
          label: 'Địa chỉ',
          value: (watcher) => {
            const v = watcher.address ? `${watcher.address}` : '';
            return v || '';
          },
        },
        {
          label: 'Số nhân viên',
          value: (watcher) => {
            const v = watcher.memberquantity ? `${watcher.memberquantity}` : '';
            return v || '';
          },
        },
        {
          label: 'Lĩnh vực',
          value: (watcher) => {
            const v = watcher.field ? `${watcher.field}` : '';
            return v || '';
          },
        },
        {
          label: 'Thời gian làm việc',
          value: (watcher) => {
            const v =
              watcher.worktimestart && watcher.worktimeend
                ? `${watcher.worktimestart} ~ ${watcher.worktimeend}`
                : '';
            return v || '';
          },
        },
        {
          label: 'Thời gian OT',
          value: (watcher) => {
            const v = watcher.timeot ? `${watcher.timeot}` : '';
            return v || '';
          },
        },
        {
          label: 'Thông điệp',
          value: (watcher) => {
            const v = watcher.slogan ? `${watcher.slogan}` : '';
            return v || '';
          },
        },
        {
          label: 'Ảnh đại diện',
          value: (watcher) => {
            const v = watcher.logo ? `${watcher.logo}` : '';
            return v || '';
          },
        },
        {
          label: 'Giới thiệu công ty',
          value: (watcher) => {
            const v = watcher.desciption ? `đã nhập` : 'chưa nhập';
            return v || '';
          },
        },
      ],
    },
  ];

  const onSubmit = (data) => {
    let token = localStorage.getItem('Authorization');
    data = { ...data, token };
    fetch('http://localhost:3001/admin/companyprofile', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setProfile(data));
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={'Thông tin doanh nghiệp'}
        icon={<SettingsIcon width={'30'} height={'30'} type={'lg'} />}
      />
      <Row wrap={false}>
        <Col flex="auto">
          <CompanyProfileForm control={control} />
        </Col>
        <DataSidePreview
          data={dataPreview}
          control={control}
          title={'Xem nhanh nội dung'}
          submitButtonTitle={'Lưu'}
          isEdit={false}
        />
      </Row>
    </form>
  );
}
