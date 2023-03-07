fetch("https://inf04.nigdit.men/api/questions").then((res) => res.json()).then( async (data) => {    
    const clickButtons = await browser.storage.sync.get('clickButtons').then((res) => res.clickButtons);
    const highlightColor = await browser.storage.sync.get('highlightColor').then((res) => res.highlightColor);
    const delay = await browser.storage.sync.get('delay').then((res) => res.delay);
    setTimeout(() => zaznaczPytania(data, {clickButtons: clickButtons || false, highlightColor: highlightColor || "#008000"}), delay || 1000)
}).catch((err) => console.error(err));

const zaznaczPytania = async (odpowiedzi, {clickButtons = false, highlightColor = "#008000"}) => {
    const pytania = document.querySelectorAll('.trescE');
    for (let i = 1; i <= pytania.length; i++) {
        const elementPytanie = pytania[i - 1];
        const odpowiedzA = document.querySelector(`#odpa${i}`);
        const odpowiedzB = document.querySelector(`#odpb${i}`);
        const odpowiedzC = document.querySelector(`#odpc${i}`);
        const odpowiedzD = document.querySelector(`#odpd${i}`);        
        if(!elementPytanie || !odpowiedzA || !odpowiedzB || !odpowiedzC || !odpowiedzD) throw new Error('[ROZSZERZENIE]: Brak pytania lub odpowiedzi');
        const trescPytania = elementPytanie.textContent?.slice(3);
        let odpowiedzNaPytanie = odpowiedzi.find(p => trescPytania?.toLowerCase().includes(p.tresc.toLowerCase()));
        if(!odpowiedzNaPytanie) {
            const pierwsze10Znakow = trescPytania?.substring(5, 15).toLowerCase();
            console.warn("[ROZSZERZENIE]: Nie znaleziono odpowiedzi na pytanie, szukam w miarę dopasowanej odpowiedzi");
            
            odpowiedzNaPytanie = odpowiedzi.find(q => q.tresc.toLowerCase().includes(pierwsze10Znakow || ''));
        }
        
        if(!odpowiedzNaPytanie) throw new Error('[ROZSZERZENIE]: Nie znaleziono odpowiedzi na pytanie');
        
        const odpowiedziNaPytanie = [odpowiedzA, odpowiedzB, odpowiedzC, odpowiedzD];

        for(const odpowiedz of odpowiedziNaPytanie) {
            if(odpowiedz.textContent?.slice(3).toLowerCase().trim() === odpowiedzNaPytanie.odpowiedz.toLowerCase().trim()) {
                if(clickButtons) {
                    odpowiedz.click();
                }else {
                    odpowiedz.style.backgroundColor = highlightColor;
                }
            }
        }
    }
}