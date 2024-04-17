import {ProColumns,ProFormInstance} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect, useRef} from 'react';
import {Modal} from "antd";
import {ProTable} from "@ant-design/pro-components";

export type Props = {
  // 编辑表单的数据源
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const{values,columns, onCancel, onSubmit, visible} = props;

  // 使用useRef来获取Protable中的表单实例
  const formRef = useRef<ProFormInstance>();

  // 在组件加载时，将表单实例赋值给formRef
  useEffect(()=>{
    if(formRef){
      formRef.current?.setFieldsValue(values);
    }
  },[values])

  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
      <ProTable
        columns={columns}
        type={"form"}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }
        }
      />
    </Modal>
  );
};
export default UpdateModal;
