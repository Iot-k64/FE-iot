import {
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import { Button, Drawer, message } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import TrackRecord from '../../api/trackRecord';

export default function DrawerChart({
  showDrawer,
  closeDrawer,
  dataTemper,
  dataHumi,
  dataContainer
}) {
  const dataTrackRecords = useQuery(
    ['getTrackRecords'],
    () => TrackRecord.getTrackRecord(dataContainer._id),
    {
      keepPreviousData: true
    }
  );
  const queryClient = useQueryClient();

  console.log(dataTrackRecords.data)
  const handleTroubleshooting = () => {
    setTimeout(() => {
      message.success('Successful adjustment');
    }, 3000);
  };
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
            text: 'Container 1',
            align: 'left'
          },

          subtitle: {
            text:
              'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
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

          series: dataTemper,

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
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Container 1',
            align: 'left'
          },

          subtitle: {
            text:
              'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
            align: 'left'
          },

          yAxis: {
            title: {
              text: 'Humidity (g/m3)'
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

          series: dataHumi,

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
