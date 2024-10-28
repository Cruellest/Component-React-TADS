import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { format, getISOWeek, getYear, parseISO } from 'date-fns';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

function ChartStars({ data, groupBy, viewType }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const aggregateData = (data, groupBy) => {
    const groupedData = {};
    data.forEach((item) => {
      const date = item.date instanceof Date ? item.date : parseISO(item.date);
      let formattedDate;
      if (groupBy === 'day') {
        formattedDate = format(date, 'yyyy-MM-dd');
      } else if (groupBy === 'week') {
        const year = getYear(date);
        const week = getISOWeek(date);
        formattedDate = `${year}-W${week}`;
      } else if (groupBy === 'month') {
        formattedDate = format(date, 'yyyy-MM');
      } else {
        formattedDate = format(date, 'yyyy');
      }
      if (!groupedData[formattedDate]) {
        groupedData[formattedDate] = 0;
      }
      groupedData[formattedDate] += item.stars;
    });
    return Object.entries(groupedData)
      .filter(([_, stars]) => stars > 0)
      .map(([date, stars]) => ({ date, stars }));
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const aggregatedData = aggregateData(data, groupBy);
    const minDate = aggregatedData.length > 0 ? new Date(aggregatedData[0].date) : new Date();

    if (aggregatedData.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: aggregatedData.map((item) => item.date),
          datasets: [
            {
              label: viewType === 'cumulative' ? 'Estrelas Cumulativas' : 'Estrelas por Período',
              data: viewType === 'cumulative'
                ? aggregatedData.map((_, i, arr) =>
                    arr.slice(0, i + 1).reduce((acc, val) => acc + val.stars, 0)
                  )
                : aggregatedData.map((item) => item.stars),
              borderColor: '#3f51b5',
              backgroundColor: 'rgba(63, 81, 181, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.3,
              pointRadius: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                font: {
                  size: 14,
                },
                color: '#333',
              },
            },
            tooltip: {
              backgroundColor: '#3f51b5',
              titleColor: '#fff',
              bodyColor: '#fff',
              titleFont: {
                size: 14,
              },
              bodyFont: {
                size: 12,
              },
              callbacks: {
                title: (tooltipItems) => `Data: ${tooltipItems[0].label}`,
                label: (tooltipItem) => `Estrelas: ${tooltipItem.raw}`,
              },
              padding: 10,
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: groupBy,
                tooltipFormat: groupBy === 'week' ? 'yyyy-MM-dd' : 'PP',
              },
              title: {
                display: true,
                text: 'Data',
                color: '#333',
                font: {
                  size: 13,
                  weight: 'bold',
                },
              },
              min: minDate,
              grid: {
                color: 'rgba(200, 200, 200, 0.1)',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Número de Estrelas',
                color: '#333',
                font: {
                  size: 13,
                  weight: 'bold',
                },
              },
              grid: {
                color: 'rgba(200, 200, 200, 0.1)',
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, groupBy, viewType]);

  return (
    <div style={{ position: 'relative', height: '450px', width: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default ChartStars;
