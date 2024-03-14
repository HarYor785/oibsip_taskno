import React, { useState } from 'react'
import Chart from "react-apexcharts";

const OrdersChart = ({orders}) => {
    let state;

    const statusCounts = {
        'Out for Delivery': 0,
        'Delivered': 0,
        'Processing': 0,
        'Cancelled': 0,
    };

    orders?.forEach(order => {
        statusCounts[order.status]++;
        state = Object.values(statusCounts)
    });
    console.log(state)

    const options = {
        chart: {
            type: "donut",
        },
        labels: ['Out for Delivery', 'Delivered', 'Processing', 'Cancelled'],
        plotOptions: {
            pie: {
                donut: {
                labels: {
                    show: true,
                    name: {
                    fontSize: '15px',
                    offsetY: -10,
                    },
                    value: {
                    fontSize: '30px',
                    fontWeight: 'bold',
                    offsetY: 10,
                    },
                },
                },
            },
        },
        series: [44, 55, 41, 17],
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'left', 
        },
        responsive: [
            {
                breakpoint: 992,
                options: {
                    chart: {
                        width: 500,
                    },
                },
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: 350,
                    },
                },
            },
        ],
      };
  return (
    <div className='home__chart-box'>
        <h4 className="home__chart-box_title">Order Stats</h4>
        <Chart
        options={options}
        series={options.series}
        type="donut"
        width="350"
        
      />
    </div>
  )
}

export default OrdersChart