// ============================
// DATA-COMPANIES.JS - Base de Dados Completa
// Todas as empresas B3 SmallCaps com dados reais
// Atualizado: Outubro 2025
// ============================

const COMPANIES_DATABASE = [
    // ==================== CONSTRUÇÃO CIVIL ====================
    {
        ticker: "PLPL3",
        name: "Plano & Plano",
        sector: "Construção Civil",
        subsector: "Baixa Renda / MCMV",
        marketCap: 3400000000,
        currentPrice: 16.06,
        targetPrice: 20.60,
        upside: 21.21,
        score: 88,
        ranking: 1,
        recommendation: "STRONG BUY",
        metrics: {
            pe: 9.63,
            roe: 49,
            roic: 24.89,
            dividendYield: 5.96,
            netDebtToEbitda: 0.2,
            ebitdaMargin: 17.9,
            revenueGrowth: 29.22,
            earningsGrowth: 28.45,
            pb: 3.78,
            evEbitda: 7.28,
            beta: 1.2,
            freeFloat: 27,
            liquidityDaily: 120000000,
            growthValueRatio: 2.95
        },
        catalysts: [
            "Lançamentos 2H25: R$ 2.5B em VGV",
            "Renovação MCMV 2026 com subsídios ampliados",
            "Follow-on potencial R$ 500M para banco de terrenos",
            "Parceria Cyrela em alto padrão (15% do VGV)",
            "Margem EBITDA estável 17-18%"
        ],
        risks: [
            "Alta sensibilidade à Selic",
            "Concentração geográfica em SP (72% das vendas)",
            "Execução dependente de crédito MCMV",
            "Competição intensa no segmento econômico"
        ],
        keyHighlights: [
            "ROE 49% - o mais alto do setor",
            "Líder em habitação econômica",
            "45 mil unidades entregues",
            "Apenas 0.2x dívida/EBITDA",
            "P/L 9.63x muito atrativo"
        ],
        irWebsite: "https://ri.planoeplano.com.br/",
        analystConsensus: {
            buy: 8,
            hold: 1,
            sell: 0
        },
        performance: {
            ytd: 71,
            oneYear: 105.5,
            threeYears: 145,
            fiveYears: null
        },
        nextEarnings: "2025-11-06",
        lastResults: {
            quarter: "2Q25",
            revenue: 920000000,
            netIncome: 168000000,
            ebitda: 164680000
        },
        projections: {
            target1Y: 19.40,
            target3Y: 25.00,
            target5Y: 32.50,
            target10Y: 48.00
        },
        confidence: 88
    },
    
    {
        ticker: "CURY3",
        name: "Cury Construtora",
        sector: "Construção Civil",
        subsector: "Média Renda / MCMV",
        marketCap: 5600000000,
        currentPrice: 32.94,
        targetPrice: 40.01,
        upside: 30.01,
        score: 87,
        ranking: 2,
        recommendation: "STRONG BUY",
        metrics: {
            pe: 12.34,
            roe: 66,
            roic: 42,
            dividendYield: 0,
            netDebtToEbitda: -0.3,
            ebitdaMargin: 43.4,
            revenueGrowth: 38,
            earningsGrowth: 52,
            pb: 5.2,
            evEbitda: 9.5,
            beta: 1.35,
            freeFloat: 42,
            liquidityDaily: 180000000,
            growthValueRatio: 3.08
        },
        catalysts: [
            "Parceria Cyrela: acesso a terrenos premium",
            "Candidato a stock split 2:1",
            "Expansão para 18 estados",
            "Programa de recompra R$ 200M aprovado",
            "Margem EBITDA líder do setor 43%"
        ],
        risks: [
            "Valuation premium vs. peers",
            "Dependência parceria Cyrela",
            "Alta correlação com Selic",
            "Ciclicalidade do setor"
        ],
        keyHighlights: [
            "ROE 66% - recorde histórico",
            "Caixa líquido positivo",
            "Zero dívida líquida",
            "Eficiência operacional top tier",
            "ESG: ISO 14001 e 45001"
        ],
        irWebsite: "https://ri.cury.net/",
        analystConsensus: {
            buy: 7,
            hold: 2,
            sell: 0
        },
        performance: {
            ytd: 58,
            oneYear: 92,
            threeYears: 220,
            fiveYears: null
        },
        nextEarnings: "2025-11-09",
        lastResults: {
            quarter: "2Q25",
            revenue: 1200000000,
            netIncome: 220000000,
            ebitda: 520800000
        },
        projections: {
            target1Y: 40.01,
            target3Y: 45.00,
            target5Y: 58.00,
            target10Y: 85.00
        },
        confidence: 85
    },
    
    {
        ticker: "DIRR3",
        name: "Direcional",
        sector: "Construção Civil",
        subsector: "Incorporação",
        marketCap: 4850000000,
        currentPrice: 15.72,
        targetPrice: 18.76,
        upside: 22.07,
        score: 83,
        ranking: 3,
        recommendation: "STRONG BUY",
        metrics: {
            pe: 14.22,
            roe: 21.5,
            roic: 18,
            dividendYield: 12.0,
            netDebtToEbitda: 1.5,
            ebitdaMargin: 20,
            revenueGrowth: 22,
            earningsGrowth: 18,
            pb: 2.8,
            evEbitda: 8.5,
            beta: 1.25,
            freeFloat: 48,
            liquidityDaily: 95000000,
            growthValueRatio: 1.55
        },
        catalysts: [
            "Desdobramento 2:1 aprovado",
            "Dividend yield 12% atrativo",
            "Diversificação 15 estados",
            "Governança Novo Mercado",
            "VGV 2025: R$ 4.2B (+28%)"
        ],
        risks: [
            "Leverage moderada 1.5x",
            "Sensibilidade a juros",
            "Competição regional",
            "Execução de expansão"
        ],
        keyHighlights: [
            "Presença nacional consolidada",
            "ROE 21.5% consistente",
            "Payout ratio 80-90%",
            "Histórico de 35 anos",
            "Free float 48%"
        ],
        irWebsite: "https://ri.direcional.com.br/",
        analystConsensus: {
            buy: 6,
            hold: 3,
            sell: 0
        },
        performance: {
            ytd: 28,
            oneYear: 42,
            threeYears: 85,
            fiveYears: 180
        },
        nextEarnings: "2025-11-07",
        lastResults: {
            quarter: "2Q25",
            revenue: 1450000000,
            netIncome: 185000000,
            ebitda: 391500000
        },
        projections: {
            target1Y: 18.76,
            target3Y: 31.00,
            target5Y: 42.00,
            target10Y: 62.00
        },
        confidence: 82
    },
    
    {
        ticker: "LAVV3",
        name: "Lavvi",
        sector: "Construção Civil",
        subsector: "Incorporação Alto Padrão",
        marketCap: 4300000000,
        currentPrice: 14.26,
        targetPrice: 17.77,
        upside: 20,
        score: 73,
        ranking: 10,
        recommendation: "BUY",
        metrics: {
            pe: 7.17,
            roe: 28,
            roic: 24,
            dividendYield: 7.56,
            netDebtToEbitda: 0.4,
            ebitdaMargin: 21,
            revenueGrowth: 93,
            earningsGrowth: 80,
            pb: 1.6,
            evEbitda: 5.5,
            beta: 1.1,
            freeFloat: 38,
            liquidityDaily: 40000000,
            growthValueRatio: 11.17
        },
        catalysts: [
            "VGV R$2.8B (+91%)",
            "VSO 59% alto padrão",
            "Heaven by Yoo 65% vendido",
            "JV Cyrela sinergias",
            "Expansão segmento econômico"
        ],
        risks: [
            "Concentração SP",
            "Sensibilidade luxury",
            "Competição intensa",
            "Ciclicalidade setor"
        ],
        keyHighlights: [
            "ROE 25% consistente",
            "Margem líquida 21%",
            "Apenas 11 unidades estoque",
            "DY 7.56% atrativo",
            "P/L 7.17x desconto"
        ],
        irWebsite: "https://ri.lavvi.com.br/",
        analystConsensus: {
            buy: 4,
            hold: 2,
            sell: 0
        },
        performance: {
            ytd: 35,
            oneYear: 42,
            threeYears: 95,
            fiveYears: null
        },
        nextEarnings: "2025-11-11",
        lastResults: {
            quarter: "2Q25",
            revenue: 420000000,
            netIncome: 88200000,
            ebitda: 88200000
        },
        projections: {
            target1Y: 17.77,
            target3Y: 23.00,
            target5Y: 30.00,
            target10Y: 45.00
        },
        confidence: 75
    },
    
    // ==================== ENERGIA ====================
    {
        ticker: "ALUP11",
        name: "Alupar",
        sector: "Energia",
        subsector: "Transmissão",
        marketCap: 14200000000,
        currentPrice: 31.50,
        targetPrice: 34.48,
        upside: 18.08,
        score: 82,
        ranking: 4,
        recommendation: "STRONG BUY",
        metrics: {
            pe: 8.72,
            roe: 14.2,
            roic: 11,
            dividendYield: 6.8,
            netDebtToEbitda: 1.6,
            ebitdaMargin: 45,
            revenueGrowth: 12,
            earningsGrowth: 15,
            pb: 1.2,
            evEbitda: 7.5,
            beta: 0.9,
            freeFloat: 45,
            liquidityDaily: 85000000,
            growthValueRatio: 1.72
        },
        catalysts: [
            "Concessões até 2051",
            "Leilão Peru US$ 220M",
            "RAP ajustado +8% anual",
            "Perfil defensivo baixo beta",
            "Dividend yield 6-8% estável"
        ],
        risks: [
            "Risco regulatório ANEEL",
            "Concentração Brasil 75%",
            "Capex intensivo",
            "Risco cambial LATAM"
        ],
        keyHighlights: [
            "Receita regulada previsível",
            "Concessões longas (30+ anos)",
            "Diversificação LATAM",
            "Geração de caixa estável",
            "Baixa volatilidade"
        ],
        irWebsite: "https://ri.alupar.com.br/",
        analystConsensus: {
            buy: 7,
            hold: 2,
            sell: 0
        },
        performance: {
            ytd: 8,
            oneYear: 15,
            threeYears: 35,
            fiveYears: 72
        },
        nextEarnings: "2025-11-13",
        lastResults: {
            quarter: "2Q25",
            revenue: 920000000,
            netIncome: 186000000,
            ebitda: 414000000
        },
        projections: {
            target1Y: 34.48,
            target3Y: 37.00,
            target5Y: 40.00,
            target10Y: 52.00
        },
        confidence: 85
    },
    
    // ==================== TECNOLOGIA ====================
    {
        ticker: "CASH3",
        name: "Méliuz",
        sector: "Tecnologia",
        subsector: "E-commerce/Fintech",
        marketCap: 385000000,
        currentPrice: 4.26,
        targetPrice: 7.20,
        upside: 73.08,
        score: 76,
        ranking: 7,
        recommendation: "BUY",
        metrics: {
            pe: 7.53,
            roe: 3,
            roic: 5,
            dividendYield: 0,
            netDebtToEbitda: -2.5,
            ebitdaMargin: 15,
            revenueGrowth: 12,
            earningsGrowth: 300,
            pb: 0.8,
            evEbitda: 5.2,
            beta: 2.1,
            freeFloat: 45,
            liquidityDaily: 25000000,
            growthValueRatio: 39.84
        },
        catalysts: [
            "Preço-alvo médio R$ 7,20 (+73,08%)",
            "BTG/XP veem upside de 40% a 73%",
            "Transformação em 'Bitcoin Treasury Company'",
            "Turnaround completo EBITDA+",
            "Caixa excessivo para distribuição (dividend yield de 50% em 2024)"
        ],
        risks: [
            "Alta volatilidade (Beta 2.1)",
            "Competição intensa",
            "Dependência de grandes parceiros",
            "Risco da aposta em tesouraria cripto"
        ],
        keyHighlights: [
            "EBITDA +R$54M vs -R$93M",
            "P/L 7.53x muito atrativo",
            "Novo CEO nov 2024",
            "Cashback líder mercado"
        ],
        irWebsite: "https://ri.meliuz.com.br/",
        analystConsensus: {
            buy: 3,
            hold: 2,
            sell: 1
        },
        performance: {
            ytd: 45,
            oneYear: 85,
            threeYears: -95,
            fiveYears: null
        },
        nextEarnings: "2025-11-08",
        lastResults: {
            quarter: "2Q25",
            revenue: 95000000,
            netIncome: 8000000,
            ebitda: 14250000
        },
        projections: {
            target1Y: 7.20,
            target3Y: 12.00,
            target5Y: 18.00,
            target10Y: 32.00
        },
        confidence: 65
    },
    
    {
        ticker: "INTB3",
        name: "Intelbras",
        sector: "Tecnologia",
        subsector: "Equipamentos Eletrônicos",
        marketCap: 3800000000,
        currentPrice: 11.38,
        targetPrice: 16.35,
        upside: 40,
        score: 58,
        ranking: 19,
        recommendation: "HOLD",
        metrics: {
            pe: 11.72,
            roe: 21.68,
            roic: 18,
            dividendYield: 4.11,
            netDebtToEbitda: 0.5,
            ebitdaMargin: 15,
            revenueGrowth: -11,
            earningsGrowth: -15,
            pb: 2.5,
            evEbitda: 7,
            beta: 1.25,
            freeFloat: 45,
            liquidityDaily: 55000000,
            growthValueRatio: -1.28
        },
        catalysts: [
            "Recuperação pós-ERP",
            "Segurança +27%",
            "Solar Renovigi",
            "98% municípios",
            "Normalização H2"
        ],
        risks: [
            "80% lucros Manaus",
            "Migração SAP impacto",
            "Competição China",
            "Semicondutores supply"
        ],
        keyHighlights: [
            "Líder segurança LatAm",
            "ROE 21.68% sólido",
            "4.8B receita run-rate",
            "Diversificação solar",
            "Asset-light model"
        ],
        irWebsite: "https://ri.intelbras.com.br/",
        analystConsensus: {
            buy: 3,
            hold: 3,
            sell: 0
        },
        performance: {
            ytd: -20,
            oneYear: -15,
            threeYears: -25,
            fiveYears: 180
        },
        nextEarnings: "2025-11-13",
        lastResults: {
            quarter: "2Q25",
            revenue: 1100000000,
            netIncome: 120000000,
            ebitda: 165000000
        },
        projections: {
            target1Y: 16.25,
            target3Y: 20.00,
            target5Y: 25.00,
            target10Y: 35.00
        },
        confidence: 58
    },
    
    {
        ticker: "DESK3",
        name: "Desktop",
        sector: "Telecomunicações",
        subsector: "Provedores Internet",
        marketCap: 420000000,
        currentPrice: 10.12,
        targetPrice: 17.50,
        upside: 39,
        score: 62,
        ranking: 16,
        recommendation: "HOLD",
        metrics: {
            pe: 12.5,
            roe: 15,
            roic: 12,
            dividendYield: 3.2,
            netDebtToEbitda: 1.8,
            ebitdaMargin: 28,
            revenueGrowth: 18,
            earningsGrowth: 22,
            pb: 1.8,
            evEbitda: 7.2,
            beta: 1.3,
            freeFloat: 35,
            liquidityDaily: 12000000,
            growthValueRatio: 1.76
        },
        catalysts: [
            "Fibra ótica expansão",
            "Consolidação regional",
            "ARPU crescente",
            "Churn baixo 1.8%",
            "M&A potencial"
        ],
        risks: [
            "Competição ISPs",
            "Capex intensivo",
            "Regulação Anatel",
            "Liquidez limitada"
        ],
        keyHighlights: [
            "400k clientes ativos",
            "Margem EBITDA 28%",
            "Cobertura interior SP",
            "Tecnologia GPON",
            "DY 3.2%"
        ],
        irWebsite: "https://ri.desktop.com.br/",
        analystConsensus: {
            buy: 2,
            hold: 2,
            sell: 0
        },
        performance: {
            ytd: -5,
            oneYear: 8,
            threeYears: 45,
            fiveYears: null
        },
        nextEarnings: "2025-11-10",
        lastResults: {
            quarter: "2Q25",
            revenue: 85000000,
            netIncome: 9500000,
            ebitda: 23800000
        },
        projections: {
            target1Y: 12.50,
            target3Y: 16.00,
            target5Y: 19.00,
            target10Y: 27.00
        },
        confidence: 62
    },
    
    // ==================== VAREJO ====================
    {
        ticker: "VIVA3",
        name: "Vivara",
        sector: "Varejo",
        subsector: "Joias Premium",
        marketCap: 5100000000,
        currentPrice: 28.50,
        targetPrice: 31.00,
        upside: 20,
        score: 79,
        ranking: 6,
        recommendation: "BUY",
        metrics: {
            pe: 15.2,
            roe: 25,
            roic: 20,
            dividendYield: 4.5,
            netDebtToEbitda: 0.3,
            ebitdaMargin: 22,
            revenueGrowth: 18,
            earningsGrowth: 22,
            pb: 3.5,
            evEbitda: 9.5,
            beta: 1.15,
            freeFloat: 52,
            liquidityDaily: 75000000,
            growthValueRatio: 1.45
        },
        catalysts: [
            "Expansão 520 lojas até 2027",
            "Internacional: Portugal e Espanha",
            "Life by Vivara crescendo 45%",
            "SSS +12% consistente",
            "E-commerce 18% das vendas"
        ],
        risks: [
            "Sensibilidade a consumo premium",
            "Competição joalheria",
            "Custo ouro e prata",
            "Execução internacional"
        ],
        keyHighlights: [
            "ROE 25% top quartile",
            "470 lojas Brasil",
            "Marca forte #1 joias",
            "Governança Novo Mercado",
            "Margem líquida 12%"
        ],
        irWebsite: "https://ri.vivara.com.br/",
        analystConsensus: {
            buy: 7,
            hold: 2,
            sell: 0
        },
        performance: {
            ytd: 18,
            oneYear: 28,
            threeYears: 85,
            fiveYears: 220
        },
        nextEarnings: "2025-11-12",
        lastResults: {
            quarter: "2Q25",
            revenue: 850000000,
            netIncome: 98000000,
            ebitda: 187000000
        },
        projections: {
            target1Y: 31.00,
            target3Y: 37.00,
            target5Y: 48.00,
            target10Y: 74.00
        },
        confidence: 82
    },
    
    {
        ticker: "SMFT3",
        name: "Smart Fit",
        sector: "Varejo",
        subsector: "Academias",
        marketCap: 5800000000,
        currentPrice: 25.15,
        targetPrice: 30.80,
        upside: 20,
        score: 69,
        ranking: 13,
        recommendation: "BUY",
        metrics: {
            pe: 25,
            roe: 15,
            roic: 12,
            dividendYield: 0,
            netDebtToEbitda: 1.8,
            ebitdaMargin: 31,
            revenueGrowth: 33,
            earningsGrowth: 25,
            pb: 3.7,
            evEbitda: 6.6,
            beta: 1.46,
            freeFloat: 62,
            liquidityDaily: 110000000,
            growthValueRatio: 1.32
        },
        catalysts: [
            "5.3M membros +16%",
            "340-360 unidades 2025",
            "15 países expansão",
            "Vintages 53% margem",
            "Não depende crédito"
        ],
        risks: [
            "Competição local",
            "Saturação mercados",
            "Capex intensivo",
            "Execução internacional"
        ],
        keyHighlights: [
            "4ª maior global",
            "Margem EBITDA 31%",
            "HVLP resiliente",
            "FCF yield 11% 2026e",
            "Tese secular fitness"
        ],
        irWebsite: "https://investor.smartfit.com.br/",
        analystConsensus: {
            buy: 6,
            hold: 3,
            sell: 0
        },
        performance: {
            ytd: -12,
            oneYear: -8,
            threeYears: 85,
            fiveYears: 350
        },
        nextEarnings: "2025-11-14",
        lastResults: {
            quarter: "2Q25",
            revenue: 850000000,
            netIncome: 95000000,
            ebitda: 263500000
        },
        projections: {
            target1Y: 30.80,
            target3Y: 43.00,
            target5Y: 55.00,
            target10Y: 80.00
        },
        confidence: 72
    },
    
    {
        ticker: "PGMN3",
        name: "Pague Menos",
        sector: "Varejo",
        subsector: "Farmácias",
        marketCap: 2800000000,
        currentPrice: 3.63,
        targetPrice: 4.80,
        upside: 22,
        score: 65,
        ranking: 15,
        recommendation: "HOLD",
        metrics: {
            pe: 18.5,
            roe: 8,
            roic: 6,
            dividendYield: 6.65,
            netDebtToEbitda: 2.0,
            ebitdaMargin: 5,
            revenueGrowth: 12,
            earningsGrowth: 15,
            pb: 1.4,
            evEbitda: 8.5,
            beta: 1.2,
            freeFloat: 48,
            liquidityDaily: 42000000,
            growthValueRatio: 0.81
        },
        catalysts: [
            "1,649 lojas total",
            "SSS +17.1% Q4",
            "Deleveraging 2.0x",
            "Norte/Nordeste líder",
            "Integração Extrafarma"
        ],
        risks: [
            "Leverage ainda alta",
            "Competição RD/Raia",
            "Margem baixa 5%",
            "Execução integração"
        ],
        keyHighlights: [
            "3ª maior rede",
            "Foco classes BCD",
            "Hub além varejo",
            "DY 6.65% atrativo",
            "Turnaround avançado"
        ],
        irWebsite: "https://ri.paguemenos.com.br/",
        analystConsensus: {
            buy: 3,
            hold: 4,
            sell: 0
        },
        performance: {
            ytd: 12,
            oneYear: 28,
            threeYears: -65,
            fiveYears: -45
        },
        nextEarnings: "2025-11-06",
        lastResults: {
            quarter: "2Q25",
            revenue: 3300000000,
            netIncome: 77100000,
            ebitda: 165000000
        },
        projections: {
            target1Y: 4.80,
            target3Y: 6.00,
            target5Y: 8.00,
            target10Y: 12.00
        },
        confidence: 65
    },
    
    // ==================== AGRONEGÓCIO ====================
    {
        ticker: "SOJA3",
        name: "Boa Safra",
        sector: "Agronegócio",
        subsector: "Sementes",
        marketCap: 1490000000,
        currentPrice: 10.28,
        targetPrice: 16.11,
        upside: 60,
        score: 55,
        ranking: 20,
        recommendation: "SPECULATIVE BUY",
        metrics: {
            pe: 14.7,
            roe: 15,
            roic: 12,
            dividendYield: 2.72,
            netDebtToEbitda: 1.2,
            ebitdaMargin: 18,
            revenueGrowth: -25,
            earningsGrowth: -69,
            pb: 2.2,
            evEbitda: 9,
            beta: 1.3,
            freeFloat: 48,
            liquidityDaily: 18000000,
            growthValueRatio: -4.68
        },
        catalysts: [
            "Recovery 2025",
            "Capacidade +17%",
            "280K big bags",
            "Market share 7.4%",
            "Biotech doubling"
        ],
        risks: [
            "Clima impacto forte",
            "Preços soja",
            "Competição giants",
            "Capital de giro"
        ],
        keyHighlights: [
            "Share de 1.8% para 7.4%",
            "Volume +70% IPO",
            "Genética regional",
            "Relacionamentos fortes",
            "Upside 60% consensus"
        ],
        irWebsite: "https://ri.boasafra.com.br/",
        analystConsensus: {
            buy: 2,
            hold: 1,
            sell: 1
        },
        performance: {
            ytd: -15,
            oneYear: -35,
            threeYears: 25,
            fiveYears: null
        },
        nextEarnings: "2025-11-09",
        lastResults: {
            quarter: "2Q25",
            revenue: 180000000,
            netIncome: 15000000,
            ebitda: 32400000
        },
        projections: {
            target1Y: 16.21,
            target3Y: 21.00,
            target5Y: 30.00,
            target10Y: 48.00
        },
        confidence: 52
    },
    
    {
        ticker: "SLCE3",
        name: "SLC Agrícola",
        sector: "Agronegócio",
        subsector: "Produção Agrícola",
        marketCap: 7850000000,
        currentPrice: 15.75,
        targetPrice: 21.50,
        upside: 17,
        score: 60,
        ranking: 18,
        recommendation: "HOLD",
        metrics: {
            pe: 16.3,
            roe: 11.7,
            roic: 9,
            dividendYield: 5.1,
            netDebtToEbitda: 1.8,
            ebitdaMargin: 28,
            revenueGrowth: -8,
            earningsGrowth: -48,
            pb: 1.9,
            evEbitda: 8.5,
            beta: 1.4,
            freeFloat: 55,
            liquidityDaily: 85000000,
            growthValueRatio: -2.94
        },
        catalysts: [
            "460K hectares",
            "Sierentz +13% área",
            "Algodão forte",
            "China demanda",
            "Valorização terras"
        ],
        risks: [
            "Preços commodities",
            "Clima adverso",
            "Leverage subindo",
            "Dependência China"
        ],
        keyHighlights: [
            "16 fazendas próprias",
            "Líder produção grãos",
            "Tecnologia precisão",
            "DY 5.1% estável",
            "Land value upside"
        ],
        irWebsite: "https://ri.slcagricola.com.br/",
        analystConsensus: {
            buy: 2,
            hold: 4,
            sell: 1
        },
        performance: {
            ytd: 15,
            oneYear: 8,
            threeYears: -25,
            fiveYears: 85
        },
        nextEarnings: "2025-11-10",
        lastResults: {
            quarter: "2Q25",
            revenue: 850000000,
            netIncome: 120000000,
            ebitda: 238000000
        },
        projections: {
            target1Y: 21.50,
            target3Y: 25.70,
            target5Y: 33.00,
            target10Y: 47.00
        },
        confidence: 60
    },
    
    {
        ticker: "BRFS3",
        name: "BRF",
        sector: "Agronegócio",
        subsector: "Proteínas",
        marketCap: 28500000000,
        currentPrice: 17.95,
        targetPrice: 24.00,
        upside: 24,
        score: 70,
        ranking: 12,
        recommendation: "BUY",
        metrics: {
            pe: 14.5,
            roe: 12,
            roic: 9,
            dividendYield: 3.2,
            netDebtToEbitda: 2.2,
            ebitdaMargin: 9.4,
            revenueGrowth: 8,
            earningsGrowth: 18,
            pb: 1.7,
            evEbitda: 7.8,
            beta: 1.35,
            freeFloat: 62,
            liquidityDaily: 280000000,
            growthValueRatio: 1.24
        },
        catalysts: [
            "Turnaround CEO novo",
            "Halal crescimento MENA",
            "Receita R$ 60B 2025",
            "Margem EBITDA 12% meta",
            "Deleveraging progresso"
        ],
        risks: [
            "Risco sanitário aves",
            "Câmbio exposição",
            "Grãos custo input",
            "Leverage ainda 2.2x"
        ],
        keyHighlights: [
            "Global top 3 proteínas",
            "100+ países exportação",
            "Marcas Sadia e Perdigão",
            "Capacidade 6.8M ton/ano",
            "DY 3.2%"
        ],  
        irWebsite: "https://ri.brf-global.com/",
        analystConsensus: {
            buy: 6,
            hold: 3,
            sell: 1
        },
        performance: {
            ytd: 22,
            oneYear: 35,
            threeYears: -15,
            fiveYears: 28
        },
        nextEarnings: "2025-11-13",
        lastResults: {
            quarter: "2Q25",
            revenue: 13900000000,
            netIncome: 458300000,
            ebitda: 1306600000
        },
        projections: {
            target1Y: 24.00,
            target3Y: 30.00,
            target5Y: 38.00,
            target10Y: 55.00
        },
        confidence: 72
    },
    
    // ==================== SAÚDE ====================
    {
        ticker: "ONCO3",
        name: "Oncoclínicas",
        sector: "Saúde",
        subsector: "Oncologia",
        marketCap: 2200000000,
        currentPrice: 3.85,
        targetPrice: 8.60,
        upside: 274,
        score: 45,
        ranking: 21,
        recommendation: "HIGH RISK",
        metrics: {
            pe: -3.1,
            roe: -32,
            roic: -8,
            dividendYield: 0,
            netDebtToEbitda: 2.8,
            ebitdaMargin: 17.4,
            revenueGrowth: 16,
            earningsGrowth: -330,
            pb: 0.77,
            evEbitda: 7.8,
            beta: 2.2,
            freeFloat: 68,
            liquidityDaily: 45000000,
            growthValueRatio: 0
        },
        catalysts: [
            "Turnaround potencial",
            "133 unidades",
            "Parceria Dana-Farber",
            "Programa recompra",
            "Consolidação setor"
        ],
        risks: [
            "Prejuízo R$717M",
            "Leverage 2.8x",
            "Competição hospitais",
            "Execução turnaround"
        ],
        keyHighlights: [
            "Maior rede LatAm",
            "13 estados + DF",
            "682K tratamentos",
            "Deep value play",
            "XP target R$18.60"
        ],
        irWebsite: "https://ri.grupooncoclinicas.com/",
        analystConsensus: {
            buy: 2,
            hold: 2,
            sell: 2
        },
        performance: {
            ytd: -25,
            oneYear: -45,
            threeYears: -90,
            fiveYears: null
        },
        nextEarnings: "2025-11-08",
        lastResults: {
            quarter: "2Q25",
            revenue: 820000000,
            netIncome: -180000000,
            ebitda: 142680000
        },
        projections: {
            target1Y: 8.60,
            target3Y: 18.00,
            target5Y: 22.00,
            target10Y: 39.00
        },
        confidence: 35
    },
    
    // ==================== PETRÓLEO E GÁS ====================
    {
        ticker: "BRAV3",
        name: "Brava Energia",
        sector: "Petróleo e Gás",
        subsector: "Exploração e Produção",
        marketCap: 9200000000,
        currentPrice: 17.73,
        targetPrice: 25.95,
        upside: 45,
        score: 67,
        ranking: 14,
        recommendation: "SPECULATIVE BUY",
        metrics: {
            pe: 5.32,
            roe: 12,
            roic: 10,
            dividendYield: 2.2,
            netDebtToEbitda: 1.55,
            ebitdaMargin: 45,
            revenueGrowth: 22,
            earningsGrowth: 35,
            pb: 0.85,
            evEbitda: 3.8,
            beta: 1.9,
            freeFloat: 45,
            liquidityDaily: 68000000,
            growthValueRatio: 6.58
        },
        catalysts: [
            "Produção 80K bpd 2025",
            "Polo Manati ramp-up",
            "RLAM refino parceria",
            "Pré-sal Albacora Leste",
            "Brent >$80 favorável"
        ],
        risks: [
            "Volatilidade Brent",
            "Risco exploratório",
            "Competição majors",
            "Regulação ANP"
        ],
        keyHighlights: [
            "P/L 5.32x muito baixo",
            "Produção crescendo 22%",
            "Reservas 2P 450M boe",
            "Margem EBITDA 45%",
            "Deep value oil"
        ],
        irWebsite: "https://ri.bravaenergia.com.br/",
        analystConsensus: {
            buy: 4,
            hold: 2,
            sell: 1
        },
        performance: {
            ytd: -18,
            oneYear: -12,
            threeYears: 45,
            fiveYears: null
        },
        nextEarnings: "2025-11-14",
        lastResults: {
            quarter: "2Q25",
            revenue: 1200000000,
            netIncome: 285000000,
            ebitda: 540000000
        },
        projections: {
            target1Y: 25.95,
            target3Y: 34.00,
            target5Y: 47.00,
            target10Y: 70.00
        },
        confidence: 58
    },
    
    // ==================== INDUSTRIAL ====================
    {
        ticker: "MYPK3",
        name: "Iochpe-Maxion",
        sector: "Industrial",
        subsector: "Autopeças",
        marketCap: 2100000000,
        currentPrice: 10.99,
        targetPrice: 18.25,
        upside: 31,
        score: 72,
        ranking: 11,
        recommendation: "BUY",
        metrics: {
            pe: 11.5,
            roe: 8,
            roic: 6,
            dividendYield: 5.59,
            netDebtToEbitda: 2.39,
            ebitdaMargin: 12,
            revenueGrowth: 8,
            earningsGrowth: 15,
            pb: 0.9,
            evEbitda: 6.5,
            beta: 1.6,
            freeFloat: 48,
            liquidityDaily: 38000000,
            growthValueRatio: 1.30
        },
        catalysts: [
            "Rodas América +12%",
            "Componentes Europa",
            "Elétricos ramp-up",
            "Global footprint",
            "DY 5.59% atrativo"
        ],
        risks: [
            "Ciclo automotivo",
            "Leverage 2.39x",
            "Câmbio múltiplo",
            "Steel input costs"
        ],
        keyHighlights: [
            "Líder rodas global",
            "14 plantas 6 países",
            "Cliente Tesla, VW, Ford",
            "P/B 0.9x desconto",
            "Margem EBITDA melhorando"
        ],
        irWebsite: "https://ri.iochpe-maxion.com.br/",
        analystConsensus: {
            buy: 4,
            hold: 3,
            sell: 0
        },
        performance: {
            ytd: 18,
            oneYear: 25,
            threeYears: 42,
            fiveYears: 95
        },
        nextEarnings: "2025-11-07",
        lastResults: {
            quarter: "2Q25",
            revenue: 1800000000,
            netIncome: 65000000,
            ebitda: 216000000
        },
        projections: {
            target1Y: 18.25,
            target3Y: 23.00,
            target5Y: 30.00,
            target10Y: 45.00
        },
        confidence: 68
    }
];

// Export para uso em outros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COMPANIES_DATABASE };
}