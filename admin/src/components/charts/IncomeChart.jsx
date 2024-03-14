import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

const IncomeChart = ({data}) => {
    const monthlyIncome = Array(12).fill(0); // Initialize array for 12 months

    data?.forEach(order => {
        const createdAt = new Date(order.createdAt);
        const month = createdAt.getMonth();
        const totalPrice = order.totalPrice;
        monthlyIncome[month] += totalPrice.toFixed(2);
    });
    const chartData = 
        {
            options: {
                chart: {
                    id: 'basic-bar',
                    toolbar: {
                      show: false // Hide toolbar for better responsiveness
                    }
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                responsive: [
                    {
                        breakpoint: 768, // Adjust breakpoint as needed
                        options: {
                            chart: {
                                width: 400,
                                height: 300 // Decrease height for smaller screens
                            }
                        }
                    },
                ]
            },
            dataLabels: {
                enabled: true,
            },
            series: [
                {
                    name: "Income",
                    data: monthlyIncome
                }
            ],
        }

    

    
  return (
    <div className='home__chart-box'>
        <h4 className="home__chart-box_title">Incomes</h4>
        <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            width="650"
            height='300'
        />
    </div>
  )
}

export default IncomeChart