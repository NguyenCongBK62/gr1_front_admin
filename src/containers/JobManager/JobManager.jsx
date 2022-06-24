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

const { confirm } = Modal;

export default function JobManager() {
  const customStyles = {
    cursor: 'pointer',
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
      render: (_, { techSkills }) => (
        <div style={{ display: 'flex' }}>
          {techSkills.map((techSkill) => {
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
      ),
    },
    {
      title: 'Ngoại ngữ',
      dataIndex: 'languageSkills',
      width: 180,
      render: (_, { languageSkills }) => (
        <div style={{ display: 'flex' }}>
          {languageSkills.map((languageSkill) => {
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
      ),
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
          <div onClick={() => console.log(333)} style={customStyles}>
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
          <div onClick={() => showDeleteConfirm(record)} style={customStyles}>
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
    await setFullDataSource(jobs);
  };

  function formatData(data) {
    const newData = [];
    data.forEach((row, index) => {
      newData.push({
        key: row.id,
        name: row.name,
        typeName: row.type.name,
        required: row.required ? '必須' : '任意',
        displayOnReservation: row.displayOnReservation
          ? '表示する'
          : '表示しない',
        displayOnCustomer: row.displayOnCustomer ? '表示する' : '表示しない',
        index: index + 1,
      });
    });
    return newData;
  }

  const showDeleteConfirm = (record) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: '確認',
      content:
        '削除したカスタム項目はもとに戻せません。カスタム項目を削除してもよろしいですか？',
      okText: 'はい',
      okType: 'danger',
      cancelText: 'いいえ',
      centered: true,
      onOk() {
        console.log('oke');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDataSource = (newData) => {
    setDataSource(newData);
  };

  return (
    <div className="list-container">
      <Row style={{ marginBottom: '6.17px' }}>
        <FormHeader
          title={'カスタム項目一覧'}
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
            emptyText={'条件に該当するカスタム項目はありません'}
            placeholder={'カスタム項目を検索'}
            scrollX={800}
            scrollY={886}
            totalItems={dataSource.length}
          />
        </Col>
      </Row>
    </div>
  );
}
