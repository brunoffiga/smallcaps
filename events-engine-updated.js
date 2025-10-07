// ============================
// EVENTS ENGINE v3.0 - UPDATED October 2025
// Sistema Avançado com Lógica Condicional IF/THEN
// Decision Engine + Triggers Binários + Assimétricos
// ============================

/**
 * FUNDAMENTAL DATA UPDATES - Base para Cálculos
 */
const FUNDAMENTAL_UPDATES = {
    ONCO3: {
        pvp_atual: 0.78,
        margem_ebitda_target: 15.4,
        divida_ebitda_atual: 2.8,
        turnaround_stage: 'critical_validation'
    },
    CASH3: {
        btc_holdings_quantity: 595.7,
        btc_avg_acquisition_price_usd: 90926,
        btc_strategy: 'treasury_company',
        follow_on_dilution: 0.15
    },
    CURY3: {
        roe_lider: 66.0,
        premium_quality: true,
        ibov_candidate: true
    },
    PLPL3: {
        roe_eficiencia: 49.0,
        alavancagem_target: 0.3,
        mcmv_dependency: 'high'
    },
    SMFT3: {
        ibov_confirmed: true,
        global_rank: 4,
        expansion_velocity: 'high'
    }
};

/**
 * CONDITIONAL LOGIC ENGINE
 * Implementa lógica IF/THEN para eventos binários
 */
const CONDITIONAL_LOGIC = {
    // ONCO3 - Evento Binário: EBITDA Margem
    ONCO3_EBITDA_Q3: {
        condition: (results) => results.margem_ebitda_ex_pilp >= 15.4,
        success_factor: 1.25,  // +25%
        failure_factor: 0.85,  // -15%
        kpi_critical: 'margem_ebitda_ex_pilp',
        threshold: 15.4
    },
    
    // CASH3 - Evento Mark-to-Market BTC
    CASH3_BTC_VAL: {
        condition: (btc_price_q3) => btc_price_q3 > 90926,
        base_factor: 1.15,  // ±15% volatilidade
        correlation: 'btc_treasury',
        calculate: (btc_current, btc_acquisition) => {
            const m2m_gain = ((btc_current - btc_acquisition) / btc_acquisition);
            return 1 + (m2m_gain * 0.3); // 30% de correlação com ganho BTC
        }
    },
    
    // CASH3 - Rumor Assimétrico M&A
    CASH3_MA_RUMOR: {
        condition: (fato_relevante) => fato_relevante === 'negociacao_exclusiva',
        premium_factor: 1.50,  // +50% prêmio conservador
        asymmetric: true,
        risk_level: 'high_reward'
    },
    
    // CURY3 - Fluxo Institucional (Ibov)
    CURY3_IBOV_FINAL: {
        condition: (confirmacao) => confirmacao === true,
        flow_factor: 1.08,  // +8%
        type: 'institutional_flow',
        passive_funds_impact: 'high'
    },
    
    // SMFT3 - Fluxo Institucional (Ibov)
    SMFT3_IBOV_FINAL: {
        condition: (confirmacao) => confirmacao === true,
        flow_factor: 1.06,  // +6%
        type: 'institutional_flow',
        passive_funds_impact: 'medium'
    },
    
    // PLPL3 - Confirmação de Qualidade
    PLPL3_EXPECTATION_Q3: {
        condition: (results) => results.roe > 45 && results.divida_ebitda < 0.3,
        confirmation_factor: 1.12,  // +12%
        quality_maintenance: true
    },
    
    // ONCO3 - Venda de Ativos (Mitigação Risco)
    ONCO3_ASSET_SALE: {
        condition: (comunicado) => comunicado.tipo === 'venda_substancial_non_core',
        risk_mitigation_factor: 1.15,  // +15%
        reduces_leverage: true
    }
};

/**
 * DECISION ENGINE - Recomendações Dinâmicas
 */
const DECISION_RULES = {
    ONCO3: {
        strong_buy: ['ONCO3_EBITDA_Q3_SUCCESS', 'ONCO3_ASSET_SALE_ANNOUNCED'],
        watch: ['PENDING_EBITDA_VALIDATION'],
        sell_reduce: ['ONCO3_EBITDA_Q3_FAILURE', 'DIVIDA_INCREASE'],
        current_stance: 'watch' // Atualizado dinamicamente
    },
    CASH3: {
        strong_buy: ['CASH3_MA_RUMOR_CONFIRMED', 'BTC_SIGNIFICANT_GAIN'],
        watch: ['MONITOR_BTC_TREND', 'MONITOR_LIQUIDITY'],
        sell_reduce: ['BTC_STRATEGY_REVERSED', 'MA_RUMOR_DENIED'],
        current_stance: 'strong_buy' // BTC em alta + rumores
    },
    CURY3: {
        strong_buy: ['CURY3_IBOV_FINAL_SUCCESS', 'MOMENTUM_Q3_POSITIVE'],
        watch: ['POST_IBOV_MARGIN_WATCH'],
        sell_reduce: ['MARGEM_BRUTA_DECLINE'],
        current_stance: 'strong_buy'
    },
    PLPL3: {
        strong_buy: ['EXPECTATION_Q3_SUCCESS', 'MCMV_RENEWED'],
        watch: ['LANDBANK_EXECUTION'],
        sell_reduce: ['SELIC_PROLONGED_HIGH'],
        current_stance: 'strong_buy'
    },
    SMFT3: {
        strong_buy: ['IBOV_CONFIRMED', 'EXPANSION_ABOVE_GUIDANCE'],
        watch: ['UNIT_MATURATION'],
        sell_reduce: ['MARKET_SATURATION'],
        current_stance: 'strong_buy'
    }
};

/**
 * DATABASE DE EVENTOS REAIS - OUTUBRO 2025
 * Fonte: Notícias recentes + PDFs fornecidos + Lógica Condicional
 */
const EVENTS_DATABASE = {
    // ==================== ONCO3 - OncoclÃ­nicas (DEEP VALUE TURNAROUND) ====================
    ONCO3: [
        {
            id: 'ONCO3_001',
            triggerId: 'ONCO3_EBITDA_Q3',
            date: '2025-11-08',
            type: 'earnings',
            category: 'quarterly_results',
            title: '🎯 EVENTO CRÍTICO: Validação de Turnaround via EBITDA',
            description: `EVENTO BINÁRIO DE ALTO IMPACTO: Margem EBITDA Ex-PILP esperada em 15.4% (vs 8.3% no 2T25). 
            
            ✅ SUCESSO (≥15.4%): +25% no preço (Valida turnaround completo)
            ❌ FALHA (<15.4%): -15% no preço (Atraso no plano de reestruturação)
            
            KPI CRÍTICO: Esta é a última chance de validar a viabilidade do turnaround antes de 2026.`,
            impact: 'high',
            sentiment: 'neutral',
            priceImpact: 0.25,
            conditionalLogic: CONDITIONAL_LOGIC.ONCO3_EBITDA_Q3,
            confidence: 0.60,
            probability: 0.70,
            sources: ['Projeções ONCO3', 'Guidance Management'],
            triggers: ['margem_ebitda_ex_pilp >= 15.4%', 'redução_custos_pilp', 'guidance_mantido'],
            affectedSectors: ['Saúde'],
            decisionImpact: 'Defines STRONG BUY vs SELL stance'
        },
        {
            id: 'ONCO3_002',
            date: '2025-10-08',
            type: 'corporate',
            category: 'capital_increase',
            title: 'AGE Aumento de Capital R$ 2 bilhões',
            description: 'Assembleia para votar aumento de capital de até R$ 2 bilhões a R$ 3,00/ação. Diluição potencial mas recursos para banco de terrenos.',
            impact: 'high',
            sentiment: 'mixed',
            priceImpact: -0.10,
            confidence: 0.90,
            probability: 0.85,
            sources: ['CVM', 'InfoMoney 17/set/2025'],
            triggers: ['aprovacao_age', 'demanda_institucional', 'subscricao'],
            affectedSectors: ['Saúde']
        },
        {
            id: 'ONCO3_003',
            triggerId: 'ONCO3_ASSET_SALE',
            date: '2025-12-15',
            type: 'corporate',
            category: 'asset_sale',
            title: '💰 Venda de Ativos Não-Core - Mitigação de Risco',
            description: `Venda substancial de hospitais HMM, UMC, HVS para reduzir alavancagem de 2.8x para ~2.0x Dívida/EBITDA.
            
            IMPACTO: +15% no preço (Mitiga principal risco de endividamento)
            META: Liberar R$ 500M+ para foco em oncologia pura`,
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            conditionalLogic: CONDITIONAL_LOGIC.ONCO3_ASSET_SALE,
            confidence: 0.75,
            probability: 0.80,
            sources: ['BPMoney', 'Seu Dinheiro'],
            triggers: ['fechamento_vendas', 'aprovacoes_regulatorias', 'reducao_divida'],
            affectedSectors: ['Saúde']
        },
        {
            id: 'ONCO3_004',
            date: '2025-10-01',
            type: 'corporate',
            category: 'asset_sale',
            title: 'Distrato Built-to-Suit SP - Economia R$ 300M',
            description: 'Rescisão contrato Vergueiro/Cedro para complexo oncológico SP, liberando R$ 300M de caixa',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 1.0,
            probability: 1.0,
            sources: ['BPMoney 01/out/2025', 'Money Times'],
            triggers: ['confirmacao_rescisao', 'multa_compensada'],
            affectedSectors: ['Saúde']
        },
        {
            id: 'ONCO3_005',
            date: '2025-10-02',
            type: 'corporate',
            category: 'guidance',
            title: 'Guidance Revisado 2025-2027',
            description: 'Receita R$ 6.98B em 2027, margem EBITDA 18%, FCO 60% conversão',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.08,
            confidence: 0.65,
            probability: 0.70,
            sources: ['Money Times 02/out/2025'],
            triggers: ['entrega_projetos', 'desinvestimentos_sucesso'],
            affectedSectors: ['Saúde']
        }
    ],

    // ==================== CASH3 - Méliuz (BTC TREASURY + M&A ASYMMETRIC) ====================
    CASH3: [
        {
            id: 'CASH3_001',
            triggerId: 'CASH3_BTC_VAL',
            date: '2025-11-08',
            type: 'earnings',
            category: 'quarterly_results',
            title: '₿ Mark-to-Market Bitcoin Treasury - Volatilidade Alta',
            description: `CORRELAÇÃO BTC: Méliuz detém 595.7 BTC (preço médio US$ 90,926).
            
            LÓGICA M2M:
            • BTC > US$ 90,926: Impacto positivo proporcional (até +15%)
            • BTC < US$ 90,926: Impacto negativo proporcional (até -15%)
            
            Cotação atual BTC define o resultado do 3T25 via reavaliação de tesouraria.`,
            impact: 'high',
            sentiment: 'neutral',
            priceImpact: 0.15,
            conditionalLogic: CONDITIONAL_LOGIC.CASH3_BTC_VAL,
            confidence: 0.70,
            probability: 0.75,
            sources: ['XP Investimentos', 'Dados BTC Holdings'],
            triggers: ['btc_price_q3', 'treasury_revaluation', 'ebitda_positivo'],
            affectedSectors: ['Tecnologia'],
            decisionImpact: 'BTC correlation drives 30% of price movement'
        },
        {
            id: 'CASH3_002',
            triggerId: 'CASH3_MA_RUMOR',
            date: '2026-01-01',
            type: 'rumors',
            category: 'ma',
            title: '🚀 RUMOR ASSIMÉTRICO: Interesse Nubank em Aquisição',
            description: `EVENTO ASSIMÉTRICO DE ALTÍSSIMO RISCO/RETORNO:
            
            ✅ SE CONFIRMADO (Fato Relevante): +50% prêmio conservador
            ❌ SE DESMENTIDO: Volatilidade mas sem impacto estrutural
            
            RACIONALIDADE: Nubank busca vertical de cashback/rewards. Méliuz líder no segmento.
            CATALISADOR: Possível anúncio de negociação exclusiva em 2026.`,
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.50,
            conditionalLogic: CONDITIONAL_LOGIC.CASH3_MA_RUMOR,
            confidence: 0.30,
            probability: 0.20,
            sources: ['Rumores Mercado', 'Genial Analisa'],
            triggers: ['proposta_formal', 'due_diligence', 'aprovacoes', 'fato_relevante'],
            affectedSectors: ['Tecnologia'],
            decisionImpact: 'Asymmetric bet - High reward if confirmed'
        },
        {
            id: 'CASH3_003',
            date: '2025-02-17',
            type: 'corporate',
            category: 'partnership',
            title: 'Renegociação Parceria BV - Impacto -30% EBITDA',
            description: 'Méliuz renegociou termos com BV: -R$ 7M/tri receita líquida. Impacto negativo mas já precificado.',
            impact: 'high',
            sentiment: 'negative',
            priceImpact: -0.20,
            confidence: 1.0,
            probability: 1.0,
            sources: ['XP Investimentos fev/2025'],
            triggers: ['revisao_2025', 'renovacao_contrato'],
            affectedSectors: ['Tecnologia']
        },
        {
            id: 'CASH3_004',
            date: '2025-06-15',
            type: 'corporate',
            category: 'financing',
            title: 'Follow-on R$ 180M para Bitcoin Treasury',
            description: 'Follow-on de 25.5M ações a R$ 7.06 para ampliar posição Bitcoin. Diluição de 15%.',
            impact: 'medium',
            sentiment: 'mixed',
            priceImpact: -0.05,
            confidence: 1.0,
            probability: 1.0,
            sources: ['Investing.com jun/2025'],
            triggers: ['conclusao_oferta', 'compra_bitcoin'],
            affectedSectors: ['Tecnologia']
        },
        {
            id: 'CASH3_005',
            date: '2025-09-13',
            type: 'corporate',
            category: 'shareholder',
            title: 'Redução Capital R$ 220M - R$ 2.52/ação',
            description: 'Devolução de capital aos acionistas (capital social em excesso). Evento positivo.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.05,
            confidence: 1.0,
            probability: 1.0,
            sources: ['Seu Dinheiro ago/2024'],
            triggers: ['pagamento_concluido'],
            affectedSectors: ['Tecnologia']
        }
    ],

    // ==================== PLPL3 - Plano & Plano (QUALITY CONFIRMATION) ====================
    PLPL3: [
        {
            id: 'PLPL3_001',
            triggerId: 'PLPL3_EXPECTATION_Q3',
            date: '2025-11-14',
            type: 'earnings',
            category: 'quarterly_results',
            title: '⭐ Confirmação de Qualidade Excepcional - ROE 49%',
            description: `LÓGICA CONDICIONAL:
            
            ✅ SE ROE > 45% E Alavancagem < 0.3x: +12% (Confirma tese de eficiência)
            ❌ SE ROE < 40% OU Alavancagem > 0.5x: Revisão de valuation
            
            CONTEXTO: ROE de 49% é o mais alto do setor. Manutenção desse nível valida upside de 199%.`,
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.12,
            conditionalLogic: CONDITIONAL_LOGIC.PLPL3_EXPECTATION_Q3,
            confidence: 0.85,
            probability: 0.80,
            sources: ['Itaú BBA jun/2025', 'XP Investimentos'],
            triggers: ['roe_acima_45', 'alavancagem_baixa', 'vendas_liquidas', 'vgv_lancamentos'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'PLPL3_002',
            date: '2025-12-15',
            type: 'corporate',
            category: 'expansion',
            title: 'Lançamentos 2H25 - Pipeline R$ 2.5B VGV',
            description: 'Pipeline robusto de lançamentos no segundo semestre. Concentração em MCMV.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.80,
            probability: 0.85,
            sources: ['RI Plano&Plano', 'Itaú BBA'],
            triggers: ['aprovacoes_licencas', 'landbank', 'vendas_stand'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'PLPL3_003',
            date: '2026-02-01',
            type: 'macro',
            category: 'policy',
            title: 'Renovação MCMV 2026 - Subsídios Ampliados',
            description: 'Governo federal renova MCMV com subsídios aumentados. Impacto positivo direto.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.25,
            confidence: 0.75,
            probability: 0.80,
            sources: ['Governo Federal'],
            triggers: ['aprovacao_orcamento', 'regras_subsidio', 'demanda_aquecida'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'PLPL3_004',
            date: '2025-10-15',
            type: 'technical',
            category: 'analyst',
            title: 'Itaú BBA: "Mais Barata que CURY3/DIRR3"',
            description: 'Itaú BBA destaca desconto de 20% vs peers, target R$ 18.60. Anomalia de valuation.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.08,
            confidence: 0.90,
            probability: 1.0,
            sources: ['Itaú BBA set/2025', 'Seu Dinheiro'],
            triggers: ['flow_institucional', 'rebalanceamento_fundos'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'PLPL3_005',
            date: '2025-07-20',
            type: 'corporate',
            category: 'financing',
            title: 'Emissão Debêntures R$ 350M',
            description: 'Aprovada emissão de debêntures R$ 350M para financiar obras. Alavancagem controlada.',
            impact: 'medium',
            sentiment: 'neutral',
            priceImpact: 0.03,
            confidence: 1.0,
            probability: 1.0,
            sources: ['InfoMoney jul/2025'],
            triggers: ['captacao_concluida', 'utilizacao_recursos'],
            affectedSectors: ['Construção Civil']
        }
    ],

    // ==================== CURY3 - Cury (INSTITUTIONAL FLOW) ====================
    CURY3: [
        {
            id: 'CURY3_001',
            triggerId: 'CURY3_IBOV_FINAL',
            date: '2025-08-29',
            type: 'technical',
            category: 'index',
            title: '📊 CONFIRMAÇÃO IBOVESPA - Fluxo Institucional +8%',
            description: `EVENTO DE FLUXO PASSIVO:
            
            ✅ Confirmação de entrada no Ibovespa: +8% por fluxo institucional
            
            MECÂNICA: Fundos passivos (ETFs Ibov) precisam comprar CURY3 para replicar índice.
            TIMING: Efeito concentrado em 5-10 dias após confirmação oficial.`,
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.08,
            conditionalLogic: CONDITIONAL_LOGIC.CURY3_IBOV_FINAL,
            confidence: 0.85,
            probability: 0.75,
            sources: ['B3', 'Análise de Índices'],
            triggers: ['confirmacao_final', 'rebalanceamento', 'compra_passiva'],
            affectedSectors: ['Construção Civil'],
            decisionImpact: 'Institutional flow catalyst'
        },
        {
            id: 'CURY3_002',
            date: '2025-11-10',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Momentum Fortíssimo',
            description: 'Após lucro recorde R$ 236.7M no 1S25, mercado espera continuidade do ROE 66%.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.12,
            confidence: 0.90,
            probability: 0.85,
            sources: ['InfoMoney', 'RI Cury'],
            triggers: ['vso_acima_70', 'margem_backlog', 'repasses', 'roe_sustentado'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'CURY3_003',
            date: '2025-12-01',
            type: 'corporate',
            category: 'expansion',
            title: 'Expansão Rio de Janeiro - Master Plan',
            description: 'Início de lançamentos no Rio conforme Master Plan anunciado. Diversificação geográfica.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.10,
            confidence: 0.80,
            probability: 0.90,
            sources: ['RI Cury', 'Análise de Ações'],
            triggers: ['aprovacoes', 'vendas_rio', 'parcerias'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'CURY3_004',
            date: '2025-08-15',
            type: 'corporate',
            category: 'shareholder',
            title: 'Programa de Recompra de Ações - 10% Capital',
            description: 'Aprovado buyback de até 13.7M ações (10% capital) para usar caixa líquido positivo.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.08,
            confidence: 1.0,
            probability: 1.0,
            sources: ['InfoMoney ago/2025', 'CVM'],
            triggers: ['volume_recompra', 'execucao_programa'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'CURY3_005',
            date: '2025-09-10',
            type: 'technical',
            category: 'analyst',
            title: 'JP Morgan Rebaixa para Neutro',
            description: 'JPM rebaixa após rally de +69% YTD, prefere EZTC3. Realização de lucros esperada.',
            impact: 'medium',
            sentiment: 'negative',
            priceImpact: -0.05,
            confidence: 1.0,
            probability: 1.0,
            sources: ['Seu Dinheiro set/2025', 'JP Morgan'],
            triggers: ['revisao_multiple', 'ciclo_eleitoral'],
            affectedSectors: ['Construção Civil']
        }
    ],

    // ==================== SMFT3 - Smart Fit (IBOV + EXPANSION) ====================
    SMFT3: [
        {
            id: 'SMFT3_001',
            triggerId: 'SMFT3_IBOV_FINAL',
            date: '2025-08-29',
            type: 'technical',
            category: 'index',
            title: '📊 Confirmação Ibovespa - Fluxo +6%',
            description: `EVENTO DE FLUXO PASSIVO:
            
            ✅ Confirmação no Ibovespa: +6% por fluxo institucional
            
            MECÂNICA: Similar a CURY3, mas peso menor no índice (menor impacto de fluxo).`,
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.06,
            conditionalLogic: CONDITIONAL_LOGIC.SMFT3_IBOV_FINAL,
            confidence: 0.70,
            probability: 0.60,
            sources: ['Investidor10', 'B3'],
            triggers: ['liquidez_acima_media', 'peso_indice', 'confirmacao_final'],
            affectedSectors: ['Varejo'],
            decisionImpact: 'Passive flow catalyst'
        },
        {
            id: 'SMFT3_002',
            date: '2025-11-06',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Aceleração da Expansão',
            description: 'Divulgação com foco em execução do plano de 340-360 academias no ano. 289 abertas nos últimos 12 meses.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.18,
            confidence: 0.75,
            probability: 0.80,
            sources: ['Money Times 07/ago/2025', 'Investidor10'],
            triggers: ['aberturas_acima_guidance', 'crescimento_receita_bruta'],
            affectedSectors: ['Varejo']
        },
        {
            id: 'SMFT3_003',
            date: '2025-12-05',
            type: 'corporate',
            category: 'expansion',
            title: 'Atualização do Pipeline de Aberturas 2026',
            description: 'Expansão robusta sustentada por performance sólida. Foco na consolidação das novas academias.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.10,
            confidence: 0.80,
            probability: 0.90,
            sources: ['Investidor10', 'RI Smart Fit'],
            triggers: ['guidance_positivo_2026', 'alocacao_eficiente_capital'],
            affectedSectors: ['Varejo']
        }
    ],

    // ==================== DIRR3 - Direcional ====================
    DIRR3: [
        {
            id: 'DIRR3_001',
            date: '2025-11-12',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25',
            description: 'Expectativa de continuidade do momentum pós "melhor trimestre histórico"',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.10,
            confidence: 0.85,
            probability: 0.80,
            sources: ['Genial Analisa', 'Seu Dinheiro'],
            triggers: ['vendas_mcmv', 'margem', 'dividendos'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'DIRR3_002',
            date: '2025-08-25',
            type: 'corporate',
            category: 'shareholder',
            title: 'Dividendos R$ 2,00/ação + Split 3:1',
            description: 'Aprovado dividendo R$ 2,00/ação (R$ 346M) e split 3:1 para liquidez',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.08,
            confidence: 1.0,
            probability: 1.0,
            sources: ['InfoMoney', 'CVM'],
            triggers: ['pagamento_dividendos', 'split_concluido'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'DIRR3_003',
            date: '2026-01-15',
            type: 'corporate',
            category: 'expansion',
            title: 'Landbank R$ 49.9B - 5+ Anos Pipeline',
            description: 'Banco de terrenos robusto garante crescimento sustentável',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.06,
            confidence: 0.90,
            probability: 0.90,
            sources: ['SmallCaps.pdf', 'RI Direcional'],
            triggers: ['aprovacoes', 'lancamentos', 'vendas'],
            affectedSectors: ['Construção Civil']
        }
    ],

    // ==================== VIVA3 - Vivara ====================
    VIVA3: [
        {
            id: 'VIVA3_001',
            date: '2025-11-10',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Crescimento Life',
            description: 'Expectativa de continuidade SSS Life +28.6% e expansão acelerada',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.12,
            confidence: 0.80,
            probability: 0.80,
            sources: ['Análise Mercado'],
            triggers: ['sss_life', 'abertura_lojas', 'margem_ebitda'],
            affectedSectors: ['Varejo']
        },
        {
            id: 'VIVA3_002',
            date: '2025-12-01',
            type: 'corporate',
            category: 'expansion',
            title: 'Aceleração Expansão Life by Vivara',
            description: 'Plano de abertura de 50+ lojas Life em 2026',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.75,
            probability: 0.85,
            sources: ['RI Vivara'],
            triggers: ['abertura_lojas', 'vendas_life', 'market_share'],
            affectedSectors: ['Varejo']
        },
        {
            id: 'VIVA3_003',
            date: '2025-11-29',
            type: 'corporate',
            category: 'seasonal',
            title: 'Black Friday + Natal - Performance Crítica',
            description: 'Temporada Black Friday/Natal crucial para resultados 4T25',
            impact: 'high',
            sentiment: 'neutral',
            priceImpact: 0.10,
            confidence: 0.70,
            probability: 0.80,
            sources: ['Análise Varejo'],
            triggers: ['vendas_black_friday', 'vendas_natal', 'sss'],
            affectedSectors: ['Varejo']
        }
    ],

    // ==================== ALUP11 - Alupar ====================
    ALUP11: [
        {
            id: 'ALUP11_001',
            date: '2025-11-14',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25',
            description: 'Resultados trimestrais com foco em expansão LATAM',
            impact: 'medium',
            sentiment: 'neutral',
            priceImpact: 0.05,
            confidence: 0.75,
            probability: 0.80,
            sources: ['RI Alupar'],
            triggers: ['receita_transmissao', 'novos_projetos', 'dividendos'],
            affectedSectors: ['Energia']
        },
        {
            id: 'ALUP11_002',
            date: '2025-09-17',
            type: 'corporate',
            category: 'expansion',
            title: 'Investimento US$ 71.4M Energia Chile',
            description: 'Alupar anuncia novo investimento em energia no Chile',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.06,
            confidence: 1.0,
            probability: 1.0,
            sources: ['Portal Tela set/2025'],
            triggers: ['inicio_obras', 'conclusao_projeto'],
            affectedSectors: ['Energia']
        },
        {
            id: 'ALUP11_003',
            date: '2025-10-15',
            type: 'corporate',
            category: 'regulatory',
            title: 'Leilão CelgPar - Participação Aprovada',
            description: 'CA aprova participação em leilão de ativos da CelgPar',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.08,
            confidence: 0.80,
            probability: 0.60,
            sources: ['Megawhat Energy'],
            triggers: ['resultado_leilao', 'aprovacoes_regulatorias'],
            affectedSectors: ['Energia']
        }
    ],

    // ==================== LAVV3 - Lavvi ====================
    LAVV3: [
        {
            id: 'LAVV3_001',
            date: '2025-11-12',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Continuidade Lucro Recorde',
            description: 'Expectativa de manter momentum após lucro 2T25 de R$ 119M (+80% a/a)',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.70,
            probability: 0.75,
            sources: ['ADVFN 07/ago/2025', 'Projeções RI'],
            triggers: ['lucro_acima_projecao', 'margem_bruta_acima_30'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'LAVV3_002',
            date: '2025-10-30',
            type: 'corporate',
            category: 'dividendos',
            title: 'Anúncio de Dividendos/JCP - Alto DY',
            description: 'Empresa com histórico de alto Dividend Yield (7,41%). Anúncio de proventos esperado.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.07,
            confidence: 0.85,
            probability: 0.90,
            sources: ['Investidor10', 'Projeções Mercado'],
            triggers: ['anuncio_acima_mercado', 'data_com'],
            affectedSectors: ['Construção Civil']
        }
    ],

    // ==================== INTB3 - Intelbras ====================
    INTB3: [
        {
            id: 'INTB3_001',
            date: '2025-11-13',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Normalização e Estoques',
            description: 'Foco na normalização operacional e recomposição de estoques (segurança +16,7% no 2T25)',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.12,
            confidence: 0.80,
            probability: 0.85,
            sources: ['Nord Investimentos 30/jul/2025', 'Projeções RI'],
            triggers: ['fcf_positivo', 'crescimento_seguranca_acima_15', 'ROIC_melhora'],
            affectedSectors: ['Tecnologia', 'Indústria']
        },
        {
            id: 'INTB3_002',
            date: '2025-10-30',
            type: 'corporate',
            category: 'dividendos',
            title: 'Aprovação de Dividendos/JCP',
            description: 'Após R$ 69,3M em dividendos no 2T25, mercado espera novo anúncio.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.05,
            confidence: 0.85,
            probability: 0.90,
            sources: ['InfoMoney 30/jul/2025', 'Nord Investimentos'],
            triggers: ['valor_por_acao', 'data_pagamento'],
            affectedSectors: ['Tecnologia', 'Indústria']
        }
    ],

    // ==================== BRFS3 - BRF ====================
    BRFS3: [
        {
            id: 'BRFS3_001',
            date: '2025-11-14',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Foco no Turnaround',
            description: 'Foco na manutenção da baixa alavancagem (0,43x no 2T25) e turnaround operacional',
            impact: 'high',
            sentiment: 'mixed',
            priceImpact: 0.10,
            confidence: 0.70,
            probability: 0.75,
            sources: ['InfoMoney 14/ago/2025', 'Nord Investimentos'],
            triggers: ['margem_brasil', 'lucro_liquido_ajustado', 'alavancagem'],
            affectedSectors: ['Consumo Cíclico']
        },
        {
            id: 'BRFS3_002',
            date: '2026-01-01',
            type: 'corporate',
            category: 'expansion',
            title: 'Retomada de Exportações para a China',
            description: 'CEO afirma que China voltará a ser cliente relevante. Confirmação de novas habilitações é catalisador.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.20,
            confidence: 0.60,
            probability: 0.50,
            sources: ['InfoMoney 14/ago/2025'],
            triggers: ['novas_habilitacoes', 'acordo_comercial'],
            affectedSectors: ['Consumo Cíclico']
        }
    ],

    // ==================== MYPK3 - Iochpe-Maxion ====================
    MYPK3: [
        {
            id: 'MYPK3_001',
            date: '2025-11-13',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Setor Automotivo Global',
            description: 'P/L de 6,2x com Upside de 54,8%. Foco na demanda global de rodas.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.70,
            probability: 0.75,
            sources: ['Investing.com', 'Investidor10'],
            triggers: ['receita_global', 'margem_eua_europa', 'reducao_divida'],
            affectedSectors: ['Industrial']
        },
        {
            id: 'MYPK3_002',
            date: '2025-10-03',
            type: 'corporate',
            category: 'dividendos',
            title: 'Data-Com JCP (R$ 0,307/ação)',
            description: 'JCP de R$ 0,30713810 por ação, com pagamento em 30/04/2026.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.05,
            confidence: 1.0,
            probability: 1.0,
            sources: ['Investidor10'],
            triggers: ['negociacao_ex_jcp', 'fluxo_investidor'],
            affectedSectors: ['Industrial']
        }
    ],

    // ==================== BRAV3 - Brava Energia ====================
    BRAV3: [
        {
            id: 'BRAV3_001',
            date: '2025-11-12',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Produção Acima da Média',
            description: 'Produção média de 91,8 mil boe/d no 3º tri. Campo Atlanta atingiu 30 mil barris/dia.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.75,
            probability: 0.80,
            sources: ['Investidor10 03/out/2025', 'RI Brava'],
            triggers: ['eficiencia_atlanta', 'margem_ebitda', 'retomada_manati'],
            affectedSectors: ['Petróleo e Gás']
        },
        {
            id: 'BRAV3_002',
            date: '2025-11-01',
            type: 'corporate',
            category: 'operational',
            title: 'Paralisação Programada em Papa-Terra e BC-10',
            description: 'Produção terá paralisação de até 12 dias (Papa-Terra) e 21 dias (BC-10).',
            impact: 'medium',
            sentiment: 'negative',
            priceImpact: -0.05,
            confidence: 0.90,
            probability: 1.0,
            sources: ['Investidor10 03/out/2025'],
            triggers: ['duracao_paralisacao', 'custos_manutencao'],
            affectedSectors: ['Petróleo e Gás']
        },
        {
            id: 'BRAV3_003',
            date: '2026-04-01',
            type: 'corporate',
            category: 'financing',
            title: 'Emissão de ADRs e Expansão EUA',
            description: 'Companhia busca desembarcar no mercado americano via ADRs.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.18,
            confidence: 0.65,
            probability: 0.70,
            sources: ['Investidor10'],
            triggers: ['aprovacao_sec', 'lancamento_adrs'],
            affectedSectors: ['Petróleo e Gás']
        }
    ],

    // ==================== SOJA3 - Boa Safra ====================
    SOJA3: [
        {
            id: 'SOJA3_001',
            date: '2025-11-14',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Ciclo Agrícola',
            description: 'Foco no avanço da área plantada de soja para 25/26 e pedidos recordes.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.12,
            confidence: 0.70,
            probability: 0.75,
            sources: ['Reuters 07/ago/2025', 'BTG 14/nov/2024'],
            triggers: ['safra_25_26_projecao', 'margem_bruta_sementes', 'crescimento_vendas'],
            affectedSectors: ['Agronegócio']
        },
        {
            id: 'SOJA3_002',
            date: '2025-12-05',
            type: 'corporate',
            category: 'financing',
            title: 'Emissão de CRA - IPCA+ 8,41% ao ano',
            description: 'Emissão de CRAs para financiar agronegócio (IPCA + 8,41% até 2033).',
            impact: 'medium',
            sentiment: 'neutral',
            priceImpact: 0.03,
            confidence: 0.90,
            probability: 1.0,
            sources: ['Investidor10'],
            triggers: ['volume_captado', 'custo_divida'],
            affectedSectors: ['Agronegócio']
        }
    ],

    // ==================== SLCE3 - SLC Agrícola ====================
    SLCE3: [
        {
            id: 'SLCE3_001',
            date: '2025-11-14',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Desafios Soja/Milho',
            description: 'Conjuntura desafiadora para soja/milho. Algodão deve compensar (86% vendas travadas).',
            impact: 'high',
            sentiment: 'mixed',
            priceImpact: 0.08,
            confidence: 0.70,
            probability: 0.75,
            sources: ['Genial Investimentos'],
            triggers: ['margem_algodao', 'estrategia_comercial', 'endividamento'],
            affectedSectors: ['Agronegócio']
        },
        {
            id: 'SLCE3_002',
            date: '2026-07-09',
            type: 'corporate',
            category: 'guidance',
            title: 'Farm Day 2026 - Iniciativas Tech/ESG',
            description: 'Evento anual com executivos sobre safras e iniciativas de agricultura regenerativa.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.10,
            confidence: 0.75,
            probability: 0.85,
            sources: ['BB-BI 11/jul/2025'],
            triggers: ['investimentos_tecnologia', 'guidance_2027', 'acquisicoes'],
            affectedSectors: ['Agronegócio']
        }
    ],

    // ==================== PGMN3 - Pague Menos ====================
    PGMN3: [
        {
            id: 'PGMN3_001',
            date: '2025-11-14',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Continuidade Lucro',
            description: 'Foco na continuidade do crescimento de receita (R$ 3,97B no 2T25, +18% a/a).',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.10,
            confidence: 0.80,
            probability: 0.85,
            sources: ['Investidor10', 'Reuters 04/ago/2025'],
            triggers: ['receita_bruta_acima_4b', 'margem_bruta', 'sinergias_extrafarma'],
            affectedSectors: ['Varejo']
        },
        {
            id: 'PGMN3_002',
            date: '2025-10-01',
            type: 'corporate',
            category: 'capital_increase',
            title: 'Conclusão Follow-on (R$ 250M)',
            description: 'Preço fixado em R$ 3,50. Oferta primária e secundária para caixa/desalavancagem.',
            impact: 'medium',
            sentiment: 'neutral',
            priceImpact: -0.05,
            confidence: 1.0,
            probability: 1.0,
            sources: ['Reuters 01/out/2025', 'Reuters 22/set/2025'],
            triggers: ['uso_dos_recursos', 'aumento_liquidez'],
            affectedSectors: ['Varejo']
        },
        {
            id: 'PGMN3_003',
            date: '2026-01-01',
            type: 'rumors',
            category: 'competition',
            title: 'Avanço do Mercado Livre no Setor Farmacêutico',
            description: 'Analistas veem entrada do Mercado Livre no setor com efeito limitado no curto prazo.',
            impact: 'medium',
            sentiment: 'negative',
            priceImpact: -0.08,
            confidence: 0.50,
            probability: 0.40,
            sources: ['Reuters 01/set/2025'],
            triggers: ['aquisicao_concorrente', 'guerra_de_precos'],
            affectedSectors: ['Varejo']
        }
    ],

    // ==================== TEND3 - Tenda ====================
    TEND3: [
        {
            id: 'TEND3_001',
            date: '2025-11-10',
            type: 'earnings',
            category: 'quarterly_results',
            title: 'Resultados 3T25 - Recorde MCMV',
            description: 'Expectativa de manter lucro recorde (R$ 203M no 2T25). Reversão do prejuízo Alea.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.80,
            probability: 0.85,
            sources: ['Estadão E-Investidor 08/ago/2025', 'Exame'],
            triggers: ['lucro_alea_positivo', 'vendas_liquidas', 'alavancagem_abaixo_25'],
            affectedSectors: ['Construção Civil']
        },
        {
            id: 'TEND3_002',
            date: '2026-02-01',
            type: 'macro',
            category: 'policy',
            title: 'Renovação MCMV 2026 Aprovada',
            description: 'Governo aprova renovação do MCMV com orçamento ampliado.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.20,
            confidence: 0.75,
            probability: 0.80,
            sources: ['Governo Federal', 'Estadão E-Investidor'],
            triggers: ['orcamento_aprovado', 'novas_regras'],
            affectedSectors: ['Construção Civil']
        }
    ],

    // ==================== MACRO EVENTS ====================
    MACRO: [
        {
            id: 'MACRO_001',
            date: '2025-12-11',
            type: 'macro',
            category: 'monetary_policy',
            title: 'Reunião Copom - Manutenção Selic 14.25%',
            description: 'Copom deve manter Selic em 14.25%. Impacto negativo para setores cíclicos.',
            impact: 'high',
            sentiment: 'negative',
            priceImpact: -0.05,
            confidence: 0.80,
            probability: 0.85,
            sources: ['Banco Central', 'Expectativas Mercado'],
            triggers: ['ata_copom', 'comunicado_bc'],
            affectedSectors: ['all']
        },
        {
            id: 'MACRO_002',
            date: '2026-01-15',
            type: 'macro',
            category: 'economic',
            title: 'IPCA 2025 Dentro da Meta (Projeção)',
            description: 'IPCA 2025 deve fechar dentro da meta, abrindo espaço para corte na Selic.',
            impact: 'medium',
            sentiment: 'positive',
            priceImpact: 0.03,
            confidence: 0.70,
            probability: 0.75,
            sources: ['IBGE'],
            triggers: ['divulgacao_ipca', 'expectativas'],
            affectedSectors: ['all']
        },
        {
            id: 'MACRO_003',
            date: '2026-04-01',
            type: 'macro',
            category: 'monetary_policy',
            title: '🎯 Início Ciclo de Corte Selic (Projeção)',
            description: `CATALISADOR MACRO CRÍTICO:
            
            Mercado projeta início de redução gradual da Selic. FORTÍSSIMO impacto para:
            • Construção Civil (MCMV): +15%
            • Varejo: +10%
            • Tech: +12%`,
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.15,
            confidence: 0.60,
            probability: 0.70,
            sources: ['Projeções Mercado'],
            triggers: ['inflacao_controlada', 'atividade_economica'],
            affectedSectors: ['Construção Civil', 'Varejo', 'Tecnologia']
        },
        {
            id: 'MACRO_004',
            date: '2026-02-01',
            type: 'macro',
            category: 'policy',
            title: 'Renovação MCMV 2026 Aprovada',
            description: 'Governo aprova renovação do MCMV com orçamento ampliado. Essencial para construtoras.',
            impact: 'high',
            sentiment: 'positive',
            priceImpact: 0.20,
            confidence: 0.75,
            probability: 0.80,
            sources: ['Governo Federal'],
            triggers: ['orcamento_aprovado', 'novas_regras'],
            affectedSectors: ['Construção Civil']
        }
    ]
};

/**
 * CLASSIFICAÇÃO DE IMPACTO
 */
const IMPACT_WEIGHTS = {
    earnings: 1.0,
    corporate: 0.7,
    macro: 0.8,
    regulatory: 0.6,
    rumors: 0.4,
    technical: 0.5
};

const SENTIMENT_MULTIPLIERS = {
    positive: 1.0,
    neutral: 0.0,
    negative: -1.0,
    mixed: 0.3
};

/**
 * Calcula o Event Score - impacto esperado no preço
 */
function calculateEventScore(event) {
    const baseImpact = event.priceImpact || 0;
    const typeWeight = IMPACT_WEIGHTS[event.type] || 0.5;
    const sentimentMult = SENTIMENT_MULTIPLIERS[event.sentiment] || 0;
    const confidenceAdj = event.confidence || 0.5;
    const probabilityAdj = event.probability || 0.5;
    
    const eventScore = baseImpact * typeWeight * (1 + sentimentMult * 0.5) * confidenceAdj * probabilityAdj;
    
    return eventScore;
}

/**
 * Aplica lógica condicional a um evento
 */
function applyConditionalLogic(event, actualResults) {
    if (!event.triggerId || !CONDITIONAL_LOGIC[event.triggerId]) {
        return event.priceImpact;
    }
    
    const logic = CONDITIONAL_LOGIC[event.triggerId];
    
    // Para eventos binários (ONCO3, PLPL3)
    if (logic.success_factor && logic.failure_factor) {
        const success = logic.condition(actualResults);
        return success ? logic.success_factor - 1 : logic.failure_factor - 1;
    }
    
    // Para eventos de fluxo (CURY3, SMFT3)
    if (logic.flow_factor) {
        const confirmed = logic.condition(actualResults);
        return confirmed ? logic.flow_factor - 1 : 0;
    }
    
    // Para eventos assimétricos (CASH3 M&A)
    if (logic.premium_factor) {
        const confirmed = logic.condition(actualResults);
        return confirmed ? logic.premium_factor - 1 : 0;
    }
    
    // Para eventos com cálculo customizado (CASH3 BTC)
    if (logic.calculate) {
        return logic.calculate(actualResults.current, actualResults.acquisition) - 1;
    }
    
    return event.priceImpact;
}

/**
 * Obtém decision stance atual para um ticker
 */
function getDecisionStance(ticker) {
    return DECISION_RULES[ticker]?.current_stance || 'neutral';
}

/**
 * Atualiza decision stance baseado em eventos validados
 */
function updateDecisionStance(ticker, validatedTriggers) {
    const rules = DECISION_RULES[ticker];
    if (!rules) return 'neutral';
    
    // Verifica se algum trigger de STRONG BUY foi validado
    const hasStrongBuy = validatedTriggers.some(t => rules.strong_buy.includes(t));
    if (hasStrongBuy) {
        rules.current_stance = 'strong_buy';
        return 'strong_buy';
    }
    
    // Verifica triggers de SELL/REDUCE
    const hasSell = validatedTriggers.some(t => rules.sell_reduce.includes(t));
    if (hasSell) {
        rules.current_stance = 'sell_reduce';
        return 'sell_reduce';
    }
    
    // Verifica triggers de WATCH
    const hasWatch = validatedTriggers.some(t => rules.watch.includes(t));
    if (hasWatch) {
        rules.current_stance = 'watch';
        return 'watch';
    }
    
    return rules.current_stance;
}

/**
 * Obtém eventos por ticker
 */
function getEventsByTicker(ticker) {
    const companyEvents = EVENTS_DATABASE[ticker] || [];
    const macroEvents = EVENTS_DATABASE.MACRO || [];
    
    return [...companyEvents, ...macroEvents].sort((a, b) => 
        new Date(a.date) - new Date(b.date)
    );
}

/**
 * Filtra eventos por critérios
 */
function filterEvents(filters = {}) {
    let allEvents = [];
    
    // Combina todos os eventos
    Object.keys(EVENTS_DATABASE).forEach(key => {
        const events = EVENTS_DATABASE[key].map(e => ({...e, ticker: e.ticker || key}));
        allEvents = allEvents.concat(events);
    });
    
    // Aplica filtros
    if (filters.ticker && filters.ticker !== '') {
        allEvents = allEvents.filter(e => e.ticker === filters.ticker);
    }
    
    if (filters.type && filters.type.length > 0) {
        allEvents = allEvents.filter(e => filters.type.includes(e.type));
    }
    
    if (filters.impact) {
        allEvents = allEvents.filter(e => e.impact === filters.impact);
    }
    
    if (filters.dateRange) {
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + filters.dateRange);
        
        allEvents = allEvents.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate >= today && eventDate <= futureDate;
        });
    }
    
    // Ordena por data
    allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return allEvents;
}

/**
 * Calcula impacto agregado de eventos no forecast
 */
function calculateEventsImpact(ticker, horizon = 1) {
    const events = getEventsByTicker(ticker);
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + (horizon * 365));
    
    let totalImpact = 0;
    let weightedConfidence = 0;
    let eventCount = 0;
    
    events.forEach(event => {
        const eventDate = new Date(event.date);
        if (eventDate <= futureDate && eventDate >= today) {
            const eventScore = calculateEventScore(event);
            const timeDecay = 1 - ((eventDate - today) / (futureDate - today)) * 0.3;
            
            totalImpact += eventScore * timeDecay;
            weightedConfidence += event.confidence * Math.abs(eventScore);
            eventCount++;
        }
    });
    
    return {
        totalImpact: totalImpact,
        avgConfidence: eventCount > 0 ? weightedConfidence / eventCount : 0,
        eventCount: eventCount,
        adjustmentFactor: 1 + totalImpact
    };
}

/**
 * Gera insights de eventos
 */
function generateEventInsights(ticker) {
    const events = getEventsByTicker(ticker);
    const upcomingEvents = events.filter(e => new Date(e.date) >= new Date());
    
    if (upcomingEvents.length === 0) {
        return {
            topEvent: null,
            upcomingCount: 0,
            sentimentScore: 0,
            sentiment: 'neutral',
            riskLevel: 'low',
            decisionStance: getDecisionStance(ticker)
        };
    }
    
    const topEvent = upcomingEvents.reduce((max, e) => 
        calculateEventScore(e) > calculateEventScore(max) ? e : max
    , upcomingEvents[0]);
    
    let sentimentScore = 0;
    upcomingEvents.forEach(e => {
        sentimentScore += SENTIMENT_MULTIPLIERS[e.sentiment] * calculateEventScore(e);
    });
    
    return {
        topEvent: topEvent,
        upcomingCount: upcomingEvents.length,
        sentimentScore: sentimentScore,
        sentiment: sentimentScore > 0.1 ? 'positive' : sentimentScore < -0.1 ? 'negative' : 'neutral',
        riskLevel: upcomingEvents.filter(e => e.impact === 'high').length > 2 ? 'high' : 'medium',
        decisionStance: getDecisionStance(ticker)
    };
}

/**
 * Formata eventos para visualizações (Calendário/Gantt)
 */
function formatEventsForCalendar(events) {
    return events.map(event => ({
        title: event.title,
        start: event.date,
        end: event.date,
        backgroundColor: event.impact === 'high' ? '#f44336' : event.impact === 'medium' ? '#ff9800' : '#00c853',
        borderColor: event.impact === 'high' ? '#d32f2f' : event.impact === 'medium' ? '#f57c00' : '#00a041',
        extendedProps: {
            ticker: event.ticker,
            description: event.description,
            priceImpact: event.priceImpact,
            confidence: event.confidence,
            probability: event.probability,
            sources: event.sources,
            sentiment: event.sentiment,
            type: event.type,
            category: event.category
        }
    }));
}

function formatEventsForGantt(events) {
    return events.map((event, index) => ({
        id: event.id || `event-${index}`,
        text: event.title,
        start_date: event.date,
        duration: 1,
        ticker: event.ticker,
        impact: event.impact,
        priceImpact: event.priceImpact,
        confidence: event.confidence,
        probability: event.probability,
        sentiment: event.sentiment,
        description: event.description,
        sources: event.sources
    }));
}

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EVENTS_DATABASE,
        CONDITIONAL_LOGIC,
        DECISION_RULES,
        FUNDAMENTAL_UPDATES,
        calculateEventScore,
        applyConditionalLogic,
        getDecisionStance,
        updateDecisionStance,
        getEventsByTicker,
        filterEvents,
        calculateEventsImpact,
        generateEventInsights,
        formatEventsForCalendar,
        formatEventsForGantt,
        IMPACT_WEIGHTS,
        SENTIMENT_MULTIPLIERS
    };
}