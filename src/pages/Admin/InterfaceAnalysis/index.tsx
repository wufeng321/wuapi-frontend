import {PageContainer,} from '@ant-design/pro-components';
import '@umijs/max';
import React, {useEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGet} from "@/services/wuapi-backend/analysisController";

const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = React.useState<API.InterfaceInfoVO[]>([]);

  useEffect(() => {
    try{
      listTopInvokeInterfaceInfoUsingGet().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
    }catch (e){
      console.log(e);
    }
  },[])

  const chartData = data.map((item) => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })

  const option = {
    title: {
      text: '调用次数最多TOP3接口',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return(
    <PageContainer>
      <ReactECharts
        option={option} />
    </PageContainer>
  )
}
export default InterfaceAnalysis;
