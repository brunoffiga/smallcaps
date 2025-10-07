// ============================
// SECTORS-MAIN.JS - Setor Analysis Engine
// Análise completa por setores e subsegmentos
// ============================

let companiesData = [];
let sectorData = {};

// ============================
// Initialization
// ============================
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    analyzeSectors();
    displaySectorOverview();
    displaySectorPerformance();
    displaySectorValuation();
    displaySectorRankings();
    displaySectorTrends();
    populateSectorSelector();
});

function loadData() {
    companiesData = COMPANIES_DATABASE || [];
    console.log(`✅ ${companiesData.length} empresas carregadas para análise setorial`);
}

function analyzeSectors() {
    // Group companies by sector
    sectorData = {};
    
    companiesData.forEach(company => {
        if (!sectorData[company.sector]) {
            sectorData[company.sector] = {
                name: company.sector,
                companies: [],
                metrics: {}
            };
        }
        sectorData[company.sector].companies.push(company);
    });
    
    // Calculate sector metrics
    Object.keys(sectorData).forEach(sector => {
        const companies = sectorData[sector].companies;
        
        sectorData[sector].metrics = {
            count: companies.length,
            avgScore: companies.reduce((sum, c) => sum + c.score, 0) / companies.length,
            avgUpside: companies.reduce((sum, c) => sum + c.upside, 0) / companies.length,
            avgROE: companies.reduce((sum, c) => sum + c.metrics.roe, 0) / companies.length,
            avgPE: companies.filter(c => c.metrics.pe > 0).reduce((sum, c) => sum + c.metrics.pe, 0) / 
                   companies.filter(c => c.metrics.pe > 0).length,
            avgMargin: companies.reduce((sum, c) => sum + c.metrics.ebitdaMargin, 0) / companies.length,
            avgYTD: companies.reduce((sum, c) => sum + c.performance.ytd, 0) / companies.length,
            totalMarketCap: companies.reduce((sum, c) => sum + c.marketCap, 0)
        };
    });
    
    console.log('✅ Análise setorial concluída', sectorData);
}

// ============================
// 1. Sector Overview
// ============================
function displaySectorOverview() {
    const container = document.getElementById('sector-overview');
    
    const sectors = Object.values(sectorData);
    const totalCompanies = companiesData.length;
    
    container.innerHTML = `
        <div class="sector-overview-grid">
            ${sectors.map(sector => `
                <div class="sector-overview-card">
                    <div class="sector-name">${sector.name}</div>
                    <div class="sector-count">${sector.companies.length} empresas</div>
                    <div class="sector-percentage">${((sector.companies.length / totalCompanies) * 100).toFixed(1)}% do universo</div>
                    <div class="sector-marketcap">Market Cap: ${formatLargeNumber(sector.metrics.totalMarketCap)}</div>
                    <div class="sector-score ${getScoreClass(sector.metrics.avgScore)}">
                        Score Médio: ${sector.metrics.avgScore.toFixed(0)}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="sector-summary">
            <p><strong>Total:</strong> ${totalCompanies} empresas em ${sectors.length} setores</p>
            <p><strong>Market Cap Total:</strong> ${formatLargeNumber(
                sectors.reduce((sum, s) => sum + s.metrics.totalMarketCap, 0)
            )}</p>
        </div>
    `;
}

// ============================
// 2. Sector Performance
// ============================
function displaySectorPerformance() {
    const container = document.getElementById('sector-performance');
    
    const sectors = Object.values(sectorData).sort((a, b) => 
        b.metrics.avgYTD - a.metrics.avgYTD
    );
    
    container.innerHTML = `
        <div class="performance-chart">
            ${sectors.map(sector => {
                const ytd = sector.metrics.avgYTD;
                const barWidth = Math.abs(ytd) * 3;
                
                return `
                    <div class="performance-row">
                        <div class="performance-label">${sector.name}</div>
                        <div class="performance-bar-container">
                            <div class="performance-bar ${ytd > 0 ? 'positive' : 'negative'}" 
                                 style="width: ${barWidth}px">
                            </div>
                            <span class="performance-value ${ytd > 0 ? 'upside-positive' : 'upside-negative'}">
                                ${formatPercentage(ytd)}
                            </span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <div class="performance-insights">
            <h3>💡 Insights de Performance</h3>
            <ul>
                <li><strong>Melhor Performance:</strong> ${sectors[0].name} (${formatPercentage(sectors[0].metrics.avgYTD)})</li>
                <li><strong>Pior Performance:</strong> ${sectors[sectors.length-1].name} (${formatPercentage(sectors[sectors.length-1].metrics.avgYTD)})</li>
                <li><strong>Média Geral:</strong> ${formatPercentage(
                    sectors.reduce((sum, s) => sum + s.metrics.avgYTD, 0) / sectors.length
                )}</li>
            </ul>
        </div>
    `;
}

// ============================
// 3. Sector Valuation
// ============================
function displaySectorValuation() {
    const container = document.getElementById('sector-valuation');
    
    const sectors = Object.values(sectorData);
    
    container.innerHTML = `
        <div class="valuation-table">
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Setor</th>
                        <th>P/L Médio</th>
                        <th>ROE Médio</th>
                        <th>Margem EBITDA</th>
                        <th>Upside Médio</th>
                        <th>Empresas</th>
                    </tr>
                </thead>
                <tbody>
                    ${sectors.map(sector => `
                        <tr>
                            <td><strong>${sector.name}</strong></td>
                            <td>${sector.metrics.avgPE.toFixed(2)}x</td>
                            <td>${sector.metrics.avgROE.toFixed(1)}%</td>
                            <td>${sector.metrics.avgMargin.toFixed(1)}%</td>
                            <td class="upside-positive">${formatPercentage(sector.metrics.avgUpside)}</td>
                            <td>${sector.companies.length}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="valuation-insights">
            <h3>🎯 Análise de Valuation</h3>
            <p>Setores com melhor combinação de <strong>valuation</strong> (P/L baixo) e <strong>qualidade</strong> (ROE alto) 
            oferecem oportunidades mais atrativas de risco-retorno ajustado.</p>
        </div>
    `;
}

// ============================
// 4. Sector Detail
// ============================
function populateSectorSelector() {
    const select = document.getElementById('sector-select');
    
    Object.keys(sectorData).forEach(sector => {
        const option = new Option(sector, sector);
        select.add(option);
    });
}

function displaySectorDetail() {
    const sectorName = document.getElementById('sector-select').value;
    const container = document.getElementById('sector-detail');
    
    if (!sectorName) {
        container.innerHTML = '';
        return;
    }
    
    const sector = sectorData[sectorName];
    const companies = sector.companies.sort((a, b) => b.score - a.score);
    
    container.innerHTML = `
        <div class="sector-detail-header">
            <h3>${sectorName}</h3>
            <p>${companies.length} empresas mapeadas</p>
        </div>
        
        <div class="sector-metrics-summary">
            <div class="metric-box">
                <div class="metric-label">Score Médio</div>
                <div class="metric-value ${getScoreClass(sector.metrics.avgScore)}">
                    ${sector.metrics.avgScore.toFixed(0)}
                </div>
            </div>
            <div class="metric-box">
                <div class="metric-label">ROE Médio</div>
                <div class="metric-value">${sector.metrics.avgROE.toFixed(1)}%</div>
            </div>
            <div class="metric-box">
                <div class="metric-label">P/L Médio</div>
                <div class="metric-value">${sector.metrics.avgPE.toFixed(2)}x</div>
            </div>
            <div class="metric-box">
                <div class="metric-label">Upside Médio</div>
                <div class="metric-value upside-positive">${formatPercentage(sector.metrics.avgUpside)}</div>
            </div>
        </div>
        
        <div class="sector-companies-table">
            <h4>📋 Empresas do Setor</h4>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Ticker</th>
                        <th>Empresa</th>
                        <th>Score</th>
                        <th>Upside</th>
                        <th>ROE</th>
                        <th>P/L</th>
                        <th>Recomendação</th>
                    </tr>
                </thead>
                <tbody>
                    ${companies.map((company, index) => `
                        <tr class="${index < 3 ? 'highlight-row' : ''}">
                            <td>${index + 1}</td>
                            <td><strong>${company.ticker}</strong></td>
                            <td>${company.name}</td>
                            <td class="${getScoreClass(company.score)}">${company.score}</td>
                            <td class="upside-positive">${formatPercentage(company.upside)}</td>
                            <td>${company.metrics.roe.toFixed(1)}%</td>
                            <td>${company.metrics.pe > 0 ? company.metrics.pe.toFixed(2) + 'x' : 'N/A'}</td>
                            <td class="${getRecommendationClass(company.recommendation)}">
                                ${company.recommendation}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="sector-analysis">
            <h4>🔍 Análise do Setor</h4>
            <div class="sector-analysis-text">
                ${getSectorAnalysisText(sectorName, sector)}
            </div>
        </div>
    `;
}

function getSectorAnalysisText(sectorName, sector) {
    const avgScore = sector.metrics.avgScore;
    const avgROE = sector.metrics.avgROE;
    const avgUpside = sector.metrics.avgUpside;
    const ytd = sector.metrics.avgYTD;
    
    let analysis = `<p>O setor de <strong>${sectorName}</strong> `;
    
    if (avgScore > 75) {
        analysis += 'apresenta <strong>qualidade excepcional</strong>, com fundamentos sólidos e empresas bem posicionadas. ';
    } else if (avgScore > 65) {
        analysis += 'mostra <strong>boa qualidade</strong> geral, com fundamentos satisfatórios. ';
    } else {
        analysis += 'tem qualidade moderada, demandando análise mais criteriosa. ';
    }
    
    if (avgROE > 20) {
        analysis += 'A <strong>rentabilidade</strong> do setor é excelente, com ROE médio de ' + avgROE.toFixed(1) + '%. ';
    } else if (avgROE > 15) {
        analysis += 'A rentabilidade é satisfatória, com ROE médio de ' + avgROE.toFixed(1) + '%. ';
    } else {
        analysis += 'A rentabilidade está abaixo da média, com ROE de ' + avgROE.toFixed(1) + '%. ';
    }
    
    if (avgUpside > 25) {
        analysis += 'O setor oferece <strong>potencial de upside significativo</strong> (' + formatPercentage(avgUpside) + '), atraindo interesse de investidores. ';
    } else if (avgUpside > 15) {
        analysis += 'Há um upside moderado de ' + formatPercentage(avgUpside) + ' projetado. ';
    } else {
        analysis += 'O upside é limitado (' + formatPercentage(avgUpside) + '). ';
    }
    
    if (ytd > 15) {
        analysis += 'Em 2025, o setor tem apresentado <strong>performance forte</strong> com valorização YTD de ' + formatPercentage(ytd) + '.';
    } else if (ytd > 5) {
        analysis += 'A performance YTD 2025 é positiva em ' + formatPercentage(ytd) + '.';
    } else if (ytd < -5) {
        analysis += 'O setor enfrenta <strong>desafios</strong>, com queda de ' + formatPercentage(ytd) + ' em 2025.';
    } else {
        analysis += 'A performance está lateralizada em 2025.';
    }
    
    analysis += '</p>';
    
    return analysis;
}

// ============================
// 5. Sector Rankings
// ============================
function displaySectorRankings() {
    const container = document.getElementById('sector-rankings');
    
    const sectors = Object.values(sectorData);
    
    // Rankings
    const byScore = [...sectors].sort((a, b) => b.metrics.avgScore - a.metrics.avgScore);
    const byROE = [...sectors].sort((a, b) => b.metrics.avgROE - a.metrics.avgROE);
    const byUpside = [...sectors].sort((a, b) => b.metrics.avgUpside - a.metrics.avgUpside);
    const byYTD = [...sectors].sort((a, b) => b.metrics.avgYTD - a.metrics.avgYTD);
    
    container.innerHTML = `
        <div class="rankings-grid">
            <div class="ranking-column">
                <h3>🏆 Por Qualidade (Score)</h3>
                <ol>
                    ${byScore.map((s, i) => `
                        <li class="${i < 3 ? 'top-3' : ''}">
                            <strong>${s.name}</strong>
                            <span class="${getScoreClass(s.metrics.avgScore)}">${s.metrics.avgScore.toFixed(0)}</span>
                        </li>
                    `).join('')}
                </ol>
            </div>
            
            <div class="ranking-column">
                <h3>💰 Por Rentabilidade (ROE)</h3>
                <ol>
                    ${byROE.map((s, i) => `
                        <li class="${i < 3 ? 'top-3' : ''}">
                            <strong>${s.name}</strong>
                            <span>${s.metrics.avgROE.toFixed(1)}%</span>
                        </li>
                    `).join('')}
                </ol>
            </div>
            
            <div class="ranking-column">
                <h3>🚀 Por Potencial (Upside)</h3>
                <ol>
                    ${byUpside.map((s, i) => `
                        <li class="${i < 3 ? 'top-3' : ''}">
                            <strong>${s.name}</strong>
                            <span class="upside-positive">${formatPercentage(s.metrics.avgUpside)}</span>
                        </li>
                    `).join('')}
                </ol>
            </div>
            
            <div class="ranking-column">
                <h3>📈 Por Performance YTD</h3>
                <ol>
                    ${byYTD.map((s, i) => `
                        <li class="${i < 3 ? 'top-3' : ''}">
                            <strong>${s.name}</strong>
                            <span class="${s.metrics.avgYTD > 0 ? 'upside-positive' : 'upside-negative'}">
                                ${formatPercentage(s.metrics.avgYTD)}
                            </span>
                        </li>
                    `).join('')}
                </ol>
            </div>
        </div>
    `;
}

// ============================
// 6. Sector Trends
// ============================
function displaySectorTrends() {
    const container = document.getElementById('sector-trends');
    
    const trends = {
        'Construção Civil': {
            trend: 'positiva',
            catalysts: [
                'Renovação MCMV 2026 com orçamento ampliado',
                'Queda da Selic projetada para 2026',
                'Déficit habitacional de 8M unidades',
                'Crédito imobiliário crescendo 15% aa'
            ],
            risks: [
                'Sensibilidade à taxa de juros',
                'Inflação de insumos (cimento, aço)',
                'Aprovação de projetos (burocracia)'
            ]
        },
        'Energia': {
            trend: 'estável',
            catalysts: [
                'Demanda crescente por energia limpa',
                'Leilões de transmissão regulares',
                'Receita regulada previsível (RAP)',
                'Expansão LATAM (Peru, Colômbia)'
            ],
            risks: [
                'Risco regulatório ANEEL',
                'Inadimplência distribuidoras',
                'Capex intensivo'
            ]
        },
        'Tecnologia': {
            trend: 'positiva',
            catalysts: [
                'Digitalização acelerada pós-pandemia',
                'E-commerce crescimento estrutural',
                'Fintech/cashback ganhando share',
                'IA e automação'
            ],
            risks: [
                'Competição intensa (BigTechs)',
                'Ciclo de funding restrito',
                'Regulação fintech aumentando'
            ]
        },
        'Varejo': {
            trend: 'moderada',
            catalysts: [
                'Recuperação consumo classes C/D',
                'Expansão omnichannel',
                'Internacionalização (LATAM)',
                'Programas fidelidade'
            ],
            risks: [
                'Sensibilidade a desemprego',
                'Competição e-commerce vs físico',
                'Margens pressionadas'
            ]
        },
        'Agronegócio': {
            trend: 'volatil',
            catalysts: [
                'Demanda China por grãos e proteínas',
                'Valorização de terras agrícolas',
                'Tecnologia (agricultura de precisão)',
                'Halal markets (MENA)'
            ],
            risks: [
                'Volatilidade preços commodities',
                'Clima (La Niña / El Niño)',
                'Câmbio USD/BRL',
                'Logística (portos, ferrovias)'
            ]
        },
        'Saúde': {
            trend: 'positiva',
            catalysts: [
                'Envelhecimento populacional',
                'Incidência câncer crescendo',
                'Consolidação do setor',
                'Telemedicina e digital health'
            ],
            risks: [
                'Regulação ANS',
                'Sinistralidade planos',
                'Custos médicos inflacionários'
            ]
        }
    };
    
    container.innerHTML = `
        <div class="trends-grid">
            ${Object.entries(trends).map(([sector, data]) => `
                <div class="trend-card ${data.trend}">
                    <h3>${sector}</h3>
                    <div class="trend-badge ${data.trend}">
                        Tendência: ${data.trend.charAt(0).toUpperCase() + data.trend.slice(1)}
                    </div>
                    
                    <div class="trend-section">
                        <h4>✅ Catalisadores</h4>
                        <ul>
                            ${data.catalysts.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="trend-section">
                        <h4>⚠️ Riscos</h4>
                        <ul>
                            ${data.risks.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ============================
// Helper Functions
// ============================
function formatCurrency(value) {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined) return '-';
    return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

function formatLargeNumber(value) {
    if (value === null || value === undefined) return '-';
    
    if (value >= 1000000000) {
        return `R$ ${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
        return `R$ ${(value / 1000000).toFixed(2)}M`;
    } else {
        return formatCurrency(value);
    }
}

function getScoreClass(score) {
    if (score > 75) return 'score-high';
    if (score > 55) return 'score-medium';
    return 'score-low';
}

function getRecommendationClass(recommendation) {
    const recMap = {
        'STRONG BUY': 'recommendation-strong-buy',
        'BUY': 'recommendation-buy',
        'HOLD': 'recommendation-hold',
        'SPECULATIVE BUY': 'recommendation-speculative-buy',
        'HIGH RISK': 'recommendation-high-risk'
    };
    return recMap[recommendation] || 'recommendation-hold';
}