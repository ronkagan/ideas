---
config:
  theme: base
  themeVariables:
    primaryColor: "#1B2A4A"
    primaryTextColor: "#FFFFFF"
    primaryBorderColor: "#2E75B6"
    secondaryColor: "#EBF2FA"
    secondaryTextColor: "#2C3E50"
    tertiaryColor: "#E8F5E9"
    tertiaryTextColor: "#2C3E50"
    lineColor: "#7F8C8D"
    fontSize: "14px"
---
flowchart TB
    subgraph TITLE[" "]
        direction TB
        T1["<b>GAP 1: VERIFICATION CONFIRMS IDENTITY, NOT INTENT</b><br/><i>Every check validates WHO they are — none detect WHAT they intend</i>"]
    end

    subgraph ACTOR["TWO CANDIDATES ENTER THE SAME PIPELINE"]
        direction LR
        LEGIT["👤 <b>Legitimate Employee</b><br/>Real person, real credentials<br/>Genuine employment relationship<br/>Intends to work for wages"]
        MULE["👤 <b>Money Mule</b><br/>Real person, real credentials<br/>Recruited last week<br/>Intends to move illicit funds"]
    end

    subgraph CHECKS["ONPAY VERIFICATION STACK"]
        direction TB
        I9["<b>📋 Form I-9</b><br/>Identity + work eligibility<br/>Original document inspection"]
        EV["<b>🔍 E-Verify</b><br/>Cross-ref SSA + DHS records<br/>Immigration & naturalization"]
        CHECKR["<b>🛡️ Checkr IDV</b><br/>Biometric liveness selfie<br/>AI document forgery detection<br/>Criminal + background screening"]
        MFA["<b>🔐 MFA</b><br/>Authenticator app or SMS<br/>Account access protection"]
    end

    subgraph RESULTS["VERIFICATION OUTCOMES"]
        direction LR
        R_LEGIT["✅ <b>Legitimate Employee</b><br/>PASSES all checks"]
        R_MULE["✅ <b>Money Mule</b><br/>PASSES all checks"]
    end

    subgraph PAYROLL["PAYROLL PROCESSING"]
        direction TB
        PAY["💰 <b>Direct Deposit Initiated</b><br/>Funds sent via ACH to employee bank account"]
    end

    subgraph OUTCOMES["WHAT HAPPENS NEXT — INVISIBLE TO ONPAY"]
        direction LR
        O_LEGIT["🏠 <b>Funds Stay</b><br/>Used for rent, groceries,<br/>bills, savings"]
        O_MULE["⚡ <b>Funds Move Immediately</b><br/>Transferred to fraud network<br/>within hours of deposit"]
    end

    TITLE ~~~ ACTOR
    LEGIT --> I9
    MULE --> I9
    I9 --> EV
    EV --> CHECKR
    CHECKR --> MFA
    MFA --> RESULTS
    R_LEGIT --> PAY
    R_MULE --> PAY
    PAY --> O_LEGIT
    PAY --> O_MULE

    subgraph BLIND["🚫 THE BLIND SPOT"]
        direction TB
        BLIND_TEXT["<b>No check in the current stack evaluates INTENT or POST-DEPOSIT BEHAVIOR</b><br/><br/>• I-9 confirms identity → Mule has real identity ✓<br/>• E-Verify confirms eligibility → Mule is eligible to work ✓<br/>• Checkr confirms liveness → Mule is a real human ✓<br/>• Background check is clean → Mule was recruited last week ✓<br/>• MFA confirms access → Mule has a real phone ✓<br/><br/><i>The architecture detects <b>identity fraud</b> but not <b>identity exploitation</b></i>"]
    end

    OUTCOMES ~~~ BLIND

    style TITLE fill:none,stroke:none
    style T1 fill:#1B2A4A,stroke:#1B2A4A,color:#FFFFFF
    style ACTOR fill:none,stroke:#D5DDE5,stroke-width:1px
    style LEGIT fill:#E8F5E9,stroke:#27AE60,color:#2C3E50
    style MULE fill:#FDECEA,stroke:#C0392B,color:#2C3E50
    style CHECKS fill:#EBF2FA,stroke:#2E75B6,stroke-width:2px
    style I9 fill:#FFFFFF,stroke:#2E75B6,color:#2C3E50
    style EV fill:#FFFFFF,stroke:#2E75B6,color:#2C3E50
    style CHECKR fill:#FFFFFF,stroke:#2E75B6,color:#2C3E50
    style MFA fill:#FFFFFF,stroke:#2E75B6,color:#2C3E50
    style RESULTS fill:none,stroke:#D5DDE5,stroke-width:1px
    style R_LEGIT fill:#E8F5E9,stroke:#27AE60,color:#2C3E50
    style R_MULE fill:#FDECEA,stroke:#C0392B,color:#2C3E50
    style PAYROLL fill:none,stroke:#D5DDE5,stroke-width:1px
    style PAY fill:#F9E79F,stroke:#E67E22,color:#2C3E50
    style OUTCOMES fill:none,stroke:#D5DDE5,stroke-width:1px
    style O_LEGIT fill:#E8F5E9,stroke:#27AE60,color:#2C3E50
    style O_MULE fill:#FDECEA,stroke:#C0392B,color:#2C3E50
    style BLIND fill:#FFF3E0,stroke:#C0392B,stroke-width:3px,stroke-dasharray: 5 5
    style BLIND_TEXT fill:#FDECEA,stroke:#C0392B,color:#2C3E50
