// ============================
// CHARTS-MAIN.JS - Visualization Engine
// Dashboards e gráficos interativos com Chart.js
// ============================

let companiesData = [];
let charts = {};

// ============================
// Initialization
// ============================
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    // 💡 INICIA LÓGICA DO MODAL
    initializeModalHandling();
    createAllCharts();
    initializeRiskMatrix();
});

function loadData() {
    companiesData = COMPANIES_DATABASE || [];
    console.log(`✅ ${companiesData.length} empresas carregadas para visualização`);
}

function createAllCharts() {
    createScoreDistribution();
    createSectorDistribution();
    createValuationMatrix();
    createGrowthValueChart();
    createPerformanceChart(); // RESTAURADO: Top 10 YTD
    createWorstPerformanceChart(); // Piores 10 YTD
    createMarketCapChart();
    createRecommendationChart();
}

// ============================
// LÓGICA DO MODAL (REUTILIZÁVEL)
// ============================
function showModal(title, companies) {
    const modal = document.getElementById('dataModal');
    const modalTitle = document.getElementById('modalTitle');
    const list = document.getElementById('modalCompanyList');

    modalTitle.textContent = title;
    list.innerHTML = ''; // Clear previous list

    if (companies.length === 0) {
        list.innerHTML = '<li>Nenhuma empresa encontrada nesta categoria.</li>';
    } else {
        // Ordena por Score para dar uma ordem de qualidade
        companies.sort((a, b) => (b.score || 0) - (a.score || 0)).forEach(company => {
            const li = document.createElement('li');
            const ups = company.upside !== undefined ? `↑ ${company.upside.toFixed(1)}%` : '';
            li.innerHTML = `<strong>${company.ticker}, ${company.score ?? 'N/A'}</strong>${ups}`;
            list.appendChild(li);
        });
    }

    modal.style.display = 'block';
}

function initializeModalHandling() {
    const modal = document.getElementById('dataModal');
    const closeBtn = document.querySelector('.close-btn');

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// ============================
// 1. Score Distribution (Adicionado onClick)
// ============================
function createScoreDistribution() {
    const ctx = document.getElementById('score-distribution-chart').getContext('2d');
    
    // Create score buckets
    const buckets = {
        '85-100': 0,
        '70-84': 0,
        '55-69': 0,
        '40-54': 0
    };
    
    companiesData.forEach(company => {
        const score = company.score;
        if (score >= 85) buckets['85-100']++;
        else if (score >= 70) buckets['70-84']++;
        else if (score >= 55) buckets['55-69']++;
        else buckets['40-54']++;
    });
    
    charts.scoreDistribution = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(buckets),
            datasets: [{
                label: 'Número de Empresas',
                data: Object.values(buckets),
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#991b1b'
                ],
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            onClick: (e) => {
                const activePoints = charts.scoreDistribution.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
                if (activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const label = charts.scoreDistribution.data.labels[firstPoint.index];
                    const [min, max] = label.split('-').map(Number);
                    
                    const filteredCompanies = companiesData.filter(c => c.score >= min && c.score <= max);
                    showModal(`Score entre ${label}`, filteredCompanies);
                }
            }
        }
    });
}

// ============================
// 2. Sector Distribution (Adicionado onClick)
// ============================
function createSectorDistribution() {
    const ctx = document.getElementById('sector-distribution-chart').getContext('2d');
    
    // Count companies by sector
    const sectorCounts = {};
    companiesData.forEach(company => {
        sectorCounts[company.sector] = (sectorCounts[company.sector] || 0) + 1;
    });
    
    // Sort by count
    const sortedSectors = Object.entries(sectorCounts)
        .sort((a, b) => b[1] - a[1]);
    
    const colors = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'
    ];
    
    charts.sectorDistribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sortedSectors.map(s => s[0]),
            datasets: [{
                data: sortedSectors.map(s => s[1]),
                backgroundColor: colors,
                borderColor: '#1f2937',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e5e7eb',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            onClick: (e) => {
                const activePoints = charts.sectorDistribution.getElementsAtEventForMode(e, 'point', { intersect: true }, true);
                if (activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const sector = charts.sectorDistribution.data.labels[firstPoint.index];
                    
                    const filteredCompanies = companiesData.filter(c => c.sector === sector);
                    showModal(`${sector}`, filteredCompanies);
                }
            }
        }
    });
}

// ============================
// 3. Valuation Matrix (ROE vs P/L)
// ============================
function createValuationMatrix() {
    const ctx = document.getElementById('valuation-matrix-chart').getContext('2d');
    
    const data = companiesData
        .filter(c => c.metrics.pe > 0 && c.metrics.roe > 0)
        .map(company => ({
            x: company.metrics.pe,
            y: company.metrics.roe,
            r: Math.sqrt(company.marketCap / 1000000000) * 5,
            label: company.ticker
        }));
    
    charts.valuationMatrix = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Empresas',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: '#3b82f6',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Ticker: ${point.label}`,
                                `P/L: ${point.x.toFixed(2)}x`,
                                `ROE: ${point.y.toFixed(1)}%`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'P/L (quanto menor, mais barato)',
                        color: '#e5e7eb'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'ROE % (quanto maior, melhor)',
                        color: '#e5e7eb'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb'
                    }
                }
            }
        }
    });
}

// ============================
// 4. Growth vs Value (Upside vs Score)
// ============================
function createGrowthValueChart() {
    const ctx = document.getElementById('growth-value-chart').getContext('2d');
    
    const data = companiesData.map(company => ({
        x: company.score,
        y: company.upside,
        r: Math.sqrt(company.marketCap / 1000000000) * 5,
        label: company.ticker,
        backgroundColor: company.recommendation === 'STRONG BUY' ? '#10b981' :
                        company.recommendation === 'BUY' ? '#3b82f6' :
                        company.recommendation === 'HOLD' ? '#f59e0b' : '#ef4444'
    }));
    
    charts.growthValue = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                label: 'Empresas',
                data: data,
                backgroundColor: data.map(d => d.backgroundColor),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const point = context.raw;
                            return [
                                `Ticker: ${point.label}`,
                                `Score: ${point.x}`,
                                `Upside: ${point.y.toFixed(1)}%`
                            ];
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Score de Qualidade',
                        color: '#e5e7eb'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Upside Potencial (%)',
                        color: '#e5e7eb'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb'
                    }
                }
            }
        }
    });
}

// ============================
// 5. Performance YTD Chart (Top 10 - RESTAURADO)
// ============================
function createPerformanceChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    
    // Sort by YTD performance and get top 10
    const top10 = [...companiesData]
        .sort((a, b) => b.performance.ytd - a.performance.ytd)
        .slice(0, 10);
    
    charts.performance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top10.map(c => c.ticker),
            datasets: [{
                label: 'Performance YTD 2025 (%)',
                data: top10.map(c => c.performance.ytd),
                backgroundColor: top10.map(c => c.performance.ytd > 0 ? '#10b981' : '#ef4444'),
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#e5e7eb',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// ============================
// 6. Worst Performance YTD Chart (Piores 10)
// ============================
function createWorstPerformanceChart() {
    // Reutiliza o canvas ID do antigo Top Dividend Yields
    const ctx = document.getElementById('dividend-chart').getContext('2d');
    
    // Filtra empresas com performance YTD e ordena ascendente (Piores 10)
    const worst10 = [...companiesData]
        .filter(c => typeof c.performance.ytd === 'number')
        .sort((a, b) => a.performance.ytd - b.performance.ytd)
        .slice(0, 10);
    
    charts.worstPerformance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: worst10.map(c => c.ticker),
            datasets: [{
                label: 'Performance YTD 2025 (%)',
                data: worst10.map(c => c.performance.ytd),
                // Cor: Vermelho para performance negativa, Azul (padrão) para positiva (caso haja)
                backgroundColor: worst10.map(c => c.performance.ytd < 0 ? '#ef4444' : '#3b82f6'),
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Gráfico de barras horizontal
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#e5e7eb',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}


function initializeRiskMatrix() {
    const canvas = document.getElementById('risk-matrix-canvas');
    if (!canvas) return;

    // Garante que o tooltip exista
    let tooltip = document.getElementById('matrix-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'matrix-tooltip';
        tooltip.className = 'matrix-tooltip';
        document.body.appendChild(tooltip);
    }

    const ctx = canvas.getContext('2d');

    // Configurações visuais / escala
    const container = canvas.parentElement;
    const CSS_HEIGHT = 600; // altura em CSS pixels (ajuste se necessário)
    const PADDING = 60;

    const IDEAL_MIN_RISK = 0.0;
    const IDEAL_MAX_RISK = 100.0;
    const IDEAL_MIN_UPSIDE = 0.0; 
    const IDEAL_MAX_UPSIDE = 80.0;
    const CUT_OFF_RISK = 50.0;
    const CUT_OFF_UPSIDE = 25.0;

    // SHIFT solicitado pelo usuário: puxar tooltip 300px à esquerda e 50px para cima
    const SHIFT_X = 300; // px para a esquerda (subtrai)
    const SHIFT_Y = 50;  // px para cima (subtrai)

    // Configura canvas considerando devicePixelRatio
    function configureCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const cssWidth = container.offsetWidth;
        const cssHeight = CSS_HEIGHT;

        canvas.style.width = cssWidth + 'px';
        canvas.style.height = cssHeight + 'px';

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);

        // Normaliza o contexto para coordenadas em CSS pixels
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        return { width: cssWidth, height: cssHeight, padding: PADDING };
    }

    let width, height, padding;
    function updateScales() {
        const dims = configureCanvas();
        width = dims.width;
        height = dims.height;
        padding = dims.padding;
    }

    updateScales();

    const scaleX = (riskScore) => {
        const clampedRisk = Math.max(IDEAL_MIN_RISK, Math.min(IDEAL_MAX_RISK, riskScore));
        return padding + (clampedRisk - IDEAL_MIN_RISK) / (IDEAL_MAX_RISK - IDEAL_MIN_RISK) * (width - 2 * padding);
    };

    const scaleY = (upside) => {
        const clampedUpside = Math.max(IDEAL_MIN_UPSIDE, Math.min(IDEAL_MAX_UPSIDE, upside));
        return height - padding - (clampedUpside - IDEAL_MIN_UPSIDE) / (IDEAL_MAX_UPSIDE - IDEAL_MIN_UPSIDE) * (height - 2 * padding);
    };

    // Função que desenha matriz e pontos e grava coordenadas CSS nos objetos companiesData
    function drawMatrix() {
        const cutX = scaleX(CUT_OFF_RISK);
        const cutY = scaleY(CUT_OFF_UPSIDE);

        ctx.clearRect(0, 0, width, height);

        // Quadrantes coloridos
        const topHeight = cutY - padding;
        const bottomHeight = height - padding - cutY;

        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.fillRect(padding, padding, cutX - padding, topHeight);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
        ctx.fillRect(cutX, padding, width - cutX - padding, topHeight);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.fillRect(padding, cutY, cutX - padding, bottomHeight);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
        ctx.fillRect(cutX, cutY, width - cutX - padding, bottomHeight);

        // Linhas e labels (simples)
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(padding, cutY); ctx.lineTo(width - padding, cutY); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cutX, padding); ctx.lineTo(cutX, height - padding); ctx.stroke();

        // charts-main.js: Dentro da function drawMatrix()

        // [3. RÓTULOS DOS EIXOS]
        ctx.fillStyle = '#e5e7eb';
        ctx.font = '12px Inter';
        
        // A. RÓTULOS DO EIXO X (Risco Score Compósito)
        ctx.textAlign = 'center';
        ctx.fillText('Risco →', width / 2, height - 20);
        
        // Valores de Escala X: 0, 50, 100
        ctx.textAlign = 'left';
        ctx.fillText(IDEAL_MIN_RISK.toFixed(0), padding, height - padding + 15); // 0
        ctx.textAlign = 'center';
        ctx.fillText(CUT_OFF_RISK.toFixed(0), cutX, height - padding + 15); // 50
        ctx.textAlign = 'right';
        ctx.fillText(IDEAL_MAX_RISK.toFixed(0), width - padding, height - padding + 15); // 100

        // B. RÓTULOS DO EIXO Y (Retorno Upside %)
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Upside →', 0, 0);
        ctx.restore();
        
        // Valores de Escala Y: 0%, 25%, 80% (IDEAL_MIN_UPSIDE agora é 0.0)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(IDEAL_MAX_UPSIDE.toFixed(0) + '%', padding - 5, padding); // 80%
        ctx.fillText(CUT_OFF_UPSIDE.toFixed(0) + '%', padding - 5, cutY); // 25%
        // O rótulo IDEAL_MIN_UPSIDE agora deve ser 0% no ponto mais baixo (height - padding)
        ctx.fillText(IDEAL_MIN_UPSIDE.toFixed(0) + '%', padding - 5, height - padding); // 0%
        
        // [Fim de 3. RÓTULOS DOS EIXOS]

        // Desenho dos pontos e armazenamento das coordenadas em CSS pixels
        companiesData.forEach(company => {
            const riskScore = (typeof calculateRiskScore === 'function') ? calculateRiskScore(company) : (company.metrics?.beta ?? 0) * 25;
            const x = scaleX(riskScore);
            const y = scaleY(company.upside ?? 0);
            const radius = 6;

            let color;
            if (riskScore < CUT_OFF_RISK && (company.upside ?? 0) >= CUT_OFF_UPSIDE) color = '#10b981';
            else if (riskScore >= CUT_OFF_RISK && (company.upside ?? 0) >= CUT_OFF_UPSIDE) color = '#f59e0b';
            else if (riskScore < CUT_OFF_RISK) color = '#3b82f6';
            else color = '#ef4444';

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#0f172a';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Guarda coordenadas CSS para posicionamento do tooltip
            company._chartX = x;
            company._chartY = y;
            company._chartRadius = radius;
            company._riskScore = riskScore;
        });
    }

    // Desenha inicialmente
    drawMatrix();

    // Evento mousemove: detecta ponto mais próximo e posiciona tooltip
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect(); // CSS pixels relativos à viewport
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let hoveredCompany = null;
        let minDistance = Infinity;

        companiesData.forEach(company => {
            if (typeof company._chartX !== 'number' || typeof company._chartY !== 'number') return;
            const dx = mouseX - company._chartX;
            const dy = mouseY - company._chartY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const threshold = (company._chartRadius || 6) + 8;
            if (distance <= threshold && distance < minDistance) {
                minDistance = distance;
                hoveredCompany = company;
            }
        });

        if (hoveredCompany) {
            tooltip.style.display = 'block';
            canvas.style.cursor = 'pointer';

             // 2. GERA O CONTEÚDO
            const riskScore = hoveredCompany._riskScore ? hoveredCompany._riskScore.toFixed(0) : 'N/A';
            
            // 💡 CORREÇÃO: Usar <span> com display: block para quebra de linha sem margens extras.
            tooltip.innerHTML = `
                <strong>${hoveredCompany.ticker}</strong>
                <span style="display: block;">${hoveredCompany.name || ''}</span>
                <span style="display: block;">Risco: ${riskScore}/100</span>
                <span style="display: block;">Upside: ${hoveredCompany.upside !== undefined ? hoveredCompany.upside.toFixed(1) : 'N/A'}%</span>
                <span style="display: block;">Score: ${hoveredCompany.score ?? 'N/A'}</span>
                <span style="display: block;">Recom: ${hoveredCompany.recommendation ?? 'N/A'}</span>
            `;

            // estilos essenciais
            tooltip.style.position = 'fixed';
            tooltip.style.zIndex = '99999';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.display = 'block';

            // Medidas do tooltip após inserir conteúdo
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            const offset = 12;
            const screenPadding = 12;

            // Ponto do canvas em coordenadas de viewport
            const pointClientX = rect.left + hoveredCompany._chartX;
            const pointClientY = rect.top + hoveredCompany._chartY;

            // Posição padrão (à direita e abaixo do ponto)
            let finalLeft = Math.round(pointClientX + offset);
            let finalTop = Math.round(pointClientY + offset);

            // Inverte horizontal se estourar a viewport
            if (finalLeft + tooltipWidth > window.innerWidth - screenPadding) {
                finalLeft = Math.round(pointClientX - tooltipWidth - offset);
            }
            // Inverte vertical se estourar a viewport
            if (finalTop + tooltipHeight > window.innerHeight - screenPadding) {
                finalTop = Math.round(pointClientY - tooltipHeight - offset);
            }

            // --- APLICA SHIFT FIXO SOLICITADO ---
            finalLeft = finalLeft - SHIFT_X; // puxa 300px para a esquerda
            finalTop = finalTop - SHIFT_Y;   // puxa 50px para cima
            // -------------------------------------

            // Clamp final para não sair da tela
            if (finalLeft < screenPadding) finalLeft = screenPadding;
            if (finalTop < screenPadding) finalTop = screenPadding;
            if (finalLeft + tooltipWidth > window.innerWidth - screenPadding) finalLeft = window.innerWidth - tooltipWidth - screenPadding;
            if (finalTop + tooltipHeight > window.innerHeight - screenPadding) finalTop = window.innerHeight - tooltipHeight - screenPadding;

            // Aplica posição
            tooltip.style.left = `${finalLeft}px`;
            tooltip.style.top = `${finalTop}px`;
        } else {
            tooltip.style.display = 'none';
            canvas.style.cursor = 'default';
        }
    });

    // Esconde tooltip quando o mouse sai do canvas
    canvas.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
        canvas.style.cursor = 'default';
    });

    // Redesenha ao redimensionar (debounce)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateScales();
            drawMatrix();
        }, 120);
    });
}


// ============================
// 7. Worst Performance YTD Chart (Piores 10)
// ============================
function createWorstPerformanceChart() {
    // Reutiliza o canvas ID do antigo Top Dividend Yields
    const ctx = document.getElementById('dividend-chart').getContext('2d');
    
    // Filtra empresas com performance YTD e ordena ascendente (Piores 10)
    const worst10 = [...companiesData]
        .filter(c => typeof c.performance.ytd === 'number')
        .sort((a, b) => a.performance.ytd - b.performance.ytd)
        .slice(0, 7);
    
    charts.worstPerformance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: worst10.map(c => c.ticker),
            datasets: [{
                label: 'Performance YTD 2025 (%)',
                data: worst10.map(c => c.performance.ytd),
                // Cor: Vermelho para performance negativa, Azul (padrão) para positiva (caso haja)
                backgroundColor: worst10.map(c => c.performance.ytd < 0 ? '#ef4444' : '#3b82f6'),
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Gráfico de barras horizontal
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#e5e7eb',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// ============================
// 8. Market Cap Distribution
// ============================
function createMarketCapChart() {
    const ctx = document.getElementById('marketcap-chart').getContext('2d');
    
    // Sort by market cap
    const sorted = [...companiesData].sort((a, b) => b.marketCap - a.marketCap);
    
    charts.marketCap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sorted.map(c => c.ticker),
            datasets: [{
                label: 'Market Cap (R$ Bilhões)',
                data: sorted.map(c => c.marketCap / 1000000000),
                backgroundColor: '#3b82f6',
                borderColor: '#1f2937',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#e5e7eb',
                        callback: function(value) {
                            return 'R$ ' + value.toFixed(1) + 'B';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#e5e7eb',
                        font: {
                            size: 10
                        }
                    }
                }
            }
        }
    });
}

// ============================
// 9. Recommendation Distribution (Adicionado onClick)
// ============================
function createRecommendationChart() {
    const ctx = document.getElementById('recommendation-chart').getContext('2d');
    
    // Count by recommendation
    const recCounts = {
        'STRONG BUY': 0,
        'BUY': 0,
        'HOLD': 0,
        'SPECULATIVE BUY': 0,
        'HIGH RISK': 0
    };
    
    companiesData.forEach(company => {
        if (recCounts.hasOwnProperty(company.recommendation)) {
            recCounts[company.recommendation]++;
        }
    });
    
    charts.recommendation = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(recCounts),
            datasets: [{
                data: Object.values(recCounts),
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#8b5cf6',
                    '#ef4444'
                ],
                borderColor: '#1f2937',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e5e7eb',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            onClick: (e) => {
                const activePoints = charts.recommendation.getElementsAtEventForMode(e, 'point', { intersect: true }, true);
                if (activePoints.length > 0) {
                    const firstPoint = activePoints[0];
                    const recommendation = charts.recommendation.data.labels[firstPoint.index];
                    
                    const filteredCompanies = companiesData.filter(c => c.recommendation === recommendation);
                    showModal(`${recommendation}`, filteredCompanies);
                }
            }
        }
    });
}