import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Drawer, message, Spin } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useState } from 'react';
import TrackRecord from '../../api/trackRecord';
import { LoadingOutlined } from '@ant-design/icons';

export default function DrawerChart({
  showDrawer,
  closeDrawer,
  dataContainer
}) {
  const dataTrackRecords = useQuery(
    ['getTrackRecords', dataContainer._id],
    () => TrackRecord.getTrackRecord(dataContainer._id),
    {
      keepPreviousData: true,
      refetchInterval: 5000
    }
  );
  const queryClient = useQueryClient();
  const getDataHighChart = (isTemp) => {
    if (isTemp) {
      return [
        {
          name: 'Current Temperature',
          data:
            !dataTrackRecords.isLoading &&
            dataTrackRecords.data
              .map((item) => item.temperature)
              .reverse()
        },
        {
          name: 'Standard temperature',
          data:
            !dataTrackRecords.isLoading &&
            dataTrackRecords.data.map((item) => 30)
        }
      ];
    } else {
      return [
        {
          name: 'Current Humidity',
          data:
            !dataTrackRecords.isLoading &&
            dataTrackRecords.data
              .map((item) => item.humidity)
              .reverse()
        },
        {
          name: 'Standard humidity',
          data:
            !dataTrackRecords.isLoading &&
            dataTrackRecords.data.map((item) => 25)
        }
      ];
    }
  };
  const handleTroubleshooting = () => {
    setTimeout(() => {
      message.success('Successful adjustment');
    }, 3000);
  };

  if (dataTrackRecords.isLoading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    <Spin indicator={antIcon} />;
  }

  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      width={1000}
      onClose={closeDrawer}
      open={showDrawer}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Temperature',
            align: 'left'
          },

          yAxis: {
            title: {
              text: 'Recorded Temperature (C°)'
            }
          },

          xAxis: {
            accessibility: {
              rangeDescription: 'Time'
            }
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 2010
            }
          },

          series: getDataHighChart(true),

          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                  }
                }
              }
            ]
          }
        }}
      />
      <Button onClick={handleTroubleshooting} danger>
        Troubleshoot
      </Button>
      <div style={{ margin: '8px 0' }}></div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Humidity',
            align: 'left'
          },

          yAxis: {
            title: {
              text: 'Recorded Humidity '
            }
          },

          xAxis: {
            accessibility: {
              rangeDescription: 'Time'
            }
          },

          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },

          plotOptions: {
            series: {
              label: {
                connectorAllowed: false
              },
              pointStart: 1
            }
          },

          series: getDataHighChart(false),

          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                  }
                }
              }
            ]
          }
        }}
      />
      <Button onClick={handleTroubleshooting} danger>
        Troubleshoot
      </Button>
    </Drawer>
  );
}
