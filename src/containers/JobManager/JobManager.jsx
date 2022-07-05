import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Row, Tag } from 'antd';
import { useState } from 'react';
import './style/JobManager.less';

import FormHeader from 'components/FormHeader';
import EditIcon from 'components/Icons/EditIcon';
import FileTextIcon from 'components/Icons/FileTextIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import Table from 'components/Table/Table';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToastStatus } from 'Store/modules/AlertToast';

const { confirm } = Modal;

export default function JobManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customStyles = {
    cursor: 'pointer',
  };

  const editItem = (val) => {
    navigate(`/jobedit/${val}`, { replace: true });
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'jobtitle',
      width: 200,
    },
    {
      title: 'Công nghệ',
      dataIndex: 'techSkills',
      width: 180,
      render: (_, record) =>
        record && record.techSkills ? (
          <div style={{ display: 'flex' }}>
            {record.techSkills.map((techSkill) => {
              let color = techSkill.length > 5 ? 'geekblue' : 'green';

              if (techSkill === 'loser') {
                color = 'volcano';
              }

              return (
                <Tag color={color} key={techSkill}>
                  {techSkill.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        ) : null,
    },
    {
      title: 'Ngoại ngữ',
      dataIndex: 'languageSkills',
      width: 180,
      render: (_, record) =>
        record && record.languageSkills ? (
          <div style={{ display: 'flex' }}>
            {record.languageSkills.map((languageSkill) => {
              let color = languageSkill.length > 5 ? 'geekblue' : 'green';

              if (languageSkill === 'loser') {
                color = 'volcano';
              }

              return (
                <Tag color={color} key={languageSkill}>
                  {languageSkill.toUpperCase()}
                </Tag>
              );
            })}
          </div>
        ) : null,
    },
    {
      title: 'Số lượng',
      dataIndex: 'amount',
      width: 100,
    },
    {
      title: 'Chỉnh sửa',
      dataIndex: 'edit',
      width: 70,
      render: function renderEditIcon(_, record) {
        return dataSource.length >= 1 ? (
          <div onClick={() => editItem(record.id)} style={customStyles}>
            <EditIcon customeStyles={customStyles} />
          </div>
        ) : null;
      },
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      width: 70,
      render: function renderDeleteIcon(_, record) {
        return dataSource.length >= 1 ? (
          <div
            onClick={() => showDeleteConfirm(record.id)}
            style={customStyles}
          >
            <TrashIcon customeStyles={customStyles} />
          </div>
        ) : null;
      },
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [fullDataSource, setFullDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let jobs = await fetch('http://localhost:3001/admin/getlistjob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: localStorage.getItem('Authorization') }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    await setDataSource(jobs);
    setFullDataSource(jobs);
  };

  const deleteData = async (id) => {
    let jobs = await fetch('http://localhost:3001/admin/deletejob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('Authorization'),
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          dispatch(setToastStatus(1));
        }
        return data;
      })
      .catch((err) => {
        dispatch(setToastStatus(0));
      });
    await setDataSource(jobs);
    await setFullDataSource(jobs);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: 'Xác nhận',
      content: 'Bạn có muốn xóa bản ghi này không？',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      centered: true,
      onOk() {
        deleteData(id);
      },
      onCancel() {},
    });
  };

  const handleDataSource = (newData) => {
    setDataSource(newData);
  };

  return (
    <div className="list-container">
      <Row style={{ marginBottom: '6.17px' }}>
        <FormHeader
          title={'Danh sách việc làm đã đăng'}
          icon={<FileTextIcon width="28" height="28" />}
        />
      </Row>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: '20px' }}
      >
        <Col span={24}>
          <Table
            data={dataSource}
            columns={columns}
            handleDataSource={handleDataSource}
            fullDataSource={fullDataSource}
            emptyText={'Không có bản ghi nào'}
            placeholder={'Tìm kiếm theo từ khóa'}
            scrollX={800}
            scrollY={886}
            totalItems={dataSource.length}
          />
        </Col>
      </Row>
    </div>
  );
}
