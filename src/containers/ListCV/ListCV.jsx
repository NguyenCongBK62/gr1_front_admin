import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import FormHeader from 'components/FormHeader';
import FileTextIcon from 'components/Icons/FileTextIcon';
import TrashIcon from 'components/Icons/TrashIcon';
import Table from 'components/Table/Table';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const { confirm } = Modal;
export default function ListCV() {
  const { id } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const [fullDataSource, setFullDataSource] = useState([]);
  const customStyles = {
    cursor: 'pointer',
  };

  const getData = async () => {
    let jobs = await fetch('http://localhost:3001/admin/listcv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    await setDataSource(jobs);
    setFullDataSource(jobs);
  };

  const handleDataSource = (newData) => {
    setDataSource(newData);
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
        console.log(666);
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: 'Tên ứng viên',
      dataIndex: 'username',
      width: 200,
    },
    {
      title: 'Gmail',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: 'CV link',
      dataIndex: 'cv',
      width: 200,
      render: function renderDeleteIcon(_, record) {
        return dataSource.length >= 1 ? (
          <a href={record.linkcv}>
            <FileTextIcon customeStyles={customStyles} />
          </a>
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
