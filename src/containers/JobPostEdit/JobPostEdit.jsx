import { useForm } from 'react-hook-form';

import { Col, Row } from 'antd';

import DataSidePreview from 'components/DataSidePreview';
import JobForm from 'components/Form/JobForm';
import FormHeader from 'components/FormHeader/index';
import EditIcon from 'components/Icons/EditIcon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function JobPostEdit() {
  const methods = useForm({
    mode: 'onSubmit',
  });
  const { handleSubmit, control, setValue, watch } = methods;
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    let token = localStorage.getItem('Authorization');
    if (id) {
      fetch('http://localhost:3001/admin/getjob', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(id), token: token }),
      })
        .then((response) => response.json())
        .then((data) => {
          setJobDetails(data);
          console.log(data);
        });
    }
  }, []);

  useEffect(() => {
    if (id) {
      setValue('jobtitle', jobDetails.jobtitle);
      setValue('techskill', jobDetails.techSkills);
      setValue('languageskill', jobDetails.languageSkills);
      setValue('position', jobDetails.position);
      setValue('salary', jobDetails.salary);
      setValue('amount', jobDetails.amount);
      setValue('worksplace', jobDetails.worksplace);
      setValue('worktime', jobDetails.worktime);
      setValue('jobdesrciption', jobDetails.jobdesrciption);
    }
  }, [jobDetails]);

  const dataPreview = [
    {
      heading: 'Nội dung',
      items: [
        {
          label: 'Tiêu đề',
          value: (watcher) => {
            const v = watcher.jobtitle ? `${watcher.jobtitle}` : '';
            return v || '';
          },
        },
        {
          label: 'Công nghệ',
          value: (watcher) => {
            const v = watcher.techskill
              ? `${watcher.techskill.join(', ')}`
              : '';
            return v || '';
          },
        },
        {
          label: 'Ngoại ngữ',
          value: (watcher) => {
            const v = watcher.languageskill
              ? `${watcher.languageskill.join(', ')}`
              : '';
            return v || '';
          },
        },
        {
          label: 'Cấp bậc',
          value: (watcher) => {
            const v = watcher.position ? `${watcher.position}` : '';
            return v || '';
          },
        },
        {
          label: 'Mức lương',
          value: (watcher) => {
            const v = watcher.salary ? `${watcher.salary}` : '';
            return v || '';
          },
        },
        {
          label: 'Số lượng tuyển',
          value: (watcher) => {
            const v = watcher.amount ? `${watcher.amount}` : '';
            return v || '';
          },
        },
        {
          label: 'Nơi làm việc',
          value: (watcher) => {
            const v = watcher.worksplace ? `${watcher.worksplace}` : '';
            return v || '';
          },
        },
        {
          label: 'Loại công việc',
          value: (watcher) => {
            const v = watcher.worktime ? `${watcher.worktime}` : '';
            return v || '';
          },
        },
        {
          label: 'Mô tả chi tiết',
          value: (watcher) => {
            const v = watcher.jobdesrciption ? `${watcher.jobdesrciption}` : '';
            return v || '';
          },
        },
      ],
    },
  ];

  const onSubmit = (data) => {
    let token = localStorage.getItem('Authorization');
    data = { ...data, token, id };
    fetch('http://localhost:3001/admin/post-job', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setJobDetails(data));
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <FormHeader
        title={'Thêm bài đăng'}
        icon={
          <EditIcon
            width={'30'}
            height={'30'}
            minX={'-10'}
            minY={'-8'}
            type={'lg'}
            customStyles={{
              margin: 'auto',
            }}
          />
        }
      />
      <Row wrap={false}>
        <Col flex="auto">
          <JobForm control={control} />
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
