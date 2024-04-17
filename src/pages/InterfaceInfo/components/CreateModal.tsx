import {ProColumns,} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
import {Modal} from "antd";
import {ProTable} from "@ant-design/pro-components";

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const{columns, onCancel, onSubmit, visible} = props;
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        columns={columns}
        type={"form"}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }
        }
      />
    </Modal>
  );
};
export default CreateModal;
