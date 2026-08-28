import React, { useState } from "react";
import "./App.css";
import ChatAssistant from "./ChatAssistant";

// ==========================================================
// DIGITAL BUDDY - MULTI LANGUAGE APP
// ==========================================================
//
// Supported languages:
// 1. English
// 2. Luganda
// 3. Runyankole
// 4. Acholi
// 5. Ateso
//
// The selected language is saved in localStorage.
// ==========================================================


// ==========================================================
// TRANSLATIONS
// ==========================================================

const TRANSLATIONS = {
  English: {
    language: "Language",
    chooseLanguage: "Choose your language",

    homeTitle: "Digital Buddy",
    subtitle: "Learn, stay safe, and understand technology.",
    whatWouldYouLike: "What would you like to do?",

    learnSkills: "Learn Digital Skills",
    learnSkillsDesc: "Learn how to use technology safely.",

    scamCheck: "Check For Scams",
    scamCheckDesc: "Check suspicious messages.",

    assistant: "Ask Digital Assistant",
    assistantDesc: "Ask questions about technology.",

    back: "← Back",

    chooseTopic: "Choose a topic you would like to learn.",

    cybersecurity: "Cybersecurity",
    cybersecurityDesc:
      "Learn how to protect yourself when using technology and the internet.",

    email: "Email",
    emailDesc:
      "Learn how to communicate professionally and safely using email.",

    artificialIntelligence: "Artificial Intelligence",
    artificialIntelligenceDesc:
      "Learn about Artificial Intelligence and how to use it responsibly.",

    noInternet: "No internet?",
    learnWithUSSD:
      "You can also learn digital skills using our USSD service.",
    scamWithUSSD:
      "You can also check suspicious messages using our USSD service.",
    useUSSD: "Use USSD",

    lessonQuiz: "Lesson Quiz",
    question: "Question",
    of: "of",
    quizCompleted: "Quiz Completed!",
    yourScore: "Your Score",
    retakeQuiz: "Retake Quiz",

    safetyCheck: "Safety Check",
    safetySubtitle:
      "Not sure about a message? Let's look for warning signs.",

    pasteMessage: "Paste the suspicious message",
    example: "Example: Congratulations! You have won...",
    tryExample: "Try an example",

    checkMessage: "Check Message",
    checking: "Checking...",
    checkingSigns: "Checking for warning signs...",
    scamPatterns: "We're looking for common scam patterns.",

    privacyNote:
      "Don't include passwords, PINs, OTPs, or other sensitive information.",

    riskAssessment: "Risk Assessment",
    potentialScam: "Potential Scam",
    suspiciousMessage: "Suspicious Message",
    proceedWithCaution: "Proceed With Caution",
    lowRisk: "Low Risk",
    highRisk: "High Risk",

    messageAnalysis: "Message Analysis",
    highlightedWarning: "Highlighted warning signs",
    warningSign: "Warning sign",
    warningExplanation:
      "Words or phrases that deserve extra attention",

    whyConcerned: "Why we're concerned",
    noWarning:
      "We didn't detect obvious scam warning signs. However, always verify unexpected messages.",

    safetyAdvice: "Safety Advice",
    score: "Score",
    type: "Type",
    warningSigns: "Warning signs",

    digitalAssistant: "Digital Safety Assistant",
    assistantSubtitle:
      "Ask any tech question or paste a suspicious message to check for scams.",

    offlineDigitalSkills: "Offline Digital Skills",
    offlineDigitalSkillsDesc:
      "Learn digital skills without internet data.",

    offlineScamCheck: "Offline Scam Check",
    offlineScamCheckDesc:
      "Check suspicious messages and learn safety tips without internet data.",

    backToSkills: "← Back to Digital Skills",
    backToSafety: "← Back to Safety Check",

    scamCheckTitle: "SCAM CHECK",
    welcome: "Welcome to Digital Buddy.",
    chooseOption: "Choose an option:",
    checkSuspiciousMessage: "1. Check a suspicious message",
    safetyTips: "2. Safety Tips",
    exit: "3. Exit",
    enterOption: "Enter option",
    send: "Send",

    checkMessageTitle: "CHECK MESSAGE",
    enterSuspiciousMessage: "Enter the suspicious message:",
    typeMessage: "Type message here...",
    check: "Check",

    learnDigitalSkillsTitle: "LEARN DIGITAL SKILLS",
    whatLearn: "What would you like to learn?",
    backOption: "4. Back",

    cyberTitle: "CYBERSECURITY",
    emailTitle: "EMAIL",
    aiTitle: "ARTIFICIAL INTELLIGENCE",

    backButton: "Back",

    result: "RESULT",
    risk: "Risk",
    unableAnalyze: "Unable to analyze the message.",
    finish: "Finish",

    thankYou: "Thank you for using Digital Buddy.",
    staySafe: "Stay safe and keep learning.",
    close: "Close",

    developmentDemo: "Development Demo",
    simulation:
      "This is a simulation of the USSD experience. The real service can work through a telecom USSD gateway.",

    strongPasswords: "Use strong passwords with letters, numbers and symbols.",
    neverSharePin: "Never share your Mobile Money PIN or OTP.",
    suspiciousLinks: "Don't click suspicious links.",
    verifyPeople:
      "Verify people before sending money or personal information.",

    emailDescription:
      "Email allows you to send and receive digital messages.",
    composeEmail: "Use Compose to write a new email.",
    attachFiles: "You can attach documents and photos.",
    neverShareEmailPassword: "Never share your email password.",
    unknownAttachments:
      "Be careful with unknown attachments and links.",

    aiDescription:
      "AI allows computers to perform tasks that normally require human intelligence.",
    aiQuestions: "AI can answer questions and explain information.",
    aiWriting: "AI can help with writing and learning.",
    aiMistakes: "AI can make mistakes.",
    verifyAI: "Always verify important information provided by AI.",

    neverSharePIN: "Never share your PIN or OTP.",
    dontSendMoney: "Don't send money to strangers.",
    verifyMessages: "Verify suspicious messages.",
    dontClickLinks: "Don't click unknown links.",
    useStrongPasswords: "Use strong passwords.",

    lowRiskDescription:
      "We found few obvious warning signs, but always verify unexpected messages.",
    cautionDescription:
      "There are some warning signs. Be careful and verify the sender.",
    suspiciousDescription:
      "This message contains warning signs that you should investigate before taking action.",
    highRiskDescription:
      "This message contains several common warning signs associated with scams.",

    urgencyTitle: "Creates urgency",
    urgencyDescription:
      "The sender is pressuring you to act quickly instead of giving you time to verify the message.",

    sensitiveTitle: "Requests sensitive information",
    sensitiveDescription:
      "Legitimate organizations should not ask you to reveal your PIN, password, or OTP.",

    moneyTitle: "Requests money",
    moneyDescription:
      "The message asks you to send money or make a payment.",

    rewardTitle: "Unexpected reward",
    rewardDescription:
      "The message promises a prize, reward, or money that you may not have expected.",

    linkTitle: "Contains a link",
    linkDescription:
      "Be careful with links in unexpected messages. Verify the destination before opening them.",

    threatTitle: "Uses fear or threats",
    threatDescription:
      "The sender may be using fear or threats to pressure you into acting.",

    protectMobileMoney: "Protect your mobile money",
    verifyJob: "Verify the job opportunity",
    verifyEducation: "Verify the education offer",
    protectRomance: "Protect yourself from romance scams",
    unexpectedPrize: "Be careful with unexpected prizes",
    protectAccount: "Protect your account",
    verifyContact: "Verify who contacted you",
    staySafe: "Stay safe",

    neverShareMobilePIN:
      "Never share your mobile-money PIN or OTP.",
    dontSendUnexpected:
      "Don't send money because of an unexpected message.",
    contactProvider:
      "Contact your mobile-money provider using an official number or app.",

    dontPayJob:
      "Don't pay money just to apply for or receive a job.",
    researchCompany:
      "Research the company using its official website.",
    verifyVacancy:
      "Verify the vacancy with the company's official contact information.",

    contactSchool:
      "Contact the school or university directly.",
    dontPayUnverified:
      "Don't pay fees through an unverified link or personal number.",
    checkInstitution:
      "Check the institution's official website for scholarship information.",

    dontSendRomanceMoney:
      "Don't send money to someone you only know online.",
    emotionalEmergency:
      "Be cautious if someone creates an emotional emergency.",
    verifyIdentity:
      "Verify the person's identity before sharing personal or financial information.",

    dontPayPrize:
      "Don't pay a fee to claim a prize you didn't enter.",
    verifyPromotion:
      "Verify the promotion through the organization's official website or contact.",

    dontLoginLinks:
      "Don't log in through links sent in unexpected messages.",
    contactOrganization:
      "Contact the organization directly if you think your account has a problem.",

    officialName:
      "Don't trust a message simply because it uses an official name or logo.",
    officialChannel:
      "Contact the organization through an official channel.",
    dontSendPersonal:
      "Don't send money or personal information until the request is verified.",

    dontRush: "Don't rush into taking action.",
    verifySender: "Verify the sender independently.",
    neverShareSensitive:
      "Never share passwords, PINs, or OTPs."
  },

  Luganda: {
    language: "Olulimi",
    chooseLanguage: "Londa olulimi lwo",

    homeTitle: "Digital Buddy",
    subtitle: "Yiga, wekuume, era otegeere tekinologiya.",
    whatWouldYouLike: "Oyagala kukola ki?",

    learnSkills: "Yiga Obukugu bwa Tekinologiya",
    learnSkillsDesc:
      "Yiga engeri y'okukozesa tekinologiya mu bukuumi.",

    scamCheck: "Kebera Obubaka Obw'Obulimba",
    scamCheckDesc: "Kebera obubaka obuteesigika.",

    assistant: "Buuza Digital Assistant",
    assistantDesc:
      "Buuza ebibuuzo ebikwata ku tekinologiya.",

    back: "← Emabega",
    chooseTopic: "Londa omutwe gw'oyagala okuyiga.",

    cybersecurity: "Obukuumi bwa Kompyuta",
    cybersecurityDesc:
      "Yiga engeri y'okwekuumamu ng'okozesa tekinologiya ne yintaneeti.",

    email: "Email",
    emailDesc:
      "Yiga engeri y'okukozesa email mu bukuumi n'obukugu.",

    artificialIntelligence: "Artificial Intelligence",
    artificialIntelligenceDesc:
      "Yiga ku Artificial Intelligence n'engeri y'okugikozesaamu obuvunaanyizibwa.",

    noInternet: "Tolina internet?",
    learnWithUSSD:
      "Osobola okuyiga obukugu bwa tekinologiya ng'okozesa empeereza ya USSD.",
    scamWithUSSD:
      "Osobola okukebera obubaka obuteesigika ng'okozesa USSD.",
    useUSSD: "Kozesa USSD",

    lessonQuiz: "Ekigezo ky'Omutwe",
    question: "Ekibuuzo",
    of: "ku",
    quizCompleted: "Ekigezo Kiwedde!",
    yourScore: "Obubonero Bwo",
    retakeQuiz: "Ddamu Ekigezo",

    safetyCheck: "Kebera Obukuumi",
    safetySubtitle:
      "Tolina bukakafu ku bubaka? Ka tukebere obubonero obw'obulimba.",

    pasteMessage: "Teeka wano obubaka obuteesigika",
    example: "Okugeza: Weebale! Owangudde...",
    tryExample: "Gezaako ekyokulabirako",

    checkMessage: "Kebera Obubaka",
    checking: "Ekeberebwa...",
    checkingSigns: "Tukebereza obubonero obw'obulimba...",
    scamPatterns:
      "Tukebereza enkola ezitera okukozesebwa mu bulimba.",

    privacyNote:
      "Tokuteekamu password, PIN, OTP oba amawulire amalala ag'ekyama.",

    riskAssessment: "Okukebera Obulabe",
    potentialScam: "Obubaka Obw'Obulimba",
    suspiciousMessage: "Obubaka Obuteesigika",
    proceedWithCaution: "Kola n'Obwegendereza",
    lowRisk: "Obulabe Butono",
    highRisk: "Obulabe Bungi",

    messageAnalysis: "Okwekenenya Obubaka",
    highlightedWarning: "Obubonero obw'obulabe obulaga",
    warningSign: "Obubonero bw'obulabe",
    warningExplanation:
      "Ebigambo oba emboozi ezetaaga okwegendereza",

    whyConcerned: "Lwaki tweeraliikiridde",
    noWarning:
      "Tetuzudde bubonero bw'obulimba obweyolefu. Naye bulijjo kebera obubaka obutasuubirwa.",

    safetyAdvice: "Amagezi g'Obukuumi",
    score: "Obubonero",
    type: "Ekika",
    warningSigns: "Obubonero bw'Obulabe",

    digitalAssistant: "Digital Safety Assistant",
    assistantSubtitle:
      "Buuza ekibuuzo kya tekinologiya oba teeka obubaka obuteesigika.",

    offlineDigitalSkills: "Obukugu bwa Tekinologiya nga Tolina Internet",
    offlineDigitalSkillsDesc:
      "Yiga obukugu bwa tekinologiya nga tokozesa data ya internet.",

    offlineScamCheck: "Okukebera Obulimba nga Tolina Internet",
    offlineScamCheckDesc:
      "Kebera obubaka obuteesigika era yiga amagezi g'obukuumi nga tokozesa internet.",

    backToSkills: "← Dda ku Bukugu bwa Tekinologiya",
    backToSafety: "← Dda ku Bukuumi",

    scamCheckTitle: "KEBERA OBUBAKA OBW'OBULIMBA",
    welcome: "Tukwanirizza ku Digital Buddy.",
    chooseOption: "Londa eky'okukola:",
    checkSuspiciousMessage: "1. Kebera obubaka obuteesigika",
    safetyTips: "2. Amagezi g'Obukuumi",
    exit: "3. Fuluma",
    enterOption: "Teekamu ennamba",
    send: "Sindika",

    checkMessageTitle: "KEBERA OBUBAKA",
    enterSuspiciousMessage: "Teekamu obubaka obuteesigika:",
    typeMessage: "Wandiika obubaka wano...",
    check: "Kebera",

    learnDigitalSkillsTitle: "YIGA OBUKUGU BWA TEKINOLOGIYA",
    whatLearn: "Oyagala kuyiga ki?",
    backOption: "4. Dda emabega",

    cyberTitle: "OBUKUUMI BWA KOMPYUTA",
    emailTitle: "EMAIL",
    aiTitle: "ARTIFICIAL INTELLIGENCE",

    backButton: "Emabega",

    result: "EBIVUDDEMU",
    risk: "Obulabe",
    unableAnalyze: "Tetusobodde kwekenenya bubaka.",
    finish: "Maliriza",

    thankYou: "Webale okukozesa Digital Buddy.",
    staySafe: "Wekuume era weeyongere okuyiga.",
    close: "Ggalawo",

    developmentDemo: "Okugeza mu Nkulaakulana",
    simulation:
      "Kuno kwe kulaga engeri USSD gy'eyinza okukolamu. Empeereza entuufu eyinza okukozesa USSD gateway.",

    strongPasswords:
      "Kozesa password ennywevu erimu ennukuta, ennamba n'obubonero.",
    neverSharePin: "Togabana PIN oba OTP yo ey'ekitabo kya ssente.",
    suspiciousLinks: "Tokuba ku links eziteesigika.",
    verifyPeople:
      "Kebera omuntu nga tonnamuwe ssente oba amawulire go.",

    emailDescription:
      "Email ekusobozesa okusindika n'okufuna obubaka obwa digito.",
    composeEmail: "Kozesa Compose okuwandiika email empya.",
    attachFiles: "Osobola okugattako documents n'ebifaananyi.",
    neverShareEmailPassword: "Togabana password ya email yo.",
    unknownAttachments:
      "Wegendereze attachments ne links z'otomanyi.",

    aiDescription:
      "AI esobozesa kompyuta okukola emirimu egitera okwetaagisa obwongo bw'omuntu.",
    aiQuestions: "AI esobola okuddamu ebibuuzo n'okunnyonnyola amawulire.",
    aiWriting: "AI esobola okuyamba mu kuwandiika n'okuyiga.",
    aiMistakes: "AI esobola okukola ensobi.",
    verifyAI: "Bulijjo kebera amawulire amakulu agawa AI.",

    neverSharePIN: "Togabana PIN oba OTP yo.",
    dontSendMoney: "Tosindika ssente eri abantu b'otomanyi.",
    verifyMessages: "Kebera obubaka obuteesigika.",
    dontClickLinks: "Tokuba ku links z'otomanyi.",
    useStrongPasswords: "Kozesa passwords ennywevu.",

    lowRiskDescription:
      "Tuzudde obubonero obutono, naye bulijjo kebera obubaka obutasuubirwa.",
    cautionDescription:
      "Waliwo obubonero bw'obulabe. Wegendereze era kebera eyasindika obubaka.",
    suspiciousDescription:
      "Obubaka buno bulina obubonero bw'obulabe. Kebera nga tonnakola kintu kyonna.",
    highRiskDescription:
      "Obubaka buno bulina obubonero obw'obulimba obw'enjawulo.",

    urgencyTitle: "Bukusindika okukola mangu",
    urgencyDescription:
      "Omusindika akukaka okukola mangu nga takuwadde budde kukebere bubaka.",

    sensitiveTitle: "Busaba amawulire ag'ekyama",
    sensitiveDescription:
      "Ebibiina ebituufu tebirina kukusaba PIN, password oba OTP yo.",

    moneyTitle: "Busaba ssente",
    moneyDescription:
      "Obubaka busaba osindike ssente oba okole payment.",

    rewardTitle: "Empeera etasuubirwa",
    rewardDescription:
      "Obubaka bukusuubiza prize, mpeera oba ssente z'otasuubira.",

    linkTitle: "Bulina link",
    linkDescription:
      "Wegendereze links mu bubaka obutasuubirwa. Kebera gy'ekussa nga tonnaggulawo.",

    threatTitle: "Bukozesa okutya oba okukanga",
    threatDescription:
      "Omusindika ayinza okukozesa okutya okukukaka okukola.",

    protectMobileMoney: "Kuuma Mobile Money yo",
    verifyJob: "Kebera omulimu",
    verifyEducation: "Kebera omukisa gw'okusoma",
    protectRomance: "Weekuume ku bulimba bw'okwagala",
    unexpectedPrize: "Wegendereze ku prizes z'otasuubira",
    protectAccount: "Kuuma account yo",
    verifyContact: "Kebera eyakutuukirira",
    staySafe: "Weekuume",

    neverShareMobilePIN:
      "Togabana PIN oba OTP ya Mobile Money yo.",
    dontSendUnexpected:
      "Tosindika ssente olw'obubaka obutasuubirwa.",
    contactProvider:
      "Tuukirira omuwa empeereza ya Mobile Money ng'okozesa ennamba oba app entuufu.",

    dontPayJob:
      "Tosasa ssente okusaba oba okufuna omulimu.",
    researchCompany:
      "Noonyereza ku kampuni ng'okozesa website yaayo entuufu.",
    verifyVacancy:
      "Kebera omulimu ng'okozesa contact entuufu eya kampuni.",

    contactSchool:
      "Tuukirira essomero oba yunivasite butereevu.",
    dontPayUnverified:
      "Tosasa fees ng'okozesa link oba ennamba y'omuntu gy'otamanyi.",
    checkInstitution:
      "Kebera website entuufu y'ekitongole ku scholarship.",

    dontSendRomanceMoney:
      "Tosindika ssente eri omuntu gw'omanyi ku yintaneeti yekka.",
    emotionalEmergency:
      "Wegendereze omuntu akuleetera emergency ey'ekitonde.",
    verifyIdentity:
      "Kebera omuntu nga tonnamuwa mawulire ga ssente oba ag'obuntu.",

    dontPayPrize:
      "Tosasa fee kufuna prize gye w'otawandiikamu.",
    verifyPromotion:
      "Kebera promotion ng'okozesa website oba contact entuufu.",

    dontLoginLinks:
      "Toyingira account ng'okozesa links ezisindikiddwa mu bubaka obutasuubirwa.",
    contactOrganization:
      "Tuukirira ekitongole butereevu bw'olowooza account yo erina ekizibu.",

    officialName:
      "Togeesiga bubaka olw'okuba bukozesa erinnya oba logo y'ekitongole.",
    officialChannel:
      "Tuukirira ekitongole ng'okozesa channel yaakyo entuufu.",
    dontSendPersonal:
      "Tosindika ssente oba mawulire go nga tonnakakasa kusaba.",

    dontRush: "Tokola mangu nga tonnakebera.",
    verifySender: "Kebera eyasindika obubaka.",
    neverShareSensitive:
      "Togabana passwords, PIN oba OTP."
  },

  Runyankole: {
    language: "Orurimi",
    chooseLanguage: "Toorana orurimi rwawe",

    homeTitle: "Digital Buddy",
    subtitle: "Yega, weerinde, kandi omanye tekinologiya.",
    whatWouldYouLike: "Niki ekiwakunda kukora?",

    learnSkills: "Yega Obukugu bwa Tekinologiya",
    learnSkillsDesc:
      "Yega okukoresa tekinologiya omu buryo bw'obwirinzi.",

    scamCheck: "Reeba Obubaka Obw'oburyarya",
    scamCheckDesc: "Reeba obubaka obutakwesigwa.",

    assistant: "Buuza Digital Assistant",
    assistantDesc:
      "Buuza ebibuuzo ebikwata ahari tekinologiya.",

    back: "← Garuka",
    chooseTopic: "Toorana omutwe ogwoyenda kwega.",

    cybersecurity: "Obwirinzi bwa Kompyuta",
    cybersecurityDesc:
      "Yega okuweerinda waaba nookoresa tekinologiya na internet.",

    email: "Email",
    emailDesc:
      "Yega okuhandika n'okukoresa email omu buryo oburungi.",

    artificialIntelligence: "Artificial Intelligence",
    artificialIntelligenceDesc:
      "Yega ahari Artificial Intelligence n'oku ogikoresa gye.",

    noInternet: "No internet?",
    learnWithUSSD:
      "Noobaasa kwega obukugu bwa tekinologiya okozesa USSD.",
    scamWithUSSD:
      "Noobaasa kureeba obubaka obutakwesigwa okozesa USSD.",
    useUSSD: "Koresa USSD",

    lessonQuiz: "Ekigezo",
    question: "Ekibuuzo",
    of: "ahari",
    quizCompleted: "Ekigezo Kiherize!",
    yourScore: "Obubonero Bwawe",
    retakeQuiz: "Ogarukemu Ekigezo",

    safetyCheck: "Reeba Obwirinzi",
    safetySubtitle:
      "Nooyebuzabuza aha bubaka? Ka tureebe obubonero bw'oburyarya.",

    pasteMessage: "Shyiramu obubaka obutakwesigwa",
    example: "Eky'okureeberaho: Owangwire...",
    tryExample: "Reeba eky'okureeberaho",

    checkMessage: "Reeba Obubaka",
    checking: "Nitureeba...",
    checkingSigns: "Nitureeba obubonero bw'oburyarya...",
    scamPatterns:
      "Nitureeba enkora ezitera kukozesebwa omu bubi.",

    privacyNote:
      "Otashiremamu password, PIN, OTP nari amakuru ag'ekyama.",

    riskAssessment: "Okureeba Obulabe",
    potentialScam: "Obubaka Obw'oburyarya",
    suspiciousMessage: "Obubaka Obutakwesigwa",
    proceedWithCaution: "Kora n'Obwegyendesereza",
    lowRisk: "Obulabe Bukye",
    highRisk: "Obulabe Bwingi",

    messageAnalysis: "Okwekenena Obubaka",
    highlightedWarning: "Obubonero bw'obulabe",
    warningSign: "Obubonero",
    warningExplanation:
      "Amagambo agariirweho okwegyendesereza",

    whyConcerned: "Ahabw'enki twine obwerariikirwe",
    noWarning:
      "Titurazire obubonero bw'oburyarya oburikworeka. Kwonka buriijo reeba obubaka obutakutegwire.",

    safetyAdvice: "Amagezi g'Obwirinzi",
    score: "Obubonero",
    type: "Ekika",
    warningSigns: "Obubonero bw'Obulabe",

    digitalAssistant: "Digital Safety Assistant",
    assistantSubtitle:
      "Buuza ekibuuzo aha tekinologiya nari shyiramu obubaka obutakwesigwa.",

    offlineDigitalSkills: "Obukugu bwa Tekinologiya nga Tine Internet",
    offlineDigitalSkillsDesc:
      "Yega obukugu bwa tekinologiya otakoresize internet.",

    offlineScamCheck: "Reeba Oburyarya nga Tine Internet",
    offlineScamCheckDesc:
      "Reeba obubaka obutakwesigwa kandi yega amagezi g'obwirinzi.",

    backToSkills: "← Garuka ahari Digital Skills",
    backToSafety: "← Garuka ahari Obwirinzi",

    scamCheckTitle: "REEBA OBURYARYA",
    welcome: "Welcome ahari Digital Buddy.",
    chooseOption: "Toorana ekikorerwa:",
    checkSuspiciousMessage: "1. Reeba obubaka obutakwesigwa",
    safetyTips: "2. Amagezi g'Obwirinzi",
    exit: "3. Fuluma",
    enterOption: "Shyiramu option",
    send: "Send",

    checkMessageTitle: "REEBA OBUBAKA",
    enterSuspiciousMessage: "Shyiramu obubaka obutakwesigwa:",
    typeMessage: "Handika obubaka aha...",
    check: "Reeba",

    learnDigitalSkillsTitle: "YEGA OBUKUGU BWA TEKINOLOGIYA",
    whatLearn: "Niki ekiwakunda kwega?",
    backOption: "4. Garuka",

    cyberTitle: "OBWIRINZI BWA KOMPYUTA",
    emailTitle: "EMAIL",
    aiTitle: "ARTIFICIAL INTELLIGENCE",

    backButton: "Garuka",

    result: "EBIVUDDEMU",
    risk: "Obulabe",
    unableAnalyze: "Titurashoboroora obubaka.",
    finish: "Heza",

    thankYou: "Webare kukoresa Digital Buddy.",
    staySafe: "Weerinde kandi oyongere kwega.",
    close: "Ggalawo",

    developmentDemo: "Development Demo",
    simulation:
      "Eki niky'okureeberaho kya USSD. Empeereza ey'amazima neebaasa kukorera ahari telecom USSD gateway.",

    strongPasswords:
      "Koresa passwords zikomeye ezirimu letters, numbers na symbols.",
    neverSharePin: "Otaga PIN nari OTP ya Mobile Money.",
    suspiciousLinks: "Otacwanga ahari links ezitakwesigwa.",
    verifyPeople:
      "Reeba abantu mbere y'okubaha sente nari amakuru gaawe.",

    emailDescription:
      "Email neekwikiriza kutuma n'okutunga obubaka bwa digital.",
    composeEmail: "Koresa Compose kuhandika email empya.",
    attachFiles: "Noobaasa kuteeraho documents n'ebifaananyi.",
    neverShareEmailPassword: "Otaga password ya email yawe.",
    unknownAttachments:
      "Gyendesereza attachments na links ezitomaanye.",

    aiDescription:
      "AI neekwikiriza computers kukora emirimo erikubaasa kwetaaga obwenge bw'omuntu.",
    aiQuestions: "AI neebaasa kugarukamu ebibuuzo.",
    aiWriting: "AI neebaasa kukuyamba omu kwandika n'okwega.",
    aiMistakes: "AI neebaasa kukora ensobi.",
    verifyAI: "Buriijo reeba amakuru makuru aga AI.",

    neverSharePIN: "Otaga PIN nari OTP yawe.",
    dontSendMoney: "Otuma sente ahari abantu abatomaanye.",
    verifyMessages: "Reeba obubaka obutakwesigwa.",
    dontClickLinks: "Otacwanga ahari links ezitomaanye.",
    useStrongPasswords: "Koresa passwords zikomeye.",

    lowRiskDescription:
      "Tuzire obubonero bukye, kwonka buriijo reeba obubaka obutakutegwire.",
    cautionDescription:
      "Hariho obubonero bw'obulabe. Gyendesereza kandi reeba omutumi.",
    suspiciousDescription:
      "Obubaka obu burimu obubonero bw'obulabe. Reeba mbere y'okukora.",
    highRiskDescription:
      "Obubaka obu burimu obubonero bwingi obw'oburyarya.",

    urgencyTitle: "Bukuhutaza kukora bwangu",
    urgencyDescription:
      "Omuntu akuhutaza kukora bwangu otakabonye obwire bwo kureeba obubaka.",

    sensitiveTitle: "Busaba amakuru ag'ekyama",
    sensitiveDescription:
      "Ekitongore ekihikire tikirikwija kusaba PIN, password nari OTP.",

    moneyTitle: "Busaba sente",
    moneyDescription:
      "Obubaka nibusaba kutuma sente nari kukora payment.",

    rewardTitle: "Empeera etakutegwirwe",
    rewardDescription:
      "Obubaka nibukwemerera prize nari sente ezitakutegwirwe.",

    linkTitle: "Burimu link",
    linkDescription:
      "Gyendesereza links omu bubaka obutakutegwirwe.",

    threatTitle: "Bukoresa kutiina",
    threatDescription:
      "Omuntu naabaasa kukoresa kutiina kukuhutaza.",

    protectMobileMoney: "Reinda Mobile Money yawe",
    verifyJob: "Reeba omurimo",
    verifyEducation: "Reeba omukisa gw'okwega",
    protectRomance: "Reinda oburyarya bw'okukundana",
    unexpectedPrize: "Gyendesereza prizes",
    protectAccount: "Reinda account yawe",
    verifyContact: "Reeba owakuhamagara",
    staySafe: "Weerinde",

    neverShareMobilePIN:
      "Otaga PIN nari OTP ya Mobile Money yawe.",
    dontSendUnexpected:
      "Otuma sente ahabw'obubaka obutakutegwirwe.",
    contactProvider:
      "Hamagara omuwa Mobile Money ahakoresa ennamba entuufu.",

    dontPayJob:
      "Otashashura sente kushaba nari kutunga omurimo.",
    researchCompany:
      "Shwijuma kampuni ahari website yaayo entuufu.",
    verifyVacancy:
      "Reeba omurimo ahari contact entuufu ya kampuni.",

    contactSchool:
      "Hamagara shule nari university butereevu.",
    dontPayUnverified:
      "Otashashura fees ahari link etakwesigwa.",
    checkInstitution:
      "Reeba website entuufu y'ekitongore.",

    dontSendRomanceMoney:
      "Otuma sente ahari omuntu ouwamanya aha internet kwonka.",
    emotionalEmergency:
      "Gyendesereza omuntu orikureetera emergency y'amarangamutima.",
    verifyIdentity:
      "Reeba omuntu mbere y'okumugabira amakuru.",

    dontPayPrize:
      "Otashashura fee kutunga prize etawandikire.",
    verifyPromotion:
      "Reeba promotion ahari website entuufu.",

    dontLoginLinks:
      "Otoyingira account ahari links ezitakutegwirwe.",
    contactOrganization:
      "Hamagara ekitongore butereevu.",

    officialName:
      "Otakwesiga bubaka ahabw'okuba burimu erinnya nari logo y'ekitongore.",
    officialChannel:
      "Hamagara ekitongore ahakoresa channel entuufu.",
    dontSendPersonal:
      "Otuma sente nari amakuru gaawe otakareebire.",

    dontRush: "Otahuta kukora.",
    verifySender: "Reeba omutumi.",
    neverShareSensitive:
      "Otaga passwords, PIN nari OTP."
  },

  Acholi: {
    language: "Leb",
    chooseLanguage: "Yer leb ma imito",

    homeTitle: "Digital Buddy",
    subtitle: "Pwony, gwokri, ki ngec i kom teknoloji.",
    whatWouldYouLike: "Ngo ma imito timo?",

    learnSkills: "Pwony Lebe me Teknoloji",
    learnSkillsDesc:
      "Pwony kit me tic ki teknoloji i yo ma ber.",

    scamCheck: "Nen Rek ma Gonyo",
    scamCheckDesc: "Nen rek ma pe geno.",

    assistant: "Pen Digital Assistant",
    assistantDesc:
      "Pen lapeny ma ikom teknoloji.",

    back: "← Dwog cen",
    chooseTopic: "Yer gin ma imito pwonyo.",

    cybersecurity: "Gwoko Teknoloji",
    cybersecurityDesc:
      "Pwony kit me gwoko keni ka itiyo ki teknoloji ki internet.",

    email: "Email",
    emailDesc:
      "Pwony kit me tic ki email i yo ma ber ki ma gwoko keni.",

    artificialIntelligence: "Artificial Intelligence",
    artificialIntelligenceDesc:
      "Pwony ikom Artificial Intelligence ki kit me tic kwede maber.",

    noInternet: "Pe i tye ki internet?",
    learnWithUSSD:
      "I twero pwonyo kit me tic ki teknoloji ki USSD.",
    scamWithUSSD:
      "I twero neno rek ma pe i geno ki USSD.",
    useUSSD: "Tic ki USSD",

    lessonQuiz: "Lapeny me Pwony",
    question: "Lapeny",
    of: "me",
    quizCompleted: "Lapeny Otyeko!",
    yourScore: "Score mari",
    retakeQuiz: "Dwol Lapeny",

    safetyCheck: "Nen Gwoko Keni",
    safetySubtitle:
      "Pe i ngeyo maber pi rek? Wa nen kit ma rek tye kwede.",

    pasteMessage: "Ket rek ma pe i geno",
    example: "Cal: I winyo...",
    tryExample: "Tem cal",

    checkMessage: "Nen Rek",
    checking: "Nen tye ka mede...",
    checkingSigns: "Wa neno kit rek ma gonyo.",
    scamPatterns: "Wa neno kit ma scam gi timo.",

    privacyNote:
      "Pe iket password, PIN, OTP onyo ngec ma pe mito ngat mukene.",

    riskAssessment: "Nen Bal",
    potentialScam: "Scam ma twero bedo",
    suspiciousMessage: "Rek ma pe geno",
    proceedWithCaution: "Cung ki Ber",
    lowRisk: "Bal Matino",
    highRisk: "Bal Madit",

    messageAnalysis: "Nen Rek",
    highlightedWarning: "Kit rek ma wa neno",
    warningSign: "Kit rek",
    warningExplanation:
      "Lok ma mito genyo maber",

    whyConcerned: "Pi ngo wa parre",
    noWarning:
      "Pe wa neno kit scam ma yore. Ento nen rek ma pe i bino ka iyie kwede.",

    safetyAdvice: "Tam me Gwoko Keni",
    score: "Score",
    type: "Kit",
    warningSigns: "Kit rek",

    digitalAssistant: "Digital Safety Assistant",
    assistantSubtitle:
      "Pen lapeny pi teknoloji onyo ket rek ma pe i geno.",

    offlineDigitalSkills: "Pwony Teknoloji ma Pe ki Internet",
    offlineDigitalSkillsDesc:
      "Pwony teknoloji ma pe ki data me internet.",

    offlineScamCheck: "Nen Scam ma Pe ki Internet",
    offlineScamCheckDesc:
      "Nen rek ma pe i geno ki pwony tam me gwoko keni.",

    backToSkills: "← Dwog cen bot Digital Skills",
    backToSafety: "← Dwog cen bot Gwoko Keni",

    scamCheckTitle: "NEN SCAM",
    welcome: "Wajoli i Digital Buddy.",
    chooseOption: "Yer gin ma imito:",
    checkSuspiciousMessage: "1. Nen rek ma pe i geno",
    safetyTips: "2. Tam me Gwoko Keni",
    exit: "3. Wok",
    enterOption: "Ket option",
    send: "Cwal",

    checkMessageTitle: "NEN REK",
    enterSuspiciousMessage: "Ket rek ma pe i geno:",
    typeMessage: "Ket rek kany...",
    check: "Nen",

    learnDigitalSkillsTitle: "PWONY TEKNOLOJI",
    whatLearn: "Ngo ma imito pwonyo?",
    backOption: "4. Dwog cen",

    cyberTitle: "GWOKO TEKNOLOJI",
    emailTitle: "EMAIL",
    aiTitle: "ARTIFICIAL INTELLIGENCE",

    backButton: "Dwog cen",

    result: "ADWOG",
    risk: "Bal",
    unableAnalyze: "Pe wa twero neno rek.",
    finish: "Tyeko",

    thankYou: "Apwoyo tic ki Digital Buddy.",
    staySafe: "Gwokri ki mede pwonyo.",
    close: "Lor",

    developmentDemo: "Development Demo",
    simulation:
      "Man en cal me USSD. Tic ma tye ka mede twero tic ki telecom USSD gateway.",

    strongPasswords:
      "Tii ki password ma ber ma tye ki letere, namba ki kit ma.",
    neverSharePin: "Pe iket PIN onyo OTP mari bot ngat mukene.",
    suspiciousLinks: "Pe iket i link ma pe i geno.",
    verifyPeople:
      "Nen ngat acel ka i mito cwal money onyo ngec.",

    emailDescription:
      "Email miyo in twero cwalo ki gamo rek me digital.",
    composeEmail: "Tii ki Compose me coyo email manyen.",
    attachFiles: "I twero medo document ki cal.",
    neverShareEmailPassword: "Pe iket password me email mari.",
    unknownAttachments:
      "Gwokri ki attachment ki link ma pe i ngeyo.",

    aiDescription:
      "AI miyo computer twero timo tic ma mito ngec me dano.",
    aiQuestions: "AI twero gamo lapeny.",
    aiWriting: "AI twero konyo i coyo ki pwonyo.",
    aiMistakes: "AI twero timo bal.",
    verifyAI: "Nen ngec madit ma AI miyo.",

    neverSharePIN: "Pe iket PIN onyo OTP mari.",
    dontSendMoney: "Pe icwal money bot jo ma pe i ngeyo.",
    verifyMessages: "Nen rek ma pe i geno.",
    dontClickLinks: "Pe iket i link ma pe i ngeyo.",
    useStrongPasswords: "Tii ki password ma ber.",

    lowRiskDescription:
      "Wa neno rek matino, ento nen rek ma pe i bino.",
    cautionDescription:
      "Tye rek ma mito gwoko keni. Nen ngat ma ocwalo.",
    suspiciousDescription:
      "Rek man tye ki kit scam. Nen maber mapwod.",
    highRiskDescription:
      "Rek man tye ki kit scam mapol.",

    urgencyTitle: "Kakano me timo tic ma piyo",
    urgencyDescription:
      "Ngat ma ocwalo rek tye ka kulo in me timo tic piyo.",

    sensitiveTitle: "Mito ngec ma pe mito",
    sensitiveDescription:
      "Organization ma ber pe mito PIN, password onyo OTP mari.",

    moneyTitle: "Mito money",
    moneyDescription:
      "Rek mito money onyo payment.",

    rewardTitle: "Gift ma pe i bino",
    rewardDescription:
      "Rek mito cako gift, prize onyo money.",

    linkTitle: "Tye ki link",
    linkDescription:
      "Gwokri ki link ma pe i bino.",

    threatTitle: "Tic ki lworo",
    threatDescription:
      "Ngat ma ocwalo rek twero lworo in me timo gin.",

    protectMobileMoney: "Gwok Mobile Money",
    verifyJob: "Nen tic ma kelo money",
    verifyEducation: "Nen pwony",
    protectRomance: "Gwokri ki scam me laro",
    unexpectedPrize: "Gwokri ki prize",
    protectAccount: "Gwok account mari",
    verifyContact: "Nen ngat ma ocwalo",
    staySafe: "Gwokri",

    neverShareMobilePIN:
      "Pe iket PIN onyo OTP me Mobile Money.",
    dontSendUnexpected:
      "Pe icwal money pi rek ma pe i bino.",
    contactProvider:
      "Kob ki Mobile Money provider ki namba ma tye.",

    dontPayJob:
      "Pe ipay money pi tic.",
    researchCompany:
      "Nen company ki website mamegi.",
    verifyVacancy:
      "Nen tic ki contact me company.",

    contactSchool:
      "Kob ki school onyo university.",
    dontPayUnverified:
      "Pe ipay fee ki link ma pe i geno.",
    checkInstitution:
      "Nen website me school.",

    dontSendRomanceMoney:
      "Pe icwal money bot ngat ma ineno online keken.",
    emotionalEmergency:
      "Gwokri ka ngat tye ka kelo lworo me cwiny.",
    verifyIdentity:
      "Nen ngat acel mapwod.",

    dontPayPrize:
      "Pe ipay fee pi prize.",
    verifyPromotion:
      "Nen promotion ki website mamegi.",

    dontLoginLinks:
      "Pe i login ki link ma pe i geno.",
    contactOrganization:
      "Kob ki organization.",

    officialName:
      "Pe iyie rek pi nying onyo logo.",
    officialChannel:
      "Kob ki channel ma tye.",
    dontSendPersonal:
      "Pe icwal money onyo ngec mapwod.",

    dontRush: "Pe icwal tic piyo.",
    verifySender: "Nen ngat ma ocwalo.",
    neverShareSensitive:
      "Pe iket password, PIN onyo OTP."
  },

  Ateso: {
    language: "Eteker",
    chooseLanguage: "Arai ete ker itwanar",

    homeTitle: "Digital Buddy",
    subtitle: "Losi, kolil, kan kede teknoloji.",
    whatWouldYouLike: "Arai itwanar aponi?",

    learnSkills: "Losi Ikameta Teknoloji",
    learnSkillsDesc:
      "Losi itwanar aponi teknolojia akiro.",

    scamCheck: "Keberai Obukaba",
    scamCheckDesc: "Keberai obukaba ngesik.",

    assistant: "Pesi Digital Assistant",
    assistantDesc:
      "Pesi aiyal kede teknoloji.",

    back: "← Kogar",
    chooseTopic: "Arai itwanar alosi.",

    cybersecurity: "Ebu Teknoloji",
    cybersecurityDesc:
      "Losi itwanar kolil kede teknoloji ka internet.",

    email: "Email",
    emailDesc:
      "Losi itwanar aponi email akiro ngesik.",

    artificialIntelligence: "Artificial Intelligence",
    artificialIntelligenceDesc:
      "Losi ikameta Artificial Intelligence kede ebu.",

    noInternet: "Internet mam?",
    learnWithUSSD:
      "Itenar alosi teknolojia kede USSD.",
    scamWithUSSD:
      "Itenar keberai obukaba kede USSD.",
    useUSSD: "Kozesa USSD",

    lessonQuiz: "Aiyal",
    question: "Aiyal",
    of: "kede",
    quizCompleted: "Aiyal etub!",
    yourScore: "Score naka",
    retakeQuiz: "Aiyal adol",

    safetyCheck: "Keberai Ebu",
    safetySubtitle:
      "Arai obukaba ngesik? Keberai akiro ngesik.",

    pasteMessage: "Tebe obukaba ngesik",
    example: "Akiro: Owon akiro...",
    tryExample: "Keberai akiro",

    checkMessage: "Keberai Obukaba",
    checking: "Nikeberai...",
    checkingSigns: "Nikeberai akiro ngesik.",
    scamPatterns: "Nikeberai akiro ngesik.",

    privacyNote:
      "Mam iikete password, PIN, OTP kede akiro ngesik.",

    riskAssessment: "Keberai Ebu",
    potentialScam: "Obukaba ngesik",
    suspiciousMessage: "Obukaba ngesik",
    proceedWithCaution: "Kora kede ebu",
    lowRisk: "Ebu ng'itino",
    highRisk: "Ebu ng'itunga",

    messageAnalysis: "Keberai Obukaba",
    highlightedWarning: "Akiro ngesik",
    warningSign: "Akiro ngesik",
    warningExplanation:
      "Akiro itwanar keberai",

    whyConcerned: "Arai aponi",
    noWarning:
      "Mam wa keberai akiro scam. Kora keberai obukaba ngesik.",

    safetyAdvice: "Akiro me Ebu",
    score: "Score",
    type: "Kipes",
    warningSigns: "Akiro ngesik",

    digitalAssistant: "Digital Safety Assistant",
    assistantSubtitle:
      "Pesi aiyal kede teknoloji.",

    offlineDigitalSkills: "Teknoloji kede mam internet",
    offlineDigitalSkillsDesc:
      "Losi teknologi kede mam data.",

    offlineScamCheck: "Keberai Scam kede mam internet",
    offlineScamCheckDesc:
      "Keberai obukaba ngesik kede losi ebu.",

    backToSkills: "← Kogar Digital Skills",
    backToSafety: "← Kogar Ebu",

    scamCheckTitle: "KEBERAI OBUKABA",
    welcome: "Iyalama Digital Buddy.",
    chooseOption: "Arai itwanar:",
    checkSuspiciousMessage: "1. Keberai obukaba ngesik",
    safetyTips: "2. Akiro me Ebu",
    exit: "3. Kogar",
    enterOption: "Tebe option",
    send: "Cwal",

    checkMessageTitle: "KEBERAI OBUKABA",
    enterSuspiciousMessage: "Tebe obukaba ngesik:",
    typeMessage: "Tebe obukaba kany...",
    check: "Keberai",

    learnDigitalSkillsTitle: "LOSI TEKNOLOJI",
    whatLearn: "Arai itwanar alosi?",
    backOption: "4. Kogar",

    cyberTitle: "EBU TEKNOLOJI",
    emailTitle: "EMAIL",
    aiTitle: "ARTIFICIAL INTELLIGENCE",

    backButton: "Kogar",

    result: "EBUT",
    risk: "Ebu",
    unableAnalyze: "Mam wa aponi keberai obukaba.",
    finish: "Tup",

    thankYou: "Alakara Digital Buddy.",
    staySafe: "Kolil kede losi.",
    close: "Kwar",

    developmentDemo: "Development Demo",
    simulation:
      "Kanu USSD demo. Empeereza etosik aponi telecom USSD gateway.",

    strongPasswords:
      "Kozesa password ngesik kede akiro, numbers kede symbols.",
    neverSharePin: "Mam iikete PIN kede OTP.",
    suspiciousLinks: "Mam iikete links ngesik.",
    verifyPeople:
      "Keberai ngesi mapol aponi kede ssente.",

    emailDescription:
      "Email etaranar cwal kede iyal obukaba.",
    composeEmail: "Kozesa Compose aponi email.",
    attachFiles: "Itenar mede documents kede photos.",
    neverShareEmailPassword: "Mam iikete password me email.",
    unknownAttachments:
      "Kolil kede attachments kede links.",

    aiDescription:
      "AI etaranar computer aponi akiro ngesik.",
    aiQuestions: "AI aponi iyal aiyal.",
    aiWriting: "AI aponi losi kede aponi.",
    aiMistakes: "AI aponi akiro ngesik.",
    verifyAI: "Keberai akiro madit me AI.",

    neverSharePIN: "Mam iikete PIN kede OTP.",
    dontSendMoney: "Mam icwal ssente ngesi mam.",
    verifyMessages: "Keberai obukaba ngesik.",
    dontClickLinks: "Mam ikwar links ngesik.",
    useStrongPasswords: "Kozesa passwords ngesik.",

    lowRiskDescription:
      "Mam wa keberai akiro madit, kwap kora keberai.",
    cautionDescription:
      "Tye akiro ngesik. Kolil kede keberai.",
    suspiciousDescription:
      "Obukaba tye ki akiro ngesik. Keberai mapol.",
    highRiskDescription:
      "Obukaba tye ki akiro scam mapol.",

    urgencyTitle: "Bukusindika okukora mangu",
    urgencyDescription:
      "Obukaba bukukaka okukora mangu.",

    sensitiveTitle: "Busaba amawulire ag'ekyama",
    sensitiveDescription:
      "Ekitongole eituufu tebusaba PIN, password oba OTP.",

    moneyTitle: "Busaba ssente",
    moneyDescription:
      "Obukaba busaba ssente oba payment.",

    rewardTitle: "Empeera etasuubirwa",
    rewardDescription:
      "Obukaba bukusuubiza prize oba ssente.",

    linkTitle: "Bulina link",
    linkDescription:
      "Wegendereze links eziteesigika.",

    threatTitle: "Bukozesa okutya",
    threatDescription:
      "Omusindika ayinza okukozesa okutya okukukaka.",

    protectMobileMoney: "Kuuma Mobile Money",
    verifyJob: "Kebera omulimu",
    verifyEducation: "Kebera okusoma",
    protectRomance: "Weekuume ku bulimba bw'okwagala",
    unexpectedPrize: "Wegendereze prize",
    protectAccount: "Kuuma account",
    verifyContact: "Kebera eyakutuukirira",
    staySafe: "Weekuume",

    neverShareMobilePIN:
      "Togabana PIN oba OTP.",
    dontSendUnexpected:
      "Tosindika ssente olw'obubaka obutasuubirwa.",
    contactProvider:
      "Tuukirira omuwa empeereza ng'okozesa ennamba entuufu.",

    dontPayJob:
      "Tosasa ssente okusaba omulimu.",
    researchCompany:
      "Noonyereza kampuni.",
    verifyVacancy:
      "Kebera vacancy.",

    contactSchool:
      "Tuukirira essomero.",
    dontPayUnverified:
      "Tosasa ssente ng'okozesa link eteesigika.",
    checkInstitution:
      "Kebera ekitongole.",

    dontSendRomanceMoney:
      "Tosindika ssente eri omuntu gw'omanyi online yekka.",
    emotionalEmergency:
      "Wegendereze okukakibwa mu by'ekitonde.",
    verifyIdentity:
      "Kebera omuntu.",

    dontPayPrize:
      "Tosasa fee kufuna prize.",
    verifyPromotion:
      "Kebera promotion.",

    dontLoginLinks:
      "Toyingira account ng'okozesa links eziteesigika.",
    contactOrganization:
      "Tuukirira ekitongole.",

    officialName:
      "Togeesiga bubaka olw'erinnya oba logo.",
    officialChannel:
      "Kozesa channel entuufu.",
    dontSendPersonal:
      "Tosindika ssente oba mawulire go.",

    dontRush: "Tokola mangu.",
    verifySender: "Kebera eyasindika.",
    neverShareSensitive:
      "Togabana password, PIN oba OTP."
  }
};


// ==========================================================
// GET TRANSLATION
// ==========================================================

const getTranslations = (language) => {
  return TRANSLATIONS[language] || TRANSLATIONS.English;
};


// ==========================================================
// SUSPICIOUS WORDS
// ==========================================================

const SUSPICIOUS_WORDS = [
  "urgent",
  "immediately",
  "now",
  "hurry",
  "minutes",
  "pin",
  "otp",
  "password",
  "passcode",
  "verification code",
  "send money",
  "pay",
  "payment",
  "transfer",
  "fee",
  "deposit",
  "won",
  "winner",
  "prize",
  "reward",
  "congratulations",
  "lottery",
  "http://",
  "https://",
  "www.",
  "account will be closed",
  "account will be blocked",
  "arrest",
  "police",
  "legal action"
];


// ==========================================================
// LESSON CONTENT
// ==========================================================

const LESSONS = {
  cybersecurity: {
    icon: "🔐",

    English: {
      title: "🔐 Cybersecurity",
      description:
        "Learn how to protect yourself when using technology and the internet.",
      sections: [
        {
          heading: "🔑 Use Strong Passwords",
          text:
            "Create passwords that are hard to guess. Use a mix of letters, numbers, and symbols. Never share your password with anyone."
        },
        {
          heading: "📱 Keep Your Mobile Money Safe",
          text:
            "Never share your Mobile Money PIN or One-Time Passwords (OTPs) with anyone, including people claiming to work for your network provider."
        },
        {
          heading: "🔗 Be Careful with Links",
          text:
            "Do not click on links in unexpected messages or emails. Always double-check the website address before entering personal details."
        }
      ],
      questions: [
        {
          question:
            "Should you share your mobile money PIN with someone?",
          options: ["Yes", "No"],
          correct: "No"
        },
        {
          question:
            "What should you do before clicking a suspicious link?",
          options: [
            "Click it immediately",
            "Check and verify the link",
            "Share it with everyone"
          ],
          correct: "Check and verify the link"
        },
        {
          question: "Which password is stronger?",
          options: [
            "123456",
            "password",
            "MyP@ssw0rd!2026"
          ],
          correct: "MyP@ssw0rd!2026"
        }
      ]
    },

    Luganda: {
      title: "🔐 Obukuumi bwa Kompyuta",
      description:
        "Yiga engeri y'okwekuumamu ng'okozesa tekinologiya ne yintaneeti.",
      sections: [
        {
          heading: "🔑 Kozesa Password Ennywevu",
          text:
            "Kola password ezizibu okuteebereza. Kozesa ennukuta, ennamba n'obubonero. Togabana password yo."
        },
        {
          heading: "📱 Kuuma Mobile Money",
          text:
            "Togabana PIN oba OTP ya Mobile Money yo n'omuntu yenna."
        },
        {
          heading: "🔗 Wegendereze Links",
          text:
            "Tokuba ku links mu bubaka obutasuubirwa. Kebera website nga tonnateekamu mawulire go."
        }
      ],
      questions: [
        {
          question:
            "Osaanidde okugabana PIN ya Mobile Money yo?",
          options: ["Yee", "Nedda"],
          correct: "Nedda"
        },
        {
          question:
            "Kiki ky'olina okukola nga tonnaba kukuba ku link eteesigika?",
          options: [
            "Gikube amangu",
            "Gikebere era ogikakase",
            "Gigabane n'abantu bonna"
          ],
          correct: "Gikebere era ogikakase"
        },
        {
          question: "Password ki ey'amaanyi?",
          options: [
            "123456",
            "password",
            "MyP@ssw0rd!2026"
          ],
          correct: "MyP@ssw0rd!2026"
        }
      ]
    },

    Runyankole: {
      title: "🔐 Obwirinzi bwa Kompyuta",
      description:
        "Yega okuweerinda waaba nookoresa tekinologiya na internet.",
      sections: [
        {
          heading: "🔑 Koresa Password Zikomeye",
          text:
            "Koresa password ezigumire. Kozesa letters, numbers na symbols. Otaga password yawe."
        },
        {
          heading: "📱 Reinda Mobile Money",
          text:
            "Otaga PIN nari OTP ya Mobile Money yawe."
        },
        {
          heading: "🔗 Gyendesereza Links",
          text:
            "Otacwanga ahari links ezitakwesigwa. Reeba website mbere y'okushiramwo amakuru."
        }
      ],
      questions: [
        {
          question:
            "Noobaasa kutaga PIN ya Mobile Money yawe?",
          options: ["Eego", "Ngaaha"],
          correct: "Ngaaha"
        },
        {
          question:
            "Niki ekiwakora mbere y'okucwanga ahari link?",
          options: [
            "Gicwenge bwangu",
            "Gireebe kandi ogihakase",
            "Gishangire buri muntu"
          ],
          correct: "Gireebe kandi ogihakase"
        },
        {
          question: "Password ki erikukomera?",
          options: [
            "123456",
            "password",
            "MyP@ssw0rd!2026"
          ],
          correct: "MyP@ssw0rd!2026"
        }
      ]
    },

    Acholi: {
      title: "🔐 Gwoko Teknoloji",
      description:
        "Pwony kit me gwoko keni ka itiyo ki teknoloji ki internet.",
      sections: [
        {
          heading: "🔑 Tii ki Password ma Ber",
          text:
            "Keti password ma yot pe me ngeyo. Tii ki letere, namba ki kit ma."
        },
        {
          heading: "📱 Gwok Mobile Money",
          text:
            "Pe iket PIN onyo OTP mari bot ngat mukene."
        },
        {
          heading: "🔗 Gwokri ki Links",
          text:
            "Pe iket i link ma pe i geno."
        }
      ],
      questions: [
        {
          question:
            "I twero ket PIN mari bot ngat mukene?",
          options: ["Eyo", "Pe"],
          correct: "Pe"
        },
        {
          question:
            "Ngo ma i timo mapwod i ket i link?",
          options: [
            "Ket i iye piyo",
            "Nen ki verify link",
            "Cwal bot jo weng"
          ],
          correct: "Nen ki verify link"
        },
        {
          question: "Password mene ma ber?",
          options: [
            "123456",
            "password",
            "MyP@ssw0rd!2026"
          ],
          correct: "MyP@ssw0rd!2026"
        }
      ]
    },

    Ateso: {
      title: "🔐 Ebu Teknoloji",
      description:
        "Losi itwanar kolil kede teknoloji ka internet.",
      sections: [
        {
          heading: "🔑 Koresa Password Ngesik",
          text:
            "Koresa password ma ngesik kede akiro, numbers kede symbols."
        },
        {
          heading: "📱 Kolil Mobile Money",
          text:
            "Mam iikete PIN kede OTP."
        },
        {
          heading: "🔗 Kolil Links",
          text:
            "Mam ikwar links ngesik."
        }
      ],
      questions: [
        {
          question: "Itenar iikete PIN?",
          options: ["Eyo", "Mam"],
          correct: "Mam"
        },
        {
          question: "Arai aponi mapol i link?",
          options: [
            "Kwar piyo",
            "Keberai link",
            "Cwal bot jo weng"
          ],
          correct: "Keberai link"
        },
        {
          question: "Password arai ngesik?",
          options: [
            "123456",
            "password",
            "MyP@ssw0rd!2026"
          ],
          correct: "MyP@ssw0rd!2026"
        }
      ]
    }
  },

  email: {
    icon: "📧",

    English: {
      title: "📧 Email",
      description:
        "Learn how to communicate professionally and safely using email.",
      sections: [
        {
          heading: "📬 What is Email?",
          text:
            "Email (Electronic Mail) is a method of exchanging digital messages across the internet between two or more people."
        },
        {
          heading: "✍️ Key Actions",
          text:
            "Compose: Write a new message.\nInbox: Where incoming emails arrive.\nAttachments: Files attached to a message."
        },
        {
          heading: "🔒 Keep Your Email Safe",
          text:
            "Never share your email password. Be careful when opening links and attachments from unknown senders."
        }
      ],
      questions: [
        {
          question: "What is email mainly used for?",
          options: [
            "Sending and receiving messages",
            "Cooking food",
            "Taking photos",
            "Charging a phone"
          ],
          correct: "Sending and receiving messages"
        },
        {
          question:
            "Which button is commonly used to start writing a new email?",
          options: [
            "Delete",
            "Compose",
            "Refresh",
            "Download"
          ],
          correct: "Compose"
        },
        {
          question:
            "What should you do if you receive an email from an unknown sender with a suspicious attachment?",
          options: [
            "Open it immediately",
            "Forward it to everyone",
            "Be careful and avoid opening it",
            "Reply with your password"
          ],
          correct: "Be careful and avoid opening it"
        }
      ]
    },

    Luganda: {
      title: "📧 Email",
      description:
        "Yiga engeri y'okukozesa email mu bukuumi n'obukugu.",
      sections: [
        {
          heading: "📬 Email kye ki?",
          text:
            "Email y'engeri y'okusindika n'okufuna obubaka obwa digito okuyita ku yintaneeti."
        },
        {
          heading: "✍️ Ebikolwa Ebikulu",
          text:
            "Compose: Wandiika email empya.\nInbox: Awajja email ezikuyingira.\nAttachments: Files ezigattibwa ku email."
        },
        {
          heading: "🔒 Kuuma Email Yo",
          text:
            "Togabana password ya email yo. Wegendereze links ne attachments okuva eri abantu b'otomanyi."
        }
      ],
      questions: [
        {
          question: "Email ekozesebwa kukola ki?",
          options: [
            "Okusindika n'okufuna obubaka",
            "Okufumba",
            "Okukuba ebifaananyi",
            "Okusajja essimu"
          ],
          correct: "Okusindika n'okufuna obubaka"
        },
        {
          question:
            "Button ki ekola email empya?",
          options: [
            "Delete",
            "Compose",
            "Refresh",
            "Download"
          ],
          correct: "Compose"
        },
        {
          question:
            "Kiki ky'olina okukola nga ofunye attachment eteesigika?",
          options: [
            "Giggule amangu",
            "Gisindike eri bonna",
            "Wegendereze era togiggulawo",
            "Ddamu password yo"
          ],
          correct: "Wegendereze era togiggulawo"
        }
      ]
    },

    Runyankole: {
      title: "📧 Email",
      description:
        "Yega okukoresa email omu buryo oburungi n'obwirinzi.",
      sections: [
        {
          heading: "📬 Email niki?",
          text:
            "Email n'omuringo gw'okutuma n'okutunga obubaka bwa digital."
        },
        {
          heading: "✍️ Ebikorwa",
          text:
            "Compose: Handika email empya.\nInbox: Aho email zirikutuka.\nAttachments: Documents eziri kwongerwa kuri email."
        },
        {
          heading: "🔒 Reinda Email",
          text:
            "Otaga password ya email. Gyendesereza links na attachments."
        }
      ],
      questions: [
        {
          question: "Email neekozesebwa kukora ki?",
          options: [
            "Kutuma n'okutunga obubaka",
            "Kushamba",
            "Kukora photos",
            "Kushashura esimu"
          ],
          correct: "Kutuma n'okutunga obubaka"
        },
        {
          question: "Button ki erikukora email empya?",
          options: [
            "Delete",
            "Compose",
            "Refresh",
            "Download"
          ],
          correct: "Compose"
        },
        {
          question:
            "Niki ekiwakora waatungire attachment etakwesigwa?",
          options: [
            "Gikwataho bwangu",
            "Gitumire ahari boona",
            "Gyendesereza kandi otagigulaho",
            "Gumwe password"
          ],
          correct: "Gyendesereza kandi otagigulaho"
        }
      ]
    },

    Acholi: {
      title: "📧 Email",
      description:
        "Pwony kit me tic ki email i yo ma ber ki ma gwoko keni.",
      sections: [
        {
          heading: "📬 Email ngo?",
          text:
            "Email en yo me cwal ki gamo rek me digital i internet."
        },
        {
          heading: "✍️ Tic ma Dit",
          text:
            "Compose: Coyi email manyen.\nInbox: Ka email bino.\nAttachments: Gin ma iketo i email."
        },
        {
          heading: "🔒 Gwok Email",
          text:
            "Pe iket password me email mari."
        }
      ],
      questions: [
        {
          question: "Email tiyo kwede ngo?",
          options: [
            "Cwalo ki gamo rek",
            "Tedo cam",
            "Miyo cal",
            "Pongo phone"
          ],
          correct: "Cwalo ki gamo rek"
        },
        {
          question: "Button mene me coyo email manyen?",
          options: [
            "Delete",
            "Compose",
            "Refresh",
            "Download"
          ],
          correct: "Compose"
        },
        {
          question: "Ngo ma i timo ki attachment ma pe i ngeyo?",
          options: [
            "Yab piyo",
            "Cwal bot jo weng",
            "Gwokri pe i yab",
            "Cwal password"
          ],
          correct: "Gwokri pe i yab"
        }
      ]
    },

    Ateso: {
      title: "📧 Email",
      description:
        "Losi itwanar aponi email kede ebu.",
      sections: [
        {
          heading: "📬 Email neni?",
          text:
            "Email etaranar cwal kede iyal obukaba."
        },
        {
          heading: "✍️ Akiro",
          text:
            "Compose: Aponi email.\nInbox: Ka email eyait.\nAttachments: Documents kede photos."
        },
        {
          heading: "🔒 Kolil Email",
          text:
            "Mam iikete password me email."
        }
      ],
      questions: [
        {
          question: "Email etaranar aponi arai?",
          options: [
            "Cwal kede iyal obukaba",
            "Aponi akito",
            "Aponi photo",
            "Aponi phone"
          ],
          correct: "Cwal kede iyal obukaba"
        },
        {
          question: "Button arai aponi email?",
          options: [
            "Delete",
            "Compose",
            "Refresh",
            "Download"
          ],
          correct: "Compose"
        },
        {
          question: "Arai aponi attachment ngesik?",
          options: [
            "Kwar piyo",
            "Cwal",
            "Kolil kede mam ikwar",
            "Cwal password"
          ],
          correct: "Kolil kede mam ikwar"
        }
      ]
    }
  },

  ai: {
    icon: "🤖",

    English: {
      title: "🤖 Artificial Intelligence",
      description:
        "Learn about Artificial Intelligence and how to use it responsibly.",
      sections: [
        {
          heading: "💡 What is AI?",
          text:
            "Artificial Intelligence refers to computer systems designed to simulate human intelligence to perform tasks like answering questions, translating languages, or recognizing images."
        },
        {
          heading: "⚠️ Responsible Usage",
          text:
            "Always verify critical facts provided by AI systems, as they can sometimes make mistakes or present inaccurate information."
        },
        {
          heading: "🔒 Protect Your Information",
          text:
            "Avoid sharing passwords, PINs, financial information, or private documents with AI tools."
        }
      ],
      questions: [
        {
          question: "What is Artificial Intelligence (AI)?",
          options: [
            "Technology that allows computers to perform tasks that normally require human intelligence",
            "A type of mobile phone",
            "A social media application",
            "A computer cable"
          ],
          correct:
            "Technology that allows computers to perform tasks that normally require human intelligence"
        },
        {
          question:
            "Which of these is an example of Artificial Intelligence?",
          options: [
            "A voice assistant answering questions",
            "A notebook",
            "A USB cable",
            "A normal light bulb"
          ],
          correct:
            "A voice assistant answering questions"
        },
        {
          question:
            "What should you do before trusting important information generated by AI?",
          options: [
            "Share it immediately",
            "Verify the information",
            "Ignore it completely",
            "Send it to everyone"
          ],
          correct: "Verify the information"
        }
      ]
    },

    Luganda: {
      title: "🤖 Artificial Intelligence",
      description:
        "Yiga ku Artificial Intelligence n'engeri y'okugikozesaamu obuvunaanyizibwa.",
      sections: [
        {
          heading: "💡 AI kye ki?",
          text:
            "AI ye tekinologiya esobozesa kompyuta okukola emirimu egitera okwetaagisa obwongo bw'omuntu."
        },
        {
          heading: "⚠️ Kozesa AI mu Bukuumi",
          text:
            "Bulijjo kebera amawulire amakulu aga AI kubanga eyinza okukola ensobi."
        },
        {
          heading: "🔒 Kuuma Amawulire Go",
          text:
            "Tokozesa AI okugabana passwords, PIN, mawulire ga ssente oba documents ez'ekyama."
        }
      ],
      questions: [
        {
          question: "AI kye ki?",
          options: [
            "Tekinologiya asobozesa kompyuta okukola emirimu egy'obwongo",
            "Ekika kya ssimu",
            "Social media",
            "Cable ya kompyuta"
          ],
          correct:
            "Tekinologiya asobozesa kompyuta okukola emirimu egy'obwongo"
        },
        {
          question: "Kiki ekyokulabirako kya AI?",
          options: [
            "Voice assistant eddamu ebibuuzo",
            "Notebook",
            "USB cable",
            "Bulb"
          ],
          correct:
            "Voice assistant eddamu ebibuuzo"
        },
        {
          question:
            "Kiki ky'olina okukola nga tonnakkiriza mawulire ga AI?",
          options: [
            "Gagabane amangu",
            "Gakakase",
            "Gagane ddala",
            "Gasindike eri bonna"
          ],
          correct: "Gakakase"
        }
      ]
    },

    Runyankole: {
      title: "🤖 Artificial Intelligence",
      description:
        "Yega ahari Artificial Intelligence n'oku ogikoresa gye.",
      sections: [
        {
          heading: "💡 AI niki?",
          text:
            "AI n'obuhangwa bwa kompyuta oburikwikiriza kukora emirimo erikwetaaga obwenge bw'omuntu."
        },
        {
          heading: "⚠️ Koresa AI gye",
          text:
            "Buriijo reeba amakuru amakuru aga AI ahabwokuba neebaasa kukora ensobi."
        },
        {
          heading: "🔒 Reinda Amakuru",
          text:
            "Otaga passwords, PIN, amakuru ga sente nari documents z'obuntu omu AI."
        }
      ],
      questions: [
        {
          question: "AI niki?",
          options: [
            "Tekinologiya erikureetera computer kukora emirimo y'omuntu",
            "Esimu",
            "Social media",
            "Cable"
          ],
          correct:
            "Tekinologiya erikureetera computer kukora emirimo y'omuntu"
        },
        {
          question: "Kiki ekiri eky'okureeberaho kya AI?",
          options: [
            "Voice assistant",
            "Notebook",
            "USB",
            "Bulb"
          ],
          correct: "Voice assistant"
        },
        {
          question: "Niki ekiwakora mbere y'okwesiga AI?",
          options: [
            "Gishangire",
            "Gireebe",
            "Gireke",
            "Gitume"
          ],
          correct: "Gireebe"
        }
      ]
    },

    Acholi: {
      title: "🤖 Artificial Intelligence",
      description:
        "Pwony ikom Artificial Intelligence ki kit me tic kwede maber.",
      sections: [
        {
          heading: "💡 AI ngo?",
          text:
            "AI en teknoloji ma miyo computer timo tic ma dano tye ka timo ki ngec."
        },
        {
          heading: "⚠️ Tic ki AI Maber",
          text:
            "Nen ngec ma AI miyo pien AI twero timo bal."
        },
        {
          heading: "🔒 Gwok Ngec Mari",
          text:
            "Pe iket password, PIN onyo ngec me money i AI."
        }
      ],
      questions: [
        {
          question: "AI ngo?",
          options: [
            "Teknoloji ma miyo computer timo tic ma dano timo",
            "Phone",
            "Social media",
            "Cable"
          ],
          correct:
            "Teknoloji ma miyo computer timo tic ma dano timo"
        },
        {
          question: "Mene en cal me AI?",
          options: [
            "Voice assistant",
            "Notebook",
            "USB",
            "Bulb"
          ],
          correct: "Voice assistant"
        },
        {
          question: "Ngo ma i timo mapwod iyie ki AI?",
          options: [
            "Cwal piyo",
            "Nen ngec",
            "Pe i ti kwede",
            "Cwal bot jo weng"
          ],
          correct: "Nen ngec"
        }
      ]
    },

    Ateso: {
      title: "🤖 Artificial Intelligence",
      description:
        "Losi ikameta Artificial Intelligence kede ebu.",
      sections: [
        {
          heading: "💡 AI neni?",
          text:
            "AI etaranar computer aponi akiro ngesik kede obukaba.",
        },
        {
          heading: "⚠️ Ebu AI",
          text:
            "Keberai akiro ma AI eyai.",
        },
        {
          heading: "🔒 Kolil Akiro",
          text:
            "Mam iikete password, PIN, ssente kede documents i AI."
        }
      ],
      questions: [
        {
          question: "AI neni?",
          options: [
            "Teknoloji ma computer aponi akiro ngesik",
            "Phone",
            "Social media",
            "Cable"
          ],
          correct:
            "Teknoloji ma computer aponi akiro ngesik"
        },
        {
          question: "Arai cal me AI?",
          options: [
            "Voice assistant",
            "Notebook",
            "USB",
            "Bulb"
          ],
          correct: "Voice assistant"
        },
        {
          question: "Arai aponi mapol mapwod AI?",
          options: [
            "Cwal piyo",
            "Keberai akiro",
            "Pe ikameta",
            "Cwal bot jo"
          ],
          correct: "Keberai akiro"
        }
      ]
    }
  }
};


// ==========================================================
// SCAM ANALYZER
// ==========================================================

const analyzeMessageContent = (messageToAnalyze) => {
  if (!messageToAnalyze.trim()) return null;

  const msg = messageToAnalyze.toLowerCase();

  let scamScore = 0;
  const warningSigns = [];

  if (
    /(urgent|immediately|within|now|hurry|minutes)/.test(msg)
  ) {
    scamScore += 20;

    warningSigns.push({
      type: "urgency",
      icon: "⏰"
    });
  }

  if (
    /(pin|otp|password|passcode|verification code)/.test(msg)
  ) {
    scamScore += 35;

    warningSigns.push({
      type: "sensitive",
      icon: "🔐"
    });
  }

  if (
    /(send money|pay|payment|transfer|fee|deposit)/.test(msg)
  ) {
    scamScore += 25;

    warningSigns.push({
      type: "money",
      icon: "💰"
    });
  }

  if (
    /(won|winner|prize|reward|congratulations|lottery)/.test(msg)
  ) {
    scamScore += 20;

    warningSigns.push({
      type: "reward",
      icon: "🎁"
    });
  }

  if (
    /(http:\/\/|https:\/\/|www\.|\.com\/)/.test(msg)
  ) {
    scamScore += 15;

    warningSigns.push({
      type: "link",
      icon: "🔗"
    });
  }

  if (
    /(account will be closed|account will be blocked|arrest|police|legal action)/.test(
      msg
    )
  ) {
    scamScore += 20;

    warningSigns.push({
      type: "threat",
      icon: "⚠️"
    });
  }

  scamScore = Math.min(scamScore, 100);

  let riskLevel = "LOW";

  if (scamScore >= 70) {
    riskLevel = "HIGH";
  } else if (scamScore >= 40) {
    riskLevel = "SUSPICIOUS";
  } else if (scamScore >= 20) {
    riskLevel = "CAUTION";
  }

  let scamCategory = "General Scam";

  if (
    /(mobile money|momo|airtel money|mtn|withdraw|deposit|mobile money pin)/.test(
      msg
    )
  ) {
    scamCategory = "Mobile Money Scam";
  } else if (
    /(job|employment|vacancy|salary|work from home|interview)/.test(msg)
  ) {
    scamCategory = "Job Scam";
  } else if (
    /(scholarship|university|school|admission|tuition|education)/.test(msg)
  ) {
    scamCategory = "Education Scam";
  } else if (
    /(love|relationship|girlfriend|boyfriend|romance|marriage)/.test(msg)
  ) {
    scamCategory = "Romance Scam";
  } else if (
    /(prize|winner|won|lottery|reward|congratulations)/.test(msg)
  ) {
    scamCategory = "Prize Scam";
  } else if (
    /(account|bank|password|otp|verification code|login)/.test(msg)
  ) {
    scamCategory = "Account / Identity Scam";
  } else if (
    /(police|arrest|court|government|tax)/.test(msg)
  ) {
    scamCategory = "Impersonation Scam";
  }

  return {
    score: scamScore,
    riskLevel,
    warningSigns,
    scamCategory
  };
};


// ==========================================================
// TRANSLATED SCAM ADVICE
// ==========================================================

const getScamAdvice = (category, t) => {
  const advice = {
    "Mobile Money Scam": {
      icon: "📱",
      title: t.protectMobileMoney,
      points: [
        t.neverShareMobilePIN,
        t.dontSendUnexpected,
        t.contactProvider
      ]
    },

    "Job Scam": {
      icon: "💼",
      title: t.verifyJob,
      points: [
        t.dontPayJob,
        t.researchCompany,
        t.verifyVacancy
      ]
    },

    "Education Scam": {
      icon: "🎓",
      title: t.verifyEducation,
      points: [
        t.contactSchool,
        t.dontPayUnverified,
        t.checkInstitution
      ]
    },

    "Romance Scam": {
      icon: "❤️",
      title: t.protectRomance,
      points: [
        t.dontSendRomanceMoney,
        t.emotionalEmergency,
        t.verifyIdentity
      ]
    },

    "Prize Scam": {
      icon: "🎁",
      title: t.unexpectedPrize,
      points: [
        t.dontPayPrize,
        t.neverShareSensitive,
        t.verifyPromotion
      ]
    },

    "Account / Identity Scam": {
      icon: "🔐",
      title: t.protectAccount,
      points: [
        t.neverShareSensitive,
        t.dontLoginLinks,
        t.contactOrganization
      ]
    },

    "Impersonation Scam": {
      icon: "🎭",
      title: t.verifyContact,
      points: [
        t.officialName,
        t.officialChannel,
        t.dontSendPersonal
      ]
    },

    "General Scam": {
      icon: "🛡️",
      title: t.staySafe,
      points: [
        t.dontRush,
        t.verifySender,
        t.neverShareSensitive
      ]
    }
  };

  return advice[category] || advice["General Scam"];
};


// ==========================================================
// HIGHLIGHT SCAM WORDS
// ==========================================================

const highlightScamWords = (text) => {
  if (!text) return null;

  const escaped = SUSPICIOUS_WORDS.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const pattern = new RegExp(
    `(${escaped.join("|")})`,
    "gi"
  );

  return text.split(pattern).map((part, index) => {
    const isSuspicious = SUSPICIOUS_WORDS.some(
      (word) =>
        word.toLowerCase() === part.toLowerCase()
    );

    return isSuspicious ? (
      <mark
        className="suspicious-highlight"
        key={index}
      >
        {part}
      </mark>
    ) : (
      part
    );
  });
};


// ==========================================================
// QUIZ
// ==========================================================

function Quiz({ questions, language }) {
  const t = getTranslations(language);

  const [questionNumber, setQuestionNumber] =
    useState(0);

  const [score, setScore] = useState(0);

  const handleAnswer = (option) => {
    if (
      option === questions[questionNumber].correct
    ) {
      setScore((prev) => prev + 1);
    }

    setQuestionNumber((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setQuestionNumber(0);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <hr />

      <h2>
        🧪 {t.lessonQuiz}
      </h2>

      {questionNumber < questions.length ? (
        <div className="quiz-card">
          <p>
            <strong>
              {t.question} {questionNumber + 1}{" "}
              {t.of} {questions.length}:
            </strong>
          </p>

          <p className="quiz-question">
            {questions[questionNumber].question}
          </p>

          <div className="quiz-options">
            {questions[questionNumber].options.map(
              (option, index) => (
                <button
                  key={index}
                  className="quiz-option-button"
                  onClick={() =>
                    handleAnswer(option)
                  }
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-results">
          <h3>
            {t.quizCompleted} 🎉
          </h3>

          <p>
            {t.yourScore}:{" "}
            <strong>{score}</strong> /{" "}
            {questions.length}
          </p>

          <button
            className="primary-button"
            onClick={resetQuiz}
          >
            {t.retakeQuiz}
          </button>
        </div>
      )}
    </div>
  );
}


// ==========================================================
// LANGUAGE SELECTOR
// ==========================================================

function LanguageSelector({
  language,
  setLanguage
}) {
  const t = getTranslations(language);

  return (
    <div className="language-selector">
      <label htmlFor="language-select">
        🌐 {t.language}
      </label>

      <select
        id="language-select"
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
        aria-label={t.chooseLanguage}
      >
        <option value="English">
          English
        </option>

        <option value="Luganda">
          Luganda
        </option>

        <option value="Runyankole">
          Runyankole
        </option>

        <option value="Acholi">
          Acholi
        </option>

        <option value="Ateso">
          Ateso
        </option>
      </select>
    </div>
  );
}


// ==========================================================
// HOME VIEW
// ==========================================================

function HomeView({
  onNavigate,
  onOpenAssistant,
  language,
  setLanguage
}) {
  const t = getTranslations(language);

  return (
    <>
      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
      />

      <h1>{t.homeTitle}</h1>

      <p className="subtitle">
        {t.subtitle}
      </p>

      <h2>
        {t.whatWouldYouLike}
      </h2>

      <div className="cards">

        <button
          className="card"
          onClick={() =>
            onNavigate("learn")
          }
        >
          <div className="icon">
            📚
          </div>

          <h3>
            {t.learnSkills}
          </h3>

          <p>
            {t.learnSkillsDesc}
          </p>
        </button>


        <button
          className="card"
          onClick={() =>
            onNavigate("scamCheck")
          }
        >
          <div className="icon">
            🛡️
          </div>

          <h3>
            {t.scamCheck}
          </h3>

          <p>
            {t.scamCheckDesc}
          </p>
        </button>


        <button
          className="card"
          onClick={() =>
            onOpenAssistant("")
          }
        >
          <div className="icon">
            🤖
          </div>

          <h3>
            {t.assistant}
          </h3>

          <p>
            {t.assistantDesc}
          </p>
        </button>

      </div>
    </>
  );
}


// ==========================================================
// LESSON VIEW
// ==========================================================

function LessonView({
  lesson,
  language,
  onBack
}) {
  const t = getTranslations(language);

  const translatedLesson =
    lesson[language] ||
    lesson.English;

  return (
    <>
      <button
        className="back-button"
        onClick={onBack}
      >
        {t.back}
      </button>

      <h1>
        {translatedLesson.title}
      </h1>

      <p>
        {translatedLesson.description}
      </p>

      {translatedLesson.sections.map(
        (section, index) => (
          <React.Fragment key={index}>

            <h3>
              {section.heading}
            </h3>

            <p
              style={{
                whiteSpace: "pre-line"
              }}
            >
              {section.text}
            </p>

          </React.Fragment>
        )
      )}

      <Quiz
        questions={
          translatedLesson.questions
        }
        language={language}
      />
    </>
  );
}


// ==========================================================
// SCAM CHECK VIEW
// ==========================================================

function ScamCheckView({
  scamMessage,
  setScamMessage,
  scamResult,
  setScamResult,
  isCheckingScam,
  onAnalyze,
  onNavigate,
  language
}) {
  const t = getTranslations(language);

  const advice = scamResult
    ? getScamAdvice(
        scamResult.scamCategory,
        t
      )
    : null;

  const getRiskTitle = () => {
    if (
      scamResult.riskLevel === "HIGH"
    ) {
      return t.potentialScam;
    }

    if (
      scamResult.riskLevel ===
      "SUSPICIOUS"
    ) {
      return t.suspiciousMessage;
    }

    if (
      scamResult.riskLevel ===
      "CAUTION"
    ) {
      return t.proceedWithCaution;
    }

    return t.lowRisk;
  };

  const getRiskDescription = () => {
    if (
      scamResult.riskLevel === "HIGH"
    ) {
      return t.highRiskDescription;
    }

    if (
      scamResult.riskLevel ===
      "SUSPICIOUS"
    ) {
      return t.suspiciousDescription;
    }

    if (
      scamResult.riskLevel ===
      "CAUTION"
    ) {
      return t.cautionDescription;
    }

    return t.lowRiskDescription;
  };

  const getWarningText = (type) => {
    const warnings = {
      urgency: {
        title: t.urgencyTitle,
        description:
          t.urgencyDescription
      },

      sensitive: {
        title: t.sensitiveTitle,
        description:
          t.sensitiveDescription
      },

      money: {
        title: t.moneyTitle,
        description:
          t.moneyDescription
      },

      reward: {
        title: t.rewardTitle,
        description:
          t.rewardDescription
      },

      link: {
        title: t.linkTitle,
        description:
          t.linkDescription
      },

      threat: {
        title: t.threatTitle,
        description:
          t.threatDescription
      }
    };

    return (
      warnings[type] ||
      warnings.urgency
    );
  };

  return (
    <>
      <button
        className="back-button"
        onClick={() => {
          setScamResult(null);
          onNavigate("home");
        }}
      >
        {t.back}
      </button>


      {/* USSD OPTION */}

      <div className="offline-option">

        <div className="offline-icon">
          📱
        </div>

        <div className="offline-content">

          <h3>
            {t.noInternet}
          </h3>

          <p>
            {t.scamWithUSSD}
          </p>

        </div>

        <button
          className="ussd-button"
          onClick={() =>
            onNavigate("ussd")
          }
        >
          {t.useUSSD}
        </button>

      </div>


      <div className="scam-header">

        <div className="scam-icon">
          🛡️
        </div>

        <h1>
          {t.safetyCheck}
        </h1>

        <p className="subtitle">
          {t.safetySubtitle}
        </p>

      </div>


      <div className="scam-card">

        <label htmlFor="scam-message">
          {t.pasteMessage}
        </label>

        <textarea
          id="scam-message"
          value={scamMessage}
          onChange={(e) =>
            setScamMessage(
              e.target.value
            )
          }
          placeholder={t.example}
          rows="7"
        />

        <p className="privacy-note">
          🔒 {t.privacyNote}
        </p>

        <div className="scam-actions">

          <button
            className="example-button"
            onClick={() =>
              setScamMessage(
                "Congratulations! You have won UGX 500,000. Send your mobile money PIN within 10 minutes to claim your prize: https://example.com/claim"
              )
            }
          >
            {t.tryExample}
          </button>

          <button
            className="primary-button"
            onClick={() =>
              onAnalyze(
                scamMessage
              )
            }
            disabled={
              !scamMessage.trim() ||
              isCheckingScam
            }
          >
            {isCheckingScam
              ? t.checking
              : t.checkMessage}
          </button>

        </div>
      </div>


      {isCheckingScam && (
        <div className="checking-card">

          <div className="loading-icon">
            🔎
          </div>

          <h2>
            {t.checkingSigns}
          </h2>

          <p>
            {t.scamPatterns}
          </p>

        </div>
      )}


      {scamResult &&
        !isCheckingScam && (
          <div className="scam-result">

            {/* RISK */}

            <div
              className={`risk-card risk-${scamResult.riskLevel.toLowerCase()}`}
            >

              <div className="risk-top">

                <div className="risk-icon">
                  {scamResult.riskLevel ===
                  "HIGH"
                    ? "🚨"
                    : scamResult.riskLevel ===
                      "SUSPICIOUS"
                    ? "⚠️"
                    : scamResult.riskLevel ===
                      "CAUTION"
                    ? "🟡"
                    : "🟢"}
                </div>

                <div className="risk-heading">

                  <span className="risk-label">
                    {t.riskAssessment}
                  </span>

                  <h2>
                    {getRiskTitle()}
                  </h2>

                  <span className="scam-category">
                    🏷️{" "}
                    {scamResult.scamCategory}
                  </span>

                </div>

                <div className="risk-score">

                  <strong>
                    {scamResult.score}
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

              </div>


              <p className="risk-description">
                {getRiskDescription()}
              </p>


              <div className="risk-meter">

                <div
                  className="risk-meter-fill"
                  style={{
                    width:
                      `${scamResult.score}%`
                  }}
                />

              </div>


              <div className="risk-meter-labels">

                <span>
                  {t.lowRisk}
                </span>

                <span>
                  {t.highRisk}
                </span>

              </div>

            </div>


            {/* MESSAGE */}

            <div className="message-preview">

              <div className="message-preview-header">

                <h2>
                  🔎 {t.messageAnalysis}
                </h2>

                <span>
                  {t.highlightedWarning}
                </span>

              </div>


              <div className="message-content">
                {highlightScamWords(
                  scamMessage
                )}
              </div>


              <div className="highlight-legend">

                <span>
                  <mark className="legend-highlight">
                    {t.warningSign}
                  </mark>
                </span>

                <span>
                  {t.warningExplanation}
                </span>

              </div>

            </div>


            {/* WARNINGS */}

            <div className="warning-section">

              <h2>
                {t.whyConcerned}
              </h2>

              {scamResult.warningSigns.length ===
              0 ? (

                <div className="no-warning">

                  <span>✓</span>

                  <p>
                    {t.noWarning}
                  </p>

                </div>

              ) : (

                scamResult.warningSigns.map(
                  (warning, index) => {

                    const warningText =
                      getWarningText(
                        warning.type
                      );

                    return (
                      <div
                        className="warning-item"
                        key={index}
                      >

                        <div className="warning-icon">
                          {warning.icon}
                        </div>

                        <div>

                          <h3>
                            {
                              warningText.title
                            }
                          </h3>

                          <p>
                            {
                              warningText.description
                            }
                          </p>

                        </div>

                      </div>
                    );
                  }
                )
              )}

            </div>


            {/* ADVICE */}

            {advice && (
              <div className="safety-actions-card">

                <div className="advice-header">

                  <div className="advice-icon">
                    {advice.icon}
                  </div>

                  <div>

                    <span className="advice-label">
                      {t.safetyAdvice}
                    </span>

                    <h2>
                      {advice.title}
                    </h2>

                  </div>

                </div>


                <div className="advice-list">

                  {advice.points.map(
                    (point, index) => (

                      <div
                        className="advice-item"
                        key={index}
                      >

                        <div className="advice-number">
                          {index + 1}
                        </div>

                        <p>
                          {point}
                        </p>

                      </div>
                    )
                  )}

                </div>

              </div>
            )}


            <button
              className="secondary-button"
              onClick={() => {
                setScamMessage("");
                setScamResult(null);
              }}
            >
              {t.checkMessage}
            </button>

          </div>
        )}
    </>
  );
}


// ==========================================================
// USSD VIEW
// ==========================================================

function UssdView({
  ussdStep,
  setUssdStep,
  ussdInput,
  setUssdInput,
  ussdMode,
  scamResult,
  onCheckMessage,
  onNavigate,
  language
}) {
  const t = getTranslations(language);

  return (
    <div className="ussd-page">

      {/* BACK */}

      <button
        className="back-button"
        onClick={() => {

          setUssdStep("menu");
          setUssdInput("");

          if (
            ussdMode ===
            "learning"
          ) {
            onNavigate("learn");
          } else {
            onNavigate("scamCheck");
          }

        }}
      >
        {ussdMode === "learning"
          ? t.backToSkills
          : t.backToSafety}
      </button>


      {/* HEADER */}

      <div className="ussd-header">

        <div className="ussd-large-icon">
          📱
        </div>

        <h1>
          {ussdMode ===
          "learning"
            ? t.offlineDigitalSkills
            : t.offlineScamCheck}
        </h1>

        <p>
          {ussdMode ===
          "learning"
            ? t.offlineDigitalSkillsDesc
            : t.offlineScamCheckDesc}
        </p>

      </div>


      {/* PHONE */}

      <div className="phone-container">

        <div className="phone-screen">

          <div className="network-bar">

            <span>
              MTN
            </span>

            <span>
              ▮▮▮▮
            </span>

          </div>


          {/* SCAM MENU */}

          {ussdStep === "menu" &&
            ussdMode === "scams" && (
              <>

                <div className="ussd-title">
                  {t.scamCheckTitle}
                </div>

                <p>
                  {t.welcome}
                </p>

                <p>
                  {t.chooseOption}
                </p>

                <div className="ussd-menu">

                  <p>
                    {t.checkSuspiciousMessage}
                  </p>

                  <p>
                    {t.safetyTips}
                  </p>

                  <p>
                    {t.exit}
                  </p>

                </div>


                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(
                      e.target.value
                    )
                  }
                  placeholder={
                    t.enterOption
                  }
                />


                <button
                  onClick={() => {

                    if (
                      ussdInput === "1"
                    ) {
                      setUssdStep(
                        "message"
                      );
                    } else if (
                      ussdInput === "2"
                    ) {
                      setUssdStep(
                        "tips"
                      );
                    } else if (
                      ussdInput === "3"
                    ) {
                      setUssdStep(
                        "exit"
                      );
                    }

                    setUssdInput("");

                  }}
                >
                  {t.send}
                </button>

              </>
            )}


          {/* CHECK MESSAGE */}

          {ussdStep === "message" &&
            ussdMode === "scams" && (
              <>

                <div className="ussd-title">
                  {t.checkMessageTitle}
                </div>

                <p>
                  {t.enterSuspiciousMessage}
                </p>

                <textarea
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(
                      e.target.value
                    )
                  }
                  placeholder={
                    t.typeMessage
                  }
                  rows="5"
                />

                <button
                  onClick={
                    onCheckMessage
                  }
                >
                  {t.check}
                </button>

                <button
                  className="ussd-secondary"
                  onClick={() => {
                    setUssdStep("menu");
                    setUssdInput("");
                  }}
                >
                  {t.backButton}
                </button>

              </>
            )}


          {/* LEARNING MENU */}

          {ussdStep ===
            "learning" &&
            ussdMode ===
              "learning" && (
              <>

                <div className="ussd-title">
                  {
                    t.learnDigitalSkillsTitle
                  }
                </div>

                <p>
                  {t.whatLearn}
                </p>

                <div className="ussd-menu">

                  <p>
                    1.{" "}
                    {t.cybersecurity}
                  </p>

                  <p>
                    2.{" "}
                    {t.email}
                  </p>

                  <p>
                    3.{" "}
                    {
                      t.artificialIntelligence
                    }
                  </p>

                  <p>
                    {t.backOption}
                  </p>

                </div>


                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={ussdInput}
                  onChange={(e) =>
                    setUssdInput(
                      e.target.value
                    )
                  }
                  placeholder={
                    t.enterOption
                  }
                />


                <button
                  onClick={() => {

                    if (
                      ussdInput === "1"
                    ) {
                      setUssdStep(
                        "cybersecurity"
                      );
                    } else if (
                      ussdInput === "2"
                    ) {
                      setUssdStep(
                        "email"
                      );
                    } else if (
                      ussdInput === "3"
                    ) {
                      setUssdStep("ai");
                    } else if (
                      ussdInput === "4"
                    ) {
                      onNavigate("learn");
                    }

                    setUssdInput("");

                  }}
                >
                  {t.send}
                </button>

              </>
            )}


          {/* CYBERSECURITY */}

          {ussdStep ===
            "cybersecurity" &&
            ussdMode ===
              "learning" && (
              <>

                <div className="ussd-title">
                  {t.cyberTitle}
                </div>

                <p>
                  🔑{" "}
                  {t.strongPasswords}
                </p>

                <p>
                  📱{" "}
                  {t.neverSharePin}
                </p>

                <p>
                  🔗{" "}
                  {t.suspiciousLinks}
                </p>

                <p>
                  👤{" "}
                  {t.verifyPeople}
                </p>

                <button
                  onClick={() => {
                    setUssdStep(
                      "learning"
                    );
                    setUssdInput("");
                  }}
                >
                  {t.backButton}
                </button>

              </>
            )}


          {/* EMAIL */}

          {ussdStep === "email" &&
            ussdMode ===
              "learning" && (
              <>

                <div className="ussd-title">
                  {t.emailTitle}
                </div>

                <p>
                  📧{" "}
                  {t.emailDescription}
                </p>

                <p>
                  ✍️{" "}
                  {t.composeEmail}
                </p>

                <p>
                  📎{" "}
                  {t.attachFiles}
                </p>

                <p>
                  🔒{" "}
                  {t.neverShareEmailPassword}
                </p>

                <p>
                  ⚠️{" "}
                  {t.unknownAttachments}
                </p>

                <button
                  onClick={() => {
                    setUssdStep(
                      "learning"
                    );
                    setUssdInput("");
                  }}
                >
                  {t.backButton}
                </button>

              </>
            )}


          {/* AI */}

          {ussdStep === "ai" &&
            ussdMode ===
              "learning" && (
              <>

                <div className="ussd-title">
                  {t.aiTitle}
                </div>

                <p>
                  🤖{" "}
                  {t.aiDescription}
                </p>

                <p>
                  💬{" "}
                  {t.aiQuestions}
                </p>

                <p>
                  ✍️{" "}
                  {t.aiWriting}
                </p>

                <p>
                  ⚠️{" "}
                  {t.aiMistakes}
                </p>

                <p>
                  🔍{" "}
                  {t.verifyAI}
                </p>

                <button
                  onClick={() => {
                    setUssdStep(
                      "learning"
                    );
                    setUssdInput("");
                  }}
                >
                  {t.backButton}
                </button>

              </>
            )}


          {/* SAFETY TIPS */}

          {ussdStep === "tips" &&
            ussdMode ===
              "scams" && (
              <>

                <div className="ussd-title">
                  {t.safetyTips}
                </div>

                <p>
                  • {t.neverSharePIN}
                </p>

                <p>
                  • {t.dontSendMoney}
                </p>

                <p>
                  • {t.verifyMessages}
                </p>

                <p>
                  • {t.dontClickLinks}
                </p>

                <p>
                  • {t.useStrongPasswords}
                </p>

                <button
                  onClick={() => {
                    setUssdStep("menu");
                    setUssdInput("");
                  }}
                >
                  {t.backButton}
                </button>

              </>
            )}


          {/* RESULT */}

          {ussdStep === "result" &&
            ussdMode ===
              "scams" && (
              <>

                <div className="ussd-title">
                  {t.result}
                </div>

                {scamResult ? (
                  <>

                    <p>
                      {t.risk}:{" "}
                      <strong>
                        {scamResult.riskLevel}
                      </strong>
                    </p>

                    <p>
                      {t.score}:{" "}
                      {scamResult.score}
                      /100
                    </p>

                    <p>
                      {t.type}:
                      <br />
                      {
                        scamResult.scamCategory
                      }
                    </p>

                    <p>
                      {t.warningSigns}:
                    </p>

                    {scamResult.warningSigns
                      .slice(0, 3)
                      .map(
                        (
                          warning,
                          index
                        ) => {

                          const text =
                            getTranslations(
                              language
                            );

                          const titles = {
                            urgency:
                              text.urgencyTitle,
                            sensitive:
                              text.sensitiveTitle,
                            money:
                              text.moneyTitle,
                            reward:
                              text.rewardTitle,
                            link:
                              text.linkTitle,
                            threat:
                              text.threatTitle
                          };

                          return (
                            <p
                              key={index}
                            >
                              {
                                warning.icon
                              }{" "}
                              {
                                titles[
                                  warning.type
                                ]
                              }
                            </p>
                          );
                        }
                      )}

                    <p>
                      🛡️{" "}
                      {
                        t.neverShareSensitive
                      }
                    </p>

                  </>
                ) : (
                  <p>
                    {t.unableAnalyze}
                  </p>
                )}

                <button
                  onClick={() => {
                    setUssdStep(
                      "menu"
                    );
                    setUssdInput("");
                  }}
                >
                  {t.finish}
                </button>

              </>
            )}


          {/* EXIT */}

          {ussdStep === "exit" && (
            <>

              <div className="ussd-title">
                DIGITALBUDDY
              </div>

              <p>
                {t.thankYou}
              </p>

              <p>
                {t.staySafe}
              </p>

              <button
                onClick={() => {

                  setUssdStep(
                    "menu"
                  );

                  setUssdInput("");

                  if (
                    ussdMode ===
                    "learning"
                  ) {
                    onNavigate("learn");
                  } else {
                    onNavigate(
                      "scamCheck"
                    );
                  }

                }}
              >
                {t.close}
              </button>

            </>
          )}

        </div>
      </div>


      {/* DEMO NOTE */}

      <div className="ussd-demo-note">

        <strong>
          {t.developmentDemo}
        </strong>

        <p>
          {t.simulation}
        </p>

      </div>

    </div>
  );
}


// ==========================================================
// MAIN APP
// ==========================================================

export default function App() {

  const [page, setPage] =
    useState("home");


  // ========================================================
  // LANGUAGE
  // ========================================================

  const [language, setLanguageState] =
    useState(() => {

      return (
        localStorage.getItem(
          "digitalBuddyLanguage"
        ) || "English"
      );

    });


  const setLanguage = (
    selectedLanguage
  ) => {

    setLanguageState(
      selectedLanguage
    );

    localStorage.setItem(
      "digitalBuddyLanguage",
      selectedLanguage
    );

  };


  // ========================================================
  // AI ASSISTANT
  // ========================================================

  const [initialPrompt, setInitialPrompt] =
    useState("");


  const openAssistant = (
    promptText = ""
  ) => {

    setInitialPrompt(
      promptText
    );

    setPage("assistant");

  };


  // ========================================================
  // SCAM STATE
  // ========================================================

  const [scamMessage, setScamMessage] =
    useState("");

  const [scamResult, setScamResult] =
    useState(null);

  const [isCheckingScam, setIsCheckingScam] =
    useState(false);


  // ========================================================
  // USSD STATE
  // ========================================================

  const [ussdStep, setUssdStep] =
    useState("menu");

  const [ussdInput, setUssdInput] =
    useState("");

  const [ussdMode, setUssdMode] =
    useState("scams");


  // ========================================================
  // SCAM ANALYSIS
  // ========================================================

  const handleAnalyzeScam = (
    messageText
  ) => {

    if (!messageText.trim()) {
      return;
    }

    setIsCheckingScam(true);
    setScamResult(null);

    const result =
      analyzeMessageContent(
        messageText
      );

    setTimeout(() => {

      setScamResult(result);
      setIsCheckingScam(false);

    }, 900);

  };


  // ========================================================
  // USSD SCAM CHECK
  // ========================================================

  const handleUSSDCheck = () => {

    if (!ussdInput.trim()) {
      return;
    }

    const message =
      ussdInput;

    setScamMessage(
      message
    );

    const result =
      analyzeMessageContent(
        message
      );

    setScamResult(
      result
    );

    setUssdInput("");

    setUssdStep(
      "result"
    );

  };


  // ========================================================
  // TRANSLATION
  // ========================================================

  const t =
    getTranslations(language);


  return (
    <div className="app">


      {/* ==================================================
          HOME
          ================================================== */}

      {page === "home" && (

        <HomeView
          onNavigate={setPage}
          onOpenAssistant={
            openAssistant
          }
          language={language}
          setLanguage={
            setLanguage
          }
        />

      )}


      {/* ==================================================
          SCAM CHECK
          ================================================== */}

      {page === "scamCheck" && (

        <ScamCheckView
          scamMessage={
            scamMessage
          }
          setScamMessage={
            setScamMessage
          }
          scamResult={
            scamResult
          }
          setScamResult={
            setScamResult
          }
          isCheckingScam={
            isCheckingScam
          }
          onAnalyze={
            handleAnalyzeScam
          }
          language={
            language
          }
          onNavigate={(target) => {

            if (
              target === "ussd"
            ) {

              setUssdMode(
                "scams"
              );

              setUssdStep(
                "menu"
              );

              setUssdInput("");

            }

            setPage(target);

          }}
        />

      )}


      {/* ==================================================
          LEARN DIGITAL SKILLS
          ================================================== */}

      {page === "learn" && (

        <>

          <LanguageSelector
            language={
              language
            }
            setLanguage={
              setLanguage
            }
          />

          <button
            className="back-button"
            onClick={() =>
              setPage("home")
            }
          >
            {t.back}
          </button>


          <h1>
            📚 {t.learnSkills}
          </h1>

          <p>
            {t.chooseTopic}
          </p>


          <div className="lesson-options">

            {Object.entries(
              LESSONS
            ).map(
              ([
                key,
                lesson
              ]) => {

                const translated =
                  lesson[
                    language
                  ] ||
                  lesson.English;

                return (

                  <button
                    key={key}
                    className="lesson-button"
                    onClick={() =>
                      setPage(
                        key
                      )
                    }
                  >

                    <h3>
                      {
                        translated.title
                      }
                    </h3>

                    <p>
                      {
                        translated.description
                      }
                    </p>

                  </button>

                );

              }
            )}

          </div>


          {/* USSD */}

          <div className="offline-option">

            <div className="offline-icon">
              📱
            </div>

            <div className="offline-content">

              <h3>
                {t.noInternet}
              </h3>

              <p>
                {t.learnWithUSSD}
              </p>

            </div>

            <button
              className="ussd-button"
              onClick={() => {

                setUssdMode(
                  "learning"
                );

                setUssdStep(
                  "learning"
                );

                setUssdInput("");

                setPage(
                  "ussd"
                );

              }}
            >
              {t.useUSSD}
            </button>

          </div>

        </>

      )}


      {/* ==================================================
          LESSONS
          ================================================== */}

      {LESSONS[page] && (

        <LessonView
          lesson={
            LESSONS[page]
          }
          language={
            language
          }
          onBack={() =>
            setPage(
              "learn"
            )
          }
        />

      )}


      {/* ==================================================
          USSD
          ================================================== */}

      {page === "ussd" && (

        <UssdView
          ussdStep={
            ussdStep
          }
          setUssdStep={
            setUssdStep
          }
          ussdInput={
            ussdInput
          }
          setUssdInput={
            setUssdInput
          }
          ussdMode={
            ussdMode
          }
          scamResult={
            scamResult
          }
          onCheckMessage={
            handleUSSDCheck
          }
          onNavigate={
            setPage
          }
          language={
            language
          }
        />

      )}


      {/* ==================================================
          AI ASSISTANT
          ================================================== */}

      {page === "assistant" && (

        <>

          <LanguageSelector
            language={
              language
            }
            setLanguage={
              setLanguage
            }
          />

          <button
            className="back-button"
            onClick={() =>
              setPage("home")
            }
          >
            {t.back}
          </button>

          <h1>
            🤖 {t.digitalAssistant}
          </h1>

          <p>
            {t.assistantSubtitle}
          </p>

          <div
            style={{
              marginTop:
                "20px",
              display:
                "flex",
              justifyContent:
                "center"
            }}
          >

            <ChatAssistant
              initialPrompt={
                initialPrompt
              }
              isEmbedded={
                true
              }
              language={
                language
              }
            />

          </div>

        </>

      )}


      {/* ==================================================
          FLOATING AI ASSISTANT
          ================================================== */}

      {page !==
        "assistant" && (

        <ChatAssistant
          language={
            language
          }
        />

      )}

    </div>
  );
}