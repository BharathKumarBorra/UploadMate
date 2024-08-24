export const headerSectionContent = {
  EN: {
    request: "REQUEST",
    home: "HOME",
    creator: "CREATOR",
    editor: "EDITOR",
    logout: "Log Out",
    invCode: "INVITATION CODE",
  },
  HI: {
    request: "अनुरोध",
    home: "घर",
    creator: "निर्माता",
    editor: "संपादक",
    logout: "लॉग आउट",
    invCode: "आमंत्रण संकेत",
  },
  TE: {
    request: "అభ్యర్థన",
    home: "ఇల్లు",
    creator: "సృష్టికర్త",
    editor: "సంపాదకుడు",
    logout: "లాగ్ అవుట్ చేయండి",
    invCode: "ఆహ్వాన కోడ్",
  },
  ZH: {
    request: "要求",
    home: "家",
    creator: "創造者",
    editor: "編輯",
    logout: "登出",
    invCode: "邀請程式碼",
  },
  ES: {
    request: "PEDIDO",
    home: "HOGAR",
    creator: "CREADOR",
    editor: "EDITOR",
    logout: "Cerrar sesión",
    invCode: "CÓDIGO DE INVITACIÓN",
  },
  FR: {
    request: "DEMANDE",
    home: "MAISON",
    creator: "CRÉATEUR",
    editor: "ÉDITEUR",
    logout: "Se déconnecter",
    invCode: "CODE D'INVITATION",
  },
  AR: {
    request: "طلب",
    home: "بيت",
    creator: "المنشئ",
    editor: "محرر",
    logout: "تسجيل خروج",
    invCode: "شفرة الدعوة",
  },
  BN: {
    request: "অনুরোধ",
    home: "বাড়ি",
    creator: "সৃষ্টিকর্তা",
    editor: "সম্পাদক",
    logout: "প্রস্থান",
    invCode: "আমন্ত্রণ কোড",
  },
  RU: {
    request: "ЗАПРОС",
    home: "ДОМ",
    creator: "СОЗДАТЕЛЬ",
    editor: "РЕДАКТОР",
    logout: "Выйти",
    invCode: "КОД ПРИГЛАШЕНИЯ",
  },
  PT: {
    request: "SOLICITAR",
    home: "LAR",
    creator: "CRIADOR",
    editor: "EDITOR",
    logout: "Sair",
    invCode: "CÓDIGO DE CONVITE",
  },
  UR: {
    request: "درخواست کریں۔",
    home: "گھر",
    creator: "خالق",
    editor: "ایڈیٹر",
    logout: "لاگ آوٹ",
    invCode: "دعوت کا کوڈ",
  },
};

export const getSectionData = (sectionContent, activeLanguage) => {
  switch (activeLanguage) {
    case "AR":
      return sectionContent.AR;
    case "BN":
      return sectionContent.BN;
    case "ZH":
      return sectionContent.ZH;
    case "EN":
      return sectionContent.EN;
    case "FR":
      return sectionContent.FR;
    case "HI":
      return sectionContent.HI;
    case "PT":
      return sectionContent.PT;
    case "RU":
      return sectionContent.RU;
    case "ES":
      return sectionContent.ES;
    case "TE":
      return sectionContent.TE;
    case "UR":
      return sectionContent.UR;

    default:
      return null;
  }
};
