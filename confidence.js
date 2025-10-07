// ============================
// Confidence Calculator
// Modelo Bayesiano de Confiabilidade
// ============================

/**
 * Calcula confiabilidade geral das projeções
 * Baseado em múltiplos fatores quantitativos e qualitativos
 */
function calculateProjectionConfidence(company) {
    let confidenceScore = 50; // Base neutra
    
    // 1. CONSENSO DE ANALISTAS (Peso: 25%)
    const consensusScore = calculateConsensusScore(company);
    confidenceScore += consensusScore * 0.25;
    
    // 2. HISTÓRICO DE PERFORMANCE (Peso: 20%)
    const performanceScore = calculatePerformanceScore(company);
    confidenceScore += performanceScore * 0.20;
    
    // 3. QUALIDADE FINANCEIRA (Peso: 20%)
    const financialScore = calculateFinancialHealthScore(company);
    confidenceScore += financialScore * 0.20;
    
    // 4. VOLATILIDADE/RISCO (Peso: 15%)
    const volatilityScore = calculateVolatilityScore(company);
    confidenceScore += volatilityScore * 0.15;
    
    // 5. LIQUIDEZ (Peso: 10%)
    const liquidityScore = calculateLiquidityScore(company);
    confidenceScore += liquidityScore * 0.10;
    
    // 6. SETOR E CONTEXTO MACRO (Peso: 10%)
    const macroScore = calculateMacroScore(company);
    confidenceScore += macroScore * 0.10;
    
    // Normaliza entre 0-100
    return Math.max(0, Math.min(100, confidenceScore));
}

/**
 * Score baseado em consenso de analistas
 */
function calculateConsensusScore(company) {
    if (!company.analystConsensus) return 0;
    
    const { buy, hold, sell } = company.analystConsensus;
    const total = buy + hold + sell;
    
    if (total === 0) return 0;
    
    const buyRatio = buy / total;
    const sellRatio = sell / total;
    
    // Mais analistas comprando = maior confiança
    if (buyRatio >= 0.70) return 50; // 70%+ buy = muito confiante
    if (buyRatio >= 0.50) return 30; // 50%+ buy = moderado
    if (buyRatio >= 0.30) return 10; // 30%+ buy = baixo
    if (sellRatio >= 0.30) return -20; // 30%+ sell = penalidade
    
    return 0;
}

/**
 * Score baseado em histórico de performance
 */
function calculatePerformanceScore(company) {
    if (!company.performance) return 0;
    
    const ytd = company.performance.ytd || 0;
    const oneYear = company.performance.oneYear || 0;
    
    let score = 0;
    
    // YTD positivo adiciona confiança
    if (ytd > 30) score += 30;
    else if (ytd > 15) score += 20;
    else if (ytd > 0) score += 10;
    else if (ytd < -20) score -= 15;
    
    // Performance 1 ano
    if (oneYear > 50) score += 20;
    else if (oneYear > 20) score += 10;
    else if (oneYear < -30) score -= 20;
    
    return score;
}

/**
 * Score baseado em saúde financeira
 */
function calculateFinancialHealthScore(company) {
    let score = 0;
    
    // ROE forte indica boa gestão
    const roe = getNestedProperty(company, 'roe') || 0;
    if (roe > 30) score += 25;
    else if (roe > 20) score += 15;
    else if (roe > 10) score += 5;
    else if (roe < 0) score -= 20;
    
    // Margem EBITDA
    const ebitdaMargin = getNestedProperty(company, 'ebitdaMargin') || 0;
    if (ebitdaMargin > 30) score += 15;
    else if (ebitdaMargin > 20) score += 10;
    else if (ebitdaMargin > 10) score += 5;
    
    // Alavancagem (Dívida)
    const debt = getNestedProperty(company, 'netDebtToEbitda') || 0;
    if (debt < 0) score += 10; // Caixa líquido
    else if (debt < 1) score += 5;
    else if (debt > 3) score -= 15;
    else if (debt > 4) score -= 25;
    
    return score;
}

/**
 * Score baseado em volatilidade
 */
function calculateVolatilityScore(company) {
    const beta = getNestedProperty(company, 'beta') || 1;
    
    // Beta baixo = menor risco = maior confiança
    if (beta < 0.7) return 20;
    if (beta < 1.0) return 10;
    if (beta < 1.3) return 0;
    if (beta < 1.7) return -10;
    return -20;
}

/**
 * Score baseado em liquidez
 */
function calculateLiquidityScore(company) {
    const freeFloat = getNestedProperty(company, 'freeFloat') || 0;
    const liquidityDaily = getNestedProperty(company, 'liquidityDaily') || 0;
    
    let score = 0;
    
    // Free float alto = maior liquidez
    if (freeFloat > 50) score += 10;
    else if (freeFloat > 30) score += 5;
    else if (freeFloat < 20) score -= 5;
    
    // Volume diário
    if (liquidityDaily > 100000000) score += 10; // >100M
    else if (liquidityDaily > 50000000) score += 5; // >50M
    else if (liquidityDaily < 10000000) score -= 10; // <10M
    
    return score;
}

/**
 * Score baseado em setor e contexto macro
 */
function calculateMacroScore(company) {
    const sector = company.sector;
    
    // Setores defensivos em tempos de juros altos
    const defensiveSectors = ['Saúde', 'Saneamento', 'Energia Elétrica'];
    if (defensiveSectors.some(s => sector.includes(s))) {
        return 15;
    }
    
    // Setores cíclicos em recuperação
    const cyclicalSectors = ['Construção Civil', 'Varejo'];
    if (cyclicalSectors.some(s => sector.includes(s))) {
        return 5;
    }
    
    // Setores de alto risco
    const riskySectors = ['Petróleo e Gás', 'Tecnologia'];
    if (riskySectors.some(s => sector.includes(s))) {
        return -10;
    }
    
    return 0;
}

/**
 * V2.0: Calcula confiabilidade específica por horizonte de tempo
 * Usa Decaimento Logarítmico e Penalidade de Crescimento Proporcional.
 */
function calculateHorizonConfidence(company, years) {
    // A base continua forte e multifatorial
    const baseConfidence = company.confidence || calculateProjectionConfidence(company);
    
    // ======================================
    // 1. Decaimento Logarítmico (Não-Linear)
    // ======================================
    if (years <= 1) return baseConfidence;
    
    // Fator de ajuste 'k'. 0.3 oferece uma curva suave, mas realista.
    const k = 0.3; 
    const logDecayFactor = 1 / (1 + k * Math.log(years)); 
    
    let adjustedConfidence = baseConfidence * logDecayFactor;
    
    // ======================================
    // 2. Ajuste de Crescimento Dinâmico
    // ======================================
    const earningsGrowth = getNestedProperty(company, 'earningsGrowth') || 0;
    
    // Define um limite de crescimento 'saudável' (ex: 30% ou -20%)
    const growthThreshold = 30; 
    const declineThreshold = -20;
    
    let growthPenalty = 0;
    
    if (earningsGrowth > growthThreshold) {
        // Penalidade proporcional ao excesso de crescimento extremo
        const excessGrowth = earningsGrowth - growthThreshold;
        growthPenalty = -Math.min(excessGrowth * 0.15, 15); // Max 15 pontos de penalidade
    } else if (earningsGrowth < declineThreshold) {
        // Penalidade para quedas muito fortes (risco de execução)
        const excessDecline = earningsGrowth - declineThreshold; // Será um número negativo
        growthPenalty = Math.max(excessDecline * 0.25, -20); // Max 20 pontos de penalidade
    }
    
    // O ajuste do crescimento deve ser mais relevante em horizontes curtos (3-5 anos)
    // e menos relevante em 10 anos, onde o modelo já decaiu muito.
    const finalAdjustment = growthPenalty * (years <= 5 ? 1.0 : 0.5); 
    
    adjustedConfidence += finalAdjustment;
    
    // Garante que o score permaneça entre 0 e 100
    return Math.max(0, Math.min(100, adjustedConfidence));
}

/**
 * Retorna descrição textual da confiabilidade
 */
function getConfidenceDescription(confidence) {
    if (confidence >= 80) return 'Muito Alta';
    if (confidence >= 70) return 'Alta';
    if (confidence >= 60) return 'Moderada';
    if (confidence >= 50) return 'Média';
    if (confidence >= 40) return 'Baixa';
    return 'Muito Baixa';
}

/**
 * Retorna ícone para confiabilidade
 */
function getConfidenceIcon(confidence) {
    if (confidence >= 75) return '🟢';
    if (confidence >= 60) return '🟡';
    return '🔴';
}

/**
 * Gera relatório detalhado de confiabilidade
 */
function generateConfidenceReport(company) {
    const baseConfidence = company.confidence || calculateProjectionConfidence(company);
    
    return {
        overall: baseConfidence,
        description: getConfidenceDescription(baseConfidence),
        icon: getConfidenceIcon(baseConfidence),
        byHorizon: {
            oneYear: calculateHorizonConfidence(company, 1),
            threeYears: calculateHorizonConfidence(company, 3),
            fiveYears: calculateHorizonConfidence(company, 5),
            tenYears: calculateHorizonConfidence(company, 10)
        },
        factors: {
            consensus: calculateConsensusScore(company),
            performance: calculatePerformanceScore(company),
            financial: calculateFinancialHealthScore(company),
            volatility: calculateVolatilityScore(company),
            liquidity: calculateLiquidityScore(company),
            macro: calculateMacroScore(company)
        }
    };
}

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateProjectionConfidence,
        calculateHorizonConfidence,
        getConfidenceDescription,
        getConfidenceIcon,
        generateConfidenceReport
    };
}