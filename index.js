
import React from 'react';
import ReactDOM from 'react-dom/client';
// useState hinzufügen
import { useState, useEffect } from 'react';



function App() {
  // State für CUST wert und Anzeige der verschiedenen Produkte
  const [customProtein, setCustomProtein] = useState("");  
  const [customName, setCustomName] = useState('');  // Neuer State für den Namen
 
  // Initialisierung des proteinList State mit localStorage
  const [proteinList, setProteinList] = useState(() => {
    try {
      const savedList = localStorage.getItem('proteinList');
      return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
      console.error('Fehler beim Laden der Protein-Liste:', error);
      return [];
    }
  });

  
  // State für proteinCount initialisieren
    const [proteinCount, setProteinCount] = useState(() => {
      try {
        const savedCount = localStorage.getItem('proteinCount');
        // Prüfen ob der Wert gültig ist
        if (savedCount !== null && !isNaN(parseFloat(savedCount))) {
          return parseFloat(savedCount);
        }
        return 0;
      } catch (error) {
        console.error('Fehler beim Laden des Protein-Wertes:', error);
        return 0;
      }
    })
      // Neuer State für die Historie
  const [proteinHistory, setProteinHistory] = useState(() =>{
    try {
      const savedHistory = localStorage.getItem('proteinHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
  console.error('Fehler beim Laden der Historie:', error);
  return [];}
  
});

 // useEffect zum Speichern der Werte
 useEffect(() => {
  try {
    localStorage.setItem('proteinCount', proteinCount.toString());
    localStorage.setItem('proteinHistory', JSON.stringify(proteinHistory));
    localStorage.setItem('proteinList', JSON.stringify(proteinList)); // Neue Zeile
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
  }
}, [proteinCount, proteinHistory,proteinList]); // Beide Werte überwachen


 // Speichere Historie wenn sich proteinCount auf 0 setzt (Reset)
 const handleReset = () => {
  const today = new Date().toISOString().split('T')[0];
  const newHistoryEntry = { date: today, proteinCount: proteinCount };
  
  setProteinHistory(prevHistory => {
    const newHistory = [...prevHistory, newHistoryEntry];
    localStorage.setItem('proteinHistory', JSON.stringify(newHistory));
    return newHistory;
  });

  setProteinCount(0);
  setProteinList([]); // Liste leeren beim Speichern
}; // Diese Klammer schließt die handleReset Funktion
  
    // Speichere den Wert im localStorage wenn er sich ändert
    useEffect(() => {
      try {
        if (!isNaN(proteinCount)) {
          localStorage.setItem('proteinCount', proteinCount.toString());
        }
      } catch (error) {
        console.error('Fehler beim Speichern des Protein-Wertes:', error);
      }
    }, [proteinCount]);

    const deleteLastEntry = () => {
      setProteinHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, -1); // Entfernt den letzten Eintrag
        localStorage.setItem('proteinHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    };


  return (
    <div className="App">
      <header className="App-header">
       <h1 style={{
    fontSize: '50px',
    fontFamily: 'Arial, sans-serif',
    color: '#2ecc71',
    fontWeight: 'bold',
    textAlign: "center"
    
        }} >Proteins Ziel 130g per Day</h1>
       

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', padding: '10px' }}>
          <button 
             onClick={() => {
              setProteinCount(prevCount => prevCount + 2.7);
              setProteinList(prevList => [...prevList, {
                name: "Reis",
                amount: 2.7
              }]);
            }}
            style={{ 
              height: '150px', 
              width: '150px',
              borderRadius: '150px',
              backgroundImage: 'url(https://image.brigitte.de/13215512/t/IG/v2/w960/r1/-/sushi-reis-kochen.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              fontSize: '24px',  // Neue Zeile
              fontWeight: 'bold' // Neue Zeile
            }}>Reis 2.7g</button>
          <button
          onClick={() => {
            setProteinCount(prevCount => prevCount + 3.9);
            setProteinList(prevList => [...prevList, { 
              name: "Ei",
              amount: 3.9
            }])
          }}
          style={{ height: '150px', width: '150px',
            borderRadius: "150px",
            backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/1/1b/White_chicken_egg_square.jpg)",
            backgroundSize: "Cover",
            backgroundRepeat: "Center",
            backgroundColor: "white",
            fontSize: '24px',  // Neue Zeile
            fontWeight: 'bold' // Neue Zeile
           }}>EI 3.9g </button>
         <button 
    onClick={() => {
      setProteinCount(prevCount => prevCount + 19);
      setProteinList(prevList => [...prevList, {
        name: "Mozzarella",
        amount: 19
      }]);
    }}
  style={{ 
    height: '150px', 
    width: '150px',
    borderRadius: '150px',
    backgroundImage: 'url(https://bueffelbill.com/cdn/shop/files/Kategoriebild_Mozzarella_24.png?v=1730971881)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  }}>Mozz 19g</button>
          <button 
    onClick={() => {
      setProteinCount(prevCount => prevCount + 5);
      setProteinList(prevList => [...prevList, {
        name: "Nudeln",
        amount: 5
      }]);
    }}
  style={{ 
    height: '150px', 
    width: '150px',
    borderRadius: '150px',
    backgroundImage: 'url(https://www.kuechengoetter.de/uploads/media/630x630/02/4372-spaghetti.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  }}>Nudeln 5g</button>

<button 
  onClick={() => {
    setProteinCount(prevCount => prevCount + 10);
    setProteinList(prevList => [...prevList, {
      name: "Joghurt",
      amount: 10
    }]);
  }}
  style={{ 
    height: '150px', 
    width: '150px',
    borderRadius: '150px',
    backgroundImage: 'url(https://bergbauernmilch.de/_Resources/Persistent/8/8/a/3/88a3a9cacc2b769c1d44d1c67c7460b142dc19ae/22001.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  }}>Yogh 10g</button>

<button 
  onClick={() => {
    setProteinCount(prevCount => prevCount + 21);
    setProteinList(prevList => [...prevList, {
      name: "Feta",
      amount: 21
    }]);
  }}
  style={{ 
    height: '150px', 
    width: '150px',
    borderRadius: '150px',
    backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Feta_Cheese.jpg/800px-Feta_Cheese.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  }}>Feta 21g</button>

<button 
    onClick={() => {
      setProteinCount(prevCount => prevCount + 18);
      setProteinList(prevList => [...prevList, {
        name: "Cashews",
        amount: 18
      }]);
    }}
  style={{ 
    height: '150px', 
    width: '150px',
    borderRadius: '150px',
    backgroundImage: 'url(https://media.post.rvohealth.io/wp-content/uploads/2020/06/cashews-nuts-1200x628-facebook-1200x628.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  }}>Cash 18g</button>

<div style={{ 
  gridColumn: '1 / -1', 
  display: 'flex', 
  gap: '10px', 
  alignItems: 'center',
  marginTop: '20px',
  marginBottom: '20px' 
}}>
  <input
    type="text"
    value={customName}
    onChange={(e) => setCustomName(e.target.value)}
    placeholder="Name des Proteins"
    style={{
      padding: '10px',
      fontSize: '18px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      flex: '1'
    }}
  />
  <input
    type="number"
    value={customProtein}
    onChange={(e) => setCustomProtein(e.target.value)}
    placeholder="Eigener Proteinwert in g"
    style={{
      padding: '10px',
      fontSize: '18px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      flex: '1'
    }}
  />
  <button
    onClick={() => {
      if (customProtein && !isNaN(customProtein) && customName) {
        setProteinCount(prevCount => prevCount + parseFloat(customProtein));
        setProteinList(prevList => [...prevList, {
          name: customName,
          amount: parseFloat(customProtein)
        }]);
        setCustomProtein('');
        setCustomName('');
      }
    }}
    style={{
      padding: '10px 20px',
      fontSize: '18px',
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    }}
  >
    Hinzufügen
  </button>
</div>






          <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            Total Protein: {proteinCount}g
          </div>



{/* Liste der hinzugefügten Proteine anzeigen */}
<div style={{ 
  gridColumn: '1 / -1', 
  marginTop: '20px',
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px'
}}>
  <div style={{ fontSize: '24px', marginBottom: '10px' }}>
    Total Protein: {proteinCount}g
  </div>
  <div style={{ fontSize: '18px', marginTop: '10px' }}>
    Enthaltene Proteine:
    <ul style={{ listStyle: 'none', padding: '0' }}>
      {proteinList.map((item, index) => (
        <li key={index} style={{ margin: '5px 0' }}>
          {item.name}: {item.amount}g
        </li>
      ))}
    </ul>
  </div>
</div>


          
          <button // SPeichern
          onClick={handleReset}
            style={{
            gridColumn: '1 / -1',
            height: '50px',
            backgroundColor: 'green',
            color: 'white',
            fontSize: '20px',
            borderRadius: '5px',
            }}
          >Speichern</button>




{/* Reset Button zum Löschen der Ergebnisse */}
          <button
          onClick={() => {
            setProteinCount(0);
            setProteinList([]); // Liste leeren beim Reset
          }}
            style={{
            gridColumn: '1 / -1',
            height: '50px',
            backgroundColor: 'red',
            color: 'white',
            fontSize: '20px',
            borderRadius: '5px',
            }}
          >Reset</button>
          <div style={{
            gridColumn: '1 / -1',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '5px',
            marginTop: '20px'
          }}>



{/* Historie-Anzeige hinzufügen */}
<div style={{
  gridColumn: '1 / -1',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
  marginTop: '20px'
}}>

  <h3 style={{
    fontSize: '32px',
    fontFamily: 'Arial, sans-serif',
    color: '#2ecc71',
    fontWeight: 'bold'

  }} > Protein Historie:</h3>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {proteinHistory.map((entry, index) => (
      <li key={index}>
        {entry.date}: {entry.proteinCount}g Protein
      </li>
    ))}
  </ul>
</div>


<button
  onClick={deleteLastEntry}
  style={{
    gridColumn: '1 / -1',
    height: '50px',
    backgroundColor: '#e74c3c', // Rötlicher Ton
    color: 'white',
    fontSize: '20px',
    borderRadius: '5px',
    marginTop: '10px'
  }}
>
  Letzten Eintrag löschen
</button>


            
        
          </div>
        </div>
      </header>
    </div>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

