// Variáveis globais para controlar as instâncias dos gráficos
let lineChartInstance = null;
let donutChartInstance = null;

window.userElement = document.querySelector("#name");
if (window.userElement) {
    var nome = "Cristian";
    window.userElement.textContent = nome;
}

window.chartElement = document.querySelector("#chart");

// Função para obter as cores do tema atual
function getThemeColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
        tooltipBg: isDark ? '#374151' : '#ffffff',
        tooltipText: isDark ? '#F1F5F9' : '#333333',
        tooltipBorder: isDark ? '#4B5563' : '#E2E8F0',
        gridColor: isDark ? '#4B5563' : '#f0f0f0',
        textColor: isDark ? '#CBD5E1' : '#666',
        strokeColors: isDark ? '#4B5563' : '#fff'
    };
}

function renderLineChart() {
    const el = document.querySelector("#chart");
    if (!el) return;
    
    // Destruir instância anterior se existir
    if (lineChartInstance) {
        lineChartInstance.destroy();
        lineChartInstance = null;
    }
    
    // Limpar o container
    el.innerHTML = '';

    const themeColors = getThemeColors();

    const options = {
        series: [{
            name: "Vendas",
            data: [5000, 15000, 25000, 35000, 20000, 25000]
        }],
        chart: {
            type: 'line',
            height: 300,
            toolbar: { show: false },
            animations: { enabled: true },
            fontFamily: 'Poppins, sans-serif',
            zoom: { enabled: false },
            background: 'transparent'
        },
        stroke: {
            width: 2,  // Linha mais fina
            curve: 'smooth',
            colors: ['#fff']
        },
        grid: {
            show: true,
            borderColor: themeColors.gridColor,
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true,
                    opacity: 0.3
                }
            }
        },
        xaxis: {
            categories: ['1', '5', '10', '15', '25', '30'],
            title: {
                text: 'Dias',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    color: themeColors.textColor,
                    fontSize: '12px'
                }
            },
            labels: {
                style: {
                    colors: themeColors.textColor,
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '11px'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            title: {
                text: 'Valor (R$)',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    color: themeColors.textColor,
                    fontSize: '12px'
                }
            },
            labels: {
                formatter: v => 'R$' + (v / 1000).toFixed(0) + 'k',
                style: {
                    fontFamily: 'Poppins, sans-serif',
                    colors: themeColors.textColor,
                    fontSize: '11px'
                }
            },
            min: 0,
            max: 40000,
            tickAmount: 4
        },
        colors: ['#9B27B0'],
        markers: {
            size: 6,  // Marcadores maiores
            colors: ['#fff'],
            strokeColors: '#9B27B0',
            strokeWidth: 3,  // Borda mais grossa nos marcadores
            hover: {
                size: 8
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: "vertical",
                gradientToColors: ["#E1BEE7"],
                stops: [0, 80, 100],
                opacityFrom: 0.8,
                opacityTo: 0.2
            }
        },
        tooltip: {
            theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
            style: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                color: themeColors.tooltipText
            },
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const value = series[seriesIndex][dataPointIndex];
                const category = w.globals.labels[dataPointIndex];
                return `
                    <div style="
                        background: ${themeColors.tooltipBg}; 
                        color: ${themeColors.tooltipText}; 
                        padding: 8px 12px; 
                        border-radius: 6px; 
                        border: 1px solid ${themeColors.tooltipBorder};
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        font-family: Poppins, sans-serif;
                        font-size: 12px;
                    ">
                        <div style="font-weight: 600; margin-bottom: 2px;">Dia ${category}</div>
                        <div style="color: #9B27B0; font-weight: 500;">R$ ${value.toLocaleString('pt-BR')}</div>
                    </div>
                `;
            }
        }
    };
    lineChartInstance = new ApexCharts(el, options);
    lineChartInstance.render();
}

function renderDonutChart() {
    const el = document.querySelector("#donut-chart");
    if (!el) return;
    
    // Destruir instância anterior se existir
    if (donutChartInstance) {
        donutChartInstance.destroy();
        donutChartInstance = null;
    }
    
    // Limpar o container
    el.innerHTML = '';

    const themeColors = getThemeColors();

    const options = {
        series: [38.6, 22.5, 30.8],
        labels: ["Cancelado", "Finalizado", "Em andamento"],
        chart: {
            type: 'donut',
            height: 300,
            fontFamily: 'Poppins, sans-serif'
        },
        colors: ['#2C044A', '#9B27B0', '#B832F9'],
        stroke: {
            show: true,
            width: 2,
            colors: [themeColors.strokeColors]
        },
        legend: {
            position: 'right',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            markers: { width: 10, height: 10, radius: 12 },
            itemMargin: { vertical: 5 },
            labels: {
                colors: themeColors.textColor
            }
        },
        dataLabels: {
            enabled: false,
            style: {
                fontFamily: 'Poppins, sans-serif'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: false,
                        style: {
                            fontFamily: 'Poppins, sans-serif'
                        }
                    }
                }
            }
        },
        tooltip: {
            theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
            style: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: '12px',
                color: themeColors.tooltipText
            },
            custom: function({series, seriesIndex, w}) {
                const value = series[seriesIndex];
                const label = w.globals.labels[seriesIndex];
                return `
                    <div style="
                        background: ${themeColors.tooltipBg}; 
                        color: ${themeColors.tooltipText}; 
                        padding: 8px 12px; 
                        border-radius: 6px; 
                        border: 1px solid ${themeColors.tooltipBorder};
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        font-family: Poppins, sans-serif;
                        font-size: 12px;
                    ">
                        <div style="font-weight: 600; margin-bottom: 2px;">${label}</div>
                        <div style="color: #9B27B0; font-weight: 500;">${value.toFixed(1)}%</div>
                    </div>
                `;
            }
        }
    };
    donutChartInstance = new ApexCharts(el, options);
    donutChartInstance.render();
}

// Função para inicializar os gráficos com delay para garantir que o DOM esteja pronto
function initializeCharts() {
    setTimeout(() => {
        renderLineChart();
        renderDonutChart();
    }, 100);
}

// Função para limpar todos os gráficos quando sair da página
function cleanupCharts() {
    if (lineChartInstance) {
        lineChartInstance.destroy();
        lineChartInstance = null;
    }
    if (donutChartInstance) {
        donutChartInstance.destroy();
        donutChartInstance = null;
    }
}

// Inicializar os gráficos
initializeCharts();

// Exportar funções para uso global
window.initializeCharts = initializeCharts;
window.cleanupCharts = cleanupCharts;