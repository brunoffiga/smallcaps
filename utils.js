// ============================
// Utility Functions
// ============================

/**
 * Obtém valor de propriedade aninhada
 */
function getNestedProperty(obj, path) {
    if (!obj) return null;
    
    const nestedMetrics = ['pe', 'roe', 'roic', 'dividendYield', 'netDebtToEbitda', 
                           'beta', 'pb', 'evEbitda', 'growthValueRatio', 'ebitdaMargin',
                           'revenueGrowth', 'earningsGrowth', 'freeFloat', 'liquidityDaily'];
    
    if (nestedMetrics.includes(path)) {
        return obj.metrics ? obj.metrics[path] : null;
    }
    
    if (path === 'ytd') {
        return obj.performance?.ytd !== undefined ? obj.performance.ytd : null;
    }
    
    if (path.startsWith('target')) {
        return obj.projections ? obj.projections[path] : null;
    }

    if (path === 'confidence') {
        return obj.confidence || null;
    }
    
    return obj[path] || null;
}

/**
 * Formata número como moeda BRL
 */
function formatCurrency(value) {
    if (value === null || value === undefined) return '-';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata número como porcentagem
 */
function formatPercentage(value, decimals = 1) {
    if (value === null || value === undefined) return '-';
    return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}

/**
 * Formata número grande (market cap, etc)
 */
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

/**
 * Formata nome do setor
 */
function formatSectorName(sector) {
    if (!sector) return '';
    
    const sectorMap = {
        'Energia Elétrica': 'Energia',
        'Construção Civil': 'Construção',
        'Petróleo e Gás': 'O&G'
    };
    
    return sectorMap[sector] || sector;
}

/**
 * Classifica score
 */
function getScoreClass(score) {
    if (score > 75) return 'score-high';
    if (score > 55) return 'score-medium';
    return 'score-low';
}

/**
 * Classifica confiabilidade
 */
function getConfidenceClass(confidence) {
    if (confidence >= 75) return 'confidence-high';
    if (confidence >= 60) return 'confidence-medium';
    return 'confidence-low';
}

/**
 * Classifica recomendação
 */
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

/**
 * Cria gradiente para gráficos
 */
function createGradient(ctx, type) {
    const colorMap = {
        'primary': { start: '#3b82f6', end: '#2563eb' },
        'success': { start: '#10b981', end: '#059669' },
        'warning': { start: '#f59e0b', end: '#d97706' },
        'danger': { start: '#ef4444', end: '#dc2626' }
    };
    
    const colors = colorMap[type] || colorMap['primary'];
    
    if (!ctx || typeof ctx.createLinearGradient !== 'function') {
        return colors.start;
    }
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, colors.start);
    gradient.addColorStop(1, colors.end);
    return gradient;
}

/**
 * Debounce function para otimização
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Mapeia valor de um range para outro
 */
function mapValue(value, minInput, maxInput, minOutput, maxOutput) {
    return minOutput + (maxOutput - minOutput) * ((value - minInput) / (maxInput - minInput));
}

/**
 * Calcula Growth Value Ratio (GVR)
 */
function calculateGrowthValueRatio(company) {
    const upside = company.upside || 0;
    const pe = getNestedProperty(company, 'pe');
    
    if (pe === null || pe <= 0 || pe > 100) return 0;
    
    return (upside / pe);
}

/**
 * Calcula projeção de longo prazo (CAGR Ponderado)
 */
function calculateLongTermTarget(company, years) {
    const earningsGrowth = (getNestedProperty(company, 'earningsGrowth') || 0) / 100;
    const roe = (getNestedProperty(company, 'roe') || 0) / 100;
    const upside = (company.upside || 0) / 100;
    
    // Modelo Ponderado: 60% E.Growth, 20% ROE, 20% Upside
    const weightedCAGR = (earningsGrowth * 0.60) + (roe * 0.20) + (upside * 0.20);
    
    // Limita queda para -5% ao ano
    const finalCAGR = Math.max(weightedCAGR, -0.05);
    
    // Fórmula composta: P_final = P_atual * (1 + CAGR)^anos
    const projectedPrice = company.currentPrice * Math.pow(1 + finalCAGR, years);
    
    return projectedPrice;
}

/**
 * Calcula score de risco
 */
function calculateRiskScore(company) {
    let riskScore = 0;
    
    // Dívida
    const debtRatio = getNestedProperty(company, 'netDebtToEbitda') || 0;
    if (debtRatio < 0) riskScore += 0;
    else if (debtRatio < 1) riskScore += 10;
    else if (debtRatio < 2) riskScore += 30;
    else if (debtRatio < 3) riskScore += 50;
    else riskScore += 70;
    
    // Beta
    const beta = getNestedProperty(company, 'beta') || 1;
    riskScore += Math.min(beta * 15, 30);
    
    // Setor
    const riskySectors = ['Petróleo e Gás', 'Tecnologia', 'Construção Civil', 'Varejo'];
    if (riskySectors.includes(company.sector)) {
        riskScore += 20;
    }
    
    // ROE
    const roe = getNestedProperty(company, 'roe') || 0;
    if (roe < 0) riskScore += 30;
    else if (roe < 10) riskScore += 15;
    
    return Math.min(riskScore, 100);
}

/**
 * Exporta dados para CSV
 */
function exportToCSV(data, filename = 'analise-completa.csv') {
    const headers = [
        'Rank', 'Ticker', 'Empresa', 'Setor', 'Score', 'Preço Atual', 'Target 12M', 
        'Upside 12M', 'Target 1Y', 'Target 3Y', 'Target 5Y', 'Target 10Y', 
        'Confiabilidade', 'P/L', 'GVR', 'ROE', 'ROIC', 'DY', 'Dívida/EBITDA',
        'Margem EBITDA', 'Cresc. Receita', 'Cresc. Lucro', 'P/VP', 'EV/EBITDA',
        'Beta', 'Market Cap', 'YTD', 'Recomendação'
    ];
    
    const rows = data.map(company => [
        company.ranking,
        company.ticker,
        company.name,
        company.sector,
        company.score,
        company.currentPrice,
        company.targetPrice,
        company.upside,
        getNestedProperty(company, 'target1Y'),
        getNestedProperty(company, 'target3Y'),
        getNestedProperty(company, 'target5Y'),
        getNestedProperty(company, 'target10Y'),
        company.confidence,
        getNestedProperty(company, 'pe'),
        getNestedProperty(company, 'growthValueRatio'),
        getNestedProperty(company, 'roe'),
        getNestedProperty(company, 'roic'),
        getNestedProperty(company, 'dividendYield'),
        getNestedProperty(company, 'netDebtToEbitda'),
        getNestedProperty(company, 'ebitdaMargin'),
        getNestedProperty(company, 'revenueGrowth'),
        getNestedProperty(company, 'earningsGrowth'),
        getNestedProperty(company, 'pb'),
        getNestedProperty(company, 'evEbitda'),
        getNestedProperty(company, 'beta'),
        getNestedProperty(company, 'marketCap'),
        getNestedProperty(company, 'ytd'),
        company.recommendation
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
        csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Smooth scroll para seção
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Atualiza indicadores de ordenação
 */
function updateSortIndicators(field, direction) {
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
        if (th.dataset.sort === field) {
            th.classList.add(`sort-${direction}`);
        }
    });
}

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getNestedProperty,
        formatCurrency,
        formatPercentage,
        formatLargeNumber,
        formatSectorName,
        getScoreClass,
        getConfidenceClass,
        getRecommendationClass,
        createGradient,
        debounce,
        mapValue,
        calculateGrowthValueRatio,
        calculateLongTermTarget,
        calculateRiskScore,
        exportToCSV,
        smoothScrollTo,
        updateSortIndicators
    };
}