const generateMockData = (rows = 20)  =>{
  // Données possibles pour chaque colonne
  const agences = [
    'Agence Paris Nord', 
    'Agence Lyon Sud',
    'Agence Marseille Est',
    'Agence Bordeaux Ouest',
    'Agence Lille Centre',
    'Agence Toulouse',
    'Agence Nantes'
  ];
  
  const statuts = [
    'En cours',
    'Clôturé',
    'En attente',
    'Rejeté',
    'Validé',
    'En traitement'
  ];
  
  const prefixesPolice = ['POL', 'ASU', 'CON', 'PRO'];
  const prefixesSAP = ['SAP', 'INT', 'GES'];
  
  // Fonctions utilitaires
  const randomDate = (start, end) => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
  };
  
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomAmount = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
  
  // Génération des données
  const data = [];
  const startDate = new Date(2022, 0, 1);
  const endDate = new Date();
  
  for (let i = 1; i <= rows; i++) {
    const dsurvenance = randomDate(startDate, endDate);
    const declarationDate = new Date(dsurvenance);
    declarationDate.setDate(declarationDate.getDate() + randomNumber(1, 5));
    
    data.push({
      id: i,
      NumSIN: `R#${i}`,
      dsurvenance: dsurvenance,
      ddeclaration: declarationDate.toISOString().split('T')[0],
      agence: randomItem(agences),
      police: `${randomItem(prefixesPolice)}${randomNumber(100000, 999999)}`,
      sap: `${randomItem(prefixesSAP)}${randomNumber(100, 999)}`,
      reglement: randomAmount(500, 5000),
      statut: randomItem(statuts)
    });
  }
  
  return data;
}

export default generateMockData;

// Exemple d'utilisation

// Pour exporter vers un fichier (Node.js)
// const fs = require('fs');
// fs.writeFileSync('mockData.json', JSON.stringify(mockData, null, 2));