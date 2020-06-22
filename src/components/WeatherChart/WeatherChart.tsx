import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels  from 'chartjs-plugin-datalabels'
import { getWeatherDetails } from '../../store';
import { ABSOLUTE_ZERO } from '../../helpers/constants';

type WeatherChartProps = {
  currentDate: number;
}

function createDate(newDate: Date, tz: number) {
  const date = new Date(newDate.getTime() + (newDate.getTimezoneOffset() * 60000 + tz*1000));
  const hours = "0" + date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
  return formattedTime;
}

export const WeatherChart: React.FC<WeatherChartProps> = ({ currentDate }) => {
  const weatherDetails: WeatherDetails = useSelector(getWeatherDetails);
  const [labels, setLabels] = useState<any>([]);
  const [data, setData] = useState<any>([])

  useEffect(() => {
    if(weatherDetails) {
      const currentWeatherDetails = weatherDetails.list
      .filter((item => item.dt >= currentDate))
      .splice(0,6);
      const preraredDataTime = currentWeatherDetails
        .map(item => createDate(new Date(item.dt*1000), weatherDetails.city.timezone));

      const preparedData = currentWeatherDetails
        .map(item =>  Math.round(item.main.temp + ABSOLUTE_ZERO))
        .map(item => [item, item + 4]);
      setData(preparedData);
      setLabels(preraredDataTime);
    }
  }, [weatherDetails, currentDate])

  let chartData = {
    labels: labels,

    datasets: [
      {
        categoryPercentage: 1,
        barPercentage: 1,
        label: 'temp',
        data: data,
        borderColor: 'rgba(255, 159, 64, 0.9)',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      }
    ]
  }

  return (
    <div className="chart"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: '30%'
      }}
    >
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[ChartDataLabels]}
      />
    </div>
  )
}

const chartOptions = {
  tooltips: {enabled: false},
  hover: {mode: null},
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false
      },
      ticks: {
        fontColor: 'rgba(0, 0, 0, 0.87)',
        fontSize: 14
      }
    }],

    yAxes: [{
      gridLines: {
        display: false,
      },
      ticks: {
        display: false,
        stepSize: 8,
        steps: 8,
        stepValue: 5,
        max: 40
      }
    }],
  },
  tooltip: false,
  plugins: {
    datalabels: {
      align: function(context: any) {
        var chart = context.chart;
        var area = chart.chartArea;
        var meta = chart.getDatasetMeta(context.datasetIndex);
        var model = meta.data[context.dataIndex]._model;
        var bottom = Math.min(model.base, area.bottom);
        var height = bottom - model.y;
        return height <= 0 ? 'end' : 'start'
      },
      anchor: 'end',
      borderColor: null,
      borderRadius: 4,
      borderWidth: 1,
      color: '#223388',
      font: {
        size: 14,
        weight: 600
      },
      offset: 4,
      formatter: function(value: number[]) {
        const formattedValue = value[0] >= 0
          ?  "+" + value[0]
          :  "-" + value[0];
        return formattedValue;
      },
    },
  }
}


