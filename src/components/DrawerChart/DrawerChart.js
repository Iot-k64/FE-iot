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
  const getDataHighChart = (isTemp) => {
    const datas = [];
    const datasStandard = [];
    if(isTemp) {
      dataTrackRecords.data?.forEach(trackRecord => {
        datas.push({y: trackRecord.temperature, x: (new Date(trackRecord.createdAt)).getTime()})
        datasStandard.push({y: dataContainer.product?.standardTemp, x: (new Date(trackRecord.createdAt)).getTime()})
      });
      const xxx = [
        {
          name: 'Current Temperature',
          data: datas
        }
      ]
      console.log(xxx)

      return xxx
    }
    dataTrackRecords.data?.forEach(trackRecord => {
      datas.push({y: trackRecord.humidity, x: (new Date(trackRecord.createdAt)).getTime()})
      datasStandard.push({y: dataContainer.product?.standardHumi, x: (new Date(trackRecord.createdAt)).getTime()})
    });
    return [
      {
        name: 'Current Humidity',
        data: datas
      },
      {
        name: 'Standard Humidity',
        data: datasStandard
      }
    ]
  }
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
        // options={{
        //   title: {
        //     text: 'Container 1',
        //     align: 'left'
        //   },

        //   subtitle: {
        //     text:
        //       'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        //     align: 'left'
        //   },

        //   yAxis: {
        //     title: {
        //       text: 'Recorded Temperature (C°)'
        //     }
        //   },

        //   xAxis: {
        //     accessibility: {
        //       rangeDescription: 'Time'
        //     }
        //   },

        //   legend: {
        //     layout: 'vertical',
        //     align: 'right',
        //     verticalAlign: 'middle'
        //   },

        //   plotOptions: {
        //     series: {
        //       label: {
        //         connectorAllowed: false
        //       },
        //       pointStart: 2010
        //     }
        //   },

        //   series: getDataHighChart(true),

        //   responsive: {
        //     rules: [
        //       {
        //         condition: {
        //           maxWidth: 500
        //         },
        //         chartOptions: {
        //           legend: {
        //             layout: 'horizontal',
        //             align: 'center',
        //             verticalAlign: 'bottom'
        //           }
        //         }
        //       }
        //     ]
        //   }
        // }}
        options={{ 
          chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {
                load: function () {
    
                    // set up the updating of the chart each second
                    var series = this.series[0];

                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Math.random()*20;
                        series.addPoint([x, y], true, true);
                        // series1.addPoint([x, dataContainer.product.standardTemp], true, true);

                    }, 5000);
                }
            }
        },
    
        time: {
            useUTC: false
        },
    
        title: {
            text: 'Live random data'
        },
    
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },
    
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150
        },
    
        yAxis: {
            title: {
                text: 'Value'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
    
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
    
        legend: {
            enabled: false
        },
    
        exporting: {
            enabled: false
        },
    
        series: getDataHighChart(true)
        }}
      />
      <Button onClick={handleTroubleshooting} danger>
        Troubleshoot
      </Button>
    </Drawer>
  );
}
